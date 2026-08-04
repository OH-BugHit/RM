import style from './style.module.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import FastForwardIcon from '@mui/icons-material/FastForward';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { GameControlAtom } from '../../atoms/state';
import GameButton from '../../components/Buttons/GameButton/GameButton';
import { ControlEnablerAtom, InspectAtom, LodStateAtom, StoryProgressAtom } from '../../atoms/uiState';
let stepsTaken = 0;

function Controls() {
    const [controls, setControls] = useAtom(GameControlAtom);
    const setLod = useSetAtom(LodStateAtom);
    const enable = useAtomValue(ControlEnablerAtom);
    const setStoryProgress = useSetAtom(StoryProgressAtom);
    const setInspect = useSetAtom(InspectAtom);

    const storySteps = () => {
        if (stepsTaken < 5) {
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
                    title={controls.isRunning ? 'Play' : 'Pause'}
                    disabled={!enable?.play}
                    variant="outlined"
                    onClick={() => {
                        setLod(2);
                        setControls((old) => {
                            return {
                                ...old,
                                isRunning: controls.isRunning ? false : true,
                                isFast: false,
                            };
                        });
                    }}
                >
                    {controls.isRunning ? (
                        <PauseCircleOutlineIcon
                            fontSize="large"
                            color="secondary"
                        />
                    ) : (
                        <PlayCircleOutlineIcon
                            fontSize="large"
                            color={`${enable?.play ? 'secondary' : 'disabled'}`}
                        />
                    )}
                </GameButton>
                <GameButton
                    title="Fast forward"
                    variant="outlined"
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
                        fontSize="large"
                        color={`${enable?.ff ? 'secondary' : 'disabled'}`}
                    />
                </GameButton>
                <GameButton
                    title="One step"
                    variant="outlined"
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
                    <b style={{ color: `${enable?.step ? 'secondary' : 'disabled'}` }}>Step</b>
                </GameButton>
                <GameButton
                    title="Inspect"
                    variant="outlined"
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
                    <TipsAndUpdatesIcon
                        fontSize="large"
                        color={`${enable?.inspect ? 'secondary' : 'disabled'}`}
                    />
                </GameButton>
            </div>
        </div>
    );
}

export default Controls;
