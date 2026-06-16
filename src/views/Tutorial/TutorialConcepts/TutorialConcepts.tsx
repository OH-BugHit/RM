import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { TutorialStepAtom } from '../../../atoms/tutorialState';
import { AnimatePresence, motion } from 'framer-motion';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Help } from '@genai-fi/base';

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
    locked: {
        opacity: 0.35,
        x: 0,
        transition: { duration: 0 },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.4 },
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: { duration: 0.4 },
    },
};

export default function TutorialConcepts() {
    const { t } = useTranslation();
    const tutorialStep = useAtomValue(TutorialStepAtom);

    return (
        <main className={style.content}>
            <h2 style={{ display: 'inline-flex', justifyContent: 'center', marginLeft: '8px' }}>
                {t('tutorial.concepts.title')}
                <span>
                    <Help
                        inplace
                        message={t('tutorial.hints.concepts')}
                    />
                </span>
            </h2>

            <ul>
                <AnimatePresence>
                    {conceptItems.map((item) => {
                        const isActive = tutorialStep >= item.step;

                        return (
                            <motion.li
                                key={item.key}
                                initial={false}
                                animate={isActive ? 'visible' : 'locked'}
                                exit="exit"
                                variants={itemVariants}
                            >
                                <TaskAltIcon
                                    fontSize="small"
                                    color="success"
                                    style={{
                                        verticalAlign: 'middle',
                                        marginRight: 4,
                                        opacity: tutorialStep >= item.step ? 1 : 0,
                                        transition: 'opacity 0.4s ease',
                                    }}
                                />
                                <span style={{ opacity: isActive ? 1 : 0.5 }}>{t(item.label)}</span>
                            </motion.li>
                        );
                    })}
                </AnimatePresence>
            </ul>
        </main>
    );
}
