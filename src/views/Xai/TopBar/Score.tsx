import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { TopbarAtom } from '../../../atoms/uiState';
import { useTranslation } from 'react-i18next';
export default function Score() {
    const { t } = useTranslation();
    const state = useAtomValue(TopbarAtom);

    return (
        <div className={style.itemContainer}>
            <div className={style.itemElement}>
                <b>{t('topBar.score.gained')}</b>
                <b className={style.gained}>{state.score}</b>
            </div>
            <div className={style.itemElement}>
                <b>{t('topBar.score.top')}</b>
                <b className={style.topScore}>{state.topScore}</b>
            </div>
            <div className={style.itemElement}>
                <b>{t('topBar.score.toBeat')}</b>
                <b className={style.toBeat}>{state.toBeat}</b>
            </div>
        </div>
    );
}
