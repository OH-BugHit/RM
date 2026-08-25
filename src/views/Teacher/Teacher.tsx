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
            <div className={style.teacher}>
                <div className={style.serverProtocolContainer}>
                    <ServerProtocol />
                </div>
                <StartDialog code={ID} />
                <Guidance />
                {/*<Settings />*/}
                <TeacherContent />
                <Footer hideLang={false} />
            </div>
        </Peer>
    );
}
