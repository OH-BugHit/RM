import style from './style.module.css';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { AgentSettingsAtom, GameControlAtom, ResetUiPulseAtom } from '../../atoms/state';
import GameButton from '../../components/Buttons/GameButton/GameButton';
import { ControlEnablerAtom, HUDvisAtom, InspectAtom, LodStateAtom, StoryProgressAtom } from '../../atoms/uiState';
import PlayIcon from '../../components/Buttons/ButtonIcons/ControlIcons/PlayIcon';
import PauseIcon from '../../components/Buttons/ButtonIcons/ControlIcons/PauseIcon';
import StepIcon from '../../components/Buttons/ButtonIcons/ControlIcons/StepIcon';
import FastForwardIcon from '../../components/Buttons/ButtonIcons/ControlIcons/FastForwardIcon';
import InspectIcon from '../../components/Buttons/ButtonIcons/ControlIcons/InspectIcon';
import { TestAgentAtom } from '../../atoms/gameState';
import { useGameScale } from '../../context/GameScale/useGameScale';
import { useState } from 'react';
import TrashIcon from '../../components/Buttons/ButtonIcons/Agent/TrashIcon';
import { useTranslation } from 'react-i18next';
import StopIcon from '../../components/Buttons/ButtonIcons/ControlIcons/StopIcon';
let stepsTaken = 0;

function Controls() {
    const { t } = useTranslation();
    const { s } = useGameScale();
    const [controls, setControls] = useAtom(GameControlAtom);
    const setLod = useSetAtom(LodStateAtom);
    const enable = useAtomValue(ControlEnablerAtom);
    const hudVis = useAtomValue(HUDvisAtom);
    const setStoryProgress = useSetAtom(StoryProgressAtom);
    const setInspect = useSetAtom(InspectAtom);
    const test = useAtomValue(TestAgentAtom);
    const setAgentParam = useSetAtom(AgentSettingsAtom);
    const setResetEnv = useSetAtom(ResetUiPulseAtom);
    const [training, setTraining] = useState<boolean>(true);

    const triggerTraining = (state: boolean) => {
        setAgentParam((old) => {
            return {
                ...old,
                learning: state,
            };
        });
        setTraining(state);
    };

    const storyFF = () => {
        setStoryProgress((old) => {
            return {
                ...old,
                controls: {
                    ...old.controls,
                    ff: true,
                },
            };
        });
    };
    const storyTest = () => {
        setStoryProgress((old) => {
            return {
                ...old,
                controls: {
                    ...old.controls,
                    test: true,
                },
            };
        });
    };
    const storyPlay = () => {
        setStoryProgress((old) => {
            return {
                ...old,
                controls: {
                    ...old.controls,
                    play: true,
                },
            };
        });
    };
    const storySteps = () => {
        if (stepsTaken < 6) {
            stepsTaken++;
        } else {
            setStoryProgress((old) => {
                return {
                    ...old,
                    controls: {
                        ...old.controls,
                        step: true,
                    },
                };
            });
        }
    };

    return (
        <div
            className={style.controlsWrapper}
            style={{ margin: `${s(1)}rem` }}
        >
            <div
                className={style.controlsContainer}
                data-dismissible-exclude
            >
                <div className={style.testing}>
                    <GameButton
                        title={
                            controls.isRunning
                                ? training
                                    ? t('common.controls.labels.stop')
                                    : t('common.controls.labels.pause')
                                : t('common.controls.labels.play')
                        }
                        disabled={!hudVis.controls.test || !enable?.test || test === 'isRunning' || test === 'passed'}
                        variant="text"
                        fullHeight
                        color={controls.isRunning ? undefined : 'success'}
                        onClick={() => {
                            setLod(2);

                            if (controls.isRunning && !controls.isFast) {
                                // Pause
                                setControls((old) => ({
                                    ...old,
                                    isRunning: false,
                                    isFast: false,
                                }));
                                triggerTraining(true);
                            } else {
                                // Play
                                if (controls.isRunning) {
                                    setControls((old) => ({
                                        ...old,
                                        isRunning: false,
                                        isFast: false,
                                    }));
                                    return;
                                }
                                storyTest();
                                setControls((old) => ({
                                    ...old,
                                    isRunning: true,
                                    isFast: false,
                                }));
                                triggerTraining(false);
                            }
                        }}
                    >
                        {controls.isRunning && training ? (
                            <StopIcon
                                size={s(64)}
                                active={false}
                                testing
                                disabled={
                                    !hudVis.controls.test || !enable?.test || test === 'isRunning' || test === 'passed'
                                }
                            />
                        ) : controls.isRunning && !training ? (
                            <PauseIcon
                                size={s(64)}
                                active
                                testing
                                disabled={
                                    !hudVis.controls.test || !enable?.test || test === 'isRunning' || test === 'passed'
                                }
                            />
                        ) : (
                            <PlayIcon
                                size={s(64)}
                                active={false}
                                testing
                                disabled={
                                    !hudVis.controls.test || !enable?.test || test === 'isRunning' || test === 'passed'
                                }
                            />
                        )}
                    </GameButton>
                    <p className={style.rightText}>Play</p>
                </div>
                <div className={style.training}>
                    <p className={style.leftText}>Train</p>
                    {hudVis.agent.trash && (
                        <GameButton
                            onClick={() => setResetEnv((old) => !old)}
                            variant="text"
                            color="error"
                            title={t('common.controls.labels.reset')}
                        >
                            <TrashIcon size={s(80)} />
                        </GameButton>
                    )}
                    <GameButton
                        title={t('common.controls.labels.step')}
                        color="success"
                        variant="text"
                        disabled={!hudVis.controls.step || !enable?.step || test === 'isRunning' || test === 'passed'}
                        onClick={() => {
                            triggerTraining(true);
                            setLod(2);
                            setControls((old) => {
                                return {
                                    ...old,
                                    isRunning: false,
                                    isFast: false,
                                    takeStep: !old.takeStep,
                                };
                            });
                            storySteps();
                        }}
                    >
                        <StepIcon
                            size={s(64)}
                            disabled={
                                !hudVis.controls.step || !enable?.step || test === 'isRunning' || test === 'passed'
                            }
                        />
                    </GameButton>
                    <GameButton
                        title={
                            controls.isRunning
                                ? t('common.controls.labels.pause')
                                : t('common.controls.labels.playTrain')
                        }
                        disabled={!hudVis.controls.play || !enable?.play || test === 'isRunning' || test === 'passed'}
                        variant="text"
                        color={controls.isRunning ? undefined : 'success'}
                        onClick={() => {
                            setLod(2);

                            if (controls.isRunning && !controls.isFast) {
                                // Pause
                                setControls((old) => ({
                                    ...old,
                                    isRunning: false,
                                    isFast: false,
                                }));
                            } else {
                                // Play
                                triggerTraining(true);
                                storyPlay();
                                setControls((old) => ({
                                    ...old,
                                    isRunning: true,
                                    isFast: false,
                                }));
                            }
                        }}
                    >
                        {controls.isRunning && !controls.isFast && training ? (
                            <PauseIcon
                                size={s(64)}
                                active
                                disabled={
                                    !hudVis.controls.play || !enable?.play || test === 'isRunning' || test === 'passed'
                                }
                            />
                        ) : (
                            <PlayIcon
                                size={s(64)}
                                active={false}
                                disabled={
                                    !hudVis.controls.play || !enable?.play || test === 'isRunning' || test === 'passed'
                                }
                            />
                        )}
                    </GameButton>
                    <GameButton
                        title={t('common.controls.labels.ff')}
                        variant="text"
                        color="success"
                        disabled={!hudVis.controls.ff || !enable?.ff || test === 'isRunning' || test === 'passed'}
                        onClick={() => {
                            if (controls.isFast) {
                                // Pause
                                setControls((old) => ({
                                    ...old,
                                    isRunning: false,
                                    isFast: false,
                                }));
                            } else {
                                triggerTraining(true);
                                storyFF();
                                setLod(1);
                                setControls((old) => {
                                    return {
                                        ...old,
                                        isRunning: true,
                                        isFast: true,
                                    };
                                });
                            }
                        }}
                    >
                        {controls.isFast ? (
                            <PauseIcon
                                size={s(64)}
                                active
                                disabled={
                                    !hudVis.controls.ff || !enable?.ff || test === 'isRunning' || test === 'passed'
                                }
                            />
                        ) : (
                            <FastForwardIcon
                                size={s(64)}
                                active={controls.isFast}
                                disabled={
                                    !hudVis.controls.ff || !enable?.ff || test === 'isRunning' || test === 'passed'
                                }
                            />
                        )}
                    </GameButton>
                    {hudVis.controls.inspect && (
                        <GameButton
                            title={t('common.controls.labels.inspect')}
                            color="info"
                            variant="text"
                            disabled={!enable?.inspect}
                            onClick={() => {
                                setLod(2);
                                setControls((old) => {
                                    return {
                                        ...old,
                                        isRunning: false,
                                        isFast: false,
                                    };
                                });
                                setInspect({ vis: true, step: 0 });
                            }}
                        >
                            <InspectIcon
                                size={s(64)}
                                disabled={!enable?.inspect || test === 'isRunning' || test === 'passed'}
                            />
                        </GameButton>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Controls;
