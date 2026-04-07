import React, { useEffect, useRef, useState } from 'react';
import { QLearningAgent } from './rlAgentQ';
import { RLGridEnv } from './environment';
import { Actions, BanditPosition, DogInfo, Observation } from '../../types';
import style from './style.module.css';
import { useSound } from '../../hooks/useSound';
import { useAtomValue } from 'jotai';
import {
    AgentSettingsAtom,
    EnvSettingsAtom,
    GameControlAtom,
    ResetUiPulseAtom,
    RewardSettingsAtom,
} from '../../atoms/state';
import QTable from './QTable/QTable';
import { stringifyAction } from '../../utils/common';
import DrawObservation from '../Observation/DrawObservation';

const STEP_INTERVAL = 400; // ms
const FAST_STEPS = 5000;

// React component
interface RoboDogGameProps {
    envRef: React.RefObject<RLGridEnv | undefined>;
    agentRef: React.RefObject<QLearningAgent | undefined>;
    obsRef: React.RefObject<Observation | undefined>;
    actionRef: React.RefObject<Actions | undefined>;
    qvalueRef: React.RefObject<number[]>;
    infoRef: React.RefObject<DogInfo | undefined>;
}

function RoboDogGame({ envRef, agentRef, obsRef, actionRef, qvalueRef, infoRef }: RoboDogGameProps) {
    const playBark = useSound('/bark.mp3');
    const envSettings = useAtomValue(EnvSettingsAtom);
    const rewardSettings = useAtomValue(RewardSettingsAtom);
    const agentSettings = useAtomValue(AgentSettingsAtom);
    const controls = useAtomValue(GameControlAtom);
    const resetUIpulse = useAtomValue(ResetUiPulseAtom);

    const gridSize = envSettings?.settings?.gridSize;
    const maxTurns = envSettings?.settings?.maxTurns;
    const numberOfPots = envSettings?.settings?.numberOfPots;
    const potReloadDelay = envSettings?.settings?.potReloadDelay;
    const breakPotSpooksBurglar = envSettings?.settings?.breakPotSpooksBurglar;

    const spookedBurglarReward = rewardSettings?.settings?.spookedBurglarReward; //10
    const brokePotReward = rewardSettings?.settings?.brokePotReward; // -1
    const barkSuccessReward = rewardSettings?.settings?.barkSuccessReward; //10
    const barkFailReward = rewardSettings?.settings?.barkFailReward; //-1
    const burglarWonReward = rewardSettings?.settings?.burglarWonReward; //-10

    const [potsBroken, setPotsBroken] = useState(0);
    const potsBrokenRef = useRef(0);
    const episodicRewardRef = useRef(0);
    const lastEpisodeRewardRef = useRef(0);

    const [obs, setObs] = useState<Observation>({ neighbors: [0, 0, 0, 0], bandit: 4 });

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
        });

        obsRef.current = { neighbors: [0, 0, 0, 0], bandit: 4 };
        agentRef.current = new QLearningAgent({
            alpha: agentSettings.alpha,
            gamma: agentSettings.gamma,
            epsilon: agentSettings.epsilon,
        });

        actionRef.current = undefined;
        qvalueRef.current = [];
        winsRef.current = 0;
        lossesRef.current = 0;
        episodicRewardRef.current = 0;
        lastEpisodeRewardRef.current = 0;
        infoRef.current = { timeLeft: maxTurns ?? 0, result: 'ongoing', message: 'Game reset' };

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
        agentSettings,
        actionRef,
        envRef,
        infoRef,
        agentRef,
        obsRef,
        qvalueRef,
    ]);

    useEffect(() => {
        resetUI();
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
            if (action === Actions.bark) playBark();
            const { info, obs: nextObs, reward, terminated } = envRef.current.step(action);
            infoRef.current = info;
            agentRef.current.update(currentObs, action, reward, nextObs);
            potsBrokenRef.current += info.brokePot ? 1 : 0;

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
                potsBrokenRef.current += info.brokePot ? 1 : 0;

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
                    States explored:{' '}
                    {!controls.isRunning && agentRef.current
                        ? ((agentRef.current.getTableSize() / ((3 ** 4 - 17) * 5)) * 100).toFixed(0) // TODO: Figure out good way to count this.. Maybe use enumerator for like "robodog" returns some multipliers and we have observation complexity here already?
                        : '-'}
                    %
                    <br />
                    Total number of different states: {(3 ** 4 - 17) * 5}{' '}
                    {/* 17 impossible states as minimum grid is 2x2 */}
                </div>
                <QTable
                    agent={agentRef}
                    disabled={controls.isFast}
                    scrollToState={agentRef.current?.getStateKey(obs)}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                {agentRef.current && (
                    <>
                        <DrawObservation
                            state={agentRef.current?.getStateKey(obs)}
                            disabled={controls.isFast}
                            actionValues={qvalueRef.current}
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
                            src="/burglar2.png"
                            width={60}
                            style={{ opacity: obs.bandit === BanditPosition.North ? 1 : 0 }}
                        />
                    </div>
                    <div />

                    {/* MIDDLE */}
                    <div>
                        <img
                            src="/burglar2.png"
                            width={60}
                            style={{ opacity: obs.bandit === BanditPosition.West ? 1 : 0 }}
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
                                let onSight = false;

                                if (env.dog.x === x + 1 && env.dog.y === y) onSight = true;
                                else if (env.dog.x === x - 1 && env.dog.y === y) onSight = true;
                                else if (env.dog.x === x && env.dog.y === y + 1) onSight = true;
                                else if (env.dog.x === x && env.dog.y === y - 1) onSight = true;

                                if (env.dog.x === x && env.dog.y === y) bg = 'blue';
                                else if (env.flower_pots.find((r) => r.intact && r.x === x && r.y === y)) bg = 'green';
                                else if (env.flower_pots.find((r) => !r.intact && r.x === x && r.y === y)) bg = 'brown';

                                if (bg === 'brown')
                                    return (
                                        <img
                                            key={`${x}-${y}`}
                                            src="pot_broken.png"
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
                                            src="pot_intact.png"
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
                                            src="robo_dog.png"
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
                            src="/burglar.png"
                            width={60}
                            style={{ opacity: obs.bandit === BanditPosition.East ? 1 : 0 }}
                        />
                    </div>

                    {/* BOTTOM */}
                    <div />
                    <div>
                        <img
                            src="/burglar.png"
                            width={60}
                            style={{ opacity: obs.bandit === BanditPosition.South ? 1 : 0 }}
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

export default RoboDogGame;
