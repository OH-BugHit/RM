import { Button } from '@genai-fi/base';
import ReplayIcon from '@mui/icons-material/Replay';
import { useSetAtom } from 'jotai';
import { AgentSettingsAtom, GameControlAtom } from '../../atoms/state';
import { StepsTakenAtom, TutorialPhaseAtom, TutorialStepAtom } from '../../atoms/tutorialState';
import { defaultAgentSettings, defaultControls } from '../../utils/defaults';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';

function ReplayTutorial() {
    const { t } = useTranslation();
    const setTutorialStep = useSetAtom(TutorialStepAtom);
    const setStepsTaken = useSetAtom(StepsTakenAtom);
    const setAgentSettings = useSetAtom(AgentSettingsAtom);
    const setTutorialPhase = useSetAtom(TutorialPhaseAtom);
    const setControls = useSetAtom(GameControlAtom);

    const handleReset = () => {
        setTutorialStep(0);
        setAgentSettings(defaultAgentSettings);
        setStepsTaken(0);
        setTutorialPhase('basics');
        setControls(defaultControls);
        window.location.reload();
    };

    return (
        <Tooltip title={t('tutorial.actions.replayTutorial')}>
            <Button
                className={style.button}
                style={{ position: 'absolute', right: '0.2rem', top: '0.2rem' }}
                onClick={() => handleReset()}
            >
                <ReplayIcon />
            </Button>
        </Tooltip>
    );
}

export default ReplayTutorial;
