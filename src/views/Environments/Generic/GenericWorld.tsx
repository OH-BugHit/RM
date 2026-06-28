/*
*** OLD TREASURE HUNTER!
import React, { useEffect, useMemo, useRef } from 'react';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { Actions, Agent, CellType, GameEnvironmentInfo, GenericObservation } from '../../../types';
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
import {
    ActiveAgentAtom,
    AgentSettingsAtom,
    EnvSettingsAtom,
    GameControlAtom,
    ResetUiPulseAtom,
} from '../../../atoms/state';
import { GenericRLEnv } from './environment';
import { motion } from 'framer-motion';
import HUD from '../../Xai/HUD';
import {
    ChartAtom,
    EpisodicDataAtom,
    FacingAtom,
    LargeObsAtom,
    SmallObsAtom,
    StateDataAtom,
    TimeStepDataAtom,
} from '../../../atoms/gameState';
import { useRewardFloats } from '../../../hooks/useRewardFloats';
import { ingest, onEpisodeEnd, resetAll } from '../../../components/Charts/rewardStreamEngine';
import { defaultEpisodicData, defaultTimeStepData } from '../../../utils/defaults';

const STEP_INTERVAL = 400; //ms
const FAST_STEPS = 5000;
const FLOAT_RING_SIZE = 32;

interface GenericWorldProps {
    envRef: React.RefObject<GenericRLEnv | undefined>;
    agentRef: React.RefObject<QLearningAgent | undefined>;
    obsRef: React.RefObject<GenericObservation | undefined>;
    actionRef: React.RefObject<Actions | undefined>;
    qvalueRef: React.RefObject<number[]>;
    infoRef: React.RefObject<GameEnvironmentInfo | undefined>;
    agent: Agent;
    worldGrid: CellType[][];
}

function GenericWorld({ worldGrid, envRef, agentRef, obsRef, actionRef, qvalueRef, infoRef }: GenericWorldProps) {
    const setChart = useSetAtom(ChartAtom);
    const setLastState = useSetAtom(StateDataAtom);
    const agent = useAtomValue(ActiveAgentAtom);
    const sounds = useMemo(() => {
        return getAgentSounds(agent.type);
    }, [agent.type]);

    const playSound = useSound(sounds); //TODO: CHANGE TO KEY SOUND (or other)!
    const envSettings = useAtomValue(EnvSettingsAtom);
    const controls = useAtomValue(GameControlAtom);
    const resetUIpulse = useAtomValue(ResetUiPulseAtom);
    const agentSettings = useAtomValue(AgentSettingsAtom);

    const store = useStore();

    const maxTurns = envSettings?.potsAndBurglar?.env.maxTurns; //TODO: Change to use correct env settings
    const setFacing = useSetAtom(FacingAtom);
    const setEpisodicData = useSetAtom(EpisodicDataAtom);
    const setTimeStepData = useSetAtom(TimeStepDataAtom);

    const triggersSetRef = useRef(0);
    const episodicRewardRef = useRef(0);
    const lastActionRef = useRef(Actions.stay);
    const lastEpisodeRewardRef = useRef(0);
    const defaultObs = useMemo(() => {
        return getDefaultObservation(agent.observationShape);
    }, [agent.observationShape]);

    const obsAtom = agent.observationShape === 'large' ? LargeObsAtom : SmallObsAtom;
    const setObs = useSetAtom(obsAtom);

    const { items: floatItems, spawnFloat, deactivate } = useRewardFloats({ size: FLOAT_RING_SIZE });

    const winsRef = useRef(0);
    const lossesRef = useRef(0);

    const resetUI = React.useCallback(() => {
        triggersSetRef.current = 0;

        envRef.current = new GenericRLEnv({
            world: worldGrid,
            maxTurns: 40,
            agentObsOffset: agent.type === 'robodog' ? smallOffset : getLargeOffset(), // TODO:Create more observation shapes on-demand
            delay1: envSettings.treasureHunter.env.propReloadDelay1,
            win: envSettings.treasureHunter.reward.win,
            lose: envSettings.treasureHunter.reward.win,
            reward1: envSettings.treasureHunter.reward.reward1,
            reward2: envSettings.treasureHunter.reward.reward2,
            reward3: envSettings.treasureHunter.reward.reward3,
            reward4: envSettings.treasureHunter.reward.reward4,
            reward5: envSettings.treasureHunter.reward.reward5,
            reward6: envSettings.treasureHunter.reward.reward6,
            abilitySuccessReward: envSettings.treasureHunter.reward.abilitySuccessReward,
            abilityFailureReward: envSettings.treasureHunter.reward.abilityFailureReward,
            trap1: envSettings.treasureHunter.reward.trap1,
            trapLethal: envSettings.treasureHunter.env.lethalProps,
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
        envSettings,
        worldGrid,
        store,
        actionRef,
        envRef,
        infoRef,
        agentRef,
        obsRef,
        qvalueRef,
        defaultObs,
        agent.type,
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

    
     //Syncrhonises UI, when fast forwarding, this is called with frequence
     
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
        }
    }, [agentRef, obsRef, qvalueRef, setObs, setTimeStepData, setEpisodicData]);

    const stepUI = React.useCallback(() => {
        if (obsRef.current && agentRef.current && obsRef.current && envRef.current) {
            const prev = envRef.current.position; // For facing
            const currentObs = obsRef.current;
            const action = agentRef.current.chooseAction(currentObs);
            actionRef.current = action;
            if (action === Actions.specialAction) playSound();
            const { info, obs: nextObs, reward, terminated } = envRef.current.step(action);
            infoRef.current = info;
            agentRef.current.update(currentObs, action, reward, nextObs);
            triggersSetRef.current += info.stepToTrap ? 1 : 0;

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
    }, [syncUI, playSound, spawnFloat, setFacing, setLastState, actionRef, obsRef, infoRef, agentRef, envRef]);

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
                triggersSetRef.current += info.stepToTrap ? 1 : 0;

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
            <HUD
                agentRef={agentRef}
                qvalueRef={qvalueRef}
            />
            {envRef.current && (
                <div className={style.worldContainer}>
                    <WorldComponent
                        worldGrid={worldGrid}
                        agentType={agent.type}
                        agentLocation={envRef.current?.position}
                        floatItems={floatItems}
                        deactivate={deactivate}
                    />
                </div>
            )}
        </motion.div>
    );
}

export default GenericWorld;
*/
