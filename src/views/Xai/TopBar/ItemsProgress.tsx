import { useAtomValue } from 'jotai';
import style from './style.module.css';
import { TopbarAtom } from '../../../atoms/uiState';
import { useGameScale } from '../../../context/GameScale/useGameScale';

export default function ItemProgress() {
    const { s } = useGameScale();
    const state = useAtomValue(TopbarAtom);

    return (
        <div
            className={style.itemContainer}
            style={{ fontSize: `${s(2.5)}rem` }}
        >
            <div className={style.itemElement}>
                <b>-1</b>
                <b className={style.traps}>{state.traps}</b>
            </div>
            <div className={style.itemElement}>
                <b>+1</b>
                <b className={style.treasures}>{state.treasures}</b>
            </div>
            <div className={style.itemElement}>
                <b>+2</b>
                <b className={style.bigTreasures}>{state.bigTreasures}</b>
            </div>
        </div>
    );
}
