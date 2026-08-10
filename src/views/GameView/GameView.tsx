import { useMemo, useRef } from 'react';
import PotsAndBurglarGame from '../Environments/PotsAndBurglar/PotsAndBurglarGame';
import style from './style.module.css';
import { RLGridEnv } from '../Environments/PotsAndBurglar/environment';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { Actions, GameEnvironmentInfo, GenericObservation, StateData } from '../../types';
import { useAtomValue } from 'jotai';
import { ActiveEnvironmentAtom } from '../../atoms/state';
import { AnimatePresence } from 'framer-motion';
import { Bridge } from '../../components/Charts/ChartBridge';
import StoryGame from '../Environments/StoryGame/StoryGame';
import HUD from '../Xai/HUD';
import { WorldStore } from '../../components/QTable/utils';
import { CustomGridLayer } from '../Xai/NewQTable/TileTable/TileTable';

// React component
function GameView() {
    const environment = useAtomValue(ActiveEnvironmentAtom);
    const agentRef = useRef<QLearningAgent>(undefined);
    const lWorld = useMemo(() => new WorldStore(agentRef), []);
    const envRef = useRef<RLGridEnv>(undefined);
    const obsRef = useRef<GenericObservation>(undefined);
    const actionRef = useRef<Actions>(undefined);
    const qvalueRef = useRef<number[]>([]);
    const infoRef = useRef<GameEnvironmentInfo>(undefined);
    const mapRef = useRef<L.Map | null>(null);
    const layerRef = useRef<CustomGridLayer | null>(null);
    const currentStateRef = useRef<StateData>({ previous: '', current: '' });

    const config = { image: '/images/background/backgroundSVGanimate.svg' };

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
            default: {
                return (
                    <AnimatePresence mode="wait">
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
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
                                    mode={environment.type}
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
            </div>
        </>
    );
}

export default GameView;
