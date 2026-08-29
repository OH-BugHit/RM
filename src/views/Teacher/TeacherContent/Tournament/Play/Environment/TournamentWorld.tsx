import style from './style.module.css';
import { FloatItem } from '../../../../../../hooks/useRewardFloats';
import { Position } from '../../../../../../types';
import { QPolicyAgent } from '../../../../../../components/agents/policyQagent';
import Tile from '../../../../../../components/EnvironmentRender/Tile';
import RewardFloats from '../../../../../../components/RewardFloats.tsx/RewardFloats';
import { CellSave } from '../../../../../../utils/types';

interface worldComponentProps {
    worldGrid: React.RefObject<CellSave[][]>;
    tileSize?: number;
    agentsRef: React.RefObject<QPolicyAgent[] | undefined>;
    floatItems: FloatItem[];
    deactivate: (id: number) => void;
}

export default function TournamentWorld({
    worldGrid,
    tileSize = 40,
    floatItems,
    deactivate,
    agentsRef,
}: worldComponentProps) {
    const agents = agentsRef.current;

    if (!worldGrid.current || !agents) return null;
    const height = worldGrid.current.length;
    const width = worldGrid.current[0].length;

    const positions: Position[] = agents.map((x) => x.position);

    return (
        <div
            className={style.worldContainer}
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${width}, ${tileSize}px)`,
                gridTemplateRows: `repeat(${height}, ${tileSize}px)`,
            }}
        >
            {worldGrid.current.map((row, y) =>
                row.map((cell, x) => (
                    <div key={`${x}-${y}`}>
                        <Tile
                            cell={{ ...cell, reloadTime: 0, timer: 0 }}
                            tileSize={tileSize}
                            agentLocations={positions}
                            cellLocation={{ x: x, y: y }}
                            worldHeight={height}
                            worldWidth={width}
                        />
                    </div>
                ))
            )}
            <RewardFloats
                items={floatItems}
                cellSize={40}
                onComplete={deactivate}
            />
        </div>
    );
}
