import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer';
import { Button, theme } from '@genai-fi/base';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import { TextField, ThemeProvider } from '@mui/material';
import LinkButton from '../../components/Buttons/LinkButton/LinkButton';
import Phase from './Phase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Frontpage() {
    const { t } = useTranslation();
    const [inputCode, setInputCode] = useState<string>('');
    const navigate = useNavigate();

    const toStudent = () => {
        navigate(`/student/${inputCode}/main`);
    };

    const toTeacher = () => {
        navigate('/library/');
    };

    const logoSize = Math.min(192, window.innerWidth * 0.3);

    return (
        <ThemeProvider theme={theme}>
            <main className={style.homeContainer}>
                <div className={style.header}>
                    <img
                        src="/logo192.png"
                        alt="GenAI logo"
                        width={logoSize}
                        height={logoSize}
                    />
                    <div className={style.headerColumn}>
                        <h1>{t('common.title')}</h1>
                        <h2>{t('common.subtitle')}</h2>
                        <div className={style.buttons}>
                            <LinkButton
                                href="https://gen-ai.fi/en/"
                                startIcon={<SchoolIcon />}
                            >
                                {t('app.teachingMaterials')}
                            </LinkButton>
                            <LinkButton
                                href="https://github.com/OH-BugHit/BM"
                                startIcon={<GitHubIcon />}
                            >
                                {t('app.github')}
                            </LinkButton>
                        </div>
                    </div>
                </div>
                <div className={style.selectGroup}>
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
                    <div className={style.intro}>{t('app.goPhase')}</div>
                    <div className={style.cards}>
                        <Phase
                            id="yourWorld"
                            image="images/environments/potsAndBurglar.png"
                            url="/student"
                        />
                        <Phase
                            id="import"
                            image="images/environments/potsAndBurglar.png"
                            url="/import"
                        />
                        <Phase
                            id="recap"
                            image="images/environments/potsAndBurglar.png"
                            url="/start?view=tutorial"
                        />
                    </div>
                </div>

                <Footer hideLang={false} />
            </main>
        </ThemeProvider>
    );
}
