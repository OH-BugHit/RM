import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import style from './pause.module.css';
import { configAtom } from '../../atoms/state';

export default function PauseLayer() {
    const { t } = useTranslation();
    const config = useAtomValue(configAtom);

    return <>{config.pause && <div className={style.pauseLayer}>{t('common.paused')}</div>}</>;
}
