import { RefObject, useMemo, useRef } from 'react';
import style from './style.module.css';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { Actions, GameEnvironmentInfo, GenericObservation, StateData } from '../../types';
import { useStore } from 'jotai';
import { AnimatePresence } from 'framer-motion';
import { Bridge } from '../../components/Charts/ChartBridge';
import HUD from '../Xai/HUD';
import { WorldStore } from '../../components/QTable/utils';
import { CustomGridLayer } from '../Xai/NewQTable/TileTable/TileTable';
import RewardMachine from '../Environments/RewardMachine/RewardMachine';
import { defaultWorldGrid } from '../../utils/defaults';
import { WorldGridRenderAtom } from '../../atoms/gameState';

interface GameViewProps {
    levelIDref?: RefObject<string>;
    agentRef: React.RefObject<QLearningAgent | undefined>;
}

function GameView({ agentRef, levelIDref = undefined }: GameViewProps) {
    const lWorld = useMemo(() => new WorldStore(agentRef), [agentRef]);
    const obsRef = useRef<GenericObservation>(undefined);
    const actionRef = useRef<Actions>(undefined);
    const qvalueRef = useRef<number[]>([]);
    const infoRef = useRef<GameEnvironmentInfo>(undefined);
    const mapRef = useRef<L.Map | null>(null);
    const layerRef = useRef<CustomGridLayer | null>(null);
    const currentStateRef = useRef<StateData>({ previous: '', current: '' });
    const store = useStore();

    const config = { image: '/images/background/backgroundSVGanimate.svg' };

    const gameContent = () => {
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
                        <RewardMachine
                            grid={store.get(WorldGridRenderAtom) ?? defaultWorldGrid}
                            agentRef={agentRef}
                            obsRef={obsRef}
                            actionRef={actionRef}
                            qvalueRef={qvalueRef}
                            infoRef={infoRef}
                            lWorld={lWorld}
                            currentStateRef={currentStateRef}
                            levelIDref={levelIDref}
                        />
                    </div>
                </div>
            </AnimatePresence>
        );
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
