import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { Button } from '@genai-fi/base';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { TextField } from '@mui/material';
import Footer from '../Footer/Footer';

export default function Frontpage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [inputCode, setInputCode] = useState<string>('');

    const toStudent = () => {
        navigate(`/student/${inputCode}/main`);
    };

    const toTeacher = () => {
        navigate('/library/');
    };

    const logoSize = Math.min(192, window.innerWidth * 0.3);

    return (
        <div className={style.frontpage}>
            <div className={style.content}>
                <div className={style.logo}>
                    <img
                        src="/logo192.png"
                        alt="logo"
                        width={logoSize}
                        height={logoSize}
                    />
                </div>
                <h1>{t('common.title')}</h1>
                <div className={style.startBox}>
                    <TextField
                        title={t('frontpage.labels.enterCode')}
                        label={t('frontpage.labels.enterCode')}
                        type="number"
                        className={style.codeInput}
                        value={inputCode}
                        fullWidth
                        onChange={(e) => setInputCode(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <Button
                        sx={{ fontSize: '14pt', minWidth: '140px' }}
                        onClick={toStudent}
                        variant="contained"
                        disabled={inputCode.length < 5}
                    >
                        {t('frontpage.actions.start')}
                    </Button>
                    <div className={style.or}>{t('common.or')}</div>
                    <Button
                        sx={{ fontSize: '14pt', minWidth: '140px' }}
                        onClick={toTeacher}
                        variant="outlined"
                        title={t('frontpage.actions.createNew')}
                    >
                        {t('frontpage.actions.createNew')}
                    </Button>
                </div>
            </div>
            <Footer hideLang={false} />
        </div>
    );
}
