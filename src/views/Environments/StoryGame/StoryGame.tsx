import React, { useEffect, useMemo, useRef } from 'react';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { Actions, GameEnvironmentInfo, GenericObservation, ObservationShape, StateData } from '../../../types';
import WorldComponent from '../../World/WorldComponent';
import style from './style.module.css';
import {
    getLargeOffset,
    getDefaultObservation,
    getAgentSounds,
    smallOffset,
} from '../../../components/GameComponents/agentProps';
import { useSound } from '../../../hooks/useSound';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { AgentSettingsAtom, GameControlAtom, ResetUiPulseAtom, UpdateWorldPulseAtom } from '../../../atoms/state';
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
} from '../../../atoms/gameState';
import { useRewardFloats } from '../../../hooks/useRewardFloats';
import { ingest, onEpisodeEnd, resetAll } from '../../../components/Charts/rewardStreamEngine';
import {
    defaultEnvSettings,
    defaultEpisodicData,
    defaultTimeStepData,
    defaultWorldGrid,
} from '../../../utils/defaults';
import { GenericRLEnv } from '../Generic/environment';
import { StoryStepAtom } from '../../../atoms/uiState';
import StoryProgress from '../../../components/GameComponents/StoryProgress';
import ResizeButton from '../../../components/Buttons/ReziseButton/ResizeButton';
import AgentBridge from '../../../components/GameComponents/AgentBridge';
import { WorldStore } from '../../../components/QTable/utils';
import AgentRender from '../../../components/EnvironmentRender/AgentRender';

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
}

function StoryGame({ lWorld, agentRef, obsRef, actionRef, qvalueRef, infoRef, currentStateRef }: GenericWorldProps) {
    const worldGrid = useRef(defaultWorldGrid);
    const setChart = useSetAtom(ChartAtom);
    const setLastState = useSetAtom(StateDataAtom);
    const setStoryStep = useSetAtom(StoryStepAtom);
    const obsShape = useAtomValue<ObservationShape>(SelectedObsShapeAtom);
    const setWorldGrid = useSetAtom(WorldGridRenderAtom);
    const setUpdateWorldPulse = useSetAtom(UpdateWorldPulseAtom);
    const setStepsLeft = useSetAtom(StepsLeftAtom);

    useEffect(() => {
        // set world grid
        setWorldGrid(worldGrid.current);
    }, [setWorldGrid]);

    useEffect(() => {
        setStoryStep(0);
    }, [setStoryStep]);

    const sounds = useMemo(() => {
        // TODO: Vaihda äänilogiikka siten, että play sound kutsutaan oikealla äänellä
        return getAgentSounds('robodog');
    }, []);

    const playSound = useSound(sounds); //TODO: CHANGE TO KEY SOUND (or other)!
    const envSettings = defaultEnvSettings;
    const controls = useAtomValue(GameControlAtom);
    const resetUIpulse = useAtomValue(ResetUiPulseAtom);
    const agentSettings = useAtomValue(AgentSettingsAtom);
    //TODO: Poista uudelleenrenderöinnit console.log('StoryGame renderöi');
    const store = useStore();

    const maxTurns = envSettings?.potsAndBurglar?.env.maxTurns; //TODO: Change to use correct env settings
    const setFacing = useSetAtom(FacingAtom);
    const setEpisodicData = useSetAtom(EpisodicDataAtom);
    const setTimeStepData = useSetAtom(TimeStepDataAtom);
    const setSetRewardsPulse = useSetAtom(RewardsPulseAtom);

    const envRef = useRef<GenericRLEnv>(undefined);

    if (envRef.current === undefined) {
        new GenericRLEnv({
            world: worldGrid.current,
            maxTurns: 40,
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

    const resetUI = React.useCallback(() => {
        triggersSetRef.current = 0;
        envRef.current = new GenericRLEnv({
            world: worldGrid.current,
            maxTurns: 40,
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
        infoRef.current = { timeLeft: maxTurns ?? 0, result: 'ongoing', message: 'Game reset', trigger: false };
        const { obs } = envRef.current.reset();
        obsRef.current = obs;
        setObs(obs);
        setTimeStepData(defaultTimeStepData);
        setEpisodicData(defaultEpisodicData);
        resetAll(setChart);
    }, [
        maxTurns,
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
        setObs,
        setTimeStepData,
        setEpisodicData,
        setChart,
        setSetRewardsPulse,
        lWorld,
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
            if (action === Actions.specialAction) playSound();
            const { info, obs: nextObs, reward, terminated } = envRef.current.step(action);
            setStepsLeft(info.timeLeft);
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

            syncUI();
        }
    }, [
        store,
        syncUI,
        playSound,
        spawnFloat,
        setFacing,
        setLastState,
        setStepsLeft,
        currentStateRef,
        actionRef,
        obsRef,
        infoRef,
        agentRef,
        envRef,
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
            syncUI();
        }
    }, [store, syncUI, obsRef, agentRef, envRef, infoRef, actionRef]);

    useEffect(() => {
        if (!controls.isRunning || !controls.isFast) return;
        let running = true;

        const loop = () => {
            if (!running) return;
            stepFast();
            requestAnimationFrame(loop);
        };

        loop();
        return () => {
            running = false;
        };
    }, [controls.isFast, controls.isRunning, stepFast]);

    useEffect(() => {
        if (!controls.isRunning || controls.isFast) return;
        const id = setInterval(stepUI, STEP_INTERVAL);
        return () => clearInterval(id);
    }, [controls.isFast, controls.isRunning, stepUI]);

    useEffect(() => {
        resetUI();
    }, [resetUI]);

    const env = envRef.current;

    if (!env || !maxTurns || !infoRef.current) {
        console.warn('Missing info - env - maxTurns - inforef', env, maxTurns, infoRef.current);
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
            <StoryProgress />
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
                        <div /> {/* bottom-right */}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default StoryGame;
