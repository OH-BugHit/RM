import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import style from './style.module.css';

interface SideButtonMenuProps {
    open: boolean;
    position: 'right' | 'bottom';
    children: ReactNode;
    design?: ReactNode;
    designShown?: boolean;
}

const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.12,
            staggerChildren: 0.08,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

export default function SideButtonMenu({ open, position, children, design, designShown = false }: SideButtonMenuProps) {
    return (
        <AnimatePresence>
            <motion.div
                className={position === 'right' ? style.topButtonList : style.bottomButtonList}
                style={{
                    y: position === 'right' ? -90 : 90,
                }}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {open && <>{children}</>}
                {designShown && <>{design}</>}
            </motion.div>
        </AnimatePresence>
    );
}
