import { useID } from '@genai-fi/base';
import { useParams } from 'react-router-dom';
import { Peer } from '@genai-fi/base/hooks/peer';

import { useEffect, useState } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';
import { sentTournamentWorldAtom, sessionCodeAtom, usernameAtom } from '../../../../atoms/state';
import PeerEnv from '../../../../env';
import { GameScaleProvider } from '../../../../context/GameScale/GameScaleProvied';
import ViewHandler from '../../../../components/ViewHandler';
import { OrientationPrompt } from '../../../../components/Orientation/OrientationPrompt';
import PlayerProtocol from '../../../../services/PlayerProtocol';
import EnterUserInfo from '../../../StudentView/Student/EnterUsername/EnterUsername';
import Player from './Player';
import PlayerLeaderboardDialog from '../../../../components/Dialogs/PlayerLeaderboard/PlayerLeaderboardDialog';
import TournamentWorldUploader from '../../../../components/Dialogs/PlayerLeaderboard/TournamentWorldUploader';

export default function PlayerWrapper() {
    const { serverCode } = useParams<{ serverCode: string }>();
    const MYCODE = useID(5);
    const [ready, setReady] = useState<boolean>(false);
    const setSessionCode = useSetAtom(sessionCodeAtom);
    const setSentWorld = useSetAtom(sentTournamentWorldAtom);
    const username = useAtomValue(usernameAtom);
    setSessionCode(serverCode || '');

    useEffect(() => {
        setSentWorld(false);
    }, [serverCode, setSentWorld, username]);

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
                <OrientationPrompt />
                <PlayerProtocol>
                    <PlayerLeaderboardDialog />
                    <TournamentWorldUploader />
                    {!ready && (
                        <>
                            <EnterUserInfo onReady={() => setReady(true)} />
                        </>
                    )}
                    {ready && serverCode && <Player serverCode={serverCode} />}
                </PlayerProtocol>
            </GameScaleProvider>
        </Peer>
    );
}
