import { useMemo, useState } from 'react';
import { Cell, CellType, Position } from '../../types';
import style from './style.module.css';
import { getOnSight } from '../GameComponents/drawComponent';
import { useAtomValue, useSetAtom } from 'jotai';
import { ActiveAgentAtom } from '../../atoms/state';
import { PropToolAtom, StoryProgressAtom, TileVisibilityAtom } from '../../atoms/uiState';
import { InnerFillCellAtom, RewardsPulseAtom } from '../../atoms/gameState';

interface TileProps {
    cell: Cell;
    tileSize?: number;
    agentLocation: Position;
    cellLocation: Position;
    onSight?: boolean;
}
export default function Tile({ cell, tileSize = 40, agentLocation, cellLocation }: TileProps) {
    const agent = useAtomValue(ActiveAgentAtom);
    const visibleTiles = useAtomValue(TileVisibilityAtom);
    const propTool = useAtomValue(PropToolAtom);
    const [trigger, setTrigger] = useState<boolean>(true);
    const fillerTile = useAtomValue(InnerFillCellAtom);
    const updateWorldPulse = useSetAtom(RewardsPulseAtom);
    const setStoryProgress = useSetAtom(StoryProgressAtom);

    const agentImage = useMemo(() => {
        return agent.img;
    }, [agent.img]);

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
            <div
                className={style.tileOverlay}
                style={{ width: tileSize, height: tileSize }}
            >
                <img
                    src={`${cell.image}`}
                    alt="Agent location background"
                    className={`${style.tileLayer} ${style.tileBackground}`}
                    style={{
                        opacity: visibleTiles.agent ? 0.4 : 0,
                    }}
                />
                <img
                    src={agentImage}
                    alt="Agent Image"
                    className={`${style.tileLayer} ${style.tileForeground}`}
                    style={{
                        opacity: visibleTiles.agent ? 1 : 0,
                    }}
                />
            </div>
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
    const handleTileClick = (e: React.PointerEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (propTool) {
            //TODO: TRACK IF MODIFYING OUTER BOUNDARY (HAS TO BE SOLID!)
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
            updateWorldPulse((prev) => !prev);
        }
    };

    return (
        <button
            style={{
                width: tileSize,
                height: tileSize,
                pointerEvents: cell.type === CellType.Outside ? 'none' : 'auto',
                background: onSight ? '#ffffffc5' : 'transparent', //836a0e44
                zIndex: 1000,
            }}
            className={style.tile}
            onPointerDown={(e) => handleTileClick(e)}
        >
            {getCell()}
        </button>
    );
}
