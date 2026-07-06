import { parseObservationState } from '../agents/utils';
import { getColor } from './utils';
import { ObservationGridConfig } from './gridConfigs';

export type RenderContext = Pick<
    CanvasRenderingContext2D,
    'drawImage' | 'fillRect' | 'strokeRect' | 'fillStyle' | 'strokeStyle' | 'globalAlpha'
>;

export interface RenderObservationOptions {
    ctx: RenderContext;
    stateId: string;
    x: number;
    y: number;
    cellSize: number;
    grid: ObservationGridConfig;
    imgStore: Map<number, CanvasImageSource>;
    qValues?: number[];
}

export function renderObservation({
    ctx,
    stateId,
    x,
    y,
    cellSize,
    grid,
    imgStore,
    qValues = [],
}: RenderObservationOptions) {
    const obs = parseObservationState(stateId);

    const poiTile = imgStore.get(10);

    const center = Math.floor(grid.size / 2);

    let poiRow = -1;
    let poiCol = -1;

    switch (obs.POIdirection) {
        case '3':
            poiRow = center;
            poiCol = 0;
            break;

        case '0':
            poiRow = 0;
            poiCol = center;
            break;

        case '1':
            poiRow = grid.size - 1;
            poiCol = center;
            break;

        case '2':
            poiRow = center;
            poiCol = grid.size - 1;
            break;
    }

    const minQ = qValues.length ? Math.min(...qValues) : 0;
    const maxQ = qValues.length ? Math.max(...qValues) : 0;

    for (let row = 0; row < grid.size; row++) {
        for (let col = 0; col < grid.size; col++) {
            const px = x + col * cellSize;
            const py = y + row * cellSize;

            ctx.fillStyle = '#ffffff';
            ctx.fillRect(px, py, cellSize, cellSize);

            const qIndex = grid.qTileMap.get(`${row},${col}`);

            if (qIndex !== undefined && qValues.length) {
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = getColor(qValues[qIndex], minQ, maxQ);
                ctx.fillRect(px, py, cellSize, cellSize);
                ctx.globalAlpha = 1;
            }

            if (row === center && col === center) {
                continue;
            }

            if (row === poiRow && col === poiCol) {
                if (poiTile) {
                    ctx.drawImage(poiTile, px, py, cellSize, cellSize);
                }
                continue;
            }

            const slotIndex = grid.neighborSlots.findIndex(([r, c]) => r === row && c === col);

            if (slotIndex !== -1) {
                const value = Number(obs.neighbours[slotIndex]);
                const img = imgStore.get(value);

                if (img) {
                    ctx.drawImage(img, px, py, cellSize, cellSize);
                }
            }
        }
    }

    if (qValues.length > 5) {
        const img = imgStore.get(11);

        if (img) {
            const px = x + grid.specialLocation.col * cellSize;
            const py = y + grid.specialLocation.row * cellSize;

            const dx = cellSize / 4;
            const dy = -cellSize / 4;

            ctx.globalAlpha = 0.5;
            ctx.fillStyle = getColor(qValues[4], minQ, maxQ);
            ctx.fillRect(px + dx, py + dy, cellSize, cellSize);
            ctx.globalAlpha = 1;

            ctx.drawImage(img, px + dx, py + dy, cellSize, cellSize);
        }
    }
}
