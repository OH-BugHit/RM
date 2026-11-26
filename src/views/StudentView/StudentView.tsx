import { useEffect, useMemo, useRef, useState } from 'react';
import style from './style.module.css';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { Actions, GameEnvironmentInfo, GenericObservation, Level, StateData } from '../../types';
import { AnimatePresence } from 'framer-motion';
import { Bridge } from '../../components/Charts/ChartBridge';
import HUD from '../Xai/HUD';
import { WorldStore } from '../../components/QTable/utils';
import { CustomGridLayer } from '../Xai/NewQTable/TileTable/TileTable';
import GameContent from './GameContent/GameContent';
import FocusLayer from '../../components/Overlays/FocusLayer/FocusLayer';
import { Spinner } from '@genai-fi/base';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import {
    ActiveViewAtom,
    ControlEnablerAtom,
    HUDvisAtom,
    StoryProgressAtom,
    TaskAtom,
    TextStepAtom,
    TileVisibilityAtom,
    TopbarAtom,
} from '../../atoms/uiState';
import { getLevel } from '../../services/getAssets';
import { applyLoadedGame } from '../../utils/import';
import { EpisodicDataAtom, LevelConfAtom, StepsRequiredAtom, TestAgentAtom } from '../../atoms/gameState';
import { defaultEpisodicData, falseStoryProgress, hudVisLevels, visibleTilesTrue } from '../../utils/defaults';

function StudentView() {
    const agentRef = useRef<QLearningAgent>(undefined);
    const lWorld = useMemo(() => new WorldStore(agentRef), []);
    const obsRef = useRef<GenericObservation>(undefined);
    const actionRef = useRef<Actions>(undefined);
    const qvalueRef = useRef<number[]>([]);
    const infoRef = useRef<GameEnvironmentInfo>(undefined);
    const mapRef = useRef<L.Map | null>(null);
    const layerRef = useRef<CustomGridLayer | null>(null);
    const currentStateRef = useRef<StateData>({ previous: '', current: '' });
    const view = useAtomValue(ActiveViewAtom);
    const store = useStore();
    const [level, setLevel] = useState<Level | null>(null);
    const setTilevis = useSetAtom(TileVisibilityAtom);
    const setControls = useSetAtom(ControlEnablerAtom);
    const setTasks = useSetAtom(TaskAtom);
    const setTest = useSetAtom(TestAgentAtom);
    const setHudVis = useSetAtom(HUDvisAtom);
    const setProgress = useSetAtom(StoryProgressAtom);
    const setTopBar = useSetAtom(TopbarAtom);
    const setEpisodicData = useSetAtom(EpisodicDataAtom);
    const setLevelAtom = useSetAtom(LevelConfAtom);
    const levelIDref = useRef<string>('');
    const [loadError, setLoadError] = useState(false);
    const setStep = useSetAtom(TextStepAtom);

    useEffect(() => {
        let cancelled = false;
        setLevel(null);
        setLoadError(false);

        const loadLevel = async () => {
            try {
                const loadedLevel = await getLevel(view.level);
                if (cancelled) return;

                applyLoadedGame(store, loadedLevel.level, false);
                setTilevis(visibleTilesTrue);
                setControls({ trash: true, test: true, ff: true, play: true, step: true, inspect: true });
                setTasks(loadedLevel.levelTasks ?? []);
                setTest('no');
                setEpisodicData(defaultEpisodicData);
                setHudVis(hudVisLevels);
                setTopBar((old) => ({
                    ...old,
                    score: 0,
                    topScore: 0,
                    toBeat: loadedLevel.level.manifest.highScore ?? 0,
                }));
                setProgress(falseStoryProgress);
                store.set(StepsRequiredAtom, loadedLevel.level.manifest.stepsRequired ?? 0);
                levelIDref.current = loadedLevel.level.manifest.levelID;
                setLevel(loadedLevel);
                setLevelAtom(loadedLevel);
                setStep(0);
            } catch (error) {
                if (cancelled) return;

                console.error('Failed to load student level:', error);
                setLoadError(true);
            }
        };

        void loadLevel();
        return () => {
            cancelled = true;
        };
    }, [
        view.level,
        store,
        setTilevis,
        setControls,
        setTasks,
        setTest,
        setEpisodicData,
        setHudVis,
        setTopBar,
        setProgress,
        setLevelAtom,
        setStep,
    ]);

    const config = { image: '/images/background/backgroundSVGanimate.svg' };

    return (
        <>
            <div
                className={style.gameView}
                style={{ ['--background-image']: `url(${config.image})` } as React.CSSProperties}
            >
                <FocusLayer />
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
                                {level ? (
                                    <GameContent
                                        agentRef={agentRef}
                                        obsRef={obsRef}
                                        actionRef={actionRef}
                                        qvalueRef={qvalueRef}
                                        infoRef={infoRef}
                                        lWorld={lWorld}
                                        currentStateRef={currentStateRef}
                                        levelIDref={levelIDref}
                                        level={level}
                                    />
                                ) : loadError ? (
                                    <div role="alert">Failed to load level.</div>
                                ) : (
                                    <Spinner />
                                )}
                            </div>
                        </div>
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}

export default StudentView;
