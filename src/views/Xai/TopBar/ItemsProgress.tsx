import { useAtomValue } from 'jotai';
import style from './style.module.css';
import { TopbarAtom } from '../../../atoms/uiState';
import { useGameScale } from '../../../context/GameScale/useGameScale';
import { useTranslation } from 'react-i18next';

export default function ItemProgress() {
    const { s } = useGameScale();
    const { t } = useTranslation();
    const state = useAtomValue(TopbarAtom);

    return (
        <div
            className={style.itemContainerLeft}
            style={{ fontSize: `${s(2.5)}rem` }}
        >
            <div className={style.itemElement}>
                <b>{t('topBar.score.gained')}</b>
                <b className={style.gained}>{state.score}</b>
            </div>
        </div>
    );
}
