import RewardControlContainer from '../../Controls/RewardControlContainer';
import style from '../style.module.css';
import { useTranslation } from 'react-i18next';

export default function RewardsSelector() {
    const { t } = useTranslation();

    return (
        <div className={style.selectorContainer}>
            <h1>{t('story.rewards.title')}</h1>
            <RewardControlContainer />
        </div>
    );
}
