/**
 * Preprocesses input File to smaller png
 * @param file Input file
 * @param maxSize Maximum longer side, default = 124
 * @returns png image scaled to max
 */
export const preprocessImageWScale = (file: File, maxSize = 124): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('Canvas context unavailable'));
                    return;
                }

                const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);

                const width = Math.round(img.width * scale);
                const height = Math.round(img.height * scale);

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                resolve(canvas.toDataURL('image/png'));
            };

            img.onerror = reject;
            img.src = reader.result as string;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

/**
 * Preprocesses input File to smaller tile-png
 * @param file Input file
 * @param maxSize Tile size
 * @returns png image resized for tile use
 */
export const preprocessImage = (file: File, maxSize = 64): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Canvas context unavailable'));
                    return;
                }
                canvas.width = maxSize;
                canvas.height = maxSize;
                ctx.drawImage(img, 0, 0, maxSize, maxSize);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = reject;
            img.src = reader.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

export function emojiToDataUrl(emoji: string, size = 96): string {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    ctx.clearRect(0, 0, size, size);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.floor(size * 0.72)}px sans-serif`;

    ctx.fillText(emoji, size / 2, size / 2 + size * 0.03);

    return canvas.toDataURL('image/png');
}
