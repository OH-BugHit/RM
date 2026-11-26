import { QPolicyAgent } from './components/agents/policyQagent';
import { TaskGroup } from './utils/progress';
import { LoadedGame, UiControls } from './utils/types';

export enum NeighbourEntity {
    Empty = 0,
    Wall = 1,
    Trap = 2,
}

export enum ViewEnum {
    MainView = 'view',
    Subview = 'sub',
    Overlay = 'overlay',
    Level = 'levels',
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

export type Task = {
    taskName: string;
    task: string;
    completed: boolean;
};

export type TeacherControl = {
    wait: boolean; // Wait for teacher to activate
};

export type FireworkPulse = {
    highScore: boolean;
    bestScore: boolean;
};

export type AgentTest = 'isRunning' | 'passed' | 'no' | 'available';

export type Level = {
    level: LoadedGame;
    levelTasks?: TaskGroup[];
    levelText?: {
        modes?: TextMode[];
        textKey?: string;
        layouts?: Record<number, TutorialLayout>;
        additionalMaterial?: number[]; // if additional information such as images etc. is needed, store here the step-numbers as keys
        hintNext?: number[];
        focusPoints?: Record<number, FocusTarget>;
    };
    uiControls?: UiControlsField[][];
    hudSettings?: HUDvisibilityField[][]; // Available tools / clusters
};

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
    gamePlay: {
        goal: boolean;
        lockProgress: boolean;
        noTrapsCollected: boolean;
        treasureCollected: boolean;
        bigTreasureCollected: boolean;
        newHighScore: boolean;
    };
    rewards: {
        opened: boolean;
        closed: boolean;
    };
    settings: {
        opened: boolean;
        closed: boolean;
    };
    agentView: {
        steps: boolean;
        opened: boolean;
    };
    controls: {
        step: boolean;
        play: boolean;
        ff: boolean;
        inspect: boolean;
        test: boolean;
    };
};

export type TutorialLayout = {
    position: Pick<React.CSSProperties, 'top' | 'right' | 'bottom' | 'left'>;
    centerX?: number;
    centerY?: number;
    variant?: 'wide' | 'narrow';
};

export type LevelText = { mode: TextMode; textKey: string };

export type TextMode = 'stats' | 'text' | 'textNext' | 'inspect' | 'hidden';

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
    test: boolean;
    play: boolean;
    ff: boolean;
    step: boolean;
    inspect: boolean;
    trash: boolean;
};

export type InspectButtons = 'qMap' | 'agentVision' | 'charts';

export type RewardButtons = 'step' | 'time' | 'props';

export type AgentButtons = 'img' | 'obs' | 'prm';

export type BuildButtons = 'create' | 'tools' | 'settings';

export type BuildCluster = {
    create: boolean;
    tools: boolean;
    settings: boolean;
};

export type Clusters = {
    reward: boolean;
    agent: boolean;
    inspect: boolean;
    build: boolean;
};

export type RewardCluster = {
    step: boolean;
    time: boolean;
    props: boolean;
};

export type AgentCluster = {
    img: boolean;
    obs: boolean;
    prm: boolean;
    trash: boolean;
};

export type InspectCluster = {
    qMap: boolean;
    agentVision: boolean;
    charts: boolean;
};

/**
 * Data sent from a
 */
export type TournamentAgents = { data: Map<string, AgentUpdate> };

export type AgentUpdate = {
    Q: Record<string, number[]>;
    observationShape: ObservationShape;
    img: string | undefined;
    rewards: GenericReward;
};

export type ClusterType = 'agent' | 'reward' | 'inspect' | 'build';

export type HUDvisibility = {
    text: boolean;
    charts: boolean;
    agentVision: boolean;
    qTable: boolean;
    cableLeft: boolean;
    cableRight: boolean;
    gameBar: boolean;
    gameBarContent: {
        picked: boolean;
        score: boolean;
        toBeat: boolean;
    };
    controlBar: boolean;
    controls: {
        test: boolean;
        ff: boolean;
        play: boolean;
        inspect: boolean;
        step: boolean;
    };
    alpha: boolean;
    gamma: boolean;
    epsilon: boolean;
    progress: boolean;

    rewardCluster: boolean;
    agentCluster: boolean;
    inspectCluster: boolean;
    buildCluster: boolean;
    build: BuildCluster;
    inspect: InspectCluster;
    reward: RewardCluster;
    agent: AgentCluster;
    options: {
        autoPlay: boolean;
    };
};

export type HUDvisibilityField = NestedKeyOf<HUDvisibility>;
export type UiControlsField = NestedKeyOf<UiControls>;

export type NestedKeyOf<T> = {
    [K in keyof T & string]: T[K] extends object ? `${K}.${keyof T[K] & string}` : K;
}[keyof T & string];

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

// Basic options for celltypes. Spawn type is special type
export const BASIC_CELL_TYPE_OPTIONS: CellType[] = [
    CellType.Solid,
    CellType.Empty,
    CellType.Trigger,
    CellType.Treasure,
    CellType.TreasureBig,
    CellType.Trap,
];

export type TileLibraryCategory = 'walls' | 'floors' | 'nature' | 'hazards' | 'treasures' | 'agents';

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

export type TestWinData = {
    beatsScore: number;
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
    level?: string | null;
};
export type SinglePlayViews = 'ownLevels' | 'play' | 'build' | 'modify';
export type StudentViews = 'join' | 'main' | GamePhase | SinglePlayViews;
export type LevelGroup = {
    groupName: string;
    levels: Level[];
    groupType: GroupType;
};
export type GroupType = 'basic' | 'rewards' | 'exploreExploit' | 'observation' | 'learning' | 'bonus';

export type MainView = 'frontpage' | TeacherViews | StudentViews | 'null';
export type SubView = 'playLevel' | 'agent' | 'environment' | 'rewards' | 'interaction' | 'selectChallenge' | null;
export type Overlay =
    | 'tournamentMenu'
    | 'report'
    | 'import'
    | 'share'
    | 'shareSinglePlayerTournament'
    | 'menu'
    | 'backgroundDialog'
    | TeacherDialogs
    | null;

export const MENU_AT_TOP: MainView[] = ['levels', 'recap', 'ownLevels', 'tournamentPlay'];

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

// Teacher's Types starts
export type TeacherViews = 'users' | GamePhase;

export type TeacherDialogs = 'share' | 'settings';

export type UserInfo = {
    username: string;
    connectionId: string;
};

export type UserItemData = {
    username: string;
    profilePicture: string | null;
};

export type Username = {
    username: string;
};

export type MessageData = {
    message: string;
    reload: boolean;
    action: 'bouncer'; // bouncer handles kicking students, resetResults handles resetting result for term
    recipient?: Username;
};

export type Settings = {
    limitScoreboard: {
        limit: number;
        showAll: boolean;
    };
    userGridSettings: {
        userGridShowCrowns: boolean;
        userGridAutoGrow: boolean;
        userGridMaxColumns: number;
    };
};

/**
 * Maps a student ID to their scores (K = student ID, V = StudentScores)
 */
export type StudentData = { students: Map<string, StudentScores> };

export type SerializableStudentData = {
    students: Array<{
        studentId: string;
        scores: Record<string, StudentScore>;
    }>;
};

/**
 * Maps a student ID to their created level (K = student ID, V = level)
 */
export type StudentGames = { students: Map<string, LoadedGame> };

export type StudentGameBlobs = { students: Map<string, Blob> };

/**
 * Map k: studentId, v: Students agent
 */
export type StudentAgents = { data: Map<string, QPolicyAgent> };

/**
 * Maps a level to a score (K = levelName, V = Score)
 */
export type StudentScores = {
    data: Map<string, StudentScore>;
};

export type StudentScore = {
    score?: number;
};

export type RewardConfig = {
    pause: boolean;
    phase: GamePhase | undefined;
};

export type GamePhase = 'levels' | 'tournamentBuild' | 'tournamentPlay' | 'recap';

export type RegisterData = {
    username: string;
    profilePicture: string | null;
};

export type ScoreData = {
    studentId: string;
    levelName: string;
    score: number;
};

/**
 * Contains top scores for all terms
 * K = term, V = TopResult
 */
export type TopThreeResults = {
    scores: Map<string, TopThree>;
};

// contains top score for single term
export type TopThree = {
    bestScore: Result | null;
    secondScore: Result | null;
    thirdScore: Result | null;
};
export type Result = {
    score: number;
    studentId: string;
};

export type Bouncer = {
    message: string;
    reload: boolean;
};

// Teacher's types ends

export type SoundSettings = {
    volume: number; // 0..1
};

export type EnvSettings = {
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
export type AgentType = 'robodog' | 'hoover' | 'mover' | 'adventurer' | 'created' | 'unset';

export type Target =
    | {
          type: 'cluster';
          x: number;
          y: number;
      }
    | {
          type: 'viewport';
          x: number;
          y: number;
      }
    | {
          type: 'viewport';
          position: 'center' | 'topLeft';
      }
    | {
          type: 'origin';
          x: number;
          y: number;
      };

/**
 * Focus overlay can navigate with ID
 */
export type FocusPoint = {
    id: string;
    padding: number;
};

/**
 * Or it can navigate with relative coordinates (0-100%)
 */
export type CoordinateFocusPoint = {
    location: { x: number; y: number };
    radius: number;
};

export type FocusTarget = FocusPoint | CoordinateFocusPoint;
