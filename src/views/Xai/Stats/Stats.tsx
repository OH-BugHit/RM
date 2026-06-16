import style from './style.module.css';
import TotalStats from './TotalStats';
import TimeStepStats from './TimeStepStats';
import { useTranslation } from 'react-i18next';

interface StatsProps {
    width?: string;
}
export default function Stats({ width = '100%' }: StatsProps) {
    const { t } = useTranslation();
    return (
        <div
            className={style.statsContainer}
            style={{ width: width }}
        >
            <h3 style={{ margin: '0.5rem' }}>{t('stats.title')}</h3>
            <div className={style.statsContent}>
                <TimeStepStats />
                <TotalStats />
            </div>
        </div>
    );
}
