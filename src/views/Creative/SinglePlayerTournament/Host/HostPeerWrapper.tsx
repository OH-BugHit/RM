import style from './host.module.css';
import { Peer } from '@genai-fi/base/hooks/peer';
import PeerEnv from '../../../../env';
import { useLeaveWarning } from '../../../../hooks/useLeaveBlocker';
import { useRef } from 'react';
import ViewHandler from '../../../../components/ViewHandler';
import { GameScaleProvider } from '../../../../context/GameScale/GameScaleProvied';
import Settings from '../../../Settings/Settings';
import Footer from '../../../Footer/Footer';
import StartDialog from '../../../Teacher/StartDialog/StartDialog';
import HostContent from './HostContent';
import HostProtocol from '../../../../services/HostProtocol';
import Guidance from '../../../Teacher/SidePanel/Guidance';

export default function HostPeerWrapper({ ID }: { ID: string }) {
    const blockRef = useRef(true);
    useLeaveWarning(blockRef);

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
                    <HostProtocol>
                        <div className={style.serverProtocolContainer}></div>
                        <StartDialog code={ID} />
                        <Guidance single />
                        <Settings mode="teacher" />
                        <HostContent />
                        <Footer hideLang={false} />
                    </HostProtocol>
                </div>
            </GameScaleProvider>
        </Peer>
    );
}
