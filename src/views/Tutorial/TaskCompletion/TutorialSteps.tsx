import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { StepsTakenAtom } from '../../../atoms/tutorialState';

export default function TutorialSteps() {
    const { t } = useTranslation();
    const steps = useAtomValue(StepsTakenAtom);

    return (
        <label>
            {t('tutorial.tasks.stepsTaken')}: {steps}
        </label>
    );
}
