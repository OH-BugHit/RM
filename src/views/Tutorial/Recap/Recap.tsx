// SITUATION => STATE
import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import { useSetAtom } from 'jotai';
import { TutorialPhaseAtom } from '../../../atoms/state';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PhaseControls from '../../../components/PhaseControls/PhaseControls';

const conceptItems = [
    { step: 0, key: 'agent', label: 'tutorial.recap.1' },
    { step: 1, key: 'task', label: 'tutorial.recap.2' },
    { step: 2, key: 'observation', label: 'tutorial.recap.3' },
    { step: 3, key: 'step', label: 'tutorial.recap.4' },
    { step: 4, key: 'environment', label: 'tutorial.recap.5' },
    { step: 5, key: 'episode', label: 'tutorial.recap.6' },
];
const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
};

export default function Recap() {
    const { t } = useTranslation();
    const setTutorialPhase = useSetAtom(TutorialPhaseAtom);
    const [recapPhase, setRecapPhase] = useState(0);
    const scrollRef = useRef<HTMLDivElement | null>(null);

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
        // Hide start recap button when recap starts
        setTutorialPhase('recap');
    }, [setTutorialPhase]);

    const onPrevious = () => {
        setRecapPhase(Math.max(recapPhase - 1, 0));
    };

    const onNext = () => {
        // Recap completed
        if (recapPhase > 4) setTutorialPhase('ready');
        setRecapPhase(Math.min(recapPhase + 1, 6));
    };

    return (
        <main className={style.content}>
            <h2>{t('tutorial.recap.title')}</h2>
            <div
                className={style.content}
                ref={scrollRef}
            >
                <AnimatePresence>
                    {conceptItems
                        .filter((item) => recapPhase >= item.step)
                        .map((item) => (
                            <motion.p
                                key={item.key}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={itemVariants}
                                transition={{ duration: 0.25 }}
                            >
                                {t(item.label)}
                            </motion.p>
                        ))}
                </AnimatePresence>
            </div>
            <div style={{ flexGrow: 1 }} />
            <PhaseControls
                onPrevious={() => onPrevious()}
                hidePrevious={true}
                disableNext={recapPhase === 6}
                onNext={() => onNext()}
            />
        </main>
    );
}
