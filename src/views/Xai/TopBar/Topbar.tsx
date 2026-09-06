import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { HUDvisAtom } from '../../../atoms/uiState';
import Stopwatch from '../../../components/StopWatch/StopWatch';
import ItemProgress from './ItemsProgress';
import Score from './Score';
import { useGameScale } from '../../../context/GameScale/useGameScale';

interface EnvironmentProps {
    hideStuff: boolean;
}
export default function TopBar({ hideStuff }: EnvironmentProps) {
    const { s } = useGameScale();
    const hudVis = useAtomValue(HUDvisAtom);
    return (
        <>
            {hudVis.gameBar && !hideStuff && (
                <div
                    className={style.topBar}
                    style={{ marginTop: `${s(40)}px` }}
                >
                    <div className={style.infoBar}>
                        <div
                            className={`${style.left} ${hudVis.gameBarContent.picked ? '' : style.hidden}`}
                            style={{ width: `${s(370)}px`, paddingRight: `${s(1)}rem` }}
                        >
                            <ItemProgress />
                        </div>

                        <div style={{ width: `${s(100)}px` }} />

                        <div
                            className={`${style.right} ${hudVis.gameBarContent.score ? '' : style.hidden}`}
                            style={{ width: `${s(700)}px`, paddingLeft: `${s(1)}rem` }}
                        >
                            <Score />
                        </div>
                    </div>

                    <div
                        className={style.clock}
                        style={{ padding: `${s(8)}px ${s(6)}px 0 ${s(6)}px` }}
                    >
                        <Stopwatch size={s(170)} />
                    </div>
                </div>
            )}
        </>
    );
}
