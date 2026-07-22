import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { EpisodicDataAtom, TimeStepDataAtom } from '../../../atoms/gameState';
import { useTranslation } from 'react-i18next';
import { ActiveAgentAtom } from '../../../atoms/state';

export default function TimeStepStats() {
    const { t } = useTranslation();
    const data = useAtomValue(TimeStepDataAtom);
    const agent = useAtomValue(ActiveAgentAtom);
    const episodicData = useAtomValue(EpisodicDataAtom);

    const actionKey = data?.lastAction === 4 ? (agent?.type === 'robodog' ? 'bark' : 'shout') : data?.lastAction;

    return (
        <ul className={style.stats}>
            <li>
                <span>{t('stats.lastAction')}</span>
                <span>{t(`stats.actions.${actionKey}`)}</span>
            </li>
            <li>
                <span>{t('stats.episodicReward')}</span>
                <span>{data?.lastReward}</span>
            </li>
            <li>
                <span>{t('stats.totLastEpisode')}</span>
                <span>{episodicData?.fullEpisodeReward}</span>
            </li>
        </ul>
    );
}
