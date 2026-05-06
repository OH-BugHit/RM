import { Camera, CellRender, GridConfig, RenderSpec } from '../../types';
import { getQColor } from '../../utils/common';

const spriteCache: Record<string, HTMLImageElement> = {};

export function getSprite(src: string): HTMLImageElement {
    if (!spriteCache[src]) {
        const img = new Image();
        img.src = src;
        spriteCache[src] = img;
    }
    return spriteCache[src];
}

export function getSpiralPosition(index: number): { x: number; y: number } {
    if (index === 0) return { x: 0, y: 0 };

    let x = 0;
    let y = 0;

    let dx = 1;
    let dy = 0;

    let segmentLength = 1;
    let segmentPassed = 0;

    let segmentCount = 0;

    for (let i = 1; i <= index; i++) {
        x += dx;
        y += dy;
        segmentPassed++;

        if (segmentPassed === segmentLength) {
            segmentPassed = 0;

            // rotate 90deg (right turn)
            const tmp = dx;
            dx = -dy;
            dy = tmp;

            segmentCount++;

            if (segmentCount % 2 === 0) {
                segmentLength++;
            }
        }
    }

    return { x, y };
}

export function buildRenderSpec(state: string, actionValues: number[], config: GridConfig): RenderSpec {
    if (!state) return { cells: [] };
    const [neighbours] = state.split('-');

    const maxQ = Math.max(...actionValues);
    const minQ = Math.min(...actionValues);

    const cells: CellRender[] = [];

    const size = config.size;
    const cellSize = 40;

    for (let i = 0; i < size * size; i++) {
        const x = (i % size) * cellSize;
        const y = Math.floor(i / size) * cellSize;

        if (config.hidden?.includes(i)) continue;

        const qIndex = config.qMap[i];

        const bg = getQColor(actionValues[qIndex], minQ, maxQ);

        // center
        if (i === config.center) {
            cells.push({ x, y, size: cellSize, bg });
            continue;
        }

        // special
        if (config.special?.[i] === 'bark') {
            cells.push({
                x,
                y,
                size: cellSize,
                bg,
                overlaySprite: getSprite('hau.png'),
            });
            continue;
        }

        const nIndex = config.neighborMap[i];
        const value = neighbours[nIndex];

        if (value) {
            cells.push({
                x,
                y,
                size: cellSize,
                bg,
                sprite: getSprite(value === '1' ? 'pot_intact.png' : value === '2' ? 'wall_opacue.png' : ''),
            });
        } else {
            cells.push({ x, y, size: cellSize, bg });
        }
    }

    return { cells };
}

export function renderCells(ctx: CanvasRenderingContext2D | null, spec: RenderSpec, camera: Camera) {
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // APPLY CAMERA
    ctx.setTransform(camera.scale, 0, 0, camera.scale, camera.x, camera.y);

    for (const c of spec.cells) {
        if (c.bg) {
            ctx.fillStyle = c.bg;
            ctx.fillRect(c.x, c.y, c.size, c.size);
        }

        if (c.sprite) {
            ctx.drawImage(c.sprite, c.x, c.y, c.size, c.size);
        }

        if (c.overlaySprite) {
            ctx.drawImage(c.overlaySprite, c.x - 10, c.y - 10, c.size, c.size);
        }
    }
}
