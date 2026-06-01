import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { TutorialStepAtom } from '../../../atoms/state';
import { AnimatePresence, motion } from 'framer-motion';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const conceptItems = [
    { step: 2, key: 'agent', label: 'tutorial.concepts.agent' },
    { step: 6, key: 'task', label: 'tutorial.concepts.task' },
    { step: 7, key: 'observation', label: 'tutorial.concepts.observation' },
    { step: 7, key: 'step', label: 'tutorial.concepts.timeStep' },
    { step: 10, key: 'environment', label: 'tutorial.concepts.environment' },
    { step: 10, key: 'state', label: 'tutorial.concepts.state' },
    { step: 12, key: 'rl', label: 'tutorial.concepts.reinforcementLearning' },
    { step: 15, key: 'action', label: 'tutorial.concepts.action' },
    { step: 15, key: 'reward', label: 'tutorial.concepts.reward' },
    { step: 18, key: 'episode', label: 'tutorial.concepts.episode' },
];

const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
};

export default function TutorialConcepts() {
    const { t } = useTranslation();
    const tutorialStep = useAtomValue(TutorialStepAtom);

    return (
        <main className={style.content}>
            <h2>{t('tutorial.concepts.title')}</h2>

            <ul>
                <AnimatePresence>
                    {conceptItems
                        .filter((item) => tutorialStep >= item.step)
                        .map((item) => (
                            <motion.li
                                key={item.key}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={itemVariants}
                                transition={{ duration: 0.25 }}
                            >
                                <TaskAltIcon
                                    fontSize="small"
                                    color="success"
                                    style={{
                                        verticalAlign: 'middle',
                                        marginRight: 4,
                                    }}
                                />{' '}
                                {t(item.label)}
                            </motion.li>
                        ))}
                </AnimatePresence>
            </ul>
        </main>
    );
}
