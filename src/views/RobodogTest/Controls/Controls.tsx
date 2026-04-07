import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { Button } from '@genai-fi/base';
import { useSetAtom } from 'jotai';
import { GameControlAtom } from '../../../atoms/state';

function Controls() {
    const setControls = useSetAtom(GameControlAtom);

    return (
        <div style={{ marginTop: 10, display: 'flex', gap: '1rem' }}>
            <Button
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
                <PlayCircleOutlineIcon />
            </Button>
            <Button
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
                <PauseCircleOutlineIcon />
            </Button>
            <Button
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
                <FastForwardIcon />
            </Button>
            <Button
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
                Step
            </Button>
        </div>
    );
}

export default Controls;
