import { Agent, AgentProps, Cell, CellType, EnvSettings } from '../types';

export type SavePreview = {
    manifest: Manifest;
    world: Cell[][];
};

export type Manifest = {
    gameName: string;
    saveVersion: number;
    createdAt: string;
};
export type TileDefinitionSave = {
    id: string;
    type: CellType;
    reloadTime: number;
    timer: number;
    emoji: string;
    image: string;
    isCoreTile?: boolean;
};
export type CellSave = {
    type: CellType;
    emoji: string;
    image: string;
};

export type EnvSettingsSave = {
    generic: EnvSettings['generic'];
};

export type LoadedGame = {
    manifest: Manifest;
    tools: {
        tileDefinitions: TileDefinitionSave[];
    };
    game: {
        world: CellSave[][];
        envSettings: EnvSettingsSave;
    };
    agent: {
        settings: AgentProps;
        activeAgent: Agent;
    };
};
