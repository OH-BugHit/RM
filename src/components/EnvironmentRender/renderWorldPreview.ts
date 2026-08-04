import { Cell } from '../../types';

const CELL_SIZE = 40;
const BACKGROUND = 'rgba(255,255,255,0.5)';

const imageCache = new Map<string, HTMLImageElement>();

async function loadImage(src: string): Promise<HTMLImageElement> {
    let image = imageCache.get(src);

    if (image) {
        return image;
    }

    image = new Image();
    image.src = src;

    await image.decode();

    imageCache.set(src, image);

    return image;
}

export async function renderWorldPreview(world: Cell[][]): Promise<HTMLCanvasElement> {
    const rows = world.length;
    const cols = Math.max(...world.map((row) => row.length), 0);

    const canvas = document.createElement('canvas');
    canvas.width = cols * CELL_SIZE;
    canvas.height = rows * CELL_SIZE;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Failed to create canvas context.');
    }

    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < world[y].length; x++) {
            const cell = world[y][x];

            const px = x * CELL_SIZE;
            const py = y * CELL_SIZE;

            if (cell.emoji) {
                ctx.fillText(cell.emoji, px + CELL_SIZE / 2, py + CELL_SIZE / 2);
                continue;
            }

            if (cell.image) {
                try {
                    const image = await loadImage(cell.image);

                    ctx.drawImage(image, px, py, CELL_SIZE, CELL_SIZE);
                } catch (err) {
                    console.warn(`Unable to load image '${cell.image}'.`, err);
                }
            }
        }
    }

    return canvas;
}
