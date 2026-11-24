import { useLayoutEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion';
import style from './focus.module.css';
import { FocusAtom } from '../../../atoms/uiState';

type FocusGeometry = {
    x: string;
    y: string;
    radius: number;
};

export default function FocusLayer() {
    const focus = useAtomValue(FocusAtom);
    const [geometry, setGeometry] = useState<FocusGeometry | null>(null);

    useLayoutEffect(() => {
        if (!focus) {
            setGeometry(null);
            return;
        }

        if (!('id' in focus)) {
            setGeometry({
                x: `${focus.location.x}%`,
                y: `${focus.location.y}%`,
                radius: focus.radius,
            });
            return;
        }

        const element = document.getElementById(focus.id);
        if (!element) {
            console.error(`Focus target element with id "${focus.id}" was not found.`);
            setGeometry(null);
            return;
        }

        const rect = element.getBoundingClientRect();
        setGeometry({
            x: `${rect.left + rect.width / 2}px`,
            y: `${rect.top + rect.height / 2}px`,
            radius: Math.max(rect.width, rect.height) + focus.padding,
        });
    }, [focus]);

    return (
        <AnimatePresence>
            {focus && geometry && (
                <motion.div
                    className={style.layer}
                    initial={{
                        opacity: 0,
                        '--focus-x': geometry.x,
                        '--focus-y': geometry.y,
                        '--focus-radius': `${geometry.radius}px`,
                    }}
                    animate={{
                        opacity: 1,
                        '--focus-x': geometry.x,
                        '--focus-y': geometry.y,
                        '--focus-radius': `${geometry.radius}px`,
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
