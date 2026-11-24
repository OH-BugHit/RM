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
                    id="top-bar"
                >
                    <div
                        className={style.infoBar}
                        style={{ padding: `${s(0.45)}rem 0rem` }}
                    >
                        <div
                            className={`${style.left} ${hudVis.gameBarContent.picked ? '' : style.hidden}`}
                            style={{
                                width: `${Math.min(150, scaleWidth * 140)}px`,

                                paddingRight: s(170) / 2,
                            }}
                        >
                            <ItemProgress />
                        </div>

                        <div style={{ width: `${s(100)}px` }} />

                        <div
                            className={`${style.right} ${hudVis.gameBarContent.score ? '' : style.hidden}`}
                            style={{
                                width: `${Math.min(150, scaleWidth * 140)}px`,

                                paddingLeft: s(170) / 2,
                            }}
                        >
                            <Score toBeat={hudVis.gameBarContent.toBeat} />
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '0.2rem',
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            zIndex: 9999,
                        }}
                    ></div>
                    <div
                        className={style.clock}
                        style={{ top: `${s(64)}px` }}
                    >
                        <Stopwatch size={s(170)} />
                    </div>
                </div>
            )}
        </>
    );
}
