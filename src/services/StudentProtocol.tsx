import { Connection, ConnectionStatus } from '@genai-fi/base';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import { EventProtocol } from './protocol';
import { useAtomValue, useSetAtom } from 'jotai';
import {
    availableUsernamesAtom,
    configAtom,
    OpenLevelGroupsAtom,
    profilePictureAtom,
    studentBouncerAtom,
    takenUsernamesAtom,
    TournamentFileAtom,
    usernameAtom,
} from '../atoms/state';
import { usePeerData, usePeerSender, usePeerStatus } from '@genai-fi/base/hooks/peer';

import { RegisterData, ScoreData } from '../types';
import { LevelConfAtom } from '../atoms/gameState';
import { AgentData, LevelData } from '../utils/types';

interface ProtocolContextType {
    doSendScore?: (data: ScoreData) => void; // Send Image + heatmap image
    doRegister?: (data: RegisterData) => void; // Send username and profilepicture
    doSendEnvironment?: (data: LevelData) => void; // Send environment and game settings
    doSendAgent?: (data: AgentData) => void;
}

const ProtocolContext = createContext<ProtocolContextType>({});

// eslint-disable-next-line react-refresh/only-export-components
export function useRewardProtocol() {
    return useContext(ProtocolContext);
}
export default function StudentProtocol({ children }: PropsWithChildren) {
    const setConfig = useSetAtom(configAtom);
    const setAvailableUsernames = useSetAtom(availableUsernamesAtom);
    const setTakenUsernames = useSetAtom(takenUsernamesAtom);
    const setLevel = useSetAtom(LevelConfAtom); // TODO make this work!
    const setBouncer = useSetAtom(studentBouncerAtom);
    const setProfilePicture = useSetAtom(profilePictureAtom);
    const setGroup = useSetAtom(OpenLevelGroupsAtom);
    const setTournamentFile = useSetAtom(TournamentFileAtom);
    const ownUsername = useAtomValue(usernameAtom);
    // conn: Connection<EventProtocol>

    usePeerData(async (data: EventProtocol, conn: Connection<EventProtocol>) => {
        if (data.event === 'eter:join') {
            // Send
        }
        if (data.event === 'ping') {
            console.log('ping');
        } else if (data.event === 'eter:config') {
            // Sets configuration of the game, such as pause and phase.
            setConfig(data.configuration);
            conn.send({ event: 'eter:alive', user: { username: ownUsername } }); // Alive signal
        } else if (data.event === 'eter:userlist') {
            setAvailableUsernames(data.available);
            setTakenUsernames(data.taken);
        } else if (data.event === 'eter:levelTransfer') {
            // Receives level from the teacher
            setLevel(data.data);
        } else if (data.event === 'eter:messageUser') {
            // Messages such as reset result for specific term or bouncer (kick / remove user)
            if (!data.recipient || data.recipient.username === ownUsername) {
                setBouncer({ message: data.message, reload: data.reload });
            }
        } else if (data.event === 'eter:profileColour') {
            // For receiving profile colour on reconnect.
            setProfilePicture(data.data.profilePicture);
        } else if (data.event === 'eter:levelGroup') {
            // Sends level group information to the teacher.
            setGroup(new Set(data.data));
        } else if (data.event === 'eter:envTransfer') {
            setTournamentFile(data.data.file);
        }
    });
    const [hasBeenReady, setHasBeenReady] = useState(false);

    const ready = usePeerStatus() === 'ready';
    const send = usePeerSender<EventProtocol>();

    useEffect(() => {
        setHasBeenReady(true);
    }, [ready]);

    /**
     * Sends heatmap and normal image and score to the teacher
     */
    const doSendScore = useCallback(
        (scoreData: ScoreData) => {
            if (send) {
                send({ event: 'eter:score', data: scoreData });
            }
        },
        [send]
    );

    const doRegister = useCallback(
        (registerData: RegisterData) => {
            if (send) {
                send({ event: 'eter:register', data: registerData });
            }
        },
        [send]
    );

    const doSendEnvironment = useCallback(
        (levelData: LevelData) => {
            if (send) {
                send({ event: 'eter:envTransfer', data: levelData });
            }
        },
        [send]
    );

    const doSendAgent = useCallback(
        (agentData: AgentData) => {
            if (send) {
                send({ event: 'agentTransfer', data: agentData });
            }
        },
        [send]
    );

    return (
        <ProtocolContext.Provider
            value={{
                doSendScore,
                doRegister,
                doSendEnvironment,
                doSendAgent,
            }}
        >
            {hasBeenReady && children}
            <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', pointerEvents: 'none' }}>
                <ConnectionStatus
                    api={import.meta.env.VITE_APP_APIURL}
                    appName={'reward'}
                    visibility={1}
                />
            </div>
        </ProtocolContext.Provider>
    );
}
