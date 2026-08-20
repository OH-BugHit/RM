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
    levelIndex?: number;
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
export type StoryProgressField = NestedKeyOf<StoryProgress>;
