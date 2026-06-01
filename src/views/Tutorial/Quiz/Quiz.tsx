// SITUATION => STATE
import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import { useSetAtom } from 'jotai';
import { TutorialPhaseAtom } from '../../../atoms/state';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PhaseControls from '../../../components/PhaseControls/PhaseControls';
import { FormLabel } from '@mui/material';
import { Button } from '@genai-fi/base';

const quizItems = [
    {
        step: 1,
        question: 'tutorial.quiz.1.title',
        options: [
            { label: 'tutorial.quiz.1.option1', correct: false },
            { label: 'tutorial.quiz.1.option2', correct: true },
            { label: 'tutorial.quiz.1.option3', correct: false },
        ],
    },
    {
        step: 2,
        question: 'tutorial.quiz.2.title',
        options: [
            { label: 'tutorial.quiz.2.option1', correct: true },
            { label: 'tutorial.quiz.2.option2', correct: false },
            { label: 'tutorial.quiz.2.option3', correct: false },
        ],
    },
    {
        step: 3,
        question: 'tutorial.quiz.3.title',
        options: [
            { label: 'tutorial.quiz.3.option1', correct: false },
            { label: 'tutorial.quiz.3.option2', correct: false },
            { label: 'tutorial.quiz.3.option3', correct: true },
        ],
    },
];

const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
};

export default function Quiz() {
    const { t } = useTranslation();
    const setTutorialPhase = useSetAtom(TutorialPhaseAtom);
    const [recapPhase, setRecapPhase] = useState(0);
    const [answerCorrect, setAnswerCorrect] = useState(true);
    const [ready, setReady] = useState(false);

    const [reward, setReward] = useState<null | {
        id: string;
        correct: boolean;
        x: number;
        y: number;
    }>(null);

    const scrollRef = useRef<HTMLDivElement | null>(null);

    const onSelectOption = (isCorrect: boolean, e: React.MouseEvent) => {
        setAnswerCorrect(isCorrect);

        setReward({
            id: crypto.randomUUID(),
            correct: isCorrect,
            x: e.clientX,
            y: e.clientY,
        });
    };

    useEffect(() => {
        requestAnimationFrame(() => {
            const el = scrollRef.current;
            if (!el) return;

            el.scrollTo({
                top: el.scrollHeight,
                behavior: 'smooth',
            });
        });
    }, [recapPhase]);

    useEffect(() => {
        setTutorialPhase('quiz'); // Hide button with changing phase
    }, [setTutorialPhase]);

    const onPrevious = () => {
        setRecapPhase(Math.max(recapPhase - 1, 0));
        setAnswerCorrect(false);
    };

    const onNext = () => {
        if (!answerCorrect) return;

        setReward(null);
        setAnswerCorrect(false);

        if (recapPhase > 2) {
            setTutorialPhase('ready');
            setReady(true);
            return;
        }

        setRecapPhase(Math.min(recapPhase + 1, 3));
    };

    return (
        <main className={style.content}>
            <h2>{t('tutorial.quiz.title')}</h2>

            <div
                className={style.content}
                ref={scrollRef}
            >
                <AnimatePresence>
                    {quizItems
                        .filter((item) => recapPhase >= item.step)
                        .map((item) => (
                            <motion.div
                                key={item.step}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={itemVariants}
                                transition={{ duration: 0.25 }}
                            >
                                <FormLabel>{t(item.question)}</FormLabel>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {item.options.map((opt, idx) => (
                                        <Button
                                            key={idx}
                                            onClick={(e) => onSelectOption(opt.correct, e)}
                                            variant="contained"
                                            fullWidth
                                        >
                                            {t(opt.label)}
                                        </Button>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>

            {/* REWARD ANIMATION */}
            <AnimatePresence>
                {reward && (
                    <motion.div
                        key={reward.id}
                        style={{
                            position: 'fixed',
                            left: reward.x,
                            top: reward.y,
                            pointerEvents: 'none',
                            fontSize: '2rem',
                            zIndex: 10,
                        }}
                        initial={{ opacity: 1, y: 0, scale: 0.8 }}
                        animate={{ opacity: 0, y: -40, scale: 1.2 }}
                        transition={{ duration: 1 }}
                        onAnimationComplete={() => setReward(null)}
                    >
                        {reward.correct ? '💚' : '💔'}
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ flexGrow: 1 }} />

            <PhaseControls
                onPrevious={onPrevious}
                removePrevious={true}
                hideNext={ready}
                disableNext={!answerCorrect}
                onNext={onNext}
            />
        </main>
    );
}
