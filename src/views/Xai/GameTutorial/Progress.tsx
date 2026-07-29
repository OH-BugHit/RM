import style from './style.module.css';
import { PercentageBar } from '@genai-fi/base';
import { StoryProgressField, TASK_GROUPS, TaskGroup } from '../../../utils/progress';
import { StoryProgress } from '../../../types';
import { useTranslation } from 'react-i18next';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useAtomValue } from 'jotai';
import { StoryProgressAtom, StoryStepAtom } from '../../../atoms/uiState';
import { AnimatePresence, motion } from 'framer-motion';

export default function Progress() {
    const { t } = useTranslation();
    const progress = useAtomValue(StoryProgressAtom);
    const phase = useAtomValue(StoryStepAtom);

    const getFieldValue = (progress: StoryProgress, field: StoryProgressField): boolean => {
        const [section, key] = field.split('.') as [keyof StoryProgress, string];

        return (progress[section] as Record<string, boolean>)[key];
    };

    const isGroupVisible = (group: TaskGroup, phase: number): boolean => {
        return phase >= group.visibleFrom && (group.visibleTo === undefined || phase < group.visibleTo);
    };

    return (
        <motion.div className={style.progressContent}>
            <AnimatePresence mode="popLayout">
                {TASK_GROUPS.filter((group) => isGroupVisible(group, phase)).map((group) => (
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
                        <h4>{t(`${group.title}`)}</h4>
                        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                            {group.tasks.map((task) => {
                                const completed = getFieldValue(progress, task.field);

                                return (
                                    <li key={task.id}>
                                        <TaskAltIcon
                                            fontSize="small"
                                            color="success"
                                            style={{
                                                visibility: completed ? 'visible' : 'hidden',
                                                verticalAlign: 'middle',
                                                marginRight: 4,
                                            }}
                                        />
                                        {t(task.text)}
                                    </li>
                                );
                            })}
                        </ul>
                        {group.tasks.length > 0 && (
                            <>
                                <b>Current progression</b>
                                <PercentageBar
                                    colour="green"
                                    value={
                                        (group.tasks.filter((task) => getFieldValue(progress, task.field)).length /
                                            group.tasks.length) *
                                        100
                                    }
                                    style={{ borderRadius: '0.5rem' }}
                                />
                            </>
                        )}
                    </motion.section>
                ))}
            </AnimatePresence>{' '}
            <b>Total progression</b>
            <PercentageBar
                colour="blue"
                value={(phase / 20) * 100}
                style={{ borderRadius: '0.5rem', marginBottom: '0.5rem' }}
            />
        </motion.div>
    );
}
