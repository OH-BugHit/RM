import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { Button } from '@genai-fi/base';
import { useAtom, useSetAtom } from 'jotai';
import { ActiveSubViewAtom, AgentSettingsAtom, GameControlAtom, TutorialStepAtom } from '../../atoms/state';

const MAXSTEP = 26;
const GOTOSTEP19 = new Set([20, 21, 22]);

function TutorialControls() {
    const setControls = useSetAtom(GameControlAtom);
    const [tutorialStep, setTutorialStep] = useAtom(TutorialStepAtom);
    const setActiveStep = useSetAtom(ActiveSubViewAtom);
    const setAgentSettings = useSetAtom(AgentSettingsAtom);

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
                    if (GOTOSTEP19.has(tutorialStep)) {
                        setTutorialStep(18);
                    }
                    setTutorialStep((old) => {
                        if (old < MAXSTEP) {
                            return old + 1;
                        } else {
                            setAgentSettings((old) => {
                                return {
                                    ...old,
                                    epsilon: 0,
                                };
                            });
                            setActiveStep('interaction');
                            return MAXSTEP + 1;
                        }
                    });
                }}
            >
                Next
            </Button>

            <Button
                variant="outlined"
                onClick={() => {
                    setTutorialStep(0);
                }}
            >
                Step
            </Button>
        </div>
    );
}

export default TutorialControls;
