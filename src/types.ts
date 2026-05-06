export enum NeighbourEntity {
    Empty = 0,
    Wall = 1,
    Trap = 2,
}

export interface TextErrors {
    username?: 'missing' | 'long' | 'short';
    type?: 'missing';
}

export type CellRender = {
    x: number;
    y: number;
    size: number;
    bg?: string;
    sprite?: HTMLImageElement;
    overlaySprite?: HTMLImageElement;
    alpha?: number;
};

export type RenderSpec = {
    cells: CellRender[];
};

export type Camera = {
    x: number;
    y: number;
    scale: number;
};

export type Position = { x: number; y: number };

export type GridConfig = {
    size: number;
    hidden?: number[];
    center: number;

    special?: Record<number, 'bark'>;

    neighborMap: Record<number, number>;
    qMap: Record<number, number>;
};

export type Offset = { dx: number; dy: number };

export type View = 'frontpage' | 'story' | 'game' | undefined;
export type SubView = 'agent' | 'actions' | 'environment' | 'rewards' | undefined;

export type ObservationShape = {
    width: number;
    height: number;
    data: Uint8Array;
};

export type BurglarGameObservation = {
    neighbors: NeighbourEntity[];
    burglar: BurglarPosition;
};

export enum BurglarPosition {
    North = 0,
    South = 1,
    East = 2,
    West = 3,
    Away = 4,
}

export enum Actions {
    up = 0,
    down = 1,
    left = 2,
    right = 3,
    bark = 4,
    stay = 5,
}

export type AgentProps = {
    epsilon: number;
    gamma: number;
    alpha: number;
    learning: boolean;
};

export type RoboDogEnv = {
    gridSize: number;
    maxTurns: number;
    numberOfPots: number;
    potReloadDelay: number;
    breakPotSpooksBurglar: boolean;
};

export type TempSettings = Record<
    Games,
    {
        env: EnvSettings;
        reward: RewardSettings;
    }
>;

export type RoboDogRewards = {
    spookedBurglarReward: number;
    brokePotReward: number;
    barkSuccessReward: number;
    barkFailReward: number;
    burglarWonReward: number;
};

export type EnvSettings = {
    settings: RoboDogEnv | undefined;
};

export type RewardSettings = {
    settings: RoboDogRewards | undefined;
};

export type DogInfo = {
    timeLeft: number;
    result: string;
    message: string;
};

export type Control = {
    isRunning: boolean;
    isFast: boolean;
    takeStep: boolean;
};

export type Agent = {
    name: string;
    type: AgentType;
};

export type EnvironmentTypes = 'potsAndBurglar' | 'treasureHunter' | undefined;

export type GameEnvironment = {
    name: string;
    type: EnvironmentTypes;
};

export type AgentType = 'robodog' | 'hoover' | 'adventurer' | undefined;

export type Games = 'robodog' | 'none';
