import { CellType } from '../../../types';
import { RoomNode } from './worldGenerator';

interface Bounds {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

interface NodesToWorldParams {
    nodes: RoomNode[];
    bounds: Bounds;
    roomSizeX: number;
    roomSizeY: number;
}

export function nodesToWorld({ nodes, bounds, roomSizeX, roomSizeY }: NodesToWorldParams): CellType[][] {
    const ROOM_W = roomSizeX;
    const ROOM_H = roomSizeY;
    const PAD = 1;

    const strideX = ROOM_W + PAD;
    const strideY = ROOM_H + PAD;

    const width = (bounds.maxX - bounds.minX + 1) * strideX + PAD * 2;
    const height = (bounds.maxY - bounds.minY + 1) * strideY + PAD * 2;

    // Initialize world with Outside cells
    const world: CellType[][] = Array.from({ length: height }, () =>
        Array.from({ length: width }, () => CellType.Outside)
    );

    for (const node of nodes) {
        const lx = node.location.x - bounds.minX;
        const ly = node.location.y - bounds.minY;

        const startX = PAD + lx * strideX;
        const startY = PAD + ly * strideY;

        for (let y = 0; y < ROOM_H; y++) {
            for (let x = 0; x < ROOM_W; x++) {
                const cell = node.room[y]?.[x];

                if (cell !== undefined) {
                    world[startY + y][startX + x] = cell;
                }
            }
        }
    }

    // Create walls around rooms by converting Outside cells that touch non-Outside cells into Walls
    const directions = [
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },

        { x: -1, y: 0 },
        { x: 1, y: 0 },

        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
    ];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (world[y][x] !== CellType.Outside) continue;

            let touchesRoom = false;

            for (const dir of directions) {
                const nx = x + dir.x;
                const ny = y + dir.y;

                if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
                    continue;
                }

                const neighbour = world[ny][nx];

                if (neighbour !== CellType.Outside && neighbour !== CellType.Solid) {
                    touchesRoom = true;
                    break;
                }
            }

            if (touchesRoom) {
                world[y][x] = CellType.Solid;
            }
        }
    }

    // Create doors between connected rooms
    for (const node of nodes) {
        for (const edge of node.edges) {
            // vältetään duplicate käsittely
            if (edge.from !== node.id) continue;

            const otherNode = nodes.find((n) => n.id === edge.to);

            if (!otherNode) continue;

            const dx = otherNode.location.x - node.location.x;
            const dy = otherNode.location.y - node.location.y;

            const lx = node.location.x - bounds.minX;
            const ly = node.location.y - bounds.minY;

            const startX = lx * strideX + PAD;
            const startY = ly * strideY + PAD;

            const centerX = startX + Math.floor(ROOM_W / 2);
            const centerY = startY + Math.floor(ROOM_H / 2);

            let doorX = centerX;
            let doorY = centerY;

            if (dx === 1) {
                // oikea seinä
                doorX = startX + ROOM_W;
            } else if (dx === -1) {
                // vasen seinä
                doorX = startX - 1;
            } else if (dy === 1) {
                // alas
                doorY = startY + ROOM_H;
            } else if (dy === -1) {
                // ylös
                doorY = startY - 1;
            }

            switch (edge.type) {
                case 'lockedDoor': {
                    world[doorY][doorX] = CellType.LockedDoor;
                    break;
                }

                default: {
                    world[doorY][doorX] = CellType.Empty;
                    break;
                }
            }
        }
    }

    return world;
}
