import { Trans, useTranslation } from 'react-i18next';
import style from './style.module.css';
import Markdown from 'react-markdown';
import Footer from '../Footer/Footer';

export default function About() {
    const { t } = useTranslation();
    return (
        <div className={style.container}>
            <main>
                <header>
                    <img
                        src="/logo192_bw.png"
                        alt="logo"
                        width={128}
                        height={128}
                    />
                    <h1>{t('about.title')}</h1>
                </header>
                <p>
                    <Trans
                        style={{ textAlign: 'left' }}
                        i18nKey="about.privacyStart"
                        components={{
                            Link: <a href="https://www.aka.fi/en/strategic-research/" />,
                            Link2: <a href="https://www.generation-ai-stn.fi/" />,
                        }}
                    />
                </p>
                <h2>{t('about.privacyTitle')}</h2>
                <Markdown>{(t('about.privacy', { returnObjects: true }) as string[]).join('\n\n')}</Markdown>
            </main>
            <Footer hideLang={false} />
        </div>
    );
}
