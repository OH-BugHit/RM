/**
 * Stores images to render. Agent has this and updates it when props are changed
 */

import { QLearningAgent } from '../agents/rlAgentQ';

export class SpriteStore<T extends number, TImage extends CanvasImageSource = HTMLImageElement> {
    images = new Map<T, TImage>();

    constructor(assetMap?: Record<T, string>) {
        if (!assetMap) return;

        for (const key in assetMap) {
            const typedKey = Number(key) as T;

            const img = new Image();
            img.src = assetMap[typedKey];

            this.images.set(typedKey, img as TImage);
        }
    }

    get(id: T): TImage | null {
        return this.images.get(id) ?? null;
    }

    set(id: T, img: TImage) {
        this.images.set(id, img);
    }

    clear() {
        this.images.clear();
    }

    populateNumberSprites(
        getId: (value: number) => T,
        options?: {
            size?: number;
            font?: string;
            fillStyle?: string;
            strokeStyle?: string;
            lineWidth?: number;
        }
    ) {
        const {
            size = 64,
            font = 'bold 42px sans-serif',
            fillStyle = '#111',
            strokeStyle = '#fff',
            lineWidth = 5,
        } = options ?? {};

        for (let value = -1; value <= 9; value++) {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;

            const ctx = canvas.getContext('2d');
            if (!ctx) continue;

            ctx.font = font;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = strokeStyle;
            ctx.strokeText(String(value), size / 2, size / 2);

            ctx.fillStyle = fillStyle;
            ctx.fillText(String(value), size / 2, size / 2);

            this.set(getId(value), canvas as TImage);
        }
    }
}

export class WorldStore {
    statePos = new Map<string, { x: number; y: number }>();
    grid = new Map<string, string>();

    // Okay, here is a loop so that agent actually owns reference for itself as the WorldStore is owned by an agent.
    // But hey, I think agent should not be bothered with this code and store has slightly different lifecycle so this is how it's implemented.
    constructor(private agentRef: React.RefObject<QLearningAgent | undefined>) {}

    private cursorX = 0;
    private cursorY = 0;

    private dir = 0;
    private steps = 1;
    private stepCount = 0;
    private legCount = 0;

    addState(stateId: string) {
        const x = this.cursorX;
        const y = this.cursorY;

        const key = `${x},${y}`;

        this.grid.set(key, stateId);
        this.statePos.set(stateId, { x, y });
        this.moveCursor();
    }

    // For invaliding areas in the Q-map. Agent has visit time at record for each state.
    getTileVersion(tileX: number, tileY: number, z: number): number {
        const visitTimes = this.agentRef.current?.visitTimes;
        if (!visitTimes) return 0;
        let version = 0;

        const maxZoom = 14;
        const scale = 1 << (maxZoom - z);

        const fromX = tileX * scale;
        const fromY = tileY * scale;
        const toX = fromX + scale;
        const toY = fromY + scale;

        for (let x = fromX; x < toX; x++) {
            for (let y = fromY; y < toY; y++) {
                const state = this.grid.get(`${x},${y}`);
                if (!state) continue;

                version += visitTimes[state] ?? 0;
            }
        }

        return version;
    }

    // Cursor goes around for nice layout over the origo
    private moveCursor() {
        switch (this.dir) {
            case 0:
                this.cursorX += 1;
                break; // right
            case 1:
                this.cursorY += 1;
                break; // down
            case 2:
                this.cursorX -= 1;
                break; // left
            case 3:
                this.cursorY -= 1;
                break; // up
        }

        this.stepCount++;

        if (this.stepCount >= this.steps) {
            this.stepCount = 0;
            this.dir = (this.dir + 1) % 4;
            this.legCount++;

            if (this.legCount % 2 === 0) {
                this.steps++;
            }
        }
    }
}
export function getColor(value: number, minQ: number, maxQ: number) {
    if (maxQ === minQ) return 'lightgray';

    const gamma = 8;

    if (value < 0) {
        const norm = Math.abs(value / minQ);
        return `rgba(255, 0, 0, ${Math.pow(norm, gamma)})`;
    }

    const norm = value / maxQ;
    return `rgba(0, 255, 0, ${Math.pow(norm, gamma)})`;
}
