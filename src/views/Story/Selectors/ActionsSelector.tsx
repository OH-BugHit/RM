import style from '../style.module.css';
import { useTranslation } from 'react-i18next';

export default function ActionsSelector() {
    const { t } = useTranslation();

    return (
        <div className={style.selectorContainer}>
            <h1>{t('story.actions.title')}, Tai sit tää pois</h1>
        </div>
    );
}
