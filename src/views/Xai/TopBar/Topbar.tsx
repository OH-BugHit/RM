import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { HUDvisAtom } from '../../../atoms/uiState';
import Stopwatch from '../../../components/StopWatch/StopWatch';
import ItemProgress from './ItemsProgress';
import Score from './Score';

interface EnvironmentProps {
    hideStuff: boolean;
}
export default function TopBar({ hideStuff }: EnvironmentProps) {
    const hudVis = useAtomValue(HUDvisAtom);
    return (
        <>
            {hudVis.gameBar && !hideStuff && (
                <div className={style.topBar}>
                    <div className={style.infoBar}>
                        <div className={`${style.left} ${hudVis.gameBarContent.picked ? '' : style.hidden}`}>
                            <ItemProgress />
                        </div>

                        <div className={style.spacer} />

                        <div className={`${style.right} ${hudVis.gameBarContent.score ? '' : style.hidden}`}>
                            <Score />
                        </div>
                    </div>

                    <div className={style.clock}>
                        <Stopwatch size={170} />
                    </div>
                </div>
            )}
        </>
    );
}
