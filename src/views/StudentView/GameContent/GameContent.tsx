import style from './gameContent.module.css';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { WorldStore } from '../../../components/QTable/utils';
import { Actions, GameEnvironmentInfo, GenericObservation, StateData } from '../../../types';
import RewardMachine from '../../Environments/RewardMachine/RewardMachine';
import { EpisodicDataAtom, LevelConfAtom, StepsRequiredAtom, TestAgentAtom } from '../../../atoms/gameState';
import { useEffect, useRef, useState } from 'react';
import {
    ControlEnablerAtom,
    HUDvisAtom,
    StoryProgressAtom,
    TaskAtom,
    TextStepAtom,
    TileVisibilityAtom,
    TopbarAtom,
} from '../../../atoms/uiState';
import { defaultEpisodicData, falseStoryProgress, hudVisLevels, visibleTilesTrue } from '../../../utils/defaults';
import { applyLoadedGame, fromSavedCell } from '../../../utils/import';
import LevelChangeOverlay from '../WaitOverlay/LevelChangeOverlay';

import GameProgressBridge from './GameProgressBridge';
import UIcontrolBridge from './UIcontrolBridge';
import { ActiveAgentAtom } from '../../../atoms/state';

interface GameContentProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    obsRef: React.RefObject<GenericObservation | undefined>;
    actionRef: React.RefObject<Actions | undefined>;
    qvalueRef: React.RefObject<number[]>;
    infoRef: React.RefObject<GameEnvironmentInfo | undefined>;
    lWorld: WorldStore;
    currentStateRef: React.RefObject<StateData>;
}

type Mode = 'ready' | 'loaded' | 'loading';
export default function GameContent({
    agentRef,
    obsRef,
    actionRef,
    qvalueRef,
    infoRef,
    lWorld,
    currentStateRef,
}: GameContentProps) {
    const level = useAtomValue(LevelConfAtom);
    const setTilevis = useSetAtom(TileVisibilityAtom);
    const setControls = useSetAtom(ControlEnablerAtom);
    const setTasks = useSetAtom(TaskAtom);
    const setStep = useSetAtom(TextStepAtom);
    const setTest = useSetAtom(TestAgentAtom);
    const setHudVis = useSetAtom(HUDvisAtom);
    const setProgress = useSetAtom(StoryProgressAtom);
    const setTopBar = useSetAtom(TopbarAtom);
    const setEpisodicData = useSetAtom(EpisodicDataAtom);
    const setActiveAgent = useSetAtom(ActiveAgentAtom);
    const nameRef = useRef<string>('');
    const [mode, setMode] = useState<Mode>('loading'); // Waiting for level
    const store = useStore();

    useEffect(() => {
        if (level !== undefined) {
            applyLoadedGame(store, level.level, false);
            setTilevis(visibleTilesTrue);
            setControls({ test: true, ff: true, play: true, step: true, inspect: true });
            setTasks(level.levelTasks ?? []);
            setMode('loaded');
            setTest('no');
            setEpisodicData(defaultEpisodicData);
            setHudVis(hudVisLevels);
            setTopBar((old) => {
                return {
                    ...old,
                    score: 0,
                    topScore: 0,
                    toBeat: level.level.manifest.highScore ?? 0,
                };
            });
            setProgress(falseStoryProgress);
            store.set(StepsRequiredAtom, level.level.manifest.stepsRequired ?? 0);
            nameRef.current = level.level.manifest.gameName;
        }
    }, [level, store, setHudVis, setTopBar, setEpisodicData, setProgress, setTilevis, setTasks, setControls, setTest]);

    const startLevel = () => {
        setStep(1);
        if (level) {
            setActiveAgent(level.level.agent.activeAgent);
            setMode('ready');
        } else {
            console.warn('No level selected to start!');
        }
    };

    if (mode !== 'ready')
        return (
            <div className={style.waitContainer}>
                <UIcontrolBridge />
                <LevelChangeOverlay onReady={startLevel} />
            </div>
        );

    if (mode === 'ready' && level !== undefined) {
        return (
            <>
                <UIcontrolBridge />
                <GameProgressBridge />
                <RewardMachine
                    nameRef={nameRef}
                    agentRef={agentRef}
                    obsRef={obsRef}
                    actionRef={actionRef}
                    qvalueRef={qvalueRef}
                    infoRef={infoRef}
                    lWorld={lWorld}
                    currentStateRef={currentStateRef}
                    grid={level.level.game.world.map((row) => row.map(fromSavedCell))}
                />
            </>
        );
    }
}
