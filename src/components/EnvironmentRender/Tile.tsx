import { useMemo } from 'react';
import { AgentType, CellType, Position } from '../../types';
import { getAgentImage } from '../GameComponents/agentProps';
import style from './style.module.css';
import { getOnSight } from '../GameComponents/drawComponent';

interface TileProps {
    cellType: CellType;
    tileSize?: number;
    agentLocation: Position;
    cellLocation: Position;
    agentType: AgentType;
    onSight?: boolean;
}
export default function Tile({ cellType, tileSize = 40, agentLocation, cellLocation, agentType }: TileProps) {
    const agentImage = useMemo(() => {
        return getAgentImage({ type: agentType });
    }, [agentType]);

    const isOnSight = (): boolean => {
        return getOnSight({ agentPos: agentLocation, x: cellLocation.x, y: cellLocation.y, agentType: agentType });
    };

    const getCell = () => {
        const base = getCellImage(cellType);

        if (cellLocation.y !== agentLocation.y || cellLocation.x !== agentLocation.x) return base;

        return (
            <div style={{ position: 'relative', width: tileSize, height: tileSize }}>
                <img
                    src="images/assets/cleanWhiteStone.png"
                    alt="Background"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: 0.4,
                    }}
                />
                <img
                    src={agentImage}
                    alt="Agent Image"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                    }}
                />
            </div>
        );
    };

    const getCellImage = (cellType: CellType) => {
        switch (cellType) {
            case CellType.Spawn: {
                return (
                    <img
                        src="images/assets/cleanWhiteStone.png"
                        width={tileSize}
                        height={tileSize}
                        alt="Floor"
                        style={{
                            opacity: 0.2,
                        }}
                    />
                );
            }
            case CellType.Empty: {
                return (
                    <img
                        src="images/assets/cleanWhiteStone.png"
                        width={tileSize}
                        height={tileSize}
                        alt="Floor"
                        style={{
                            opacity: 0.4,
                        }}
                    />
                );
            }
            case CellType.Wall: {
                return (
                    <img
                        src="images/assets/wall1.png"
                        width={tileSize}
                        height={tileSize}
                        alt="Wall"
                    />
                );
            }
            case CellType.Trap: {
                return (
                    <img
                        src="images/assets/trap2_260.png"
                        width={tileSize}
                        height={tileSize}
                        alt="Key"
                    />
                );
            }
            case CellType.Door: {
                return (
                    <img
                        src="images/assets/door1.png"
                        width={tileSize}
                        height={tileSize}
                        alt="Door"
                    />
                );
            }
            case CellType.LockedDoor: {
                return (
                    <img
                        src="images/assets/door1.png"
                        width={tileSize}
                        height={tileSize}
                        alt="Locked Door"
                    />
                );
            }
            case CellType.Key: {
                return (
                    <div style={{ position: 'relative', width: tileSize, height: tileSize }}>
                        <img
                            src="images/assets/cleanWhiteStone.png"
                            alt="Background"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0.4,
                            }}
                        />
                        <img
                            src="images/assets/key1.png"
                            alt="Key"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                pointerEvents: 'none',
                            }}
                        />
                    </div>
                );
            }
            case CellType.Treasure: {
                return (
                    <img
                        src="images/assets/smallTreasure_260.png"
                        width={tileSize}
                        height={tileSize}
                        alt="Treasure"
                    />
                );
            }
            case CellType.TreasureBig: {
                return (
                    <img
                        src="images/assets/bigTreasure_260.png"
                        width={tileSize}
                        height={tileSize}
                        alt="Large Treasure"
                    />
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
                        src="images/assets/cleanWhiteStone.png"
                        width={tileSize}
                        height={tileSize}
                        alt="Default floor"
                    />
                );
            }
        }
    };
    const handleTileClick = () => {
        console.log(`Tile ${cellType} clicked`);
    };

    return (
        <button
            style={{
                width: tileSize,
                height: tileSize,
                pointerEvents: cellType === CellType.Outside ? 'none' : 'auto',
                background: isOnSight() ? '#ffeba344' : 'parent',
            }}
            className={style.tile}
            onClick={() => handleTileClick()}
        >
            {getCell()}
        </button>
    );
}
