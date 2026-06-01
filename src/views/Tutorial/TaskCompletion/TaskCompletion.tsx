import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import { PercentageBar } from '@genai-fi/base';
import { useAtomValue } from 'jotai';
import { StepsTakenAtom, TutorialStepAtom } from '../../../atoms/state';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
interface TaskCompletionProps {
    visitedRewards: { win: boolean; pot: boolean; barkFail: boolean };
}
export default function TaskCompletion({ visitedRewards }: TaskCompletionProps) {
    const { t } = useTranslation();
    const tutorialStep = useAtomValue(TutorialStepAtom);
    const steps = useAtomValue(StepsTakenAtom);

    return (
        <main className={style.content}>
            <h2>{t('tutorial.tasks.title')}</h2>
            <h3>Tutorial completion</h3>
            <PercentageBar
                colour="green"
                value={(tutorialStep / 27) * 100} // floored in component
                style={{ borderRadius: '0.5rem' }}
            />
            <h3>Learn for 1 000 000 steps</h3>
            <label>Learning steps taken: {steps}</label>
            <PercentageBar
                colour="green"
                value={steps / 10000} // floored in component
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
