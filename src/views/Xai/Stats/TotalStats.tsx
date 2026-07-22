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
                <span>{t('stats.totLosses')}</span>
                <span>{episodicData?.losses}</span>
            </li>
            <li>
                <span>{t('stats.totTriggers')}</span>
                <span>{episodicData?.triggered}</span>
            </li>
            <li>
                <span>{t('stats.totEpisodes')}</span>
                <span>{(episodicData?.losses ?? 0) + (episodicData?.triggered ?? 0)}</span>
            </li>
        </ul>
    );
}
