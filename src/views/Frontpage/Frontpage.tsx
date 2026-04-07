import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import Footer from '../Footer/Footer';
import GameView from '../GameView/GameView';

export default function Frontpage() {
    const { t } = useTranslation();

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
                <h1 className={style.frontpageFont}>{t('common.title')}</h1>
                <GameView />
            </div>
            <Footer hideLang={false} />
        </div>
    );
}
