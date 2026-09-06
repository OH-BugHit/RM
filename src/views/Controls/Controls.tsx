import style from './style.module.css';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { GameControlAtom } from '../../atoms/state';
import GameButton from '../../components/Buttons/GameButton/GameButton';
import { ControlEnablerAtom, HUDvisAtom, InspectAtom, LodStateAtom, StoryProgressAtom } from '../../atoms/uiState';
import PlayIcon from '../../components/Buttons/ButtonIcons/ControlIcons/PlayIcon';
import PauseIcon from '../../components/Buttons/ButtonIcons/ControlIcons/PauseIcon';
import StepIcon from '../../components/Buttons/ButtonIcons/ControlIcons/StepIcon';
import FastForwardIcon from '../../components/Buttons/ButtonIcons/ControlIcons/FastForwardIcon';
import InspectIcon from '../../components/Buttons/ButtonIcons/ControlIcons/InspectIcon';
import { TestAgentAtom } from '../../atoms/gameState';
import { useGameScale } from '../../context/GameScale/useGameScale';
let stepsTaken = 0;

function Controls() {
    const { s } = useGameScale();
    const [controls, setControls] = useAtom(GameControlAtom);
    const setLod = useSetAtom(LodStateAtom);
    const enable = useAtomValue(ControlEnablerAtom);
    const hudVis = useAtomValue(HUDvisAtom);
    const setStoryProgress = useSetAtom(StoryProgressAtom);
    const setInspect = useSetAtom(InspectAtom);
    const test = useAtomValue(TestAgentAtom);

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
                style={{ padding: `${s(12)}px`, gap: `${s(0.8)}rem` }}
            >
                <GameButton
                    title="One step"
                    color="success"
                    variant="text"
                    disabled={!hudVis.controls.step || !enable?.step || test === 'isRunning' || test === 'passed'}
                    onClick={() => {
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
                        disabled={!hudVis.controls.step || !enable?.step || test === 'isRunning' || test === 'passed'}
                    />
                </GameButton>
                <GameButton
                    title={controls.isRunning ? 'Pause' : 'Play'}
                    disabled={!hudVis.controls.play || !enable?.play || test === 'isRunning' || test === 'passed'}
                    variant="text"
                    color={controls.isRunning ? undefined : 'success'}
                    onClick={() => {
                        setLod(2);

                        if (controls.isRunning) {
                            // Pause
                            setControls((old) => ({
                                ...old,
                                isRunning: false,
                                isFast: false,
                            }));
                        } else {
                            // Play
                            storyPlay();
                            setControls((old) => ({
                                ...old,
                                isRunning: true,
                                isFast: false,
                            }));
                        }
                    }}
                >
                    {controls.isRunning ? (
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
                {hudVis.controls.ff && (
                    <GameButton
                        title="Fast forward"
                        variant="text"
                        color="success"
                        disabled={!hudVis.controls.ff || !enable?.ff || test === 'isRunning' || test === 'passed'}
                        onClick={() => {
                            storyFF();
                            setLod(1);
                            setControls((old) => {
                                return {
                                    ...old,
                                    isRunning: true,
                                    isFast: true,
                                };
                            });
                        }}
                    >
                        <FastForwardIcon
                            size={s(64)}
                            active={controls.isFast}
                            disabled={!hudVis.controls.ff || !enable?.ff || test === 'isRunning' || test === 'passed'}
                        />
                    </GameButton>
                )}

                {hudVis.controls.inspect && (
                    <GameButton
                        title="Inspect"
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
    );
}

export default Controls;
