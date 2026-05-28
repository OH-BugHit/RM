import React, { useEffect, useMemo, useRef, useState } from 'react';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { Actions, GameEnvironmentInfo, GenericObservation, Agent } from '../../../types';
import { useSound } from '../../../hooks/useSound';
import { useStore, useAtomValue } from 'jotai';
import {
    AgentSettingsAtom,
    EnvSettingsAtom,
    GameControlAtom,
    ResetUiPulseAtom,
    TutorialStepAtom,
} from '../../../atoms/state';
import {
    getAdventurerOffset,
    getAgentImage,
    getAgentObservationShape,
    getAgentSounds,
    robodogOffset,
} from '../../../components/GameComponents/agentProps';
import { getOnSightOrOnSpot } from '../../../components/GameComponents/drawComponent';
import { RLGridEnv } from '../../Environments/PotsAndBurglar/environment';
import TutorialControls from '../TutorialControls';
import { motion } from 'framer-motion';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
//import QCanvas from '../../QTable/QCanvas';

const STEP_INTERVAL = 400; // ms

const fadeStyle = {
    transition: 'opacity 0.4s ease, background-color 0.15s linear',
};

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

function TutorialEnvironment({
    envRef,
    agentRef,
    obsRef,
    actionRef,
    qvalueRef,
    infoRef,
    agent,
}: PotsAndBurglarGameProps) {
    const { t } = useTranslation();
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

    const gridSize = 5;
    const maxTurns = envSettings?.potsAndBurglar?.env.maxTurns;
    const numberOfPots = 10;
    const potReloadDelay = envSettings?.potsAndBurglar?.env.potReloadDelay;
    const breakPotSpooksBurglar = false;

    const spookedBurglarReward = envSettings?.potsAndBurglar?.reward.spookedBurglarReward;
    const brokePotReward = envSettings?.potsAndBurglar?.reward.brokePotReward;
    const barkSuccessReward = envSettings?.potsAndBurglar?.reward.barkSuccessReward;
    const barkFailReward = envSettings?.potsAndBurglar?.reward.barkFailReward;
    const burglarWonReward = envSettings?.potsAndBurglar?.reward.burglarWonReward;
    const [facing, setFacing] = useState(1);

    const episodicRewardRef = useRef(0);
    const lastEpisodeRewardRef = useRef(0);
    const defaultObs = useMemo(() => {
        return getAgentObservationShape(agent.type);
    }, [agent.type]);

    const [, setObs] = useState<GenericObservation>(defaultObs);

    const tutorialStep = useAtomValue(TutorialStepAtom);
    const OBSERVATIONSTEP = 8;
    const ENVIRONMENTSTEP = 10;

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
            agentObsOffset: agent.type === 'robodog' ? robodogOffset : getAdventurerOffset(),
            flowerPotPositions: [
                { x: 0, y: 0 },
                { x: 1, y: 1 },
                { x: 4, y: 3 },
                { x: 3, y: 4 },
                { x: 2, y: 1 },
                { x: 0, y: 3 },
            ],
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
        episodicRewardRef.current = 0;
        lastEpisodeRewardRef.current = 0;
        infoRef.current = { timeLeft: maxTurns ?? 0, result: 'ongoing', message: 'Game reset' };

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
            const dx = prev.x - envRef.current.position.x;
            if (dx !== 0) setFacing(dx > 0 ? -1 : 1);

            if (terminated) {
                lastEpisodeRewardRef.current = episodicRewardRef.current;
                const { obs: resetObs } = envRef.current.resetTutorial({ x: 2, y: 2 });
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

    /*
    {false && agentRef.current && (
                <>
                    <DrawObservation
                        state={agentRef.current?.getStateKey(obs)}
                        disabled={controls.isFast}
                        actionValues={qvalueRef.current}
                        type={agent.type}
                    />
                </>
            )}
    */

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
            }}
        >
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
                {/* Left padding */}
                <div style={{ opacity: 0, width: 60 }}></div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridSize}, 40px)`,
                    }}
                >
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
                            {tutorialStep > 0 && (
                                <motion.blockquote
                                    className={style.example_obtuse}
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
                                    {tutorialStep}/25
                                </motion.blockquote>
                            )}

                            <motion.img
                                src={agentImage}
                                style={{
                                    width: 40,
                                    height: 40,
                                }}
                                animate={{
                                    scaleX: facing ?? 1,
                                }}
                            />
                        </div>
                    </motion.div>
                    {Array.from({ length: gridSize }).map((_, y) =>
                        Array.from({ length: gridSize }).map((_, x) => {
                            let bg = 'lightgray';
                            const onSight = getOnSightOrOnSpot({
                                agentPos: env.position,
                                x: x,
                                y: y,
                                agentType: agent.type,
                            });

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

                <div>
                    <img
                        src="/images/assets/burglar.png"
                        width={60}
                        style={{ opacity: tutorialStep > OBSERVATIONSTEP - 1 ? 1 : 0, ...fadeStyle }}
                    />
                </div>
                <div />
            </div>
            <TutorialControls />
        </div>
    );
}

export default TutorialEnvironment;
