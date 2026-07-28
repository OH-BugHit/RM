import L from 'leaflet';

export type TileCoords = {
    x: number;
    y: number;
    z: number;
};

export type TileKey = string;

import { ObservationShape, StateViewType } from '../../types';
import { WorkerPool } from './workers/WorkerPool';

type CachedTile = {
    version: number;
    canvas: HTMLCanvasElement;
};

export function createTileLayer(
    pool: WorkerPool,
    tileSize: number,
    observationShape: ObservationShape,
    type: StateViewType,
    getQTable: () => Record<string, number[]>,
    getTileVersion: (x: number, y: number, z: number) => number
) {
    const cache = new Map<TileKey, CachedTile>();

    return L.GridLayer.extend({
        clearCache() {
            cache.clear();
        },

        createTile(coords: L.Coords, done: L.DoneCallback) {
            const key = makeTileKey(coords.x, coords.y, coords.z);
            const version = getTileVersion(coords.x, coords.y, coords.z);

            const cached = cache.get(key);

            if (cached) {
                // Näytetään vanha tile heti
                done(undefined, cached.canvas);

                // Jos versio muuttui, päivitetään sama canvas taustalla
                if (cached.version !== version) {
                    pool.renderTile({
                        type: 'renderTile',
                        tileSize,
                        tileX: coords.x,
                        tileY: coords.y,
                        zoom: coords.z,
                        observationShape,
                        qTable: getQTable(),
                        viewType: type,
                    }).then((bitmap) => {
                        const ctx = cached.canvas.getContext('2d');

                        if (ctx) {
                            ctx.clearRect(0, 0, tileSize, tileSize);
                            ctx.drawImage(bitmap, 0, 0);
                        }

                        bitmap.close();

                        cached.version = version;
                    });
                }

                return cached.canvas;
            }

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
                viewType: type,
            })
                .then((bitmap) => {
                    const ctx = canvas.getContext('2d');

                    if (ctx) {
                        ctx.clearRect(0, 0, tileSize, tileSize);
                        ctx.drawImage(bitmap, 0, 0);
                    }

                    bitmap.close();

                    cache.set(key, {
                        version,
                        canvas,
                    });

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
