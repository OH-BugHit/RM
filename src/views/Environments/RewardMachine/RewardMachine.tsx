import React, { useEffect, useMemo, useRef } from 'react';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { Actions, Cell, GameEnvironmentInfo, GenericObservation, ObservationShape, StateData } from '../../../types';
import WorldComponent from '../../World/WorldComponent';
import style from './style.module.css';
import { getLargeOffset, getDefaultObservation, smallOffset } from '../../../components/GameComponents/agentProps';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import {
    AgentSettingsAtom,
    GameControlAtom,
    ResetUiPulseAtom,
    studentResultsAtom,
    UpdateWorldPulseAtom,
} from '../../../atoms/state';
import { motion } from 'framer-motion';
import {
    ChartAtom,
    EpisodicDataAtom,
    FacingAtom,
    LargeObsAtom,
    SelectedObsShapeAtom,
    RewardsPulseAtom,
    SmallObsAtom,
    StateDataAtom,
    TimeStepDataAtom,
    WorldGridRenderAtom,
    MoveQmapAtom,
    StepsLeftAtom,
    EnvSettingsAtom,
    FireWorksPulseAtom,
    TestWinAtom,
} from '../../../atoms/gameState';
import { useRewardFloats } from '../../../hooks/useRewardFloats';
import { ingest, onEpisodeEnd, resetAll } from '../../../components/Charts/rewardStreamEngine';
import { defaultEpisodicData, defaultTimeStepData } from '../../../utils/defaults';
import { GenericRLEnv } from '../Generic/environment';
import ResizeButton from '../../../components/Buttons/ReziseButton/ResizeButton';
import AgentBridge from '../../../components/GameComponents/AgentBridge';
import { WorldStore } from '../../../components/QTable/utils';
import AgentRender from '../../../components/EnvironmentRender/AgentRender';
import { AgentRenderPulseAtom, TopbarAtom } from '../../../atoms/uiState';

const STEP_INTERVAL = 400; //ms
const FAST_STEPS = 5000;
const FLOAT_RING_SIZE = 32;

interface GenericWorldProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    obsRef: React.RefObject<GenericObservation | undefined>;
    actionRef: React.RefObject<Actions | undefined>;
    qvalueRef: React.RefObject<number[]>;
    infoRef: React.RefObject<GameEnvironmentInfo | undefined>;
    lWorld: WorldStore;
    currentStateRef: React.RefObject<StateData>;
    grid: Cell[][];
    nameRef?: React.RefObject<string> | undefined;
}

function RewardMachine({
    lWorld,
    agentRef,
    obsRef,
    actionRef,
    qvalueRef,
    infoRef,
    currentStateRef,
    grid,
    nameRef = undefined,
}: GenericWorldProps) {
    const store = useStore();
    const worldGrid = useRef(grid);
    const setChart = useSetAtom(ChartAtom);
    const setLastState = useSetAtom(StateDataAtom);
    const setRerenderAgent = useSetAtom(AgentRenderPulseAtom);
    const obsShape = useAtomValue<ObservationShape>(SelectedObsShapeAtom);
    const setWorldGrid = useSetAtom(WorldGridRenderAtom);
    const setUpdateWorldPulse = useSetAtom(UpdateWorldPulseAtom);
    const setStepsLeft = useSetAtom(StepsLeftAtom);
    const setTopBar = useSetAtom(TopbarAtom);
    const setFireworks = useSetAtom(FireWorksPulseAtom);
    const setTestWin = useSetAtom(TestWinAtom);
    const setStudentScore = useSetAtom(studentResultsAtom);

    //TODO: Testaa tarvitaanko tää. Tää nimittäin varmaan päivittää sen gridin. Eli tee muutos et jokin muu päivittää
    useEffect(() => {
        // set world grid
        setWorldGrid(worldGrid.current);
    }, [setWorldGrid]);

    const envSettings = useAtomValue(EnvSettingsAtom);
    const controls = useAtomValue(GameControlAtom);
    const resetUIpulse = useAtomValue(ResetUiPulseAtom);
    const agentSettings = useAtomValue(AgentSettingsAtom);
    //TODO: Poista uudelleenrenderöinnit console.log('StoryGame renderöi');

    const setFacing = useSetAtom(FacingAtom);
    const setEpisodicData = useSetAtom(EpisodicDataAtom);
    const setTimeStepData = useSetAtom(TimeStepDataAtom);
    const setSetRewardsPulse = useSetAtom(RewardsPulseAtom);

    const envRef = useRef<GenericRLEnv>(undefined);

    if (envRef.current === undefined) {
        new GenericRLEnv({
            world: worldGrid.current,
            maxTurns: envSettings.generic.env.maxTurns,
            agentObsOffset: obsShape === 'small' ? smallOffset : getLargeOffset(),
            delay1: envSettings.generic.env.propReloadDelay1,
            rewardStep: envSettings.generic.reward.endByTrigger,
            triggerIsWin: true,
            reward1: envSettings.generic.reward.reward1,
            reward2: envSettings.generic.reward.reward2,
            rPickObject: envSettings.generic.reward.rPickObject,
            rTrap: envSettings.generic.reward.rTrap,
            rUseObject: envSettings.generic.reward.rUseObject,
            abilitySuccessReward: envSettings.generic.reward.abilitySuccessReward,
            abilityFailureReward: envSettings.generic.reward.abilityFailureReward,
            endByTrigger: envSettings.generic.reward.endByTrigger,
            rLoseByTimeEnds: envSettings.generic.reward.rLoseByTimeEnds,
            winByCount: envSettings.generic.reward.winByCount,
        });
    }
    const triggersSetRef = useRef(0);
    const episodicRewardRef = useRef(0);
    const lastActionRef = useRef(Actions.stay);
    const lastEpisodeRewardRef = useRef(0);
    const defaultObs = useMemo(() => {
        return getDefaultObservation(obsShape);
    }, [obsShape]);

    const obsAtom = obsShape === 'large' ? LargeObsAtom : SmallObsAtom;
    const setObs = useSetAtom(obsAtom);

    const { items: floatItems, spawnFloat, deactivate } = useRewardFloats({ size: FLOAT_RING_SIZE });

    const winsRef = useRef(0);
    const lossesRef = useRef(0);

    /**
     * Resets environment. Agent starts with new q-table and environment is reset.
     */
    const resetUI = React.useCallback(() => {
        triggersSetRef.current = 0;
        envRef.current = new GenericRLEnv({
            world: worldGrid.current,
            maxTurns: envSettings.generic.env.maxTurns,
            triggerIsWin: true,
            agentObsOffset: obsShape === 'small' ? smallOffset : getLargeOffset(),
        });

        obsRef.current = defaultObs;
        const agentSettingsData = store.get(AgentSettingsAtom);
        agentRef.current = new QLearningAgent({
            alpha: agentSettingsData.alpha,
            gamma: agentSettingsData.gamma,
            epsilon: agentSettingsData.epsilon,
            lWorld: lWorld,
        });
        setSetRewardsPulse((prev) => !prev);
        actionRef.current = undefined;
        qvalueRef.current = [];
        winsRef.current = 0;
        lossesRef.current = 0;
        episodicRewardRef.current = 0;
        lastEpisodeRewardRef.current = 0;
        infoRef.current = {
            timeLeft: envSettings?.generic?.env.maxTurns ?? 0,
            result: 'ongoing',
            message: 'Game reset',
            trigger: false,
        };
        const { obs } = envRef.current.reset();
        obsRef.current = obs;
        setTopBar((old) => {
            return {
                ...old,
                score: 0,
                traps: 0,
                treasures: 0,
                bigTreasures: 0,
            };
        });
        setObs(obs);
        setTimeStepData(defaultTimeStepData);
        setEpisodicData(defaultEpisodicData);
        resetAll(setChart);
    }, [
        store,
        actionRef,
        envRef,
        infoRef,
        agentRef,
        obsRef,
        qvalueRef,
        defaultObs,
        obsShape,
        worldGrid,
        setTopBar,
        setObs,
        setTimeStepData,
        setEpisodicData,
        setChart,
        setSetRewardsPulse,
        lWorld,
        envSettings.generic.env.maxTurns,
    ]);

    useEffect(() => {
        if (agentRef.current) {
            agentRef.current.alpha = agentSettings.alpha;
            agentRef.current.gamma = agentSettings.gamma;
            agentRef.current.epsilon = agentSettings.epsilon;
            agentRef.current.learning = agentSettings.learning;
        }
    }, [agentSettings, agentRef]);

    useEffect(() => {
        resetUI();
        console.log('UI reset pulse');
    }, [resetUIpulse, resetUI]);

    /**
     * Syncrhonises UI, when fast forwarding, this is called with frequence
     */
    const syncUI = React.useCallback(() => {
        if (obsRef.current && agentRef.current && obsRef.current) {
            setObs(obsRef.current);
            setTimeStepData({ lastReward: episodicRewardRef.current, lastAction: lastActionRef.current });
            setEpisodicData({
                triggered: triggersSetRef.current,
                wins: winsRef.current,
                losses: lossesRef.current,
                fullEpisodeReward: lastEpisodeRewardRef.current,
            });

            qvalueRef.current = agentRef.current.getQValues(obsRef.current);
            setUpdateWorldPulse((old) => !old);
        }
    }, [agentRef, obsRef, qvalueRef, setObs, setTimeStepData, setEpisodicData, setUpdateWorldPulse]);

    const stepUI = React.useCallback(() => {
        if (obsRef.current && agentRef.current && obsRef.current && envRef.current) {
            const prev = envRef.current.position; // For facing
            const currentObs = obsRef.current;
            const action = agentRef.current.chooseAction(currentObs);
            actionRef.current = action;
            if (action === Actions.specialAction) console.log('Special action.');
            const { info, obs: nextObs, reward, terminated } = envRef.current.step(action);
            setStepsLeft(info.timeLeft);
            if (info.object !== null) {
                switch (info.object) {
                    case 'trap': {
                        setTopBar((old) => {
                            return {
                                ...old,
                                traps: old.traps + 1,
                                score: old.score - 1,
                            };
                        });
                        break;
                    }
                    case 'treasure': {
                        setTopBar((old) => {
                            return {
                                ...old,
                                treasures: old.treasures + 1,
                                score: old.score + 1,
                            };
                        });
                        break;
                    }
                    case 'bigTreasure': {
                        setTopBar((old) => {
                            return {
                                ...old,
                                bigTreasures: old.bigTreasures + 1,
                                score: old.score + 2,
                            };
                        });
                        break;
                    }
                }
            }
            infoRef.current = info;
            agentRef.current.update(currentObs, action, reward, nextObs, terminated, store.get(MoveQmapAtom));
            triggersSetRef.current += info.reachedEndStateProp ? 1 : 0;

            episodicRewardRef.current += reward;
            lastActionRef.current = action;
            const currentState = agentRef.current?.getStateKey(nextObs);
            setLastState((old) => {
                currentStateRef.current = { previous: old.current, current: currentState }; // Set current and old state also to this ref to pass it for Q-table
                return {
                    previous: old.current,
                    current: currentState,
                };
            });

            spawnFloat(envRef.current.position.x, envRef.current.position.y, reward);
            const dx = prev.x - envRef.current.position.x;
            if (dx !== 0) setFacing(dx > 0 ? -1 : 1);

            if (terminated) {
                let win = false;
                if (infoRef.current.result === 'win') {
                    winsRef.current++;
                    win = true;
                } else if (infoRef.current.result === 'lose') {
                    lossesRef.current++;
                    win = false;
                }
                const currentScore = store.get(TopbarAtom).score;
                if (win) {
                    const levelName = nameRef?.current;
                    if (levelName && levelName !== '') {
                        const oldSavedScore = store.get(studentResultsAtom).data.get(levelName)?.score;

                        if (oldSavedScore === undefined || oldSavedScore < currentScore) {
                            setStudentScore((currentStudent) => {
                                const data = new Map(currentStudent.data);

                                data.set(levelName, {
                                    score: currentScore,
                                });

                                return {
                                    ...currentStudent,
                                    data,
                                };
                            });
                        }
                    }
                }
                setTopBar((current) => {
                    // update scores first
                    // Top bar logic, if score is higher than toBeat, then set highscore and bestscore fireworks. If score is higher than toBeat, then increment beatsScore
                    let topScore = current.topScore;
                    if (current.score > current.toBeat || current.toBeat === -1) {
                        setTestWin((old) => {
                            return {
                                ...old,
                                beatsScore: old.beatsScore + 1,
                            };
                        });
                        if (topScore < current.score && win) {
                            topScore = current.score;
                            if (topScore > current.toBeat) {
                                setFireworks({ highScore: true, bestScore: true });
                            } else {
                                setFireworks({ highScore: true, bestScore: false });
                            }
                        }
                    }
                    return {
                        ...current,
                        traps: 0,
                        treasures: 0,
                        bigTreasures: 0,
                        score: 0,
                        topScore: topScore,
                    };
                });
                lastEpisodeRewardRef.current = episodicRewardRef.current;
                // Update charts
                onEpisodeEnd();
                ingest(episodicRewardRef.current, infoRef.current.result === 'win');
                const { obs: resetObs } = envRef.current.reset();
                obsRef.current = resetObs;
                episodicRewardRef.current = 0;
                setStepsLeft(envSettings.generic.env.maxTurns);
            } else {
                obsRef.current = nextObs;
            }

            syncUI();
        }
    }, [
        store,
        setTestWin,
        syncUI,
        setFireworks,
        spawnFloat,
        setFacing,
        setLastState,
        setStepsLeft,
        setTopBar,
        setStudentScore,
        nameRef,
        currentStateRef,
        actionRef,
        obsRef,
        infoRef,
        agentRef,
        envRef,
        envSettings.generic.env.maxTurns,
    ]);

    useEffect(() => {
        stepUI();
    }, [controls.takeStep, stepUI]);

    const stepFast = React.useCallback(() => {
        if (obsRef.current && agentRef.current && obsRef.current && envRef.current) {
            for (let i = 0; i < FAST_STEPS; i++) {
                const currentObs = obsRef.current;
                const action = agentRef.current.chooseAction(currentObs);
                actionRef.current = action;
                const { info, obs: nextObs, reward, terminated } = envRef.current.step(action);
                infoRef.current = info;
                agentRef.current.update(currentObs, action, reward, nextObs, terminated, store.get(MoveQmapAtom));
                triggersSetRef.current += info.reachedEndStateProp ? 1 : 0;

                lastActionRef.current = action;
                episodicRewardRef.current += reward;

                if (terminated) {
                    if (infoRef.current.result === 'win') winsRef.current++;
                    else if (infoRef.current.result === 'lose') lossesRef.current++;
                    lastEpisodeRewardRef.current = episodicRewardRef.current;
                    // Update charts
                    onEpisodeEnd();
                    ingest(episodicRewardRef.current, infoRef.current.result === 'win');
                    const { obs: resetObs } = envRef.current.reset();
                    obsRef.current = resetObs;
                    episodicRewardRef.current = 0;
                } else {
                    obsRef.current = nextObs;
                }
            }
            setRerenderAgent((old) => {
                return {
                    mode: 'fast',
                    pulse: !old.pulse,
                };
            });
            syncUI();
        }
    }, [store, syncUI, setRerenderAgent, obsRef, agentRef, envRef, infoRef, actionRef]);

    useEffect(() => {
        if (!controls.isRunning || !controls.isFast) return;
        let running = true;
        setTopBar((old) => {
            return {
                ...old,
                traps: 0,
                treasures: 0,
                bigTreasures: 0,
                score: 0,
            };
        });
        const loop = () => {
            if (!running) return;
            stepFast();
            requestAnimationFrame(loop);
        };

        loop();
        return () => {
            setRerenderAgent((old) => {
                return {
                    mode: 'normal',
                    pulse: old.pulse,
                };
            });
            running = false;
        };
    }, [controls.isFast, setRerenderAgent, controls.isRunning, stepFast, setTopBar]);

    useEffect(() => {
        if (!controls.isRunning || controls.isFast) return;
        const id = setInterval(stepUI, STEP_INTERVAL);
        return () => clearInterval(id);
    }, [controls.isFast, controls.isRunning, stepUI]);

    useEffect(() => {
        resetUI();
    }, [resetUI]);

    const env = envRef.current;

    if (!env || !envSettings?.generic?.env.maxTurns || !infoRef.current) {
        console.warn(
            'Missing info - env - maxTurns - inforef',
            env,
            envSettings?.generic?.env.maxTurns ?? 0,
            infoRef.current
        );
        return <div>missing info</div>;
    }

    return (
        <motion.div
            key="genericWorld"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={style.container}
        >
            <AgentBridge
                envRef={envRef}
                agentRef={agentRef}
            />
            {envRef.current && (
                <div className={style.worldContainer}>
                    <div
                        style={{
                            display: 'grid',
                            width: 'fit-content',
                            height: 'fit-content',
                        }}
                    >
                        <div />
                        <ResizeButton
                            envRef={envRef}
                            side="top"
                            sx={{
                                gridColumn: 2,
                                gridRow: 1,
                                justifySelf: 'center',
                            }}
                        />
                        <div />
                        <ResizeButton
                            envRef={envRef}
                            side="left"
                            sx={{
                                gridColumn: 1,
                                gridRow: 2,
                                justifySelf: 'center',
                            }}
                        />
                        <div>
                            <AgentRender env={env} />
                            <WorldComponent
                                worldGrid={worldGrid}
                                envRef={envRef}
                                floatItems={floatItems}
                                deactivate={deactivate}
                            />
                        </div>
                        <ResizeButton
                            envRef={envRef}
                            side="right"
                            sx={{
                                gridColumn: 3,
                                gridRow: 2,
                                justifySelf: 'center',
                            }}
                        />
                        <div />
                        <ResizeButton
                            envRef={envRef}
                            side="bottom"
                            sx={{
                                gridColumn: 2,
                                gridRow: 3,
                                justifySelf: 'center',
                            }}
                        />
                        <div />
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default RewardMachine;
