import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import React, { useCallback } from 'react';
import { Alert, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { LargeButton, QRCode } from '@genai-fi/base';
import { useLocation, useNavigate } from 'react-router';
import { ActiveViewAtom } from '../../../atoms/uiState';
import { usersAtom } from '../../../atoms/state';

interface Props {
    code: string;
}

function StartDialog({ code }: Props) {
    const { t } = useTranslation();
    const showDialog = useAtomValue(ActiveViewAtom);
    const users = useAtomValue(usersAtom);

    const navigate = useNavigate();
    const location = useLocation();

    const doClose = useCallback(() => {
        const params = new URLSearchParams(location.search);
        params.set('overlay', 'none');
        navigate(`${location.pathname}?${params.toString()}`, { replace: false });
    }, [location, navigate]);
    const size =
        window.innerHeight < 760 || window.innerWidth < 800
            ? 'small'
            : window.innerHeight < 900 || window.innerWidth < 1200
              ? 'normal'
              : 'large';
    return (
        <Dialog
            open={showDialog.overlay === 'share'}
            onClose={doClose}
            maxWidth={size === 'large' || size === 'normal' ? 'md' : 'sm'}
            fullWidth={false}
        >
            <DialogTitle className={style.title}>{t('teacher.titles.connectUsers')}</DialogTitle>
            <DialogContent>
                <div className={style.connectMessage}>
                    <div className={style.column}>
                        {t('teacher.messages.scanQR')}
                        <QRCode
                            url={`${window.location.origin}/student/${code}/main?view=join`}
                            size={size}
                            label={t('teacher.aria.linkForFeed')}
                        />
                        <Alert severity="info">{t('teacher.messages.tip')}</Alert>
                    </div>
                    <div className={style.column}>
                        <div>{t('teacher.messages.connection')}</div>
                        <h2>{code}</h2>
                        <a
                            style={{ wordBreak: 'break-all' }}
                            href={window.location.origin}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <h2>{window.location.host}</h2>
                        </a>
                    </div>
                </div>
                <div className={style.userListing}>
                    {users.length === 0 && <div>{t('teacher.messages.waitingPeople')}</div>}
                    {users.length === 1 && <div>{t('teacher.messages.onePerson', { count: users.length })}</div>}
                    {users.length > 1 && <div>{t('teacher.messages.manyPeople', { count: users.length })}</div>}
                    <div className={style.buttonGroup}>
                        <LargeButton
                            variant="contained"
                            color="primary"
                            data-testid="teacher-start-button"
                            onClick={doClose}
                            title={t('common.close')}
                        >
                            {t('common.close')}
                        </LargeButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(StartDialog);
