import { ConnectionStatus, Connection } from '@genai-fi/base';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { EventProtocol } from './protocol';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { usePeerClose, usePeerData, usePeerSender, usePeerStatus } from '@genai-fi/base/hooks/peer';
import {
    levelDataAtom,
    messageTransferAtom,
    studentDataAtom,
    studentGamesAtom,
    studentGameZipsAtom,
    takenUsernamesAtom,
    topScoresAtom,
    tournamentAgentUpdatesAtom,
    TournamentFileAtom,
    usersAtom,
} from '../atoms/state';
import { StudentData, StudentGameBlobs, StudentGames, TournamentAgents } from '../types';
import { serializeStudentData, updateTopScores } from './utils';
import { readSavedAgentFile, readSavedFile } from '../utils/import';

interface ProtocolContextType {
    doSendLeaderboard?: (data: StudentData) => void; // Leaderboard data
}

const ProtocolContext = createContext<ProtocolContextType>({});

// eslint-disable-next-line react-refresh/only-export-components
export function useHostProtocol() {
    return useContext(ProtocolContext);
}

export default function HostProtocol({ children }: PropsWithChildren) {
    const [users, setUsers] = useAtom(usersAtom);
    const [topScores, setTopScores] = useAtom(topScoresAtom);
    const [allUNs, setAllUNs] = useAtom(takenUsernamesAtom);
    const setStudent = useSetAtom(studentDataAtom);
    const levelObject = useAtomValue(levelDataAtom);
    const messageData = useAtomValue(messageTransferAtom);
    const tournamentLevelFile = useAtomValue(TournamentFileAtom);
    const setStudentGames = useSetAtom(studentGamesAtom);
    const setStudentGameBlobs = useSetAtom(studentGameZipsAtom);
    const setTournamentAgentUpdates = useSetAtom(tournamentAgentUpdatesAtom);

    // CLOSE HANDLER: whenever a Connection is closed (either via 'eter:close' or network drop),
    // remove that user from your usersAtom.
    usePeerClose((conn?: Connection<EventProtocol>) => {
        if (conn) {
            setUsers((old) => old.filter((user) => user.connectionId !== conn.connectionId));
        }
    });

    usePeerData(async (data: EventProtocol, conn: Connection<EventProtocol>) => {
        console.log('received', data);
        if (data.event === 'eter:alive') {
            const userExists = users.some((u) => u.username === data.user.username);
            if (!userExists && data.user.username) {
                // Auto register on image-event
                setUsers((old) => [
                    ...old,
                    {
                        username: data.user.username,
                        connectionId: conn.connectionId,
                    },
                ]);
                setAllUNs((old) => {
                    if (old.some((u) => u.username === data.user.username)) {
                        return old;
                    }
                    return [...old, { username: data.user.username }];
                });
            }
        } else if (data.event === 'eter:join') {
            // This event is triggered by student before register
            conn.send({
                // And we send list of taken usernames and those that have dropped
                event: 'eter:userlist',
                available: allUNs.filter((u) => !users.some((user) => user.username === u.username)), // Filters users dropped from the users
                taken: allUNs.filter((u) => users.some((user) => user.username === u.username)), // Filters users still connected
            });
        } else if (data.event === 'eter:drop') {
            // not in use
            setUsers((old) => old.filter((o) => o.username !== data.data.username));
        } else if (data.event === 'eter:register') {
            // User has given username (and maybe profile pic too?) and register
            const idx = users.findIndex((u) => u.username === data.data.username);
            if (idx !== -1) {
                // Dublicate user!
                console.warn('users have tried to enter with same username. No dublicates allowed.'); // Sends reload command back to same connection
                conn.send({
                    event: 'eter:messageUser',
                    message: 'usernameTaken',
                    reload: true,
                    action: 'bouncer',
                });
                return;
            }
            setUsers((old) => [
                ...old,
                {
                    username: data.data.username,
                    connectionId: conn.connectionId,
                },
            ]);
            setAllUNs((old) => {
                // Only add if there is not already one with same name
                if (old.some((u) => u.username === data.data.username)) {
                    return old;
                }
                return [...old, { username: data.data.username }];
            });
        } else if (data.event === 'eter:modelRequest') {
            if (tournamentLevelFile) {
                conn.send({
                    event: 'eter:envTransfer',
                    data: { studentId: '', file: tournamentLevelFile },
                });
            } else {
                console.warn('Level not found when requested by student');
            }
        } else if (data.event === 'eter:score') {
            // On new image from student. This also usually means new score.
            // If peer connection has stability issues, it might drop from active "users" -list and not rejoin it with register
            // In that case we register student also here
            const userExists = users.some((u) => u.username === data.data.studentId);
            if (!userExists && data.data.studentId) {
                // Auto register on score-event
                setUsers((old) => [
                    ...old,
                    {
                        username: data.data.studentId,
                        connectionId: conn.connectionId,
                    },
                ]);
                setAllUNs((old) => {
                    if (old.some((u) => u.username === data.data.studentId)) {
                        return old;
                    }
                    return [...old, { username: data.data.studentId }];
                });
            }
            // If student wishes to remove image, it is done here

            // Check and update top-scores
            updateTopScores({
                levelName: data.data.levelName,
                studentId: data.data.studentId,
                score: data.data.score,
                topScores,
                setTopScores,
            });

            // Add image to results (studentDataAtom)
            (async () => {
                const score = data.data.score;
                // Here we set the image received as current activity of student shown in user grid:

                setStudent((prev) => {
                    const id = data.data.studentId;
                    const prevStudents = prev?.students ?? new Map();
                    const studentScores = prevStudents.get(id) ?? { data: new Map() };

                    const existing = studentScores.data.get(data.data.levelName);
                    if (existing) {
                        existing.score = score;
                    } else {
                        studentScores.data.set(data.data.levelName, {
                            score,
                        });
                    }
                    prevStudents.set(id, studentScores);
                    return { students: prevStudents };
                });
            })();
        } else if (data.event === 'eter:envTransfer') {
            // If peer connection has stability issues, it might drop from active "users" -list and not rejoin it with register
            // In that case we register student also here
            const userExists = users.some((u) => u.username === data.data.studentId);
            if (!userExists && data.data.studentId) {
                // Auto register on image-event
                setUsers((old) => [
                    ...old,
                    {
                        username: data.data.studentId,
                        connectionId: conn.connectionId,
                    },
                ]);
                setAllUNs((old) => {
                    if (old.some((u) => u.username === data.data.studentId)) {
                        return old;
                    }
                    return [...old, { username: data.data.studentId }];
                });
            }
            // On new level zip from student to teacher:
            const file = new File([data.data.file], 'environment.genai', { type: 'application/zip' });
            const loaded = await readSavedFile(file);
            setStudentGames((prev: StudentGames) => {
                const id = data.data.studentId;
                const newMap = new Map(prev.students);
                newMap.set(id, loaded);
                return { students: newMap };
            });

            setStudentGameBlobs((prev: StudentGameBlobs) => {
                const id = data.data.studentId;
                const newMap = new Map(prev.students);
                newMap.set(id, data.data.file);
                return { students: newMap };
            });
        } else if (data.event === 'agentTransfer') {
            const file = new File([data.data.file], 'agent.genai', { type: 'application/zip' });
            const loaded = await readSavedAgentFile(file);
            setTournamentAgentUpdates((prev: TournamentAgents) => {
                const id = data.data.studentId;
                const newMap = new Map(prev.data);
                newMap.set(id, loaded);
                return { data: newMap };
            });
        }
    });
    const [hasBeenReady, setHasBeenReady] = useState(false);
    const ready = usePeerStatus() === 'ready';
    const send = usePeerSender<EventProtocol>();
    useEffect(() => {
        setHasBeenReady(true);
    }, [ready]);

    useEffect(() => {
        if (levelObject && send) send({ event: 'eter:levelTransfer', data: levelObject });
    }, [levelObject, send]);

    useEffect(() => {
        if (send) send({ event: 'eter:messageUser', ...messageData });
    }, [messageData, send]);

    useEffect(() => {
        if (tournamentLevelFile) {
            if (send) send({ event: 'eter:envTransfer', data: { studentId: '', file: tournamentLevelFile } });
        }
    }, [tournamentLevelFile, send]);

    const doSendLeaderboard = useCallback(
        (scoreData: StudentData) => {
            console.log('Sending leaderboard data!');
            if (send) {
                send({ event: 'leaderboardTrasfer', data: serializeStudentData(scoreData) });
            }
        },
        [send]
    );

    return (
        <ProtocolContext.Provider
            value={{
                doSendLeaderboard,
            }}
        >
            {hasBeenReady && children}
            <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', pointerEvents: 'none' }}>
                <ConnectionStatus
                    api={import.meta.env.VITE_APP_PS}
                    appName={'reward'}
                    visibility={2}
                />
            </div>
        </ProtocolContext.Provider>
    );
}
