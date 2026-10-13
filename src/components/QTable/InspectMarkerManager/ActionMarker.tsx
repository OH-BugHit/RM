import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import { useStore } from 'jotai';
import { AgentSettingsAtom } from '../../../atoms/state';

interface ActionMarkerProps {
    action: number;
    stateId: string;
    qValues: number[] | undefined;
}
export default function ActionMarker({ action, stateId, qValues }: ActionMarkerProps) {
    const { t } = useTranslation();

    const store = useStore();

    const epsilon = store.get(AgentSettingsAtom).epsilon ?? 0;
    const maxValue = qValues ? Math.max(...qValues) : 0;
    const bestActions = qValues ? qValues.filter((value) => value === maxValue).length : 1;

    const randomProbability = qValues ? Math.round((epsilon / qValues.length) * 1000) / 1000 : 0;

    const bestProbability = qValues
        ? Math.round((qValues[action] === maxValue ? (1 - epsilon) / bestActions : 0) * 1000) / 1000
        : 0;

    return (
        <div className={style.markerContent}>
            <div className={style.actionTitle}>
                <strong>{t(`inspectItem.actions.${action}`)}</strong>
            </div>

            <div className={style.stats}>
                <div className={style.row}>
                    <span>{t('inspectItem.text.value')}</span>
                    <strong>{qValues ? Math.round(qValues[action] * 1000) / 1000 : '-'}</strong>
                </div>

                <div className={style.row}>
                    <span>{t('inspectItem.text.epsilon')}</span>
                    <strong>{epsilon}</strong>
                </div>

                <div className={style.divider} />

                <div className={style.row}>
                    <span>{t('inspectItem.text.best')}</span>
                    <strong>{bestProbability}</strong>
                </div>

                <div className={style.row}>
                    <span>{t('inspectItem.text.random')}</span>
                    <strong>{randomProbability}</strong>
                </div>

                <div className={style.row + ' ' + style.total}>
                    <span>{t('inspectItem.text.probability')}</span>
                    <strong>{Math.round((randomProbability + bestProbability) * 1000) / 1000}</strong>
                </div>
            </div>

            <div className={style.observation}>
                <span>{t('inspectItem.text.obs')}</span>
                <code>{stateId}</code>
            </div>
        </div>
    );
}
