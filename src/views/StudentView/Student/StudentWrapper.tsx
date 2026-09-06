import { useID } from '@genai-fi/base';
import { useParams } from 'react-router-dom';
import { Peer } from '@genai-fi/base/hooks/peer';

import { useState } from 'react';

import { useSetAtom } from 'jotai';
import { sessionCodeAtom } from '../../../atoms/state';
import PeerEnv from '../../../env';
import StudentProtocol from '../../../services/StudentProtocol';
import EnterUserInfo from './EnterUsername/EnterUsername';
import Student from './Student';
import ViewHandler from '../../../components/ViewHandler';
import ControlHandler from './ControlHandler';
import { OrientationPrompt } from '../../../components/Orientation/OrientationPrompt';
import { GameScaleProvider } from '../../../context/GameScale/GameScaleProvied';

export default function StudentWrapper() {
    const { serverCode } = useParams<{ serverCode: string }>();
    const MYCODE = useID(5);
    const [ready, setReady] = useState<boolean>(false);
    const setSessionCode = useSetAtom(sessionCodeAtom);
    setSessionCode(serverCode || '');

    return (
        <Peer
            host={PeerEnv.host}
            secure={PeerEnv.secure}
            peerkey={PeerEnv.peerkey}
            port={PeerEnv.port}
            code={`reward-${MYCODE}`}
            server={`reward-${serverCode}`}
        >
            <GameScaleProvider>
                <ViewHandler />
                <ControlHandler />
                <OrientationPrompt />
                <StudentProtocol>
                    {!ready && (
                        <>
                            <EnterUserInfo onReady={() => setReady(true)} />
                        </>
                    )}
                    {ready && serverCode && <Student serverCode={serverCode} />}
                </StudentProtocol>
            </GameScaleProvider>
        </Peer>
    );
}
