import {
    InitSpritesMessage,
    InitWorldMessage,
    RenderTileMessage,
    SpriteData,
    UpdateSpritesMessage,
    UpdateWorldMessage,
    WorkerResponse,
} from './workerProtocol';

type Resolver = (bitmap: ImageBitmap) => void;

export class WorkerPool {
    private workers: Worker[] = [];
    private nextWorker = 0;

    private requestId = 0;

    private pending = new Map<number, Resolver>();
    private pendingMessages: Array<
        InitSpritesMessage | UpdateSpritesMessage | InitWorldMessage | UpdateWorldMessage | RenderTileMessage
    > = [];
    private readyWorkers = 0;
    private latestWorld: Array<[string, string]> | null = null;
    private latestSprites: SpriteData[] = [];

    private createWorkers(workerCount = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency ?? 4) : 4) {
        const count = Math.max(1, Math.min(workerCount, 8));

        for (let i = 0; i < count; i++) {
            const worker = new Worker(new URL('./tileRenderer.worker.ts', import.meta.url), {
                type: 'module',
            });

            worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
                const msg = e.data;

                switch (msg.type) {
                    case 'ready': {
                        this.readyWorkers += 1;

                        if (this.latestWorld !== null) {
                            this.initWorldOnWorker(worker, this.latestWorld);
                        }

                        if (this.latestSprites.length > 0) {
                            this.initSpritesOnWorker(worker, this.latestSprites);
                        }

                        if (this.readyWorkers === this.workers.length) {
                            this.flushPendingMessages();
                        }

                        break;
                    }

                    case 'tileRendered': {
                        const resolve = this.pending.get(msg.requestId);

                        if (!resolve) return;

                        this.pending.delete(msg.requestId);

                        resolve(msg.bitmap);

                        break;
                    }

                    default:
                        break;
                }
            };
            worker.onerror = (e) => {
                console.error('Worker error', e);
            };

            worker.onmessageerror = (e) => {
                console.error('Worker message error', e);
            };

            this.workers.push(worker);
        }
    }

    destroy() {
        this.workers.forEach((w) => {
            w.terminate();
        });
        this.workers = [];

        this.pending.clear();
        this.pendingMessages = [];
        this.readyWorkers = 0;
    }

    private sendToNextWorker(
        message: InitSpritesMessage | UpdateSpritesMessage | InitWorldMessage | UpdateWorldMessage | RenderTileMessage
    ) {
        if (this.workers.length === 0) {
            throw new Error('WorkerPool destroyed');
        }

        if (this.workers.length === 0) {
            return;
        }

        const worker = this.workers[this.nextWorker];

        this.nextWorker = (this.nextWorker + 1) % this.workers.length;

        if (!worker) {
            return;
        }

        worker.postMessage(message);
    }

    private initWorldOnWorker(worker: Worker, world: Array<[string, string]>) {
        worker.postMessage({ type: 'initWorld', world } satisfies InitWorldMessage);
    }

    private initSpritesOnWorker(worker: Worker, sprites: SpriteData[]) {
        worker.postMessage({ type: 'initSprites', sprites } satisfies InitSpritesMessage);
    }

    private broadcastWorldUpdateToAllWorkers(world: Array<[string, string]>) {
        for (const worker of this.workers) {
            worker.postMessage({ type: 'updateWorld', world } satisfies UpdateWorldMessage);
        }
    }

    private broadcastSpriteUpdateToAllWorkers(sprites: SpriteData[]) {
        for (const worker of this.workers) {
            worker.postMessage({ type: 'updateSprites', sprites } satisfies UpdateSpritesMessage);
        }
    }

    private flushPendingMessages() {
        while (this.pendingMessages.length > 0) {
            const message = this.pendingMessages.shift();

            if (message) {
                this.sendToNextWorker(message);
            }
        }
    }

    private queueOrSend(
        message: InitSpritesMessage | UpdateSpritesMessage | InitWorldMessage | UpdateWorldMessage | RenderTileMessage
    ) {
        if (this.workers.length === 0) {
            this.createWorkers();
        }

        if (this.readyWorkers < this.workers.length) {
            this.pendingMessages.push(message);
            return;
        }

        this.sendToNextWorker(message);
    }

    initSprites(message: InitSpritesMessage) {
        this.latestSprites = message.sprites;

        const worker = this.workers[0];
        if (worker) {
            this.initSpritesOnWorker(worker, message.sprites);
        }
    }

    updateSprites(message: UpdateSpritesMessage) {
        this.latestSprites = message.sprites;
        this.broadcastSpriteUpdateToAllWorkers(message.sprites);
    }

    initWorld(message: InitWorldMessage) {
        this.latestWorld = message.world;

        const worker = this.workers[0];
        if (worker) {
            this.initWorldOnWorker(worker, message.world);
        }
    }

    updateWorld(message: UpdateWorldMessage) {
        this.latestWorld = message.world;
        this.broadcastWorldUpdateToAllWorkers(message.world);
    }

    renderTile(message: Omit<RenderTileMessage, 'requestId'>): Promise<ImageBitmap> {
        return new Promise((resolve) => {
            const id = this.requestId++;

            this.pending.set(id, resolve);

            const tileMessage: RenderTileMessage = {
                ...message,
                requestId: id,
            };

            this.queueOrSend(tileMessage);
        });
    }
}
