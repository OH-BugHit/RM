import RewardControl from '../../Controls/RewardControl';
import style from '../style.module.css';
import { useTranslation } from 'react-i18next';

export default function RewardsSelector() {
    const { t } = useTranslation();

    return (
        <div className={style.itemContent}>
            <h1>{t('story.rewards.title')}</h1>
            <RewardControl />
        </div>
    );
}
