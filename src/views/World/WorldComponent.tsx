import style from './style.module.css';
import Tile from '../../components/EnvironmentRender/Tile';
import { Cell } from '../../types';
import { FloatItem } from '../../hooks/useRewardFloats';
import RewardFloats from '../../components/RewardFloats.tsx/RewardFloats';
import { useAtomValue } from 'jotai';
import { WorldGridRenderAtom } from '../../atoms/gameState';
import { useEffect } from 'react';
import { GenericRLEnv } from '../Environments/Generic/environment';
import { useGameScale } from '../../context/GameScale/useGameScale';

interface worldComponentProps {
    worldGrid: React.RefObject<Cell[][]>;
    envRef: React.RefObject<GenericRLEnv | undefined>;
    floatItems: FloatItem[];
    deactivate: (id: number) => void;
}

export default function WorldComponent({ worldGrid, floatItems, deactivate, envRef }: worldComponentProps) {
    const { s } = useGameScale();
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
                gridTemplateColumns: `repeat(${width}, ${s(40)}px)`,
                gridTemplateRows: `repeat(${height}, ${s(40)}px)`,
            }}
        >
            {worldGridA.map((row, y) =>
                row.map((cell, x) => (
                    <div key={`${x}-${y}`}>
                        <Tile
                            cell={cell}
                            tileSize={s(40)}
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
                cellSize={s(40)}
                onComplete={deactivate}
            />
        </div>
    );
}
