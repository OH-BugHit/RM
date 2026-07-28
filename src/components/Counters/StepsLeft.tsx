import { useAtomValue } from 'jotai';
import style from './style.module.css';
import { StepsLeftAtom } from '../../atoms/gameState';
import { DesignOpenAtom, HUDvisAtom } from '../../atoms/uiState';
export default function StepsLeft() {
    const stepsLeft = useAtomValue(StepsLeftAtom);
    const hudVis = useAtomValue(HUDvisAtom);
    const design = useAtomValue(DesignOpenAtom);
    if (!hudVis.charts || design) return null;
    return (
        <div className={style.container}>
            <h1>{stepsLeft}</h1>
        </div>
    );
}
