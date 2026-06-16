export enum NeighbourEntity {
    Empty = 0,
    Wall = 1,
    Trap = 2,
}

export enum ViewEnum {
    MainView = 'view',
    Subview = 'sub',
    Overlay = 'overlay',
}

export interface TextErrors {
    username?: 'missing' | 'long' | 'short';
    type?: 'missing';
}

export interface WorldErrors {
    density?: 'missing';
    numberOfEdges?: 'missing';
    roomSizeX?: 'missing';
    roomSizeY?: 'missing';
}

export type EdgeType = RoomType | 'lockedDoor' | 'newEdge';
export type RoomType = 'spawnArea' | 'lockedRoom' | 'openRoom';
export enum CellType {
    Spawn = -1,
    Empty = 0,
    Wall = 1,
    Trap = 2,
    Key = 3,
    Door = 4,
    LockedDoor = 5,
    Treasure = 6,
    TreasureBig = 7,
    Outside = 8,
}

export type StateData = {
    previous: string;
    current: string;
};

export type EpisodicData = {
    triggered: number;
    wins: number;
    losses: number;
    fullEpisodeReward: number;
};

export type TimeStepData = {
    lastReward: number;
    lastAction: Actions;
};

export type EnvironmentSelection = {
    name: string;
    type: EnvironmentTypes;
    world: WorldGeneratorProps;
    envProps: PropImages | undefined;
};

export type PropImages = {
    n1: string; // spawn area, Generic world will allow spawning only here
    p0: string; // open floor, Free to move. Use as open floor
    p1: string; // Wall, blocks movement
    p2: string; // Trap (possibly episode ending), stats have counter for this. Like pots.
    p3: string; // Key, (pickable object)
    p4: string; // Open door, already opened door
    p5: string; // Locked door, requires key, key is automatically used.
    p6: string; // Reward 1, triggers reward 1
    p7: string; // Reward 2, -""- 2
    p8: string; // Out of bounds (Out of the playable area)
    specialAction1: string; // Special action image for agent vision
    burglar1: string; // enemy 1
    burglar2: string; // enemy 2
};

export type WorldGeneratorProps = {
    numberOfEdges: number;
    density: number;
    roomSizeX: number;
    roomSizeY: number;
};

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

// Views

export type View = {
    main?: MainView;
    sub?: SubView;
    overlay?: Overlay;
};
export type MainView = 'frontpage' | 'story' | 'game' | 'start' | 'tutorial' | null;
export type SubView = 'agent' | 'environment' | 'rewards' | 'interaction' | null;
export type Overlay = 'agentImgImport' | null;

export type ObservationShape = 'small' | 'large' | 'none';

export type GenericObservation = {
    neighbors: CellType[];
    POIdirection?: SixthSenseDirection;
};

export enum SixthSenseDirection {
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
    specialAction = 4,
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

export type GenericEnv = {
    maxTurns: number; // Maximum number of steps in episode
    numberOfItemsToGet: number; // How many spesific Cells needs to be found for episode to terminate
    propReloadDelay1: number | undefined; // How many steps it takes to reload props (like traps or pots)
    lethalProps: boolean; // Does finding lethal-type tile end episode
};

export type GenericReward = {
    rewardStep: number;
    reward1: number;
    reward2: number;
    reward3: number;
    reward4: number;
    reward5: number;
    reward6: number;
    abilitySuccessReward: number;
    abilityFailureReward: number;
    trap1: number; // punsihment reward (like traps)
    trapLethal: boolean; // if trap is leath
    win: number;
    lose: number;
    killed: number; // Reward for losing by trapLethal
};

export type SoundSettings = {
    volume: number; // 0..1
};

export type EnvSettings = {
    potsAndBurglar: {
        env: RoboDogEnv;
        reward: RoboDogRewards;
    };
    treasureHunter: {
        env: GenericEnv;
        reward: GenericReward;
    };
    generic: {
        env: GenericEnv;
        reward: GenericReward;
    };
};

export type RoboDogRewards = {
    spookedBurglarReward: number;
    brokePotReward: number;
    barkSuccessReward: number;
    barkFailReward: number;
    burglarWonReward: number;
};

export type GameEnvironmentInfo = {
    timeLeft: number;
    result: string;
    message: string;
    trigger: boolean;
};

export type Control = {
    isRunning: boolean;
    isFast: boolean;
    takeStep: boolean;
};

export type Agent = {
    name: string;
    type: AgentType;
    observationShape: ObservationShape;
    img: string;
};

export type GameEnvironment = {
    name: string;
    type: EnvironmentTypes;
    world: WorldGeneratorProps;
};

export type EnvironmentTypes = 'potsAndBurglar' | 'treasureHunter' | 'created' | undefined;
export type AgentType = 'robodog' | 'hoover' | 'adventurer' | 'created' | 'none';
