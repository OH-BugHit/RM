import style from './startbox.module.css';
import { Button } from '@genai-fi/base';
import { TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { SetStateAction } from 'jotai';
import { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';
import NextArrowIcon from '../Buttons/ButtonIcons/OtherIcons/NextArrowIcon';
import { useGameScale } from '../../context/GameScale/useGameScale';

interface StartBoxProps {
    type: 'classroom' | 'single';
    setInputCode: Dispatch<SetStateAction<string>>;
    inputCode: string;
    onReady: (action: 'create' | 'join') => void;
    disabled: boolean;
    setMode?: (mode: 'multi' | 'unset') => void;
}

const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.8 },
};

export default function StartBox({ type, inputCode, setInputCode, onReady, disabled, setMode }: StartBoxProps) {
    const { t } = useTranslation();
    const { s } = useGameScale();

    return (
        <motion.div
            className={style.startBox}
            style={{ gap: `${s(2)}rem` }}
            initial="hidden"
            key="classroomLogin"
            animate="visible"
            exit="exit"
            variants={itemVariants}
            transition={{ duration: 0.25 }}
        >
            <TextField
                title={type === 'classroom' ? t('frontpage.labels.enterCode') : t('singleplayer.labels.enterCode')}
                label={type === 'classroom' ? t('frontpage.labels.enterCode') : t('singleplayer.labels.enterCode')}
                type="number"
                key="studentInput"
                className={style.codeInput}
                value={inputCode}
                fullWidth
                onChange={(e) => setInputCode(e.target.value)}
                onClick={(e) => e.stopPropagation()}
            />
            <Button
                key="loginSession"
                sx={{ minWidth: '140px' }}
                onClick={() => onReady('join')}
                variant="contained"
                disabled={inputCode.length < 5 || disabled}
                fullWidth
            >
                {t('frontpage.actions.start')}
            </Button>
            <div style={{ height: '0.5rem' }} />
            <Button
                key="createNewSession"
                sx={{ minWidth: '140px' }}
                onClick={() => onReady('create')}
                variant="outlined"
                title={type === 'classroom' ? t('frontpage.actions.createNew') : t('singleplayer.actions.createNew')}
                disabled={disabled}
                fullWidth
            >
                {type === 'classroom' ? t('frontpage.actions.createNew') : t('singleplayer.actions.createNew')}
            </Button>
            {setMode && (
                <Button
                    className={style.arrowButton}
                    onClick={() => setMode('unset')}
                    key="goBackToMode"
                >
                    <NextArrowIcon
                        size={40}
                        ready={true}
                    />
                </Button>
            )}
        </motion.div>
    );
}
