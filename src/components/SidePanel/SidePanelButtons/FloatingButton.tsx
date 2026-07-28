import { IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import style from './style.module.css';
import { ReactNode } from 'react';

interface FloatingButtonProps {
    position: 'top' | 'bottom';
    open: boolean;
    onClick: () => void;
    children: ReactNode;
    disabled?: boolean;
}

const rightVariants = {
    closed: {
        top: '50%',
        y: '-50%',
    },
    open: {
        top: 40,
        y: 0,
    },
};

const bottomVariants = {
    closed: {
        top: '80%',
        y: 0,
    },
    open: {
        top: '100%',
        y: 90,
        position: 'absolute',
    },
};

export default function FloatingButton({ position, open, onClick, children, disabled = false }: FloatingButtonProps) {
    return (
        <motion.div
            className={`${position === 'top' ? style.float : style.button} ${position === 'top' ? style.top : ''}`}
            variants={position === 'top' ? rightVariants : bottomVariants}
            animate={open ? 'open' : 'closed'}
            transition={{
                type: 'spring',
                stiffness: 220,
                damping: 22,
            }}
        >
            <IconButton
                className={style.icon}
                onClick={onClick}
                size="large"
                disabled={disabled}
            >
                {children}
            </IconButton>
        </motion.div>
    );
}
