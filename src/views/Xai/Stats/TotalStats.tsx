import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { EpisodicDataAtom } from '../../../atoms/gameState';
import { useTranslation } from 'react-i18next';

export default function TotalStats() {
    const { t } = useTranslation();
    const episodicData = useAtomValue(EpisodicDataAtom);
    return (
        <ul className={style.stats}>
            <li>
                {t('stats.totWins')}: {episodicData?.wins}
            </li>
            <li>
                {t('stats.totLosses')}: {episodicData?.losses}
            </li>
            <li>
                {t('stats.totPots')}: {episodicData?.triggered}
            </li>
            <li>
                {t('stats.totLastEpisode')}: {episodicData?.fullEpisodeReward}
            </li>
        </ul>
    );
}
