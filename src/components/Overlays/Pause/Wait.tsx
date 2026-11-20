import { useTranslation } from 'react-i18next';
import style from './pause.module.css';

export default function Wait({ show }: { show: boolean }) {
    const { t } = useTranslation();

    if (!show) return;
    return (
        <div className={style.wait}>
            <h1>{t('common.wait')}</h1>
        </div>
    );
}
