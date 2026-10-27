import {
    Agent,
    AgentCluster,
    AgentProps,
    BuildCluster,
    Cell,
    CellType,
    EnvSettings,
    InspectCluster,
    NestedKeyOf,
    RewardCluster,
    StoryProgress,
} from '../types';

export type SavePreview = {
    manifest: Manifest;
    world: Cell[][];
};

export type Manifest = {
    gameName: string;
    highScore?: number;
    saveVersion: number;
    createdAt: string;
    levelIndex?: number; // Level index-number for traslations
    stepsRequired?: number; // How many text steps are required to test button to be available
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

export type BackgroundTile = {
    emoji?: string;
    image: string;
};

export type CellSave = {
    type: CellType;
    emoji: string;
    image: string;
};

export type UiControls = {
    agentC: AgentCluster;
    buildC: BuildCluster;
    inspectC: InspectCluster;
    rewardC: RewardCluster;
};

export type LoadedGame = {
    manifest: Manifest;
    tools: {
        tileDefinitions: TileDefinitionSave[];
        background: BackgroundTile;
    };
    game: {
        world: CellSave[][];
        envSettings: EnvSettings;
    };
    agent: {
        settings: AgentProps;
        activeAgent: Agent;
    };
};

export type LevelData = {
    file: Blob;
    studentId: string;
};

export type AgentData = {
    studentId: string;
    file: Blob;
};

export type StoryProgressField = NestedKeyOf<StoryProgress>;
