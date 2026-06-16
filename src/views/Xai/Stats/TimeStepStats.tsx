import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { TimeStepDataAtom } from '../../../atoms/gameState';
import { useTranslation } from 'react-i18next';
import { ActiveAgentAtom } from '../../../atoms/state';

export default function TimeStepStats() {
    const { t } = useTranslation();
    const data = useAtomValue(TimeStepDataAtom);
    const agent = useAtomValue(ActiveAgentAtom);

    const actionKey = data?.lastAction === 4 ? (agent?.type === 'robodog' ? 'bark' : 'shout') : data?.lastAction;

    return (
        <ul className={style.stats}>
            <li>
                {t('stats.lastAction')}: {t(`stats.actions.${actionKey}`)}
            </li>
            <li>
                {t('stats.episodicReward')}: {data?.lastReward}
            </li>
        </ul>
    );
}
