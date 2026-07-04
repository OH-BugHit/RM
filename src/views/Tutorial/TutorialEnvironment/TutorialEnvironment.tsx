import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { Actions, GameEnvironmentInfo, GenericObservation, Agent, SixthSenseDirection } from '../../../types';
import { useSound } from '../../../hooks/useSound';
import { useStore, useAtomValue, useAtom, useSetAtom } from 'jotai';
import { AgentSettingsAtom, GameControlAtom } from '../../../atoms/state';
import {
    StepsProcentageAtom,
    StepsTakenAtom,
    TutorialPhaseAtom,
    TutorialStepAtom,
    VisitedRewardsAtom,
} from '../../../atoms/tutorialState';
import {
    getAgentImage,
    getDefaultObservation,
    getAgentSounds,
    smallOffset,
} from '../../../components/GameComponents/agentProps';
import { getOnSightOrOnSpot } from '../../../components/GameComponents/drawComponent';
import { RLGridEnv } from '../../Environments/PotsAndBurglar/environment';
import TutorialControls from '../TutorialControls';
import { motion } from 'framer-motion';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useTutorialStepEffects } from '../../../hooks/useTutorialStepEffects';
import RewardFloats from '../../../components/RewardFloats.tsx/RewardFloats';
import { useRewardFloats } from '../../../hooks/useRewardFloats';
import { WorldStore } from '../../../components/QTable/utils';

const STEP_INTERVAL = 400; // ms
const FAST_STEPS = 5000;
const OBSERVATIONSTEP = 8;
const ENVIRONMENTSTEP = 10;

const FLOAT_RING_SIZE = 32;

const fadeStyle = {
    transition: 'opacity 0.4s ease, background-color 0.15s linear',
};

function TutorialEnvironment() {
    const { t } = useTranslation();
    const [visitedRewards, setVisitedRewards] = useAtom(VisitedRewardsAtom);
    const envRef = useRef<RLGridEnv>(undefined);
    const agentRef = useRef<QLearningAgent>(undefined);
    const obsRef = useRef<GenericObservation>(undefined);
    const actionRef = useRef<Actions>(undefined);
    const qvalueRef = useRef<number[]>([]);
    const infoRef = useRef<GameEnvironmentInfo>(undefined);
    const agent: Agent = {
        name: 'Tutorial Agent',
        type: 'robodog',
        img: getAgentImage({ type: 'robodog' }),
        observationShape: 'small',
    };
    const sounds = useMemo(() => {
        return getAgentSounds(agent.type);
    }, [agent.type]);

    const playBark = useSound(sounds);
    const controls = useAtomValue(GameControlAtom);
    const agentSettings = useAtomValue(AgentSettingsAtom);
    const [tutorialStep, setTutorialStep] = useAtom(TutorialStepAtom);
    const setStepsTaken = useSetAtom(StepsTakenAtom);
    const setStepsProcentage = useSetAtom(StepsProcentageAtom);
    const tutorialPhase = useAtomValue(TutorialPhaseAtom);

    const store = useStore();

    const gridSize = 7;
    const maxTurns = 999;
    const numberOfPots = 10;
    const potReloadDelay = 10;
    const breakPotSpooksBurglar = false;

    const spookedBurglarReward = 10;
    const brokePotReward = -15;
    const barkSuccessReward = 10;
    const barkFailReward = -3;
    const burglarWonReward = -10;
    const [facing, setFacing] = useState(1);

    const prevProgressRef = useRef(0);
    const stepsTakenRef = useRef(0);
    const episodicRewardRef = useRef(0);
    const lastEpisodeRewardRef = useRef(0);
    const lastRewardRef = useRef(0);
    const defaultObs = useMemo(() => {
        return getDefaultObservation(agent.observationShape);
    }, [agent.observationShape]);

    const [obs, setObs] = useState<GenericObservation>(defaultObs);

    useTutorialStepEffects({
        tutorialStep,
        envRef,
        setFacing,
    });

    const { items: floatItems, spawnFloat, deactivate } = useRewardFloats({ size: FLOAT_RING_SIZE });

    const resetUI = React.useCallback(() => {
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
            agentObsOffset: smallOffset,
            flowerPotPositions: [
                { x: 1, y: 1 },
                { x: 2, y: 2 },
                { x: 5, y: 4 },
                { x: 4, y: 5 },
                { x: 3, y: 2 },
                { x: 1, y: 4 },
            ],
        });

        obsRef.current = defaultObs;
        const agentSettingsData = store.get(AgentSettingsAtom);
        agentRef.current = new QLearningAgent({
            alpha: agentSettingsData.alpha,
            gamma: agentSettingsData.gamma,
            epsilon: agentSettingsData.epsilon,
            lWorld: new WorldStore(),
        });

        actionRef.current = undefined;
        qvalueRef.current = [];
        episodicRewardRef.current = 0;
        lastEpisodeRewardRef.current = 0;
        infoRef.current = { timeLeft: maxTurns ?? 0, trigger: false, result: 'ongoing', message: 'Game reset' };

        const { obs } = envRef.current.resetTutorial({ x: 2, y: 2 });
        obsRef.current = obs;
        setObs(obs);
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
    }, [resetUI]);

    // Tutorial progression logic
    useEffect(() => {
        if (tutorialStep === 19 && infoRef.current && envRef.current) {
            const info = infoRef.current;
            const reward = lastRewardRef.current;

            if (info.trigger && !visitedRewards.pot) {
                setVisitedRewards((old) => {
                    return {
                        ...old,
                        pot: true,
                    };
                });
                setTutorialStep(20);
            } else if (reward === envRef.current.barkFailReward && !visitedRewards.barkFail) {
                setVisitedRewards((old) => {
                    return {
                        ...old,
                        barkFail: true,
                    };
                });
                setTutorialStep(21);
            } else if (info.result === 'win' && !visitedRewards.win) {
                setVisitedRewards((old) => {
                    return {
                        ...old,
                        win: true,
                    };
                });
                setTutorialStep(22);
            } else if (visitedRewards.barkFail && visitedRewards.pot && visitedRewards.win) {
                setTutorialStep(23);
            }
        }
    }, [tutorialStep, obs, envRef, visitedRewards, setVisitedRewards, setTutorialStep, infoRef]);

    const syncUI = React.useCallback(() => {
        if (obsRef.current && agentRef.current && obsRef.current) {
            setObs(obsRef.current);

            qvalueRef.current = agentRef.current.getQValues(obsRef.current);
        }
    }, [agentRef, obsRef, qvalueRef]);

    const stepUI = React.useCallback(() => {
        if (obsRef.current && agentRef.current && obsRef.current && envRef.current) {
            const prev = envRef.current.position;
            const currentObs = obsRef.current;
            const action = agentRef.current.chooseAction(currentObs);
            actionRef.current = action;
            if (action === Actions.specialAction) playBark();
            const { info, obs: nextObs, reward, terminated } = envRef.current.step(action);
            infoRef.current = info;
            agentRef.current.update(currentObs, action, reward, nextObs);
            episodicRewardRef.current += reward;
            spawnFloat(envRef.current.position.x, envRef.current.position.y, reward);
            lastRewardRef.current = reward;
            const dx = prev.x - envRef.current.position.x;
            if (dx !== 0) setFacing(dx > 0 ? -1 : 1);
            if (terminated) {
                lastEpisodeRewardRef.current = episodicRewardRef.current;
                const { obs: resetObs } = envRef.current.reset();
                obsRef.current = resetObs;
                episodicRewardRef.current = 0;
            } else {
                obsRef.current = nextObs;
            }
            stepsTakenRef.current++;
            setStepsTaken(stepsTakenRef.current);
            syncUI();
        }
    }, [syncUI, playBark, spawnFloat, setStepsTaken, actionRef, obsRef, infoRef, agentRef, envRef]);

    // Normal loop
    useEffect(() => {
        if (!controls.isRunning || controls.isFast) return;
        const id = setInterval(stepUI, STEP_INTERVAL);
        return () => clearInterval(id);
    }, [controls.isFast, controls.isRunning, stepUI]);

    const stepFast = React.useCallback(() => {
        if (obsRef.current && agentRef.current && obsRef.current && envRef.current) {
            for (let i = 0; i < FAST_STEPS; i++) {
                const currentObs = obsRef.current;
                const action = agentRef.current.chooseAction(currentObs);
                actionRef.current = action;
                const { info, obs: nextObs, reward, terminated } = envRef.current.step(action);
                infoRef.current = info;
                agentRef.current.update(currentObs, action, reward, nextObs);

                episodicRewardRef.current += reward;

                if (terminated) {
                    lastEpisodeRewardRef.current = episodicRewardRef.current;
                    const { obs: resetObs } = envRef.current.reset();
                    obsRef.current = resetObs;
                    episodicRewardRef.current = 0;
                } else {
                    obsRef.current = nextObs;
                }

                stepsTakenRef.current++;
            }
            if (stepsTakenRef.current >= 1000000) setTutorialStep(25);
            setStepsTaken(stepsTakenRef.current);
            const progress = Math.floor(stepsTakenRef.current / 20000);

            if (progress !== prevProgressRef.current) {
                prevProgressRef.current = progress;
                setStepsProcentage(progress * 2);
            }
            syncUI();
        }
    }, [syncUI, setStepsTaken, setTutorialStep, setStepsProcentage, obsRef, agentRef, envRef, infoRef, actionRef]);

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

    const env = envRef.current;

    if (!env || !maxTurns || !infoRef.current || !gridSize) {
        console.warn(env, maxTurns, infoRef.current, gridSize);
        return <div>missing info</div>;
    }

    return (
        <div className={style.gameContainer}>
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
                <div />
                <div>
                    <img
                        src="/images/assets/burglar2.png"
                        width={60}
                        style={{
                            opacity:
                                tutorialStep > OBSERVATIONSTEP - 1 && obs.POIdirection === SixthSenseDirection.North
                                    ? 1
                                    : 0,
                        }}
                    />
                </div>
                <div />
                <div>
                    <img
                        src="/images/assets/burglar2.png"
                        width={60}
                        style={{
                            opacity:
                                tutorialStep > OBSERVATIONSTEP - 1 && obs.POIdirection === SixthSenseDirection.West
                                    ? 1
                                    : 0,
                        }}
                    />
                </div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridSize}, 40px)`,
                    }}
                >
                    {!controls.isFast && (
                        <motion.div
                            style={{
                                position: 'absolute',
                                zIndex: 20,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 25,
                            }}
                            animate={{
                                x: env.position.x * 40,
                                y: env.position.y * 40,
                                opacity: tutorialStep > 0 ? 1 : 0,
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                {tutorialStep > 0 && tutorialStep !== 19 && tutorialStep < 27 && (
                                    <motion.div
                                        className={style.speechBubble}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                            damping: 25,
                                        }}
                                        animate={{
                                            left: facing === 1 ? '-30px' : '-60px',
                                        }}
                                    >
                                        <p>{t(`tutorial.agentBubble.${tutorialStep}`)}</p>
                                    </motion.div>
                                )}

                                <motion.img
                                    src={agent.img}
                                    style={{
                                        width: 40,
                                        height: 40,
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: tutorialStep > 0 ? 1 : 0,
                                        scaleX: facing ?? 1,
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                    <RewardFloats
                        items={floatItems}
                        cellSize={40}
                        visible={tutorialStep > 2}
                        onComplete={deactivate}
                    />
                    {Array.from({ length: gridSize }).map((_, y) =>
                        Array.from({ length: gridSize }).map((_, x) => {
                            let bg = 'lightgray';
                            const isEdge = x === 0 || y === 0 || x === gridSize - 1 || y === gridSize - 1;
                            const onSight = getOnSightOrOnSpot({
                                agentPos: env.position,
                                x: x,
                                y: y,
                                obsShape: agent.observationShape,
                            });

                            if (controls.isFast) {
                                if (env.position.x === x && env.position.y === y)
                                    return (
                                        <img
                                            key={`${x}-${y}`}
                                            src={agent.img}
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
                            }
                            if (isEdge) {
                                return (
                                    <img
                                        key={`${x}-${y}`}
                                        src="/images/assets/wall.png"
                                        width={40}
                                        height={40}
                                        style={{
                                            border: '1px solid black',
                                            opacity: tutorialStep > ENVIRONMENTSTEP - 1 ? 1 : 0,
                                        }}
                                    />
                                );
                            }

                            if (env.flower_pots.find((r) => r.intact && r.x === x && r.y === y)) bg = 'green';
                            else if (env.flower_pots.find((r) => !r.intact && r.x === x && r.y === y)) bg = 'brown';

                            if (onSight) {
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
                                                background: 'white',
                                                opacity: tutorialStep > OBSERVATIONSTEP - 1 ? 1 : 0,
                                                ...fadeStyle,
                                            }}
                                        />
                                    );
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
                                                opacity: tutorialStep > OBSERVATIONSTEP - 1 ? 1 : 0,
                                                ...fadeStyle,
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
                                            background: 'white',
                                            opacity: tutorialStep > OBSERVATIONSTEP - 1 ? 1 : 0,
                                            ...fadeStyle,
                                        }}
                                    />
                                );
                            }
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
                                            background: 'lightgrey',
                                            opacity: tutorialStep > ENVIRONMENTSTEP - 1 ? 1 : 0,
                                            ...fadeStyle,
                                        }}
                                    />
                                );
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
                                            opacity: tutorialStep > ENVIRONMENTSTEP - 1 ? 1 : 0,
                                            ...fadeStyle,
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
                                        background: 'lightgrey',
                                        opacity: tutorialStep > ENVIRONMENTSTEP - 1 ? 1 : 0,
                                        ...fadeStyle,
                                    }}
                                />
                            );
                        })
                    )}
                </div>
                <img
                    src="/images/assets/burglar.png"
                    width={60}
                    style={{
                        opacity:
                            tutorialStep > OBSERVATIONSTEP - 1 && obs.POIdirection === SixthSenseDirection.East ? 1 : 0,
                    }}
                />
                <div />
                <div>
                    <img
                        src="/images/assets/burglar.png"
                        width={60}
                        style={{
                            opacity:
                                tutorialStep > OBSERVATIONSTEP - 1 && obs.POIdirection === SixthSenseDirection.South
                                    ? 1
                                    : 0,
                        }}
                    />
                </div>
                <div />
            </div>
            {tutorialPhase === 'basics' && <TutorialControls />}
        </div>
    );
}

export default TutorialEnvironment;
