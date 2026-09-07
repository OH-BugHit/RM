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
    const { s, scaleWidth } = useGameScale();
    const hudVis = useAtomValue(HUDvisAtom);
    return (
        <>
            {hudVis.gameBar && !hideStuff && (
                <div
                    className={style.topBar}
                    style={{ marginTop: `${s(40)}px` }}
                >
                    <div
                        className={style.infoBar}
                        style={{ padding: `${s(0.45)}rem 0rem` }}
                    >
                        <div
                            className={`${style.left} ${hudVis.gameBarContent.picked ? '' : style.hidden}`}
                            style={{
                                width: `${Math.min(370, scaleWidth * 370)}px`,
                                paddingRight: `${scaleWidth * 1}rem`,
                            }}
                        >
                            <ItemProgress />
                        </div>

                        <div style={{ width: `${s(100)}px` }} />

                        <div
                            className={`${style.right} ${hudVis.gameBarContent.score ? '' : style.hidden}`}
                            style={{
                                width: `${Math.min(700, scaleWidth * 700)}px`,
                                paddingLeft: `${scaleWidth * 1}rem`,
                            }}
                        >
                            <Score />
                        </div>
                    </div>

                    <div
                        className={style.clock}
                        style={{ padding: `${s(6)}px ${s(6)}px 0px ${s(6)}px`, top: `${s(64)}px` }}
                    >
                        <Stopwatch size={s(170)} />
                    </div>
                </div>
            )}
        </>
    );
}
