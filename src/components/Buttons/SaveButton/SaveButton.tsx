import React from 'react';
import { saveAs } from 'file-saver';
import { useTranslation } from 'react-i18next';
import { useStore } from 'jotai';
import style from './style.module.css';
import { IconButton } from '@mui/material';
import { createSave } from '../../../utils/export';
import DownloadIcon from './DownloadIcon';

interface Props {
    showText?: boolean;
    disabled?: boolean;
}

function SaveButton({ showText, disabled = false }: Props) {
    const { t } = useTranslation();
    const store = useStore();

    async function downloadResults() {
        const blob = await createSave(store);
        saveAs(blob, 'save.genai');
    }

    return (
        <IconButton
            onClick={() => downloadResults()}
            aria-label={t('menu.labels.save')}
            disabled={disabled}
        >
            <DownloadIcon size={110} />
            <p className={style.guidanceTitle}>{showText ? `${t('menu.labels.saveShort')}` : ''}</p>
        </IconButton>
    );
}

export default React.memo(SaveButton);
