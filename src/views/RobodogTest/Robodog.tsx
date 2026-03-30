import { Button } from '@genai-fi/base';
import React, { useEffect, useRef, useState } from 'react';
import { Observation, QLearningAgent } from './rlAgentQ';
import { RLGridEnv } from './environment';
import { Actions, BanditPosition } from '../../types';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import FastForwardIcon from '@mui/icons-material/FastForward';
import RewardControl from './RewardControl';
import AgentControl from './AgentControl';
import style from './style.module.css';
import { Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EnvironmentControl from './GameSettingsControl';
import { useSound } from '../../hooks/useSound';

const STEP_INTERVAL = 400; // ms
const FAST_STEPS = 5000;

// React component
function RLGridGame() {
    const { t } = useTranslation();
    const playBark = useSound('/bark.mp3');
    const [tabNumber, setTabNumber] = useState(0);

    const [gridSize, setGridSize] = useState(10);
    const [maxTurns, setMaxTurns] = useState(20);
    const [numberOfPots, setNumberOfPots] = useState(10);
    const [potReloadDelay, setPotReloadDelay] = useState(25);
    const [breakPotSpooksBurglar, setBreakPotSpooksBurglar] = useState(true);

    const [committedGridSize, setCommittedGridSize] = useState(10);
    const [committedMaxTurns, setCommittedMaxTurns] = useState(20);
    const [committedNumberOfPots, setCommittedNumberOfPots] = useState(10);
    const [committedPotReloadDelay, setCommittedPotReloadDelay] = useState(25);
    const [committedBreakPotSpooksBurglar, setCommittedBreakPotSpooksBurglar] = useState(true);

    const [epsilon, setEpsilon] = useState(0.1);
    const [gamma, setGamma] = useState(0.9);
    const [alpha, setAlpha] = useState(0.1);

    const [committedEpsilon, setCommittedEpsilon] = useState(0.1);
    const [committedGamma, setCommittedGamma] = useState(0.9);
    const [committedAlpha, setCommittedAlpha] = useState(0.1);

    const [spookedBurglarReward, setSpookedBurglarReward] = useState(10);
    const [brokePotReward, setBrokePotReward] = useState(-1);
    const [barkSuccessReward, setBarkSuccessReward] = useState(10);
    const [barkFailReward, setBarkFailReward] = useState(-1);
    const [burglarWonReward, setBurglarWonReward] = useState(-10);

    const [committedSpookedBurglarReward, setCommittedSpookedBurglarReward] = useState(10);
    const [committedBrokePotReward, setCommittedBrokePotReward] = useState(-1);
    const [committedBarkSuccessReward, setCommittedBarkSuccessReward] = useState(10);
    const [committedBarkFailReward, setCommittedBarkFailReward] = useState(-1);
    const [committedBurglarWonReward, setCommittedBurglarWonReward] = useState(-10);

    const envRef = useRef(
        new RLGridEnv({
            gridSize: committedGridSize,
            maxTurns: committedMaxTurns,
            numberOfPots: committedNumberOfPots,
            potReloadDelay: committedPotReloadDelay,
            breakPotSpooksBurglar: committedBreakPotSpooksBurglar,
            rewards: {
                spooked: committedSpookedBurglarReward,
                brokePot: committedBrokePotReward,
                barkSuccess: committedBarkSuccessReward,
                barkFail: committedBarkFailReward,
                burglarWon: committedBurglarWonReward,
            },
        })
    );
    const agentRef = useRef(
        new QLearningAgent({ alpha: committedAlpha, gamma: committedGamma, epsilon: committedEpsilon })
    );
    const actionRef = useRef<Actions | null>(null);
    const obsRef = useRef<Observation>({
        neighbors: [0, 0, 0, 0],
        bandit: 4,
    });
    const infoRef = useRef({ timeLeft: committedMaxTurns, result: 'ongoing', message: '' });
    const episodicRewardRef = useRef(0);
    const lastEpisodeRewardRef = useRef(0);

    const [obs, setObs] = useState<Observation>(obsRef.current);
    const [isRunning, setIsRunning] = useState(false);
    const [fast, setFast] = useState(false);

    const [wins, setWins] = useState(0);
    const [losses, setLosses] = useState(0);
    const winsRef = useRef(0);
    const lossesRef = useRef(0);

    const [episodicReward, setEpisodicReward] = useState(0);
    const [lastEpisodeReward, setLastEpisodeReward] = useState(0);

    const stringifyAction = (action: Actions | null) => {
        switch (action) {
            case Actions.up:
                return 'Up';
            case Actions.down:
                return 'Down';
            case Actions.left:
                return 'Left';
            case Actions.right:
                return 'Right';
            case Actions.bark:
                return 'Bark';
            case Actions.stay:
                return 'Stay';
            default:
                return 'No action';
        }
    };

    const resetUI = () => {
        setCommittedGridSize(gridSize);
        setCommittedMaxTurns(maxTurns);
        setCommittedNumberOfPots(numberOfPots);
        setCommittedPotReloadDelay(potReloadDelay);
        setCommittedBreakPotSpooksBurglar(breakPotSpooksBurglar);
        setCommittedEpsilon(epsilon);
        setCommittedGamma(gamma);
        setCommittedAlpha(alpha);
        setCommittedSpookedBurglarReward(spookedBurglarReward);
        setCommittedBrokePotReward(brokePotReward);
        setCommittedBarkSuccessReward(barkSuccessReward);
        setCommittedBarkFailReward(barkFailReward);
        setCommittedBurglarWonReward(burglarWonReward);

        envRef.current = new RLGridEnv({
            gridSize,
            maxTurns,
            numberOfPots,
            potReloadDelay,
            breakPotSpooksBurglar,
            rewards: {
                spooked: spookedBurglarReward,
                brokePot: brokePotReward,
                barkSuccess: barkSuccessReward,
                barkFail: barkFailReward,
                burglarWon: burglarWonReward,
            },
        });
        agentRef.current = new QLearningAgent({ alpha, gamma, epsilon });
        actionRef.current = null;
        winsRef.current = 0;
        lossesRef.current = 0;
        episodicRewardRef.current = 0;
        lastEpisodeRewardRef.current = 0;
        infoRef.current = { timeLeft: maxTurns, result: 'ongoing', message: 'Game reset' };

        const { obs } = envRef.current.reset();
        obsRef.current = obs;
        setObs(obs);
        setEpisodicReward(0);
        setWins(0);
        setLosses(0);
        setLastEpisodeReward(0);
    };

    const syncUI = React.useCallback(() => {
        setObs(obsRef.current);
        setEpisodicReward(episodicRewardRef.current);
        setWins(winsRef.current);
        setLosses(lossesRef.current);
        setLastEpisodeReward(lastEpisodeRewardRef.current);
    }, []);

    const stepUI = React.useCallback(() => {
        const currentObs = obsRef.current;
        const action = agentRef.current.chooseAction(currentObs);
        actionRef.current = action;
        if (action === Actions.bark) playBark();
        const { info, obs: nextObs, reward, terminated } = envRef.current.step(action);
        infoRef.current = info;
        agentRef.current.update(currentObs, action, reward, nextObs);

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
    }, [syncUI, playBark]);

    const stepFast = React.useCallback(() => {
        for (let i = 0; i < FAST_STEPS; i++) {
            const currentObs = obsRef.current;
            const action = agentRef.current.chooseAction(currentObs);
            actionRef.current = action;
            const { info, obs: nextObs, reward, terminated } = envRef.current.step(action);
            infoRef.current = info;
            agentRef.current.update(currentObs, action, reward, nextObs);

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
    }, [syncUI]);

    // Fast loop
    useEffect(() => {
        if (!isRunning || !fast) return;
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
    }, [isRunning, fast, stepFast]);

    // Normal loop
    useEffect(() => {
        if (!isRunning || fast) return;
        const id = setInterval(stepUI, STEP_INTERVAL);
        return () => clearInterval(id);
    }, [isRunning, fast, stepUI]);

    useEffect(() => {
        resetUI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const env = envRef.current;

    return (
        <div className={style.container}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div>Wins: {wins}</div>
                <div>Losses: {losses}</div>
                <div>Last episode reward: {lastEpisodeReward.toFixed(1)}</div>
                <div>This episode reward: {episodicReward.toFixed(1)}</div>
                <div>Time until break in: {committedMaxTurns - infoRef.current.timeLeft}</div>
                <div>Last action: {stringifyAction(actionRef.current)}</div>

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
                            gridTemplateColumns: `repeat(${committedGridSize}, 40px)`,
                        }}
                    >
                        {Array.from({ length: committedGridSize }).map((_, y) =>
                            Array.from({ length: committedGridSize }).map((_, x) => {
                                let bg = 'lightgray';

                                if (env.dog.x === x && env.dog.y === y) bg = 'blue';
                                else if (env.flower_pots.find((r) => r.intact && r.x === x && r.y === y)) bg = 'green';
                                else if (env.flower_pots.find((r) => !r.intact && r.x === x && r.y === y)) bg = 'brown';

                                if (bg === 'brown')
                                    return (
                                        <img
                                            src="pot_broken.png"
                                            width={40}
                                            style={{
                                                overflow: 'visible',
                                                width: 40,
                                                height: 40,
                                                border: '1px solid black',
                                                background: 'lightgrey',
                                            }}
                                        />
                                    );
                                if (bg === 'green')
                                    return (
                                        <img
                                            src="pot_intact.png"
                                            width={40}
                                            style={{
                                                overflow: 'visible',
                                                width: 40,
                                                height: 40,
                                                border: '1px solid black',
                                                background: 'lightgrey',
                                            }}
                                        />
                                    );

                                if (bg === 'blue')
                                    return (
                                        <img
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
                                            background: bg,
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
                <div style={{ marginTop: 10 }}>
                    <Button
                        onClick={() => {
                            setIsRunning(true);
                            setFast(false);
                        }}
                    >
                        <PlayCircleOutlineIcon />
                    </Button>
                    <Button onClick={() => setIsRunning(false)}>
                        <PauseCircleOutlineIcon />
                    </Button>
                    <Button
                        onClick={() => {
                            setIsRunning(true);
                            setFast(true);
                        }}
                    >
                        <FastForwardIcon />
                    </Button>
                    <Button onClick={stepUI}>Step</Button>
                    <Button onClick={resetUI}>Reset</Button>
                </div>
            </div>
            <div className={style.parameterContainer}>
                <Tabs
                    value={tabNumber}
                    onChange={(_, value) => setTabNumber(value)}
                    variant="scrollable"
                    scrollButtons="auto"
                    orientation="horizontal"
                    sx={{ borderRight: '1px solid #008297' }}
                >
                    <Tab label={t('Agent')} />
                    <Tab label={t('Reward')} />
                    <Tab label={t('Environment')} />
                </Tabs>
                {tabNumber === 0 && (
                    <AgentControl
                        epsilon={epsilon}
                        gamma={gamma}
                        alpha={alpha}
                        onEpsilonChange={setEpsilon}
                        onGammaChange={setGamma}
                        onAlphaChange={setAlpha}
                    />
                )}
                {tabNumber === 1 && (
                    <RewardControl
                        spookedBurglarReward={spookedBurglarReward}
                        brokePotReward={brokePotReward}
                        barkSuccessReward={barkSuccessReward}
                        barkFailReward={barkFailReward}
                        burglarWonReward={burglarWonReward}
                        onSpookedBurglarRewardChange={setSpookedBurglarReward}
                        onBrokePotRewardChange={setBrokePotReward}
                        onBarkSuccessRewardChange={setBarkSuccessReward}
                        onBarkFailRewardChange={setBarkFailReward}
                        onBurglarWonRewardChange={setBurglarWonReward}
                    />
                )}
                {tabNumber === 2 && (
                    <EnvironmentControl
                        gridSize={gridSize}
                        maxTurns={maxTurns}
                        numberOfPots={numberOfPots}
                        potReloadDelay={potReloadDelay}
                        breakPotSpooksBurglar={breakPotSpooksBurglar}
                        onGridSizeChange={setGridSize}
                        onMaxTurnsChange={setMaxTurns}
                        onNumberOfPotsChange={setNumberOfPots}
                        onPotReloadDelayChange={setPotReloadDelay}
                        onBreakPotSpooksBurglarChange={setBreakPotSpooksBurglar}
                    />
                )}
                <Button
                    variant="contained"
                    onClick={resetUI}
                >
                    Restart learning
                </Button>
            </div>
        </div>
    );
}

export default RLGridGame;
