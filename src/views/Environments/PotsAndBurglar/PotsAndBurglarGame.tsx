import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { RLGridEnv } from './environment';
import { Actions, SixthSenseDirection, GameEnvironmentInfo, GenericObservation, Agent } from '../../../types';
import style from './style.module.css';
import { useSound } from '../../../hooks/useSound';
import { useStore, useAtomValue } from 'jotai';
import { AgentSettingsAtom, EnvSettingsAtom, GameControlAtom, ResetUiPulseAtom } from '../../../atoms/state';
import { stringifyAction } from '../../../utils/common';
import DrawObservation from '../../Observation/DrawObservation';
import {
    getAdventurerOffset,
    getAgentImage,
    getAgentObservationShape,
    getAgentSounds,
    robodogOffset,
} from '../../../components/GameComponents/agentProps';
import { getOnSight } from '../../../components/GameComponents/drawComponent';
import QTable from '../../QTable/QTable';
//import QCanvas from '../../QTable/QCanvas';

const STEP_INTERVAL = 400; // ms
const FAST_STEPS = 5000;

// React component
interface PotsAndBurglarGameProps {
    envRef: React.RefObject<RLGridEnv | undefined>;
    agentRef: React.RefObject<QLearningAgent | undefined>;
    obsRef: React.RefObject<GenericObservation | undefined>;
    actionRef: React.RefObject<Actions | undefined>;
    qvalueRef: React.RefObject<number[]>;
    infoRef: React.RefObject<GameEnvironmentInfo | undefined>;
    agent: Agent;
}

function PotsAndBurglarGame({
    envRef,
    agentRef,
    obsRef,
    actionRef,
    qvalueRef,
    infoRef,
    agent,
}: PotsAndBurglarGameProps) {
    const sounds = useMemo(() => {
        return getAgentSounds(agent.type);
    }, [agent.type]);

    const agentImage = getAgentImage(agent.type);
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

    const spookedBurglarReward = envSettings?.potsAndBurglar?.reward.spookedBurglarReward;
    const brokePotReward = envSettings?.potsAndBurglar?.reward.brokePotReward;
    const barkSuccessReward = envSettings?.potsAndBurglar?.reward.barkSuccessReward;
    const barkFailReward = envSettings?.potsAndBurglar?.reward.barkFailReward;
    const burglarWonReward = envSettings?.potsAndBurglar?.reward.burglarWonReward;

    const [potsBroken, setPotsBroken] = useState(0);
    const potsBrokenRef = useRef(0);
    const episodicRewardRef = useRef(0);
    const lastEpisodeRewardRef = useRef(0);
    const defaultObs = useMemo(() => {
        return getAgentObservationShape(agent.type);
    }, [agent.type]);

    const [obs, setObs] = useState<GenericObservation>(defaultObs);

    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const winsRef = useRef(0);
    const lossesRef = useRef(0);

    const [episodicReward, setEpisodicReward] = useState(0);
    const [lastEpisodeReward, setLastEpisodeReward] = useState(0);

    const resetUI = React.useCallback(() => {
        setPotsBroken(0);
        potsBrokenRef.current = 0;

        envRef.current = new RLGridEnv({
            gridSize: gridSize,
            maxTurns: maxTurns,
            numberOfPots: numberOfPots,
            potReloadDelay: potReloadDelay,
            breakPotSpooksBurglar: breakPotSpooksBurglar,
            rewards: {
                spooked: spookedBurglarReward,
                brokePot: brokePotReward,
                barkSuccess: barkSuccessReward,
                barkFail: barkFailReward,
                burglarWon: burglarWonReward,
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
        lastEpisodeRewardRef.current = 0;
        infoRef.current = { timeLeft: maxTurns ?? 0, trigger: false, result: 'ongoing', message: 'Game reset' };

        const { obs } = envRef.current.reset();
        obsRef.current = obs;
        setObs(obs);
        setEpisodicReward(0);
        setWins(0);
        setLosses(0);
        setLastEpisodeReward(0);
    }, [
        gridSize,
        maxTurns,
        numberOfPots,
        potReloadDelay,
        breakPotSpooksBurglar,
        spookedBurglarReward,
        brokePotReward,
        barkSuccessReward,
        barkFailReward,
        burglarWonReward,
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

    const syncUI = React.useCallback(() => {
        if (obsRef.current && agentRef.current && obsRef.current) {
            setObs(obsRef.current);
            setEpisodicReward(episodicRewardRef.current);
            setWins(winsRef.current);
            setLosses(lossesRef.current);
            setLastEpisodeReward(lastEpisodeRewardRef.current);

            qvalueRef.current = agentRef.current.getQValues(obsRef.current);
            setPotsBroken(potsBrokenRef.current);
        }
    }, [agentRef, obsRef, qvalueRef]);

    const stepUI = React.useCallback(() => {
        if (obsRef.current && agentRef.current && obsRef.current && envRef.current) {
            const currentObs = obsRef.current;
            const action = agentRef.current.chooseAction(currentObs);
            actionRef.current = action;
            if (action === Actions.specialAction) playBark();
            const { info, obs: nextObs, reward, terminated } = envRef.current.step(action);
            infoRef.current = info;
            agentRef.current.update(currentObs, action, reward, nextObs);
            potsBrokenRef.current += info.trigger ? 1 : 0;

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
    }, [syncUI, playBark, actionRef, obsRef, infoRef, agentRef, envRef]);

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

    if (!env || !maxTurns || !infoRef.current || !gridSize) {
        console.warn(env, maxTurns, infoRef.current, gridSize);
        return <div>missing info</div>;
    }

    return (
        <div className={style.container}>
            <div>
                <div className={style.column}>
                    <h3>Q-table</h3>
                    Different states explored:{' '}
                    {agentRef.current
                        ? agentRef.current.getTableSize() // TODO: Figure out good way to count this.. Maybe use enumerator for like "robodog" returns some multipliers and we have observation complexity here already?
                        : '-'}
                    <br />
                </div>
                <div style={{ width: '800px' }}>
                    <QTable
                        agent={agentRef}
                        disabled={controls.isFast}
                        scrollToState={agentRef.current?.getStateKey(obs)}
                        type={agent.type}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                {agentRef.current && (
                    <>
                        <DrawObservation
                            state={agentRef.current?.getStateKey(obs)}
                            disabled={controls.isFast}
                            actionValues={qvalueRef.current}
                            type={agent.type}
                        />
                        {/*<QValues qvalueRef={qvalueRef} />*/}
                    </>
                )}

                {/* Burglar visualization */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '60px auto 60px',
                        gridTemplateRows: '60px auto 60px',
                        gap: 5,
                        alignItems: 'center',
                        justifyItems: 'center',
                    }}
                >
                    {/* TOP */}
                    <div />
                    <div>
                        <img
                            src="/images/assets/burglar2.png"
                            width={60}
                            style={{ opacity: obs.POIdirection === SixthSenseDirection.North ? 1 : 0 }}
                        />
                    </div>
                    <div />

                    {/* MIDDLE */}
                    <div>
                        <img
                            src="/images/assets/burglar2.png"
                            width={60}
                            style={{ opacity: obs.POIdirection === SixthSenseDirection.West ? 1 : 0 }}
                        />
                    </div>

                    {/* GRID */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${gridSize}, 40px)`,
                        }}
                    >
                        {Array.from({ length: gridSize }).map((_, y) =>
                            Array.from({ length: gridSize }).map((_, x) => {
                                let bg = 'lightgray';
                                const onSight = getOnSight({
                                    agentPos: env.position,
                                    x: x,
                                    y: y,
                                    agentType: agent.type,
                                });

                                if (env.position.x === x && env.position.y === y) bg = 'blue';
                                else if (env.flower_pots.find((r) => r.intact && r.x === x && r.y === y)) bg = 'green';
                                else if (env.flower_pots.find((r) => !r.intact && r.x === x && r.y === y)) bg = 'brown';

                                if (bg === 'brown')
                                    return (
                                        <img
                                            key={`${x}-${y}`}
                                            src="/images/assets/pot_broken.png"
                                            width={40}
                                            style={{
                                                overflow: 'visible',
                                                width: 40,
                                                height: 40,
                                                border: '1px solid black',
                                                background: onSight ? 'white' : 'lightgrey',
                                            }}
                                        />
                                    );
                                if (bg === 'green')
                                    return (
                                        <img
                                            key={`${x}-${y}`}
                                            src="/images/assets/pot_intact.png"
                                            width={40}
                                            style={{
                                                overflow: 'visible',
                                                width: 40,
                                                height: 40,
                                                border: '1px solid black',
                                                background: onSight ? 'white' : 'lightgrey',
                                            }}
                                        />
                                    );

                                if (bg === 'blue')
                                    return (
                                        <img
                                            key={`${x}-${y}`}
                                            src={agentImage}
                                            width={40}
                                            style={{
                                                overflow: 'visible',
                                                width: 40,
                                                height: 40,
                                                border: '1px solid black',
                                                background: 'white',
                                            }}
                                        />
                                    );
                                return (
                                    <div
                                        key={`${x}-${y}`}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            border: '1px solid black',
                                            background: onSight ? 'white' : 'lightgrey',
                                        }}
                                    />
                                );
                            })
                        )}
                    </div>

                    <div>
                        <img
                            src="/images/assets/burglar.png"
                            width={60}
                            style={{ opacity: obs.POIdirection === SixthSenseDirection.East ? 1 : 0 }}
                        />
                    </div>

                    {/* BOTTOM */}
                    <div />
                    <div>
                        <img
                            src="/images/assets/burglar.png"
                            width={60}
                            style={{ opacity: obs.POIdirection === SixthSenseDirection.South ? 1 : 0 }}
                        />
                    </div>
                    <div />
                </div>
            </div>
            <div style={{ flexDirection: 'column', width: '200px' }}>
                <p>Wins: {wins}</p>
                <p>Losses: {losses}</p>
                <p>Last episode reward: {lastEpisodeReward.toFixed(1)}</p>
                <p>This episode reward: {episodicReward.toFixed(1)}</p>
                <p>Time until break in: {maxTurns - infoRef.current.timeLeft}</p>
                <p>Last action: {stringifyAction(actionRef.current ?? null)}</p>
                <p>Flower pots destroyed: {potsBroken}</p>
            </div>
        </div>
    );
}

export default PotsAndBurglarGame;
