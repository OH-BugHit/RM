/// <reference lib="webworker" />

import { GRID_5, GRID_7 } from '../gridConfigs';
import { renderTile } from '../tileRenderer';
import { WorkerRequest, TileRenderedMessage } from './workerProtocol';
self.onerror = (e) => {
    console.error('worker onerror', e);
};
let world = new Map<string, string>();
const spriteStore = new Map<number, CanvasImageSource>();

self.postMessage({ type: 'ready' });

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
    const msg = e.data;

    switch (msg.type) {
        case 'initWorld':
        case 'updateWorld':
            world = new Map(msg.world);
            return;

        case 'initSprites':
        case 'updateSprites':
            spriteStore.clear();

            for (const sprite of msg.sprites) {
                spriteStore.set(sprite.id, sprite.bitmap);
            }
            return;

        case 'renderTile': {
            const canvas = new OffscreenCanvas(msg.tileSize, msg.tileSize);
            const ctx = canvas.getContext('2d'); //TODO: Maybe add canvas cache and reuse canvases!
            if (!ctx) return;

            renderTile({
                ctx,
                tileSize: msg.tileSize,
                tileX: msg.tileX,
                tileY: msg.tileY,
                zoom: msg.zoom,
                world,
                imgStore: spriteStore,
                qTable: msg.qTable,
                grid: msg.observationShape === 'large' ? GRID_7 : GRID_5,
                type: msg.viewType,
            });

            const bitmap = canvas.transferToImageBitmap();

            const response: TileRenderedMessage = {
                type: 'tileRendered',
                requestId: msg.requestId,
                bitmap,
            };

            self.postMessage(response, [bitmap]);

            return;
        }
    }
};
