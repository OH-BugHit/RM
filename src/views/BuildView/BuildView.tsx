import { useEffect, useMemo, useRef } from 'react';
import style from './style.module.css';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { Actions, GameEnvironmentInfo, GenericObservation, StateData } from '../../types';
import { AnimatePresence } from 'framer-motion';
import { Bridge } from '../../components/Charts/ChartBridge';
import HUD from '../Xai/HUD';
import { WorldStore } from '../../components/QTable/utils';
import { CustomGridLayer } from '../Xai/NewQTable/TileTable/TileTable';
import RewardMachine from '../Environments/RewardMachine/RewardMachine';
import { defaultWorldGrid, hudVisBuild, visibleTilesTrue } from '../../utils/defaults';
import { useSetAtom } from 'jotai';
import { ControlEnablerAtom, HUDvisAtom, TileVisibilityAtom } from '../../atoms/uiState';

// React component
export default function BuildView() {
    const setHudVis = useSetAtom(HUDvisAtom);
    const setTileVis = useSetAtom(TileVisibilityAtom);
    const setControls = useSetAtom(ControlEnablerAtom);
    const agentRef = useRef<QLearningAgent>(undefined);
    const lWorld = useMemo(() => new WorldStore(agentRef), []);
    const obsRef = useRef<GenericObservation>(undefined);
    const actionRef = useRef<Actions>(undefined);
    const qvalueRef = useRef<number[]>([]);
    const infoRef = useRef<GameEnvironmentInfo>(undefined);
    const mapRef = useRef<L.Map | null>(null);
    const layerRef = useRef<CustomGridLayer | null>(null);
    const currentStateRef = useRef<StateData>({ previous: '', current: '' });

    const config = { image: '/images/background/backgroundSVGanimate.svg' };

    useEffect(() => {
        setHudVis(hudVisBuild);
        setTileVis(visibleTilesTrue);
        setControls({ play: true, step: true, ff: true, inspect: false });
    }, [setHudVis, setTileVis, setControls]);

    return (
        <>
            <div
                className={style.gameView}
                style={{ ['--background-image']: `url(${config.image})` } as React.CSSProperties}
            >
                <Bridge />
                <div className={style.containerBox}>
                    <AnimatePresence>
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
                                    agentRef={agentRef}
                                    obsRef={obsRef}
                                    actionRef={actionRef}
                                    qvalueRef={qvalueRef}
                                    infoRef={infoRef}
                                    lWorld={lWorld}
                                    currentStateRef={currentStateRef}
                                    grid={defaultWorldGrid}
                                />
                            </div>
                        </div>
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}
