import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { Actions, Agent, CellType, GameEnvironmentInfo, GenericObservation } from '../../../types';
import WorldComponent from '../../World/WorldComponent';
import style from './style.module.css';
import {
    getAdventurerOffset,
    getAgentObservationShape,
    getAgentSounds,
    robodogOffset,
} from '../../../components/GameComponents/agentProps';
import { useSound } from '../../../hooks/useSound';
import { useAtomValue, useStore } from 'jotai';
import { AgentSettingsAtom, EnvSettingsAtom, GameControlAtom, ResetUiPulseAtom } from '../../../atoms/state';
import { GenericRLEnv } from '../TreasureHunter/environment';
import DrawObservation from '../../Observation/DrawObservation';
import { stringifyAction } from '../../../utils/common';

const STEP_INTERVAL = 400; //ms
const FAST_STEPS = 5000;

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

function GenericWorld({
    worldGrid,
    envRef,
    agentRef,
    obsRef,
    actionRef,
    qvalueRef,
    infoRef,
    agent,
}: GenericWorldProps) {
    const sounds = useMemo(() => {
        return getAgentSounds(agent.type);
    }, [agent.type]);

    const store = useStore();

    const playSound = useSound(sounds); //TODO: CHANGE TO KEY SOUND!
    const envSettings = useAtomValue(EnvSettingsAtom);
    const controls = useAtomValue(GameControlAtom);
    const resetUIpulse = useAtomValue(ResetUiPulseAtom);
    const agentSettings = useAtomValue(AgentSettingsAtom);

    // For rendering stats
    const [trapsSet, setTrapsSet] = useState(0);
    const trapsSetRef = useRef(0);
    const [episodicReward, setEpisodicReward] = useState(0);
    const episodicRewardRef = useRef(0);
    const [lastEpisodeReward, setLastEpisodeReward] = useState(0);
    const lastEpisodeRewardRef = useRef(0);
    const [wins, setWins] = useState(0);
    const winsRef = useRef(0);
    const [losses, setLosses] = useState(0);
    const lossesRef = useRef(0);

    const maxTurns = envSettings?.potsAndBurglar?.env.maxTurns;

    // Default for observation shape
    const defaultObs = useMemo(() => {
        return getAgentObservationShape(agent.type);
    }, [agent.type]);

    const [obs, setObs] = useState<GenericObservation>(defaultObs);

    const resetUI = React.useCallback(() => {
        setTrapsSet(0);
        trapsSetRef.current = 0;

        envRef.current = new GenericRLEnv({
            world: worldGrid,
            maxTurns: 40,
            agentObsOffset: agent.type === 'robodog' ? robodogOffset : getAdventurerOffset(), // TODO:Create more observation shapes on-demand
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
        setEpisodicReward(0);
        setWins(0);
        setLosses(0);
        setLastEpisodeReward(0);
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
            setEpisodicReward(episodicRewardRef.current);
            setWins(winsRef.current);
            setLosses(lossesRef.current);
            setLastEpisodeReward(lastEpisodeRewardRef.current);

            qvalueRef.current = agentRef.current.getQValues(obsRef.current);
            setTrapsSet(trapsSetRef.current);
        }
    }, [agentRef, obsRef, qvalueRef]);

    const stepUI = React.useCallback(() => {
        if (obsRef.current && agentRef.current && obsRef.current && envRef.current) {
            const currentObs = obsRef.current;
            const action = agentRef.current.chooseAction(currentObs);
            actionRef.current = action;
            if (action === Actions.specialAction) playSound();
            const { info, obs: nextObs, reward, terminated } = envRef.current.step(action);
            infoRef.current = info;
            agentRef.current.update(currentObs, action, reward, nextObs);
            trapsSetRef.current += info.stepToTrap ? 1 : 0;

            episodicRewardRef.current += reward;

            if (terminated) {
                if (infoRef.current.result === 'win') winsRef.current++;
                else if (infoRef.current.result === 'lose') lossesRef.current++;
                lastEpisodeRewardRef.current = episodicRewardRef.current;
                const { obs: resetObs } = envRef.current.reset();
                obsRef.current = resetObs;
                episodicRewardRef.current = 0;
            } else {
                obsRef.current = nextObs;
            }

            syncUI();
        }
    }, [syncUI, playSound, actionRef, obsRef, infoRef, agentRef, envRef]);

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
                trapsSetRef.current += info.stepToTrap ? 1 : 0;

                episodicRewardRef.current += reward;

                if (terminated) {
                    if (infoRef.current.result === 'win') winsRef.current++;
                    else if (infoRef.current.result === 'lose') lossesRef.current++;
                    lastEpisodeRewardRef.current = episodicRewardRef.current;
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
        console.warn(env, maxTurns, infoRef.current);
        return <div>missing info</div>;
    }

    return (
        <div className={style.container}>
            <div className={style.column}>
                <h3>Q-table</h3>
                Different states explored:{' '}
                {agentRef.current
                    ? agentRef.current.getTableSize() // TODO: Figure out good way to count this.. Maybe use enumerator for like "robodog" returns some multipliers and we have observation complexity here already?
                    : '-'}
                <br />
            </div>
            <div style={{ width: '800px' }}></div>
            {agentRef.current && (
                <>
                    <DrawObservation
                        state={agentRef.current?.getStateKey(obs)}
                        disabled={controls.isFast}
                        actionValues={qvalueRef.current}
                        type={agent.type}
                        envType="treasureHunter"
                    />
                    {/*<QValues qvalueRef={qvalueRef} />*/}
                </>
            )}
            <div />
            <div />
            {envRef.current && (
                <WorldComponent
                    worldGrid={worldGrid}
                    agentType={agent.type}
                    agentLocation={envRef.current?.position}
                />
            )}
            <div style={{ flexDirection: 'column', width: '200px' }}>
                <p>Wins: {wins}</p>
                <p>Losses: {losses}</p>
                <p>Last episode reward: {lastEpisodeReward.toFixed(1)}</p>
                <p>This episode reward: {episodicReward.toFixed(1)}</p>
                <p>Time until break in: {infoRef.current.timeLeft}</p>
                <p>Last action: {stringifyAction(actionRef.current ?? null)}</p>
                <p>Traps set: {trapsSet}</p>
            </div>
        </div>
    );
}

export default GenericWorld;
