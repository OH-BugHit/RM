import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer';
import { theme } from '@genai-fi/base';
import GitHubIcon from '@mui/icons-material/GitHub';
import SchoolIcon from '@mui/icons-material/School';
import { ThemeProvider } from '@mui/material';
import LinkButton from '../../components/Buttons/LinkButton/LinkButton';
import Phase from './Phase';
import { ActiveAgentAtom, ActiveEnvironmentAtom } from '../../atoms/state';
import { useSetAtom } from 'jotai';
import { EnvironmentTypes } from '../../types';
import { getAgentImage } from '../../components/GameComponents/agentProps';

export default function Frontpage() {
    const { t } = useTranslation();
    const setEnvironment = useSetAtom(ActiveEnvironmentAtom);
    const setAgent = useSetAtom(ActiveAgentAtom);
    const setPremade = (type: EnvironmentTypes) => {
        switch (type) {
            case 'potsAndBurglar': {
                setEnvironment({
                    name: 'Home',
                    type: 'potsAndBurglar',
                });
                setAgent({
                    img: getAgentImage({ type: 'robodog' }),
                    name: 'Robo-Dog',
                    type: 'robodog',
                    observationShape: 'small',
                });
                break;
            }
            case 'created': {
                setEnvironment({
                    name: '',
                    type: 'created',
                });
                setAgent({
                    img: undefined,
                    name: '',
                    type: 'unset',
                    observationShape: 'unset',
                });
                break;
            }
        }
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
                <div className={style.selectGroup}>
                    <div className={style.intro}>{t('app.goPhase')}</div>
                    <div className={style.cards}>
                        <Phase
                            id="tutorial"
                            image="images/environments/potsAndBurglar.png"
                            url="/start?view=tutorial"
                        />
                        <Phase
                            id="yourWorld"
                            image="images/environments/potsAndBurglar.png"
                            url="/play"
                            onClick={() => setPremade('created')}
                        />
                        <Phase
                            id="potsAndBurglar"
                            image="images/environments/potsAndBurglar.png"
                            url="/play"
                            onClick={() => setPremade('potsAndBurglar')}
                        />
                    </div>
                </div>

                <Footer hideLang={false} />
            </main>
        </ThemeProvider>
    );
}
