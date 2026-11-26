import { RefObject, useEffect, useMemo, useRef } from 'react';
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
import { useSetAtom, useStore } from 'jotai';
import { ControlEnablerAtom, HUDvisAtom, TileVisibilityAtom } from '../../atoms/uiState';
import { SpawnCountAtom, WorldGridRenderAtom } from '../../atoms/gameState';
import { createSave } from '../../utils/export';
import { LevelData } from '../../utils/types';
import { usernameAtom } from '../../atoms/state';

interface BuildViewProps {
    doSendEnvironment?: ((data: LevelData) => void) | undefined;
    envStateRef?: RefObject<string | null>;
}

export default function BuildView({ doSendEnvironment = undefined, envStateRef = undefined }: BuildViewProps) {
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
    const setWorld = useSetAtom(WorldGridRenderAtom);
    const setSpawnCount = useSetAtom(SpawnCountAtom);

    const store = useStore();

    const config = { image: '/images/background/backgroundSVGanimate.svg' };

    useEffect(() => {
        if (envStateRef && envStateRef?.current !== null) {
            setWorld(JSON.parse(envStateRef?.current));
        }
    });

    useEffect(() => {
        setHudVis(hudVisBuild);
        setTileVis(visibleTilesTrue);
        setSpawnCount(1);
        setControls({ trash: true, test: true, play: true, step: true, ff: true, inspect: false });
    }, [setHudVis, setTileVis, setControls, setSpawnCount]);

    useEffect(() => {
        let cancelled = false;
        if (doSendEnvironment && envStateRef) {
            const checkEnvironment = async () => {
                while (!cancelled) {
                    await new Promise((resolve) => setTimeout(resolve, 1_000));
                    if (cancelled) return;
                    const currentEnv = store.get(WorldGridRenderAtom);
                    const currentState = JSON.stringify(currentEnv);
                    if (currentState === envStateRef.current) {
                        continue;
                    }
                    envStateRef.current = currentState;
                    const username = store.get(usernameAtom);

                    // Create ZIP file to send
                    const { blob } = await createSave(store, username);
                    if (cancelled) return;
                    const zipBlob = await blob;
                    if (cancelled) return;

                    doSendEnvironment?.({ file: zipBlob, studentId: username });
                }
            };
            checkEnvironment();
        }

        return () => {
            cancelled = true;
        };
    }, [store, doSendEnvironment, envStateRef]);

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
