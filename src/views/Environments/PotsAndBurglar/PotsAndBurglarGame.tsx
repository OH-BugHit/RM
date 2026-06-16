import React, { useEffect, useMemo, useRef } from 'react';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { RLGridEnv } from './environment';
import { Actions, GameEnvironmentInfo, GenericObservation } from '../../../types';
import style from './style.module.css';
import { useSound } from '../../../hooks/useSound';
import { useStore, useAtomValue, useSetAtom } from 'jotai';
import {
    ActiveAgentAtom,
    AgentSettingsAtom,
    EnvSettingsAtom,
    GameControlAtom,
    ResetUiPulseAtom,
} from '../../../atoms/state';
import {
    getAdventurerOffset,
    getAgentObservationShape,
    getAgentSounds,
    robodogOffset,
} from '../../../components/GameComponents/agentProps';
import { motion } from 'framer-motion';
import { useRewardFloats } from '../../../hooks/useRewardFloats';
import PotsAndBurglarRender from './PotsAndBurglarRender';
import {
    ChartAtom,
    EpisodicDataAtom,
    FacingAtom,
    LargeObsAtom,
    SmallObsAtom,
    StateDataAtom,
    TimeStepDataAtom,
} from '../../../atoms/gameState';
import { defaultEpisodicData, defaultTimeStepData } from '../../../utils/defaults';
import HUD from '../../Xai/HUD';
import { ingest, onEpisodeEnd, resetAll } from '../../../components/Charts/rewardStreamEngine';

const STEP_INTERVAL = 400; // ms
const FAST_STEPS = 5000;
const FLOAT_RING_SIZE = 32;

// React component
interface PotsAndBurglarGameProps {
    envRef: React.RefObject<RLGridEnv | undefined>;
    agentRef: React.RefObject<QLearningAgent | undefined>;
    obsRef: React.RefObject<GenericObservation | undefined>;
    actionRef: React.RefObject<Actions | undefined>;
    qvalueRef: React.RefObject<number[]>;
    infoRef: React.RefObject<GameEnvironmentInfo | undefined>;
}

function PotsAndBurglarGame({ envRef, agentRef, obsRef, actionRef, qvalueRef, infoRef }: PotsAndBurglarGameProps) {
    const setChart = useSetAtom(ChartAtom);
    const setLastState = useSetAtom(StateDataAtom);
    const agent = useAtomValue(ActiveAgentAtom);
    const sounds = useMemo(() => {
        return getAgentSounds(agent.type);
    }, [agent.type]);

    const playBark = useSound(sounds);
    const envSettings = useAtomValue(EnvSettingsAtom);
    const controls = useAtomValue(GameControlAtom);
    const resetUIpulse = useAtomValue(ResetUiPulseAtom);
    const agentSettings = useAtomValue(AgentSettingsAtom);

    const store = useStore();

    const gridSize = envSettings?.potsAndBurglar?.env.gridSize;
    const maxTurns = envSettings?.potsAndBurglar?.env.maxTurns;
    const numberOfPots = envSettings?.potsAndBurglar?.env.numberOfPots;
    const potReloadDelay = envSettings?.potsAndBurglar?.env.potReloadDelay;
    const breakPotSpooksBurglar = envSettings?.potsAndBurglar?.env.breakPotSpooksBurglar;

    const setFacing = useSetAtom(FacingAtom);
    const setEpisodicData = useSetAtom(EpisodicDataAtom);
    const setTimeStepData = useSetAtom(TimeStepDataAtom);

    const potsBrokenRef = useRef(0);
    const episodicRewardRef = useRef(0);
    const lastActionRef = useRef(Actions.stay);
    const lastEpisodeRewardRef = useRef(0);
    const defaultObs = useMemo(() => {
        return getAgentObservationShape(agent.observationShape);
    }, [agent.observationShape]);

    const obsAtom = agent.observationShape === 'large' ? LargeObsAtom : SmallObsAtom;
    const setObs = useSetAtom(obsAtom);

    const { items: floatItems, spawnFloat, deactivate } = useRewardFloats({ size: FLOAT_RING_SIZE });

    const winsRef = useRef(0);
    const lossesRef = useRef(0);

    const resetUI = React.useCallback(() => {
        potsBrokenRef.current = 0;

        envRef.current = new RLGridEnv({
            gridSize: gridSize,
            maxTurns: maxTurns,
            numberOfPots: numberOfPots,
            potReloadDelay: potReloadDelay,
            breakPotSpooksBurglar: breakPotSpooksBurglar,
            rewards: {
                spooked: envSettings.potsAndBurglar.reward.spookedBurglarReward,
                brokePot: envSettings?.potsAndBurglar?.reward.brokePotReward,
                barkSuccess: envSettings?.potsAndBurglar?.reward.barkSuccessReward,
                barkFail: envSettings?.potsAndBurglar?.reward.barkFailReward,
                burglarWon: envSettings?.potsAndBurglar?.reward.burglarWonReward,
            },
            agentObsOffset: agent.type === 'robodog' ? robodogOffset : getAdventurerOffset(),
        });

        obsRef.current = defaultObs;
        const agentSettingsData = store.get(AgentSettingsAtom);
        agentRef.current = new QLearningAgent({
            alpha: agentSettingsData.alpha,
            gamma: agentSettingsData.gamma,
            epsilon: agentSettingsData.epsilon,
        });

        actionRef.current = undefined;
        qvalueRef.current = [];
        winsRef.current = 0;
        lossesRef.current = 0;
        episodicRewardRef.current = 0;
        lastActionRef.current = Actions.stay;
        lastEpisodeRewardRef.current = 0;
        infoRef.current = { timeLeft: maxTurns ?? 0, trigger: false, result: 'ongoing', message: 'Game reset' };

        const { obs } = envRef.current.reset();
        obsRef.current = obs;
        setObs(obs);
        setTimeStepData(defaultTimeStepData);
        setEpisodicData(defaultEpisodicData);
        resetAll(setChart);
    }, [
        gridSize,
        maxTurns,
        numberOfPots,
        potReloadDelay,
        breakPotSpooksBurglar,
        store,
        actionRef,
        envRef,
        infoRef,
        agentRef,
        obsRef,
        qvalueRef,
        defaultObs,
        agent.type,
        envSettings,
        setObs,
        setTimeStepData,
        setEpisodicData,
        setChart,
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

    const syncUI = React.useCallback(() => {
        if (obsRef.current && agentRef.current && obsRef.current) {
            setObs(obsRef.current);
            setTimeStepData({ lastReward: episodicRewardRef.current, lastAction: lastActionRef.current });
            setEpisodicData({
                triggered: potsBrokenRef.current,
                wins: winsRef.current,
                losses: lossesRef.current,
                fullEpisodeReward: lastEpisodeRewardRef.current,
            });

            qvalueRef.current = agentRef.current.getQValues(obsRef.current);
        }
    }, [agentRef, obsRef, qvalueRef, setObs, setTimeStepData, setEpisodicData]);

    const stepUI = React.useCallback(() => {
        if (obsRef.current && agentRef.current && obsRef.current && envRef.current) {
            const prev = envRef.current.position; // For facing
            const currentObs = obsRef.current;
            const action = agentRef.current.chooseAction(currentObs);
            actionRef.current = action;
            if (action === Actions.specialAction) playBark();
            const { info, obs: nextObs, reward, terminated } = envRef.current.step(action);
            infoRef.current = info;
            agentRef.current.update(currentObs, action, reward, nextObs);
            potsBrokenRef.current += info.trigger ? 1 : 0;
            episodicRewardRef.current += reward;
            lastActionRef.current = action;
            const currentState = agentRef.current?.getStateKey(nextObs);
            setLastState((old) => {
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
    }, [syncUI, playBark, spawnFloat, setFacing, setLastState, actionRef, obsRef, infoRef, agentRef, envRef]);

    // take single step
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
                agentRef.current.update(currentObs, action, reward, nextObs);
                potsBrokenRef.current += info.trigger ? 1 : 0;

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
    }, [syncUI, obsRef, agentRef, envRef, infoRef, actionRef]);

    // Fast loop
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

    // Normal loop
    useEffect(() => {
        if (!controls.isRunning || controls.isFast) return;
        const id = setInterval(stepUI, STEP_INTERVAL);
        return () => clearInterval(id);
    }, [controls.isFast, controls.isRunning, stepUI]);

    useEffect(() => {
        resetUI();
    }, [resetUI]);

    const env = envRef.current;

    return (
        <motion.div
            key="potsAndBurglar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={style.container}
        >
            <HUD
                agentRef={agentRef}
                qvalueRef={qvalueRef}
            />
            <div className={style.gameContainer}>
                <PotsAndBurglarRender
                    gridSize={gridSize}
                    env={env}
                    floatItems={floatItems}
                    deactivate={deactivate}
                />
            </div>
        </motion.div>
    );
}

export default PotsAndBurglarGame;
