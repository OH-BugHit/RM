import AgentControl from '../../Controls/AgentControl';
import style from '../style.module.css';
import { useTranslation } from 'react-i18next';

export default function ActionsSelector() {
    const { t } = useTranslation();

    return (
        <div className={style.itemContent}>
            <h1>{t('story.actions.title')}</h1>
            <AgentControl />
        </div>
    );
}
