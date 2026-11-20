import style from '../style.module.css';
import { useAtomValue } from 'jotai';
import { ActiveAgentAtom } from '../../../../../atoms/state';
import { fromSavedCell } from '../../../../../utils/import';
import { actionWorld } from '../../../../../utils/levels/1basics/blevel1';
import WorldDrawer from '../../../../World/WorldDrawer';
import { useGameScale } from '../../../../../context/GameScale/useGameScale';

const SIZE = 60;

export default function Basics6() {
    const { s } = useGameScale();
    const agent = useAtomValue(ActiveAgentAtom);
    const grid = actionWorld.map((row) => row.map(fromSavedCell));

    const actionNumbers = (x: number, y: number) => {
        switch (y) {
            case 0: {
                if (x === 1) return 1;
                break;
            }
            case 1: {
                if (x === 0) return 4;
                if (x === 1) return 5;
                return 2;
            }
            case 2: {
                if (x === 1) return 3;
                break;
            }
        }
        return;
    };

    const gridDraw = () => {
        const height = grid.length;
        const width = grid[0].length;
        return (
            <div
                className={style.numberContainer}
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${width}, ${s(SIZE)}px)`,
                    gridTemplateRows: `repeat(${height}, ${s(SIZE)}px)`,
                }}
            >
                {grid.map((row, y) =>
                    row.map((_, x) => (
                        <div
                            key={`${x}-${y}`}
                            className={style.number}
                            style={{ fontSize: `${s(46)}px` }}
                        >
                            {actionNumbers(x, y)}
                        </div>
                    ))
                )}
            </div>
        );
    };

    return (
        <div className={style.container}>
            <b>Actions</b>
            <div className={style.content}>
                <div className={style.column}>
                    <ul>
                        <li>1. Up</li>
                        <li>2. Right</li>
                        <li>3. Down</li>
                        <li>4. Left</li>
                        <li>5. Stay</li>
                    </ul>
                </div>
                <div className={style.world}>
                    <WorldDrawer
                        worldGrid={grid}
                        agentLocation={{ x: 0, y: 1 }}
                        tileSize={SIZE}
                    />
                    <img
                        src={agent.img}
                        height={s(SIZE)}
                        width={s(SIZE)}
                        style={{ top: `${Math.max(50, s(76))}px`, left: `${Math.max(50, s(76))}px` }}
                        alt="Agent Image"
                        className={style.agent}
                    />
                    {gridDraw()}
                </div>
            </div>
        </div>
    );
}
