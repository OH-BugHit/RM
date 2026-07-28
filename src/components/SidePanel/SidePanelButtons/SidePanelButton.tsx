import { IconButton } from '@mui/material';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';
import Arrow from '../../HelperArrow/Arrow';
import { useTranslation } from 'react-i18next';

export type SidePanelContent = 'agent' | 'newTile' | 'reward' | 'settings' | 'create';

interface Props {
    icon: ReactNode;
    value: SidePanelContent;
    activeHelp?: string;
    onClick: (value: SidePanelContent) => void;
    className?: string;
    disabled?: boolean;
}

const buttonVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -15,
        scale: 0.3,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 500,
            damping: 28,
        },
    },
    exit: {
        opacity: 0,
        y: -15,
        scale: 0.3,
        transition: {
            duration: 0.15,
        },
    },
};

export function SidePanelButton({ icon, value, activeHelp, onClick, className, disabled = false }: Props) {
    const { t } = useTranslation();
    return (
        <motion.div variants={buttonVariants}>
            <IconButton
                className={className}
                onClick={() => onClick(value)}
                size="large"
                title={t(`sidePanel.buttons.${value}`)}
                disabled={disabled}
            >
                {activeHelp === value && (
                    <Arrow
                        radius={110}
                        angle={180}
                    />
                )}
                {icon}
            </IconButton>
        </motion.div>
    );
}
