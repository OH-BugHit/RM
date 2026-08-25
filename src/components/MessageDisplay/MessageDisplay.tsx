import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useAtom } from 'jotai';
import { studentBouncerAtom } from '../../atoms/state';
import React from 'react';

interface Props {
    open: boolean;
}

function MessageDisplay({ open }: Props) {
    const { t } = useTranslation();
    const [bouncer] = useAtom(studentBouncerAtom);

    return (
        <Dialog
            open={open}
            maxWidth="md"
        >
            <DialogTitle className={style.title}>{t(`messageDisplay.title.${bouncer.message}`)}</DialogTitle>
            <DialogContent>
                <div
                    className={style.selectModelMessage}
                    role="status"
                    aria-live="assertive"
                >
                    {t(`messageDisplay.message.${bouncer.message}`)}
                </div>
                <em>{bouncer.reload ? t('messageDisplay.reload.true') : t('messageDisplay.reload.false')}</em>
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(MessageDisplay);
