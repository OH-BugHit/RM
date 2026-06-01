import { useAtom, useSetAtom } from 'jotai';
import { AgentSettingsAtom, TutorialPhaseAtom, TutorialStepAtom } from '../../atoms/state';
import PhaseControls from '../../components/PhaseControls/PhaseControls';

const MAXSTEP = 26;
const GOTOSTEP19 = new Set([20, 21, 22]);

function TutorialControls() {
    const [tutorialStep, setTutorialStep] = useAtom(TutorialStepAtom);
    const setActiveStep = useSetAtom(TutorialPhaseAtom);
    const setAgentSettings = useSetAtom(AgentSettingsAtom);

    const handlePrevious = () => {
        setTutorialStep((old) => {
            if (old > 0) return old - 1;
            return 0;
        });
    };

    const handleNext = () => {
        if (GOTOSTEP19.has(tutorialStep)) {
            setTutorialStep(18);
        }

        setTutorialStep((old) => {
            if (old < MAXSTEP) {
                return old + 1;
            }

            setAgentSettings((old) => ({
                ...old,
                epsilon: 0.05,
            }));

            setActiveStep('startRecap');
            return MAXSTEP + 1;
        });
    };

    return (
        <PhaseControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            disableNext={tutorialStep === 19 || tutorialStep === 24}
            disablePrevious={tutorialStep === 0 || tutorialStep === 19 || tutorialStep === 24}
        />
    );
}

export default TutorialControls;
