import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { Button } from '@genai-fi/base';
import { useSetAtom } from 'jotai';
import { ActiveSubViewAtom, GameControlAtom, TutorialStepAtom } from '../../atoms/state';

const MAXSTEP = 25;

function TutorialControls() {
    const setControls = useSetAtom(GameControlAtom);
    const setTutorialStep = useSetAtom(TutorialStepAtom);
    const setActiveStep = useSetAtom(ActiveSubViewAtom);

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
                    setTutorialStep((old) => {
                        if (old > 0) return old - 1;
                        return 0;
                    });
                }}
            >
                Previous
            </Button>
            <Button
                variant="outlined"
                onClick={() => {
                    setTutorialStep((old) => {
                        if (old < MAXSTEP) {
                            return old + 1;
                        } else {
                            setActiveStep('interaction');
                            return MAXSTEP;
                        }
                    });
                }}
            >
                Next
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

export default TutorialControls;
