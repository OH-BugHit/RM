import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { SixthSenseDirection } from '../../types';
import { SmallObsAtom } from '../../atoms/gameState';

interface BurglarProps {
    direction: SixthSenseDirection;
}
export default function Burglar({ direction }: BurglarProps) {
    const obs = useAtomValue(SmallObsAtom);

    if (direction === SixthSenseDirection.East) {
        return (
            <div
                className={style.imgWrap}
                style={{
                    opacity: obs.POIdirection === direction ? 1 : 0,
                }}
            >
                <img
                    src="/images/assets/burglar.png"
                    width={60}
                />
            </div>
        );
    }

    if (direction === SixthSenseDirection.South) {
        return (
            <div
                className={style.imgWrap}
                style={{
                    opacity: obs.POIdirection === direction ? 1 : 0,
                }}
            >
                <img
                    src="/images/assets/burglar.png"
                    width={60}
                />
            </div>
        );
    }

    if (direction === SixthSenseDirection.West) {
        return (
            <div
                className={style.imgWrap}
                style={{
                    opacity: obs.POIdirection === direction ? 1 : 0,
                }}
            >
                <img
                    src="/images/assets/burglar2.png"
                    width={60}
                />
            </div>
        );
    }
    return (
        <div
            className={style.imgWrap}
            style={{
                opacity: obs.POIdirection === direction ? 1 : 0,
            }}
        >
            <img
                src="/images/assets/burglar2.png"
                width={60}
            />
        </div>
    );
}
