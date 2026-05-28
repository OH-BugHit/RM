import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer';
import { Button, theme } from '@genai-fi/base';
import { useNavigate } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import { ThemeProvider } from '@mui/material';
import LinkButton from '../../components/LinkButton/LinkButton';

export default function Frontpage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

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
                                href="https://gen-ai.fi/en/materials/classifier-unit"
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        navigate('/start?view=concepts&subView=agent');
                    }}
                >
                    Start
                </Button>
                <Footer hideLang={false} />
            </main>
        </ThemeProvider>
    );
}
