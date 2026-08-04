import { useMemo, useState } from 'react';
import { Cell, CellType, Position } from '../../types';
import style from './style.module.css';
import { getOnSight } from '../GameComponents/drawComponent';
import { useAtomValue, useSetAtom } from 'jotai';
import { ActiveAgentAtom } from '../../atoms/state';
import { DesignOpenAtom, CurrentTileToolAtom, StoryProgressAtom, TileVisibilityAtom } from '../../atoms/uiState';
import { InnerFillCellAtom, RewardsPulseAtom } from '../../atoms/gameState';

interface TileProps {
    cell: Cell;
    tileSize?: number;
    agentLocation: Position;
    cellLocation: Position;
    onSight?: boolean;
    worldWidth: number;
    worldHeight: number;
}
export default function Tile({ cell, tileSize = 40, agentLocation, cellLocation, worldHeight, worldWidth }: TileProps) {
    const agent = useAtomValue(ActiveAgentAtom);
    const visibleTiles = useAtomValue(TileVisibilityAtom);
    const propTool = useAtomValue(CurrentTileToolAtom);
    const [trigger, setTrigger] = useState<boolean>(true);
    const fillerTile = useAtomValue(InnerFillCellAtom);
    const updateWorldPulse = useSetAtom(RewardsPulseAtom);
    const setStoryProgress = useSetAtom(StoryProgressAtom);
    const design = useAtomValue(DesignOpenAtom);

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

        if (cellLocation.y !== agentLocation.y || cellLocation.x !== agentLocation.x) return base;

        return (
            <img
                src={`${cell.image}`}
                alt="Agent location background"
                width={tileSize}
                height={tileSize}
                style={{
                    opacity: visibleTiles.agent ? 0.4 : 0,
                    transition: 'opacity 60ms ease',
                    transitionDelay: '120ms',
                }}
            />
        );
    };

    const getCellImage = (cell: Cell) => {
        switch (cell.type) {
            case CellType.Spawn: {
                return (
                    <img
                        src={`${cell.image}`}
                        width={tileSize}
                        height={tileSize}
                        alt="Floor"
                        style={{
                            opacity: visibleTiles.spawn ? 0.8 : 0,
                        }}
                    />
                );
            }
            case CellType.Trap: {
                return (
                    <img
                        src={`${cell.image}`}
                        width={tileSize}
                        height={tileSize}
                        alt="Trap"
                        style={{
                            opacity: visibleTiles.spawn ? (cell.timer === 0 ? 0.8 : 0.4) : 0,
                        }}
                    />
                );
            }
            case CellType.Empty: {
                return (
                    <img
                        src={`${cell.image}`}
                        width={tileSize}
                        height={tileSize}
                        alt="Floor"
                    />
                );
            }
            case CellType.Solid: {
                return (
                    <img
                        src={`${cell.image}`}
                        width={tileSize}
                        height={tileSize}
                        alt="Wall"
                        style={{ opacity: visibleTiles.wall ? 1 : 0 }}
                    />
                );
            }
            case CellType.Trigger: {
                return (
                    <div
                        className={style.tileOverlay}
                        style={{ width: tileSize, height: tileSize }}
                    >
                        <img
                            src={fillerTile.image}
                            alt="Background"
                            className={`${style.tileLayer} ${style.tileBackground}`}
                            style={{
                                opacity: 0.4,
                            }}
                        />
                        <img
                            src={`${cell.image}`}
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
                            src={fillerTile.image}
                            alt="Background"
                            className={`${style.tileLayer} ${style.tileBackground}`}
                            style={{
                                opacity: 0.4,
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
                            src={fillerTile.image}
                            alt="Background"
                            className={`${style.tileLayer} ${style.tileBackground}`}
                            style={{
                                opacity: 0.4,
                            }}
                        />
                        <img
                            src={cell.image}
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
                            src={fillerTile.image}
                            alt="Background"
                            className={`${style.tileLayer} ${style.tileBackground}`}
                            style={{
                                opacity: 0.4,
                            }}
                        />
                        <img
                            src={cell.image}
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
                        src={fillerTile.image}
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
            setTrigger(!trigger);
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
