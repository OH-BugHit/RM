import style from './progress.module.css';
import { PercentageBar } from '@genai-fi/base';
import { TaskGroup } from '../../../utils/progress';
import { StoryProgress } from '../../../types';
import { useTranslation } from 'react-i18next';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { StoryProgressAtom, TextStepAtom } from '../../../atoms/uiState';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { StoryProgressField } from '../../../utils/types';
import { StepsRequiredAtom, TestAgentAtom } from '../../../atoms/gameState';
import { useGameScale } from '../../../context/GameScale/useGameScale';

interface ProgressProps {
    tasks: TaskGroup[];
}

export default function Progress({ tasks }: ProgressProps) {
    const { t } = useTranslation();
    const { s, sw, scale } = useGameScale();
    const progress = useAtomValue(StoryProgressAtom);
    const [step, setStep] = useAtom(TextStepAtom);
    const setTest = useSetAtom(TestAgentAtom);
    const progressReadyRef = useRef<boolean>(false);
    const requiredSteps = useAtomValue(StepsRequiredAtom);

    const getFieldValue = (progress: StoryProgress, field: StoryProgressField): boolean => {
        const [section, key] = field.split('.') as [keyof StoryProgress, string];

        return (progress[section] as Record<string, boolean>)[key];
    };

    // Build the current state of every task.
    const taskStates = tasks.flatMap((group) =>
        group.tasks.map((task) => ({
            ...task,
            completed: getFieldValue(progress, task.field),
        }))
    );

    const totalTasks = taskStates.length;
    const completedTasks = taskStates.filter((task) => task.completed).length;
    const totalProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    if (totalProgress === 100 && !progressReadyRef.current && requiredSteps <= step) {
        progressReadyRef.current = true;
        setTest('available');
    }

    useEffect(() => {
        progressReadyRef.current = false;
    }, [step]);

    const steppedTasks = useRef(new Set<string>());

    useEffect(() => {
        let stepsToAdd = 0;

        for (const task of taskStates) {
            if (!task.takeStep || !task.completed) {
                continue;
            }

            if (steppedTasks.current.has(task.id)) {
                continue;
            }

            steppedTasks.current.add(task.id);
            stepsToAdd++;
        }

        if (stepsToAdd > 0) {
            setStep((currentStep) => currentStep + stepsToAdd);
        }
    }, [taskStates, setStep]);

    const isGroupVisible = (group: TaskGroup, phase: number): boolean => {
        return phase >= group.visibleFrom && (group.visibleTo === undefined || phase < group.visibleTo);
    };

    return (
        <motion.div
            className={style.progressContent}
            style={{ maxWidth: `${sw(300)}px` }}
        >
            <AnimatePresence mode="popLayout">
                {tasks.map((group) => (
                    <motion.section
                        key={group.id}
                        layout
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{
                            layout: {
                                type: 'spring',
                                stiffness: 350,
                                damping: 30,
                            },
                        }}
                    >
                        <h4 className={`${isGroupVisible(group, step) ? '' : style.unactive} `}>{t(group.title)}</h4>

                        <ul
                            key={group.id}
                            style={{
                                listStyle: 'none',
                            }}
                        >
                            {group.tasks.map((task) => {
                                const completed = getFieldValue(progress, task.field);

                                return (
                                    <li
                                        key={task.id}
                                        className={`${isGroupVisible(group, step) ? '' : style.unactive} ${completed ? style.completed : ''}`}
                                    >
                                        <TaskAltIcon
                                            fontSize="small"
                                            color="success"
                                            style={{
                                                visibility: completed ? 'visible' : 'hidden',
                                                verticalAlign: 'middle',
                                                marginRight: 2,
                                                scale: Math.max(0.7, scale),
                                            }}
                                        />
                                        <p>{t(task.text)}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.section>
                ))}

                {tasks.length > 0 && <b>{t('progress.title.level')}</b>}
            </AnimatePresence>

            <PercentageBar
                colour="green"
                thickness={s(30)}
                value={totalProgress}
                style={{ borderRadius: '0.5rem', marginBottom: '0.2rem' }}
            />
        </motion.div>
    );
}
