import style from './style.module.css';
import Tile from '../../components/EnvironmentRender/Tile';
import { AgentType, CellType, Position } from '../../types';

interface worldComponentProps {
    worldGrid: CellType[][];
    tileSize?: number;
    agentType: AgentType;
    agentLocation: Position;
}

export default function WorldComponent({ worldGrid, tileSize = 40, agentType, agentLocation }: worldComponentProps) {
    const height = worldGrid.length;
    const width = worldGrid[0].length;

    return (
        <div
            className={style.worldContainer}
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${width}, ${tileSize}px)`,
                gridTemplateRows: `repeat(${height}, ${tileSize}px)`,
            }}
        >
            {worldGrid.map((row, y) =>
                row.map((cell, x) => (
                    <div key={`${x}-${y}`}>
                        <Tile
                            cellType={cell}
                            tileSize={tileSize}
                            agentLocation={agentLocation}
                            cellLocation={{ x: x, y: y }}
                            agentType={agentType}
                        />
                    </div>
                ))
            )}
        </div>
    );
}
