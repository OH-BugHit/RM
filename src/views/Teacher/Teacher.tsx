import style from './teacher.module.css';
import { Peer } from '@genai-fi/base/hooks/peer';
import PeerEnv from '../../env';
import StartDialog from './StartDialog/StartDialog';
import Footer from '../Footer/Footer';
import TeacherContent from './TeacherContent/TeacherContent';
import { useLeaveWarning } from '../../hooks/useLeaveBlocker';
import { useRef } from 'react';
import ServerProtocol from '../../services/ServerProtocol';
import Guidance from './SidePanel/Guidance';
import ViewHandler from '../../components/ViewHandler';
import Settings from '../Settings/Settings';
import { GameScaleProvider } from '../../context/GameScale/GameScaleProvied';

export default function Teacher({ ID }: { ID: string }) {
    const blockRef = useRef(true);
    useLeaveWarning(blockRef);

    //useRestoreGameState();
    //usePersistGameState();

    return (
        <Peer
            host={PeerEnv.host}
            secure={PeerEnv.secure}
            peerkey={PeerEnv.peerkey}
            port={PeerEnv.port}
            code={`reward-${ID}`}
        >
            <ViewHandler />
            <GameScaleProvider>
                <div className={style.teacher}>
                    <div className={style.serverProtocolContainer}>
                        <ServerProtocol />
                    </div>
                    <StartDialog code={ID} />
                    <Guidance />
                    <Settings mode="teacher" />
                    <TeacherContent />
                    <Footer hideLang={false} />
                </div>
            </GameScaleProvider>
        </Peer>
    );
}
