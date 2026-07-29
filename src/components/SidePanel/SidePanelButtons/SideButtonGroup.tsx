import { IconButton } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import style from './style.module.css';
import { ReactNode } from 'react';

interface FloatingButtonProps {
    open: boolean;
    onClick: () => void;
    children: ReactNode;
    disabled?: boolean;
    main: React.ReactNode;
}

const groupVariants: Variants = {
    closed: {
        y: window.innerHeight / 2 - 40, // laske keskelle
        transition: {
            type: 'spring',
            stiffness: 220,
            damping: 22,
            delay: 0.05,
        },
    },
    open: {
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 220,
            damping: 22,
        },
    },
};

const listVariants: Variants = {
    closed: {
        opacity: 0,
        transition: {
            staggerChildren: 0.025,
            staggerDirection: -1,
            when: 'afterChildren',
        },
        transitionEnd: {
            display: 'none',
        },
    },
    open: {
        display: 'flex',
        opacity: 1,
        transition: {
            delayChildren: 0.2,
            staggerChildren: 0.025,
        },
    },
};

export default function SideButtonGroup({ open, onClick, children, disabled = false, main }: FloatingButtonProps) {
    return (
        <motion.div
            className={`${style.float} ${style.top}`}
            variants={groupVariants}
            animate={open ? 'open' : 'closed'}
            initial={false}
        >
            <IconButton
                className={`${style.icon} ${style.devButton}`}
                onClick={onClick}
                size="large"
                disabled={disabled}
            >
                {main}
            </IconButton>

            <motion.div
                className={style.buttonList}
                variants={listVariants}
                animate={open ? 'open' : 'closed'}
                initial={false}
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
