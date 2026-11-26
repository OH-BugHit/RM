import { Store } from 'jotai/vanilla/store';
import JSZip from 'jszip';
import { TilePropsAtom, TopbarAtom } from '../atoms/uiState';
import { AgentUpdate, Cell, EnvSettings, TileDefinition } from '../types';
import { EnvSettingsAtom, TileBackgroundAtom, WorldGridRenderAtom } from '../atoms/gameState';
import { ActiveAgentAtom, ActiveEnvironmentAtom, AgentSettingsAtom } from '../atoms/state';
import { CellSave, Manifest, TileDefinitionSave } from './types';
import { QLearningAgent } from '../components/agents/rlAgentQ';
export const SAVE_VERSION: number = 2.1; // Only major updates are blocked! (e.g 2.1 allows manifest 2.0 but not manifest 1.9)

function createManifest(store: Store, id: string): Manifest {
    return {
        gameName: store.get(ActiveEnvironmentAtom).name ?? 'My Game',
        saveVersion: SAVE_VERSION,
        createdAt: new Date().toISOString(),
        highScore: store.get(TopbarAtom).topScore,
        levelID: id,
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
    folder?.file('background.json', JSON.stringify(store.get(TileBackgroundAtom), null, 2));
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

export async function createSaveAgent(agent: QLearningAgent, store: Store): Promise<Blob> {
    const zip = new JSZip();
    const folder = zip.folder('Agent');
    const atomAgent = store.get(ActiveAgentAtom);
    const saveAgent: AgentUpdate = {
        Q: agent.Q,
        observationShape: atomAgent.observationShape,
        img: atomAgent.img,
        rewards: store.get(EnvSettingsAtom).generic.reward,
    };

    folder?.file('activeAgent.json', JSON.stringify(saveAgent, null, 2));

    return zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
            level: 9,
        },
    });
}

export async function createSave(store: Store, id: string): Promise<{ name: string; blob: Promise<Blob> }> {
    const zip = new JSZip();
    const name = store.get(ActiveEnvironmentAtom).name;

    zip.file('manifest.json', JSON.stringify(createManifest(store, id), null, 2));

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
