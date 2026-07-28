import style from './style.module.css';
import Tile from '../../components/EnvironmentRender/Tile';
import { Cell } from '../../types';
import { FloatItem } from '../../hooks/useRewardFloats';
import RewardFloats from '../../components/RewardFloats.tsx/RewardFloats';
import { useAtomValue } from 'jotai';
import { WorldGridRenderAtom } from '../../atoms/gameState';
import { useEffect } from 'react';
import { GenericRLEnv } from '../Environments/Generic/environment';
import StepsLeft from '../../components/Counters/StepsLeft';

interface worldComponentProps {
    worldGrid: React.RefObject<Cell[][]>;
    tileSize?: number;
    envRef: React.RefObject<GenericRLEnv | undefined>;
    floatItems: FloatItem[];
    deactivate: (id: number) => void;
}

export default function WorldComponent({
    worldGrid,
    tileSize = 40,
    floatItems,
    deactivate,
    envRef,
}: worldComponentProps) {
    const worldGridA = useAtomValue(WorldGridRenderAtom);

    // world grid fer updater
    useEffect(() => {
        if (worldGridA !== undefined) worldGrid.current = worldGridA;
    }, [worldGridA, worldGrid, envRef]);
    const env = envRef.current;

    if (!worldGridA || !env) return null;
    const height = worldGridA.length;
    const width = worldGridA[0].length;

    return (
        <div
            className={style.worldContainer}
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${width}, ${tileSize}px)`,
                gridTemplateRows: `repeat(${height}, ${tileSize}px)`,
            }}
        >
            <StepsLeft />
            {worldGridA.map((row, y) =>
                row.map((cell, x) => (
                    <div key={`${x}-${y}`}>
                        <Tile
                            cell={cell}
                            tileSize={tileSize}
                            agentLocation={env.position}
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
