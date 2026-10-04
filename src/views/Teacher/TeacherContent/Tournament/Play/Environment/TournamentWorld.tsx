import style from './style.module.css';
import { FloatItem } from '../../../../../../hooks/useRewardFloats';
import { Position } from '../../../../../../types';
import { QPolicyAgent } from '../../../../../../components/agents/policyQagent';
import Tile from '../../../../../../components/EnvironmentRender/Tile';
import RewardFloats from '../../../../../../components/RewardFloats.tsx/RewardFloats';
import { CellSave } from '../../../../../../utils/types';
import { useGameScale } from '../../../../../../context/GameScale/useGameScale';

interface worldComponentProps {
    worldGrid: React.RefObject<CellSave[][]>;
    agentsRef: React.RefObject<QPolicyAgent[] | undefined>;
    floatItems: FloatItem[];
    deactivate: (id: number) => void;
}

export default function TournamentWorld({ worldGrid, floatItems, deactivate, agentsRef }: worldComponentProps) {
    const { s } = useGameScale();
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
                gridTemplateColumns: `repeat(${width}, ${s(40)}px)`,
                gridTemplateRows: `repeat(${height}, ${s(40)}px)`,
            }}
        >
            {worldGrid.current.map((row, y) =>
                row.map((cell, x) => (
                    <div key={`${x}-${y}`}>
                        <Tile
                            cell={{ ...cell, reloadTime: 0, timer: 0 }}
                            tileSize={s(40)}
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
                cellSize={s(40)}
                onComplete={deactivate}
            />
        </div>
    );
}
