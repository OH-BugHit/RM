import style from './style.module.css';
import TotalStats from './TotalStats';
import TimeStepStats from './TimeStepStats';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { StatsContentAtom } from '../../../atoms/uiState';

interface StatsProps {
    width?: string;
}
export default function Stats({ width = '100%' }: StatsProps) {
    const { t } = useTranslation();
    const statsContent = useAtomValue(StatsContentAtom);
    return (
        <div
            className={style.statsContainer}
            style={{ width: width }}
        >
            {statsContent.mode === 'stats' && <h3 style={{ margin: '0.5rem' }}>t('stats.title')</h3>}
            <div className={style.statsContent}>
                {statsContent.mode === 'stats' ? (
                    <>
                        <TimeStepStats />
                        <TotalStats />
                    </>
                ) : (
                    <p>{t(`story.text.${statsContent.phase}`)}</p>
                )}
            </div>
        </div>
    );
}
