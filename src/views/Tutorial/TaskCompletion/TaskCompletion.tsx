import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import { Help, PercentageBar } from '@genai-fi/base';
import { useAtomValue } from 'jotai';
import { StepsProcentageAtom, TutorialStepAtom, VisitedRewardsAtom } from '../../../atoms/tutorialState';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TutorialSteps from './TutorialSteps';

export default function TaskCompletion() {
    const { t } = useTranslation();
    const visitedRewards = useAtomValue(VisitedRewardsAtom);
    const tutorialStep = useAtomValue(TutorialStepAtom);
    const stepsProcentage = useAtomValue(StepsProcentageAtom);

    const getStepValue = () => {
        if (tutorialStep > 18 && tutorialStep < 23) {
            let additional = 0;
            if (visitedRewards.win) additional += 1;
            if (visitedRewards.pot) additional += 1;
            if (visitedRewards.barkFail) additional += 1;
            return ((18 + additional) / 27) * 100;
        }
        return (tutorialStep / 27) * 100;
    };

    return (
        <main className={style.content}>
            <h2 style={{ display: 'inline-flex', justifyContent: 'center', marginLeft: '8px' }}>
                {t('tutorial.tasks.title')}
                <span>
                    <Help
                        inplace
                        message={t('tutorial.hints.tasks')}
                    />
                </span>
            </h2>
            <h3>{t('tutorial.tasks.tutorialCompletion')}</h3>
            <PercentageBar
                colour="green"
                value={getStepValue()} // floored in component
                style={{ borderRadius: '0.5rem' }}
            />

            {tutorialStep > 14 && (
                <>
                    <h3>{t('tutorial.tasks.receiveRewards')}</h3>
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                        <li>
                            <TaskAltIcon
                                fontSize="small"
                                color="success"
                                style={{
                                    visibility: visitedRewards.pot ? 'visible' : 'hidden',
                                    verticalAlign: 'middle',
                                    marginRight: 4,
                                }}
                            />
                            {t('tutorial.tasks.taskPot')}
                        </li>

                        <li>
                            <TaskAltIcon
                                fontSize="small"
                                color="success"
                                style={{
                                    visibility: visitedRewards.barkFail ? 'visible' : 'hidden',
                                    verticalAlign: 'middle',
                                    marginRight: 4,
                                }}
                            />
                            {t('tutorial.tasks.taskBark')}
                        </li>

                        <li>
                            <TaskAltIcon
                                fontSize="small"
                                color="success"
                                style={{
                                    visibility: visitedRewards.win ? 'visible' : 'hidden',
                                    verticalAlign: 'middle',
                                    marginRight: 4,
                                }}
                            />
                            {t('tutorial.tasks.taskScare')}
                        </li>
                    </ul>
                </>
            )}
            {tutorialStep > 17 && (
                <>
                    <h3>
                        {t('tutorial.tasks.stepsTask')} 1 000 000 {t('tutorial.tasks.steps')}
                    </h3>
                    <TutorialSteps />
                    <PercentageBar
                        colour="green"
                        value={stepsProcentage} // floored in component
                        style={{ borderRadius: '0.5rem' }}
                    />
                </>
            )}
        </main>
    );
}
