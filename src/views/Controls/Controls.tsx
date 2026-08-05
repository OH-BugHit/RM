import style from './style.module.css';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ActiveEnvironmentAtom, GameControlAtom } from '../../atoms/state';
import GameButton from '../../components/Buttons/GameButton/GameButton';
import { ControlEnablerAtom, InspectAtom, LodStateAtom, StoryProgressAtom } from '../../atoms/uiState';
import PlayIcon from '../../components/Buttons/ButtonIcons/PlayIcon';
import PauseIcon from '../../components/Buttons/ButtonIcons/PauseIcon';
import StepIcon from '../../components/Buttons/ButtonIcons/StepIcon';
import FastForwardIcon from '../../components/Buttons/ButtonIcons/FastForwardIcon';
import InspectIcon from '../../components/Buttons/ButtonIcons/InspectIcon';
let stepsTaken = 0;

function Controls() {
    const [controls, setControls] = useAtom(GameControlAtom);
    const setLod = useSetAtom(LodStateAtom);
    const enable = useAtomValue(ControlEnablerAtom);
    const setStoryProgress = useSetAtom(StoryProgressAtom);
    const setInspect = useSetAtom(InspectAtom);
    const env = useAtomValue(ActiveEnvironmentAtom);

    const storySteps = () => {
        if (stepsTaken < 8) {
            stepsTaken++;
        } else {
            setStoryProgress((old) => {
                return {
                    ...old,
                    hud: {
                        ...old.hud,
                        agentView: {
                            ...old.hud.agentView,
                            steps: true,
                        },
                    },
                };
            });
        }
    };

    return (
        <div className={style.controlsWrapper}>
            <div className={style.controlsContainer}>
                <GameButton
                    title={controls.isRunning ? 'Pause' : 'Play'}
                    disabled={!enable?.play}
                    variant="text"
                    onClick={() => {
                        setLod(2);
                        setControls((old) => {
                            return {
                                ...old,
                                isRunning: false,
                                isFast: false,
                            };
                        });
                    }}
                >
                    <PauseIcon
                        active={!controls.isRunning}
                        disabled={!enable?.play}
                    />
                </GameButton>
                <GameButton
                    title="One step"
                    color="success"
                    variant="text"
                    disabled={!enable?.step}
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
                    <StepIcon disabled={!enable?.step} />
                </GameButton>
                <GameButton
                    title={controls.isRunning ? 'Pause' : 'Play'}
                    disabled={!enable?.play}
                    variant="text"
                    color="success"
                    onClick={() => {
                        setLod(2);
                        setControls((old) => {
                            return {
                                ...old,
                                isRunning: true,
                                isFast: false,
                            };
                        });
                    }}
                >
                    <PlayIcon
                        active={controls.isRunning}
                        disabled={!enable?.play}
                    />
                </GameButton>
                <GameButton
                    title="Fast forward"
                    variant="text"
                    color="success"
                    disabled={!enable?.ff}
                    onClick={() => {
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
                        active={controls.isFast}
                        disabled={!enable?.ff}
                    />
                </GameButton>

                {env.type === 'created' && (
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
                        <InspectIcon disabled={!enable?.inspect} />
                    </GameButton>
                )}
            </div>
        </div>
    );
}

export default Controls;
