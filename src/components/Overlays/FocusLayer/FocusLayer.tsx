import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion';
import style from './focus.module.css';
import { FocusAtom } from '../../../atoms/uiState';

export default function FocusLayer() {
    const focus = useAtomValue(FocusAtom);

    return (
        <AnimatePresence>
            {focus && (
                <motion.div
                    className={style.layer}
                    initial={{
                        opacity: 0,
                        '--focus-x': `${focus.location.x}%`,
                        '--focus-y': `${focus.location.y}%`,
                        '--focus-radius': `${focus.radius}px`,
                    }}
                    animate={{
                        opacity: 1,
                        '--focus-x': `${focus.location.x}%`,
                        '--focus-y': `${focus.location.y}%`,
                        '--focus-radius': `${focus.radius}px`,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                        opacity: { duration: 0.2, ease: 'easeOut' },
                        '--focus-x': { type: 'spring', stiffness: 220, damping: 28 },
                        '--focus-y': { type: 'spring', stiffness: 220, damping: 28 },
                        '--focus-radius': { type: 'spring', stiffness: 220, damping: 28 },
                    }}
                />
            )}
        </AnimatePresence>
    );
}
