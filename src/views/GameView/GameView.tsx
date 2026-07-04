import { useMemo, useRef } from 'react';
import PotsAndBurglarGame from '../Environments/PotsAndBurglar/PotsAndBurglarGame';
import style from './style.module.css';
import { RLGridEnv } from '../Environments/PotsAndBurglar/environment';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { Actions, GameEnvironmentInfo, GenericObservation } from '../../types';
import { useAtomValue } from 'jotai';
import { ActiveEnvironmentAtom } from '../../atoms/state';
import { AnimatePresence } from 'framer-motion';
import { Bridge } from '../../components/Charts/ChartBridge';
import StoryGame from '../Environments/StoryGame/StoryGame';
import HUD from '../Xai/HUD';
import SidePanelWrapper from '../SidePanel/SidePanelWrapper';
import { WorldStore } from '../../components/QTable/utils';

// React component
function GameView() {
    const environment = useAtomValue(ActiveEnvironmentAtom);
    const lWorld = useMemo(() => new WorldStore(), []);
    const envRef = useRef<RLGridEnv>(undefined);
    const agentRef = useRef<QLearningAgent>(undefined);
    const obsRef = useRef<GenericObservation>(undefined);
    const actionRef = useRef<Actions>(undefined);
    const qvalueRef = useRef<number[]>([]);
    const infoRef = useRef<GameEnvironmentInfo>(undefined);
    const mapRef = useRef<L.Map | null>(null);
    const layerRef = useRef<L.GridLayer | null>(null);
    const currentStateRef = useRef<string>('');

    const config = { image: '/images/background/background.png' }; //TODO: Change to get background image from somewher

    //TODO: Set settings when game is selected now they are here:

    const gameContent = () => {
        switch (environment.type) {
            case 'potsAndBurglar': {
                return (
                    <AnimatePresence mode="wait">
                        <HUD
                            agentRef={agentRef}
                            lWorld={lWorld}
                            mapRef={mapRef}
                            layerRef={layerRef}
                            currentStateRef={currentStateRef}
                        />
                        <div className={style.game}>
                            <PotsAndBurglarGame
                                envRef={envRef}
                                agentRef={agentRef}
                                obsRef={obsRef}
                                actionRef={actionRef}
                                qvalueRef={qvalueRef}
                                infoRef={infoRef}
                                currentStateRef={currentStateRef}
                                lWorld={lWorld}
                            />
                        </div>
                    </AnimatePresence>
                );
            }
            case 'created': {
                return (
                    <AnimatePresence mode="wait">
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                            }}
                        >
                            <HUD
                                agentRef={agentRef}
                                lWorld={lWorld}
                                mapRef={mapRef}
                                layerRef={layerRef}
                                currentStateRef={currentStateRef}
                            />
                            <div className={style.game}>
                                <StoryGame
                                    agentRef={agentRef}
                                    obsRef={obsRef}
                                    actionRef={actionRef}
                                    qvalueRef={qvalueRef}
                                    infoRef={infoRef}
                                    lWorld={lWorld}
                                    currentStateRef={currentStateRef}
                                />
                            </div>
                        </div>
                    </AnimatePresence>
                );
            }
            default: {
                return null;
            }
        }
    };

    return (
        <>
            <div
                className={style.gameView}
                style={{ ['--background-image']: `url(${config.image})` } as React.CSSProperties}
            >
                <Bridge />
                <div className={style.containerBox}>{gameContent()}</div>
                <SidePanelWrapper />
            </div>
        </>
    );
}

export default GameView;
