import { useMemo, useState } from 'react';
import { Cell, CellType, Position } from '../../types';
import style from './style.module.css';
import { getOnSight } from '../GameComponents/drawComponent';
import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { ActiveAgentAtom } from '../../atoms/state';
import { DesignOpenAtom, CurrentTileToolAtom, StoryProgressAtom, TileVisibilityAtom } from '../../atoms/uiState';
import { RewardsPulseAtom, TileBackgroundAtom, SpawnCountAtom } from '../../atoms/gameState';

interface TileProps {
    cell: Cell;
    tileSize?: number;
    agentLocation?: Position;
    agentLocations?: Position[];
    cellLocation: Position;
    worldWidth: number;
    worldHeight: number;
}
export default function Tile({
    cell,
    tileSize = 40,
    agentLocation,
    agentLocations = undefined,
    cellLocation,
    worldHeight,
    worldWidth,
}: TileProps) {
    const agent = useAtomValue(ActiveAgentAtom);
    const visibleTiles = useAtomValue(TileVisibilityAtom);
    const propTool = useAtomValue(CurrentTileToolAtom);
    const [renderTrigger, setTrigger] = useState<boolean>(true); // Can't remeber the funtion of this trigger, possibly unneccessary
    const background = useAtomValue(TileBackgroundAtom);
    const updateWorldPulse = useSetAtom(RewardsPulseAtom);
    const setStoryProgress = useSetAtom(StoryProgressAtom);
    const setSpawnCount = useSetAtom(SpawnCountAtom);
    const design = useAtomValue(DesignOpenAtom);

    const store = useStore();

    const backgroundUrl = background.image !== '' ? background.image : '/images/assets/grass.png';

    const border =
        cellLocation.x === 0 ||
        cellLocation.y === 0 ||
        cellLocation.x === worldWidth - 1 ||
        cellLocation.y === worldHeight - 1;

    const onSight = useMemo(
        () =>
            getOnSight({
                agentPos: agentLocation,
                x: cellLocation.x,
                y: cellLocation.y,
                obsShape: agent.observationShape,
            }),
        [agentLocation, cellLocation, agent.observationShape]
    );

    const getCell = () => {
        const base = getCellImage(cell);
        let location = false;

        if (agentLocations) {
            for (let i = 0; i < agentLocations.length; i++) {
                if (agentLocations[i].x === cellLocation.x && agentLocations[i].y === cellLocation.y) location = true;
            }
        }

        if (agentLocation) {
            if (cellLocation.y === agentLocation.y && cellLocation.x === agentLocation.x) location = true;
        }

        if (location) {
            return (
                <div className={style.tileOverlay}>
                    {base}

                    <img
                        src={cell.image !== '' ? cell.image : cell.emoji}
                        alt="Agent location background"
                        width={tileSize}
                        height={tileSize}
                        className={`${style.tileLayer} ${style.tileForeground}`}
                        style={{
                            opacity: visibleTiles.agent ? 0.4 : 0,
                            transition: 'opacity 60ms ease',
                            transitionDelay: '120ms',
                        }}
                    />
                </div>
            );
        }
        return base;
    };

    const getCellImage = (cell: Cell) => {
        switch (cell.type) {
            case CellType.Spawn: {
                return (
                    <div
                        className={style.tileOverlay}
                        style={{ width: tileSize, height: tileSize }}
                    >
                        <img
                            src={backgroundUrl}
                            alt="Background"
                            className={`${style.tileLayer} ${style.tileBackground}`}
                            style={{
                                opacity: 0.7,
                            }}
                        />
                        <img
                            src={cell.image !== '' ? cell.image : cell.emoji}
                            width={tileSize}
                            height={tileSize}
                            className={`${style.tileLayer} ${style.tileForeground}`}
                            alt="Floor"
                            style={{
                                opacity: visibleTiles.spawn ? 0.8 : 0,
                            }}
                        />
                    </div>
                );
            }
            case CellType.Trap: {
                return (
                    <div
                        className={style.tileOverlay}
                        style={{ width: tileSize, height: tileSize }}
                    >
                        <img
                            src={backgroundUrl}
                            alt="Background"
                            className={`${style.tileLayer} ${style.tileBackground}`}
                            style={{
                                opacity: 0.7,
                            }}
                        />
                        <img
                            src={`${cell.image ?? cell.emoji}`}
                            width={tileSize}
                            className={`${style.tileLayer} ${style.tileForeground}`}
                            height={tileSize}
                            alt="Trap"
                            style={{
                                opacity: visibleTiles.spawn ? (cell.timer === 0 ? 0.8 : 0.4) : 0,
                            }}
                        />
                    </div>
                );
            }
            case CellType.Empty: {
                return (
                    <div
                        className={style.tileOverlay}
                        style={{ width: tileSize, height: tileSize }}
                    >
                        <img
                            src={backgroundUrl}
                            alt="Background"
                            className={`${style.tileLayer} ${style.tileBackground}`}
                            style={{
                                opacity: 0.7,
                            }}
                        />
                        <img
                            src={cell.image !== '' ? cell.image : cell.emoji}
                            width={tileSize}
                            height={tileSize}
                            className={`${style.tileLayer} ${style.tileForeground}`}
                            alt="Floor"
                        />
                    </div>
                );
            }
            case CellType.Solid: {
                return (
                    <div
                        className={style.tileOverlay}
                        style={{ width: tileSize, height: tileSize }}
                    >
                        <img
                            src={backgroundUrl}
                            alt="Background"
                            className={`${style.tileLayer} ${style.tileBackground}`}
                            style={{
                                opacity: 0.7,
                            }}
                        />
                        <img
                            src={cell.image !== '' ? cell.image : cell.emoji}
                            width={tileSize}
                            height={tileSize}
                            className={`${style.tileLayer} ${style.tileForeground}`}
                            alt="Wall"
                            style={{ opacity: visibleTiles.wall ? 1 : 0 }}
                        />
                    </div>
                );
            }
            case CellType.Trigger: {
                return (
                    <div
                        className={style.tileOverlay}
                        style={{ width: tileSize, height: tileSize }}
                    >
                        <img
                            src={backgroundUrl}
                            alt="Background"
                            className={`${style.tileLayer} ${style.tileBackground}`}
                            style={{
                                opacity: 0.7,
                            }}
                        />
                        <img
                            src={cell.image !== '' ? cell.image : cell.emoji}
                            className={`${style.tileLayer} ${style.tileForeground}`}
                            alt="Key"
                        />
                    </div>
                );
            }
            case CellType.Door: {
                return (
                    <img
                        src={`${cell.image}`}
                        width={tileSize}
                        height={tileSize}
                        alt="Door"
                    />
                );
            }
            case CellType.LockedDoor: {
                return (
                    <img
                        src={`${cell.image}`}
                        width={tileSize}
                        height={tileSize}
                        alt="Locked Door"
                    />
                );
            }
            case CellType.Key: {
                return (
                    <div
                        className={style.tileOverlay}
                        style={{ width: tileSize, height: tileSize }}
                    >
                        <img
                            src={backgroundUrl}
                            alt="Background"
                            className={`${style.tileLayer} ${style.tileBackground}`}
                            style={{
                                opacity: 0.7,
                            }}
                        />
                        <img
                            src={cell.image}
                            alt="Key"
                            className={`${style.tileLayer} ${style.tileForeground}`}
                            style={{
                                opacity: visibleTiles.key ? (cell.timer === 0 ? 1 : 0) : 0, // Pickable object is fully hidden
                            }}
                        />
                    </div>
                );
            }
            case CellType.Treasure: {
                return (
                    <div
                        className={style.tileOverlay}
                        style={{ width: tileSize, height: tileSize }}
                    >
                        <img
                            src={backgroundUrl}
                            alt="Background"
                            className={`${style.tileLayer} ${style.tileBackground}`}
                            style={{
                                opacity: 0.7,
                            }}
                        />
                        <img
                            src={cell.image !== '' ? cell.image : cell.emoji}
                            alt="Large Treasure"
                            className={`${style.tileLayer} ${style.tileForeground}`}
                            style={{ opacity: cell.timer === 0 ? 1 : 0.2 }}
                        />
                    </div>
                );
            }
            case CellType.TreasureBig: {
                return (
                    <div
                        className={style.tileOverlay}
                        style={{ width: tileSize, height: tileSize }}
                    >
                        <img
                            src={backgroundUrl}
                            alt="Background"
                            className={`${style.tileLayer} ${style.tileBackground}`}
                            style={{
                                opacity: 0.7,
                            }}
                        />
                        <img
                            src={cell.image !== '' ? cell.image : cell.emoji}
                            alt="Large Treasure"
                            className={`${style.tileLayer} ${style.tileForeground}`}
                            style={{ opacity: cell.timer === 0 ? 1 : 0.2 }}
                        />
                    </div>
                );
            }
            case CellType.Outside: {
                return (
                    <div
                        style={{
                            width: tileSize,
                            height: tileSize,
                        }}
                    />
                );
            }
            default: {
                return (
                    <img
                        src={backgroundUrl}
                        width={tileSize}
                        height={tileSize}
                        alt="Default floor"
                    />
                );
            }
        }
    };
    const handleTileClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (propTool) {
            if (border && propTool.type !== CellType.Solid) return;
            if (propTool.type === CellType.Trigger) {
                setStoryProgress((old) => {
                    return {
                        ...old,
                        environment: {
                            ...old.environment,
                            goalSet: true,
                        },
                    };
                });
            }
            if (cell.type === CellType.Spawn) {
                if (store.get(SpawnCountAtom) < 2) return;
                if (propTool.type !== CellType.Spawn) {
                    setSpawnCount((old) => old - 1);
                }
            } else {
                if (propTool.type === CellType.Spawn) {
                    setSpawnCount((old) => old + 1);
                }
            }
            setTrigger(!renderTrigger);
            cell.image = propTool.image;
            cell.type = propTool.type;
            cell.emoji = propTool.emoji;
            updateWorldPulse((prev) => !prev);
        }
    };

    return (
        <button
            style={{
                width: tileSize,
                height: tileSize,
                pointerEvents: cell.type === CellType.Outside ? 'none' : 'auto',
            }}
            disabled={!design}
            className={`${style.tile} ${onSight ? style.onSight : style.notOnSight}`}
            onClick={(e) => handleTileClick(e)}
            onPointerDown={(e) => handleTileClick(e)}
            onPointerEnter={(e) => {
                if (e.buttons & 1) {
                    handleTileClick(e);
                }
            }}
        >
            {getCell()}
        </button>
    );
}
