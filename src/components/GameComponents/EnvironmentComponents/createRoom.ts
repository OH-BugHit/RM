import { CellType } from '../../../types';
import { RoomNode } from './worldGenerator';

interface RoomProps {
    roomNode: RoomNode;
    roomSizeX: number;
    roomSizeY: number;
}

const putKeys = (roomSizeX: number, roomSizeY: number, room: CellType[][], numberOfKeys: number) => {
    let keysPlaced = 0;
    let fallBackCounter = 0;
    const maxAttempts = 100 + numberOfKeys * 10;

    while (keysPlaced < numberOfKeys && fallBackCounter < maxAttempts) {
        const x = Math.floor(Math.random() * (roomSizeX - 2)) + 1;
        const y = Math.floor(Math.random() * (roomSizeY - 2)) + 1;

        if (room[y][x] === CellType.Empty || room[y][x] === CellType.Spawn) {
            room[y][x] = CellType.Key;
            keysPlaced++;
        }
        fallBackCounter++;
    }

    if (keysPlaced < numberOfKeys) {
        console.warn(`Unable to place all keys. Placed ${keysPlaced}/${numberOfKeys} after ${maxAttempts} attempts`);
    }
};

const putItems = (
    roomSizeX: number,
    roomSizeY: number,
    room: CellType[][],
    itemType: CellType,
    numberOfKeys: number
) => {
    let keysPlaced = 0;
    let fallBackCounter = 0;
    const maxAttempts = 100 + numberOfKeys * 10;

    while (keysPlaced < numberOfKeys && fallBackCounter < maxAttempts) {
        const x = Math.floor(Math.random() * (roomSizeX - 2)) + 1;
        const y = Math.floor(Math.random() * (roomSizeY - 2)) + 1;

        if (room[y][x] === CellType.Empty || room[y][x] === CellType.Spawn) {
            room[y][x] = itemType;
            keysPlaced++;
        }
        fallBackCounter++;
    }

    if (keysPlaced < numberOfKeys) {
        console.warn(`Unable to place all keys. Placed ${keysPlaced}/${numberOfKeys} after ${maxAttempts} attempts`);
    }
};

export default function createRoom({ roomNode, roomSizeX, roomSizeY }: RoomProps) {
    // Initialize the 2D array with proper dimensions
    const cell = roomNode.type === 'spawnArea' ? CellType.Spawn : CellType.Empty; // Spawn area is marked with -1
    const room: CellType[][] = Array.from({ length: roomSizeY }, () => Array(roomSizeX).fill(cell));

    putKeys(roomSizeX, roomSizeY, room, roomNode.numberOfKeys);
    putItems(roomSizeX, roomSizeY, room, CellType.Treasure, 2);
    putItems(roomSizeX, roomSizeY, room, CellType.TreasureBig, 2);
    putItems(roomSizeX, roomSizeY, room, CellType.Trigger, 2);

    return room; // Placeholder
}
