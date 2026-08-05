import { useAtomValue } from 'jotai';
import style from './style.module.css';
import { TopbarAtom } from '../../../atoms/uiState';

export default function ItemProgress() {
    const state = useAtomValue(TopbarAtom);

    return (
        <div className={style.itemContainer}>
            <div className={style.itemElement}>
                <b>Traps</b>
                <b className={style.traps}>{state.traps}</b>
            </div>
            <div className={style.itemElement}>
                <b>Treasures</b>
                <b className={style.treasures}>{state.treasures}</b>
            </div>
            <div className={style.itemElement}>
                <b>Big treasures</b>
                <b className={style.bigTreasures}>{state.bigTreasures}</b>
            </div>
        </div>
    );
}
