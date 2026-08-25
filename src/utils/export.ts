import { Store } from 'jotai/vanilla/store';
import JSZip from 'jszip';
import { TilePropsAtom, TopbarAtom } from '../atoms/uiState';
import { Cell, EnvSettings, TileDefinition } from '../types';
import { EnvSettingsAtom, WorldGridRenderAtom } from '../atoms/gameState';
import { ActiveAgentAtom, ActiveEnvironmentAtom, AgentSettingsAtom } from '../atoms/state';
import { CellSave, Manifest, TileDefinitionSave } from './types';
export const SAVE_VERSION = 1;

function createManifest(store: Store): Manifest {
    return {
        gameName: store.get(ActiveEnvironmentAtom).name,
        saveVersion: SAVE_VERSION,
        createdAt: new Date().toISOString(),
        highScore: store.get(TopbarAtom).topScore,
    };
}

function toSaveTile(tile: TileDefinition): TileDefinitionSave {
    return {
        id: tile.id,
        type: tile.type,
        reloadTime: tile.reloadTime,
        timer: tile.timer,
        emoji: tile.emoji ?? '',
        image: tile.emoji ? '' : tile.image,
        isCoreTile: tile.isCoreTile,
    };
}

function toSaveCell(cell: Cell): CellSave {
    return {
        type: cell.type,
        emoji: cell.emoji ?? '',
        image: cell.emoji ? '' : (cell.image ?? ''),
    };
}

function saveTools(zip: JSZip, store: Store) {
    const folder = zip.folder('Tools');

    folder?.file('tileDefinitions.json', JSON.stringify(store.get(TilePropsAtom).map(toSaveTile), null, 2));
}

function saveSettings(zip: JSZip, store: Store) {
    const envSettings: EnvSettings = {
        generic: store.get(EnvSettingsAtom).generic,
    };

    zip.folder('Game')?.file('envSettings.json', JSON.stringify(envSettings, null, 2));
}

function saveWorldGrid(zip: JSZip, store: Store) {
    const world = store.get(WorldGridRenderAtom);
    if (!world) {
        console.error('No world to save!');
        return;
    }

    const worldToSave = world.map((row) => row.map(toSaveCell));

    zip.folder('Game')?.file('world.json', JSON.stringify(worldToSave, null, 2));
}
function saveAgent(zip: JSZip, store: Store) {
    const folder = zip.folder('Agent');

    folder?.file('settings.json', JSON.stringify(store.get(AgentSettingsAtom), null, 2));

    folder?.file('activeAgent.json', JSON.stringify(store.get(ActiveAgentAtom), null, 2));
}

export async function createSave(store: Store): Promise<{ name: string; blob: Promise<Blob> }> {
    const zip = new JSZip();
    const name = store.get(ActiveEnvironmentAtom).name;

    zip.file('manifest.json', JSON.stringify(createManifest(store), null, 2));

    saveTools(zip, store);
    saveWorldGrid(zip, store);
    saveSettings(zip, store);
    saveAgent(zip, store);

    return {
        name: name,
        blob: zip.generateAsync({
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: {
                level: 9,
            },
        }),
    };
}
