import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import { Help, PercentageBar } from '@genai-fi/base';
import { useAtomValue } from 'jotai';
import { StepsProcentageAtom, TutorialStepAtom } from '../../../atoms/state';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TutorialSteps from './TutorialSteps';
interface TaskCompletionProps {
    visitedRewards: { win: boolean; pot: boolean; barkFail: boolean };
}
export default function TaskCompletion({ visitedRewards }: TaskCompletionProps) {
    const { t } = useTranslation();
    const tutorialStep = useAtomValue(TutorialStepAtom);
    const stepsProcentage = useAtomValue(StepsProcentageAtom);

    const getStepValue = () => {
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
            <h3>Tutorial completion</h3>
            <PercentageBar
                colour="green"
                value={getStepValue()} // floored in component
                style={{ borderRadius: '0.5rem' }}
            />
            <h3>Learn for 1 000 000 steps</h3>
            <TutorialSteps />
            <PercentageBar
                colour="green"
                value={stepsProcentage} // floored in component
                style={{ borderRadius: '0.5rem' }}
            />
            <h3>Receive rewards</h3>
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
                    Break a flower pot
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
                    Bark when no burglar is nearby
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
                    Scare away the burglar
                </li>
            </ul>
        </main>
    );
}
