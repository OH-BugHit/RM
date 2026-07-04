// Observation/tileRenderer.ts

import { ObservationGridConfig } from './gridConfigs';
import { renderObservation, RenderContext } from './observationRenderer';

interface RenderTileArgs {
    ctx: RenderContext;

    tileSize: number;

    tileX: number;
    tileY: number;
    zoom: number;

    world: Map<string, string>;

    imgStore: Map<number, CanvasImageSource>;

    qTable: Record<string, number[]>;

    grid: ObservationGridConfig;
}

export function renderTile({ ctx, tileSize, tileX, tileY, zoom, world, imgStore, qTable, grid }: RenderTileArgs) {
    ctx.fillStyle = '#f7f7f7';
    ctx.fillRect(0, 0, tileSize, tileSize);

    ctx.strokeStyle = '#ddd';
    ctx.strokeRect(0, 0, tileSize, tileSize);

    const maxZoom = 14;
    const scale = Math.pow(2, maxZoom - zoom);

    const x0 = tileX * scale;
    const y0 = tileY * scale;
    const x1 = x0 + scale;
    const y1 = y0 + scale;

    const cellSize = tileSize / grid.size / scale;

    for (let x = x0; x < x1; x++) {
        for (let y = y0; y < y1; y++) {
            const stateId = world.get(`${x},${y}`);
            if (!stateId) continue;

            const px = ((x - x0) / scale) * tileSize;
            const py = ((y - y0) / scale) * tileSize;

            renderObservation({
                ctx,
                stateId,
                x: px,
                y: py,
                cellSize,
                grid,
                imgStore,
                qValues: qTable[stateId],
            });
        }
    }
}
