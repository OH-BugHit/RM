import { ConnectionStatus, Connection } from '@genai-fi/base';
import { useEffect } from 'react';
import { EventProtocol } from './protocol';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { usePeerClose, usePeerData, usePeerSender } from '@genai-fi/base/hooks/peer';
import {
    configAtom,
    levelDataAtom,
    messageTransferAtom,
    OpenLevelGroupsAtom,
    profilePicturesAtom,
    studentDataAtom,
    studentGamesAtom,
    studentGameZipsAtom,
    takenUsernamesAtom,
    topScoresAtom,
    tournamentAgentUpdatesAtom,
    TournamentFileAtom,
    usersAtom,
} from '../atoms/state';
import { RewardConfig, StudentGameBlobs, StudentGames, TournamentAgents } from '../types';
import { updateTopScores } from './utils';
import { readSavedAgentFile, readSavedFile } from '../utils/import';

export default function ServerProtocol() {
    const [users, setUsers] = useAtom(usersAtom);
    const [topScores, setTopScores] = useAtom(topScoresAtom);
    const [profilePictures, setProfilePictures] = useAtom(profilePicturesAtom);
    const [allUNs, setAllUNs] = useAtom(takenUsernamesAtom);
    const setStudent = useSetAtom(studentDataAtom);
    const config = useAtomValue<RewardConfig>(configAtom);
    const levelObject = useAtomValue(levelDataAtom);
    const messageData = useAtomValue(messageTransferAtom);
    const openGroups = useAtomValue(OpenLevelGroupsAtom);
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
                // We send current configuration
                event: 'eter:config',
                configuration: {
                    pause: config.pause,
                    phase: config.phase,
                },
            });
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
            // If registering with new profilePicture!
            if (data.data.profilePicture && data.data.profilePicture.length > 0) {
                (async () => {
                    if (data.data.profilePicture) {
                        const profilePic = data.data.profilePicture;
                        setProfilePictures((prev) => {
                            const id = data.data.username;
                            const prevMap = new Map(prev);
                            prevMap.set(id, profilePic);
                            return prevMap;
                        });
                    }
                })();
            } else {
                // If rejoining and there was already profilepic, then we send it back to student
                const pic = profilePictures.get(data.data.username);
                if (pic) {
                    const profilePic = pic;
                    conn.send({
                        event: 'eter:profileColour',
                        data: {
                            username: data.data.username,
                            profilePicture: profilePic,
                        },
                    });
                } // TODO: Here is one good place to implement random profile picture if we would like one? Just memo note here..
            }
        } else if (data.event === 'eter:modelRequest') {
            if (levelObject) {
                conn.send({
                    event: 'eter:levelTransfer',
                    data: levelObject,
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

    const send = usePeerSender<EventProtocol>();

    useEffect(() => {
        if (send) send({ event: 'eter:config', configuration: config });
    }, [config, send]);

    useEffect(() => {
        if (levelObject && send) send({ event: 'eter:levelTransfer', data: levelObject });
    }, [levelObject, send]);

    useEffect(() => {
        if (send) send({ event: 'eter:messageUser', ...messageData });
    }, [messageData, send]);

    useEffect(() => {
        if (send) send({ event: 'eter:levelGroup', data: [...openGroups] });
    });

    useEffect(() => {
        if (tournamentLevelFile) {
            if (send) send({ event: 'eter:envTransfer', data: { studentId: '', file: tournamentLevelFile } });
        }
    }, [tournamentLevelFile, send]);

    return (
        <ConnectionStatus
            api={import.meta.env.VITE_APP_APIURL}
            appName={'reward'}
            visibility={2}
        />
    );
}
