import style from './style.module.css';
import { IconButton } from '@mui/material';
import { ReactNode } from 'react';
import Arrow from '../../HelperArrow/Arrow';
import { useTranslation } from 'react-i18next';
import { motion, Variants } from 'framer-motion';

export type SidePanelContent = 'agent' | 'design' | 'newTile' | 'reward' | 'settings' | 'create' | 'save';

interface Props {
    icon: ReactNode;
    value: SidePanelContent;
    activeHelp?: string;
    onClick: (value: SidePanelContent) => void;
    className?: string;
    disabled?: boolean;
    selected?: boolean;
}

const itemVariants: Variants = {
    closed: {
        opacity: 0,
        y: -10,
        scale: 0.9,
    },
    open: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
};

export function SidePanelButton({
    icon,
    value,
    activeHelp,
    onClick,
    className,
    disabled = false,
    selected = false,
}: Props) {
    const { t } = useTranslation();
    return (
        <motion.div variants={itemVariants}>
            <IconButton
                className={`${className} ${selected ? style.selected : ''}`}
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
