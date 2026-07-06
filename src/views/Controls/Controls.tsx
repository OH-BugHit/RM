import style from './style.module.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { useAtom, useSetAtom } from 'jotai';
import { GameControlAtom } from '../../atoms/state';
import GameButton from '../../components/Buttons/GameButton/GameButton';
import { LodStateAtom } from '../../atoms/uiState';

function Controls() {
    const [controls, setControls] = useAtom(GameControlAtom);
    const setLod = useSetAtom(LodStateAtom);

    return (
        <div className={style.controlsWrapper}>
            <div className={style.controlsContainer}>
                <GameButton
                    title={controls.isRunning ? 'Play' : 'Pause'}
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
                            color="secondary"
                        />
                    )}
                </GameButton>
                <GameButton
                    title="Fast forward"
                    variant="outlined"
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
                        color="secondary"
                    />
                </GameButton>
                <GameButton
                    title="One step"
                    variant="outlined"
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
                    }}
                >
                    <b style={{ color: 'rgb(186, 56, 189)' }}>Step</b>
                </GameButton>
            </div>
        </div>
    );
}

export default Controls;
