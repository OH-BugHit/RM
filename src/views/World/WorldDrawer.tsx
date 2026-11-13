import style from './style.module.css';
import Tile from '../../components/EnvironmentRender/Tile';
import { Cell, Position } from '../../types';
import { useAtomValue } from 'jotai';
import { useGameScale } from '../../context/GameScale/useGameScale';
import { TileSizeAtom } from '../../atoms/uiState';

interface worldComponentProps {
    worldGrid: Cell[][];
    agentLocation: Position | undefined;
    tileSize?: number;
}

export default function WorldDrawer({ worldGrid, agentLocation, tileSize }: worldComponentProps) {
    const { s } = useGameScale();
    const storedSize = useAtomValue(TileSizeAtom);

    const size = tileSize ?? storedSize;

    const height = worldGrid.length;
    const width = worldGrid[0].length;

    return (
        <div
            className={style.worldContainer}
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${width}, ${s(size)}px)`,
                gridTemplateRows: `repeat(${height}, ${s(size)}px)`,
            }}
        >
            {worldGrid.map((row, y) =>
                row.map((cell, x) => (
                    <div key={`${x}-${y}`}>
                        <Tile
                            cell={cell}
                            tileSize={s(size)}
                            agentLocation={agentLocation}
                            cellLocation={{ x: x, y: y }}
                            worldHeight={height}
                            worldWidth={width}
                        />
                    </div>
                ))
            )}
        </div>
    );
}
