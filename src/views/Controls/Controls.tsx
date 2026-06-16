import style from './style.module.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { useSetAtom } from 'jotai';
import { GameControlAtom } from '../../atoms/state';
import GameButton from '../../components/Buttons/GameButton/GameButton';

function Controls() {
    const setControls = useSetAtom(GameControlAtom);

    return (
        <div className={style.controlsWrapper}>
            <div className={style.controlsContainer}>
                <GameButton
                    title="Play"
                    variant="outlined"
                    onClick={() => {
                        setControls((old) => {
                            return {
                                ...old,
                                isRunning: true,
                                isFast: false,
                            };
                        });
                    }}
                >
                    <PlayCircleOutlineIcon
                        fontSize="large"
                        color="secondary"
                    />
                </GameButton>
                <GameButton
                    title="Pause"
                    variant="outlined"
                    onClick={() => {
                        setControls((old) => {
                            return {
                                ...old,
                                isRunning: false,
                            };
                        });
                    }}
                >
                    <PauseCircleOutlineIcon
                        fontSize="large"
                        color="secondary"
                    />
                </GameButton>
                <GameButton
                    title="Fast forward"
                    variant="outlined"
                    onClick={() => {
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
                        color="secondary"
                    />
                </GameButton>
                <GameButton
                    title="One step"
                    variant="outlined"
                    onClick={() => {
                        setControls((old) => {
                            return {
                                ...old,
                                takeStep: !old.takeStep,
                            };
                        });
                    }}
                >
                    <b style={{ color: 'rgb(186, 56, 189)' }}>Step</b>
                </GameButton>
            </div>
        </div>
    );
}

export default Controls;
