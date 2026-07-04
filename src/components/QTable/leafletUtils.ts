/* eslint-disable @typescript-eslint/no-explicit-any */
import L from 'leaflet';
export type TileCoords = {
    x: number;
    y: number;
    z: number;
};
export type TileKey = string;

import { ObservationShape } from '../../types';
import { WorkerPool } from './workers/WorkerPool';

export function createTileLayer(
    pool: WorkerPool,
    tileSize: number,
    observationShape: ObservationShape,
    getQTable: () => Record<string, number[]>
) {
    return L.GridLayer.extend({
        createTile(coords: L.Coords, done: L.DoneCallback) {
            const canvas = document.createElement('canvas');

            canvas.width = tileSize;
            canvas.height = tileSize;

            pool.renderTile({
                type: 'renderTile',
                tileSize,
                tileX: coords.x,
                tileY: coords.y,
                zoom: coords.z,
                observationShape,
                qTable: getQTable(),
            })
                .then((bitmap) => {
                    const ctx = canvas.getContext('2d');

                    if (ctx) {
                        ctx.drawImage(bitmap, 0, 0);
                    }

                    bitmap.close();

                    done(undefined, canvas);
                })
                .catch((err) => {
                    done(err as Error, canvas);
                });

            return canvas;
        },
    });
}

export function makeTileKey(x: number, y: number, z: number): TileKey {
    return `${z}:${x}:${y}`;
}
