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

export type Side = 'top' | 'bottom' | 'right' | 'left';

export type SideOptions = 'agent' | 'design' | 'newTile' | 'reward' | 'settings' | 'create' | 'save' | undefined;
export type PanelOptions = {
    visible: boolean;
    content: SideOptions;
};

export type VisibleTiles = {
    agent: boolean;
    observation: boolean;
    spawn: boolean;
    empty: boolean;
    wall: boolean;
    trigger: boolean;
    key: boolean;
    door: boolean;
    lockedDoor: boolean;
    treasure: boolean;
    treasureBig: boolean;
    outside: boolean;
};

export type StoryProgress = {
    agent: {
        name: boolean;
        img: boolean;
        obsShape: boolean;
        opened: boolean;
        closed: boolean;
    };
    design: {
        opened: boolean;
        closed: boolean;
        goal: boolean;
        solid: boolean;
        spawn: boolean;
        tools: boolean;
        clickOkay: boolean;
    };
    environment: {
        goalSet: boolean;
        name: boolean;
        props: boolean;
        opened: boolean;
        closed: boolean;
    };
    rewards: {
        opened: boolean;
        closed: boolean;
    };
    settings: {
        opened: boolean;
        closed: boolean;
    };
    hud: {
        agentView: {
            steps: boolean;
        };
    };
};

export type StatsContent = {
    mode: 'stats' | 'text' | 'textNext' | 'inspect';
    phase: number;
};

export type TopBar = {
    traps: number;
    treasures: number;
    bigTreasures: number;
    score: number;
    topScore: number;
    toBeat: number;
};

export type ObjectType = 'treasure' | 'bigTreasure' | 'trap' | null;

export type InspectState = {
    vis: boolean;
    step: number;
};

export type ControlOptions = {
    play: boolean;
    ff: boolean;
    step: boolean;
    inspect: boolean;
};

export type HUDvisibility = {
    text: boolean;
    charts: boolean;
    agentVision: boolean;
    qTable: boolean;
    cableLeft: boolean;
    cableRight: boolean;
    agent: boolean;
    envTitle: boolean;
    controls: boolean;
    alpha: boolean;
    gamma: boolean;
    epsilon: boolean;
    progress: boolean;
};

export type EdgeType = RoomType | 'lockedDoor' | 'newEdge';
export type RoomType = 'spawnArea' | 'lockedRoom' | 'openRoom';

export type UiHelp = {
    mode: EnvironmentTypes;
    devMenu: boolean;
    designMenu: boolean;
    textArrow: boolean;
    creativeClose: boolean;
    hideSideOpener: boolean;
    sideOpener: SideOptions;
    createTile: boolean;
};

export type StateViewType = 'agent' | 'sprite';

export type TileDefinition = {
    id: string;
    type: CellType;
    reloadTime: number;
    timer: number;
    emoji?: string;
    image: string;
    isCoreTile?: boolean;
};

export type Cell = {
    type: CellType;
    reloadTime: number; // Time it takes to reload this cell after visited. 0 = always on, -1 = episode.
    timer: number; // Timer for reloading. Cell revisitable when 0
    image?: string;
    emoji?: string;
};

export enum CellType {
    Spawn = -1,
    Empty = 0,
    Solid = 1,
    Trigger = 2,
    Key = 3,
    Door = 4,
    LockedDoor = 5,
    Treasure = 6,
    TreasureBig = 7,
    Outside = 8,
    Trap = 9,
}

/**
 * CELL_TYPE_OPTIONS, is full set of celltypes, not in use anymore.
 */
export const CELL_TYPE_OPTIONS = Object.values(CellType).filter((v) => typeof v === 'number') as CellType[];

// Basic options for celltypes
export const BASIC_CELL_TYPE_OPTIONS: CellType[] = [
    CellType.Spawn,
    CellType.Empty,
    CellType.Solid,
    CellType.Trigger,
    CellType.Treasure,
    CellType.TreasureBig,
    CellType.Trap,
];

export type TileLibraryCategory =
    | 'walls'
    | 'floors'
    | 'nature'
    | 'objects'
    | 'doors'
    | 'hazards'
    | 'treasures'
    | 'agents';

export type TileLibraryItem = {
    id: string;
    label: string;
    image: string;
    category: TileLibraryCategory;
};

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
};
//  envProps: PropImages | undefined;
export type PropImages = {
    n1?: string; // spawn area, Generic world will allow spawning only here
    p0?: string; // open floor, Free to move. Use as open floor
    p1?: string; // Wall, blocks movement
    p2?: string; // Trigger (possibly episode ending), stats have counter for this. Like pots.
    p3?: string; // Key, (pickable object)
    p4?: string; // Open door, already opened door
    p5?: string; // Locked door, requires key, key is automatically used.
    p6?: string; // Reward 1, triggers reward 1
    p7?: string; // Reward 2, -""- 2
    p8?: string; // Out of bounds (Out of the playable area)
    specialAction1?: string; // Special action image for agent vision
    burglar1?: string; // enemy 1
    burglar2?: string; // enemy 2
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
export type Overlay = 'import' | null;

export type GenericObservation = {
    neighbours: CellType[];
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
    propReloadDelay1: number | 'unlimited'; // How many steps it takes to reload props (like traps or pots)
    collectItems: number | undefined;
};

export type GenericReward = {
    rewardStep: number; // Reward for timestep
    reward1: number; // Reward for moving over Celltype 6 (treasure)
    reward2: number; // Reward for moving over Celltype 7 (big treasure)
    rPickObject: number; // Reward for moving over Celltype 3 (key/ usable object)
    rTrap: number; // Reward for moving over Celltype 9 (trap)
    rUseObject: number; // Reward for moving over Celltype 5 (requires key/ usable object), TODO: Logic for locked-> door
    abilitySuccessReward: number; // Reward for using ability and succeed TODO: IS THIS NEEDED?
    abilityFailureReward: number; // Reward for using ability and fail (unneccessary)
    endByTrigger: number; // Reward for episode end on trigger
    rLoseByTimeEnds: number;
    winByCount: number; // Reward for episode end on enough items collected
};

export type SoundSettings = {
    volume: number; // 0..1
};

export type EnvSettings = {
    potsAndBurglar: {
        env: RoboDogEnv;
        reward: RoboDogRewards;
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
    rewardStep: number;
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
    img: string | undefined;
};

export type GameEnvironment = {
    name: string;
    type: EnvironmentTypes;
    world: WorldGeneratorProps;
};

export type ObservationShape = 'small' | 'large' | 'unset';
export type EnvironmentTypes = 'potsAndBurglar' | 'created' | 'loaded' | 'modify' | undefined;
export type AgentType = 'robodog' | 'hoover' | 'adventurer' | 'created' | 'unset';
