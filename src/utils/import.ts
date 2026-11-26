import JSZip from 'jszip';
import { BackgroundTile, CellSave, LoadedGame, Manifest, SavePreview, TileDefinitionSave } from './types';
import { TilePropsAtom } from '../atoms/uiState';
import { EnvSettingsAtom, InnerFillCellAtom, TileBackgroundAtom, WorldGridRenderAtom } from '../atoms/gameState';
import { Store } from 'jotai/vanilla/store';
import { defaultEmptyCell } from './defaults';
import { ActiveAgentAtom, ActiveEnvironmentAtom, AgentSettingsAtom } from '../atoms/state';
import { SAVE_VERSION } from './export';
import { AgentUpdate, Cell, CellType, TileDefinition } from '../types';

export function restoreImage(image: string, emoji: string | undefined): string {
    return emoji ? emojiToDataUrl(emoji) : image;
}

export function fromSavedTile(tile: TileDefinitionSave): TileDefinition {
    return {
        ...tile,
        emoji: tile.emoji || undefined,
        image: restoreImage(tile.image, tile.emoji),
        reloadTime: 0,
        timer: 0,
    };
}

export function fromSavedCell(cell: CellSave): Cell {
    return {
        ...cell,
        emoji: cell.emoji || undefined,
        image: restoreImage(cell.image, cell.emoji),
        reloadTime: 0,
        timer: 0,
    };
}

function fromSavedBackground(cell: BackgroundTile): BackgroundTile {
    return {
        emoji: cell.emoji || undefined,
        image: restoreImage(cell.image, cell.emoji),
    };
}

/**
 * Restores imagerepresentation of emoji. Used by teacher in play tournament.
 */
export function loadMissingImagesFromEmojis(cell: CellSave): CellSave {
    return {
        ...cell,
        emoji: cell.emoji || '',
        image: restoreImage(cell.image, cell.emoji),
    };
}

export async function loadSavePreview(file: File): Promise<SavePreview> {
    const zip = await JSZip.loadAsync(file);

    const manifest = await readJson<Manifest>(zip, 'manifest.json');

    const world = (await readJson<CellSave[][]>(zip, 'Game/world.json')).map((row) => row.map(fromSavedCell));

    return {
        manifest,
        world,
    };
}

export function applyLoadedGame(store: Store, loadedGame: LoadedGame, loadAgent: boolean = true) {
    store.set(TilePropsAtom, loadedGame.tools.tileDefinitions.map(fromSavedTile));

    store.set(
        WorldGridRenderAtom,
        loadedGame.game.world.map((row) => row.map(fromSavedCell))
    );

    store.set(EnvSettingsAtom, {
        generic: loadedGame.game.envSettings.generic,
    });

    store.set(
        InnerFillCellAtom,
        loadedGame.tools.tileDefinitions.find((tile) => tile.isCoreTile && tile.type === CellType.Empty) ??
            defaultEmptyCell
    );

    store.set(TileBackgroundAtom, fromSavedBackground(loadedGame.tools.background));

    store.set(ActiveEnvironmentAtom, { name: loadedGame.manifest.gameName, type: undefined });

    store.set(AgentSettingsAtom, loadedGame.agent.settings);

    if (loadAgent) {
        store.set(ActiveAgentAtom, loadedGame.agent.activeAgent);
        // implement load Q-table and that here?
    }
}

async function readJson<T>(zip: JSZip, path: string): Promise<T> {
    const file = zip.file(path);

    if (!file) {
        throw new Error(`Missing file: ${path}`);
    }

    return JSON.parse(await file.async('string')) as T;
}

/**
 * Preprecesses input file to Environment and game data
 */
export async function readSavedFile(file: File): Promise<LoadedGame> {
    const zip = await JSZip.loadAsync(file);

    const manifest = await readJson<Manifest>(zip, 'manifest.json');

    if (manifest.saveVersion < Number(SAVE_VERSION.toFixed(0))) {
        throw new Error(`Unsupported save version ${manifest.saveVersion}. Expected ${SAVE_VERSION}.`);
    }

    return {
        manifest,
        tools: {
            tileDefinitions: await readJson(zip, 'Tools/tileDefinitions.json'),
            background: await readJson(zip, 'Tools/background.json'),
        },
        game: {
            world: await readJson(zip, 'Game/world.json'),
            envSettings: await readJson(zip, 'Game/envSettings.json'),
        },
        agent: {
            settings: await readJson(zip, 'Agent/settings.json'),
            activeAgent: await readJson(zip, 'Agent/activeAgent.json'),
        },
    };
}

export async function readSavedAgentFile(file: File): Promise<AgentUpdate> {
    const zip = await JSZip.loadAsync(file);
    const agent = await readJson<AgentUpdate>(zip, 'Agent/activeAgent.json');
    return agent;
}

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
