import {
    Actions,
    AgentCluster,
    BuildCluster,
    Cell,
    CellType,
    ControlOptions,
    EnvSettings,
    EpisodicData,
    HUDvisibility,
    InspectCluster,
    PropImages,
    RewardCluster,
    StoryProgress,
    TeacherControl,
    TimeStepData,
    TutorialLayout,
    UiHelp,
    WorldGeneratorProps,
} from '../types';
import { BackgroundTile } from './types';

export const manhattanDirecitons = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
];

export const defaultAgentSettings = { epsilon: 0.1, gamma: 0.9, alpha: 0.1, learning: true };
export const defaultControls = { isRunning: false, isFast: false, takeStep: false };
export const defaultAudioSettings = { volume: 1 };

export const defaultUIHelp: UiHelp = {
    mode: 'created',
    designMenu: false,
    devMenu: false,
    creativeClose: false,
    textArrow: false,
    hideSideOpener: true,
    createTile: false,
    sideOpener: undefined,
};

export const CELL_TYPE_COLORS: Record<CellType, string> = {
    [CellType.Spawn]: '#74e8ff',
    [CellType.Empty]: '#F5F5F5',
    [CellType.Solid]: 'rgb(247, 142, 255)',
    [CellType.Trigger]: '#28ff1d',
    [CellType.Treasure]: '#ffbd6c',
    [CellType.TreasureBig]: '#ffa305',
    [CellType.Trap]: '#ff5c0a',
    [CellType.Door]: '#ffffff',
    [CellType.Key]: '#ffffff',
    [CellType.LockedDoor]: '#ffffff',
    [CellType.Outside]: '#ffffff',
};

const defaultImg = {
    n1: '/images/assets/cleanWhiteStone.png',
    p0: '/images/assets/cleanWhiteStone.png',
    p1: '/images/assets/wall.png',
    p2: '/images/assets/trap2_260.png',
    p3: 'images/assets/key1.png',
    p4: 'images/assets/door1.png',
    p5: 'images/assets/doorLocked1_260.png',
    p6: '/images/assets/smallTreasure_260.png',
    p7: '/images/assets/bigTreasure_260.png',
    p8: '/images/assets/wall.png',
    specialAction1: '/images/assets/hau.png',
    burglar1: 'none',
    burglar2: 'none',
};

export const defaultImages = {
    potsAndBurglar: <PropImages>{
        n1: 'none',
        p0: 'none',
        p1: '/images/assets/pot_intact.png',
        p2: '/images/assets/wall_opacue.png',
        p3: 'none',
        p4: 'none',
        p5: 'none',
        p6: 'none',
        p7: 'none',
        p8: 'none',
        specialAction1: '/images/assets/hau.png',
        burglar1: '/images/assets/burglar.png',
        burglar2: '/images/assets/burglar2.png',
    },
    created: <PropImages>{ defaultImg },
    modify: <PropImages>{ defaultImg },
    loaded: <PropImages>{ defaultImg },
};

export const defaultEnvSettings: EnvSettings = {
    generic: {
        env: {
            maxTurns: 35,
            numberOfItemsToGet: 1,
            propReloadDelay1: 'unlimited',
            collectItems: undefined,
        },
        reward: {
            rewardStep: 0,
            reward1: 1,
            reward2: 5,
            rPickObject: 5,
            rTrap: -5,
            rUseObject: 5,
            abilitySuccessReward: 10,
            abilityFailureReward: -2,
            endByTrigger: 20,
            rLoseByTimeEnds: -20,
            winByCount: 20,
        },
    },
};

export const defaultWorld: WorldGeneratorProps = {
    density: 0.7,
    numberOfEdges: 0,
    roomSizeX: 10,
    roomSizeY: 10,
};

export const defaultEpisodicData: EpisodicData = {
    triggered: 0,
    wins: 0,
    losses: 0,
    fullEpisodeReward: 0,
};

export const defaultTimeStepData: TimeStepData = {
    lastReward: 0,
    lastAction: Actions.stay,
};

export const oldTutorial: Record<number, TutorialLayout> = {
    0: {
        position: { top: '50%', left: '50%' },
        centerX: -50,
        centerY: -50,
    },
    1: {
        position: { top: '50%', left: '50%' },
        centerX: -50,
        centerY: -50,
    },
    2: {
        position: { top: '50%', left: '50%' },
        centerX: -50,
        centerY: -50,
    },
    3: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    4: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    5: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    6: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -110,
    },
    7: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -110,
    },
    8: {
        position: { top: '0%', left: '100%' },
        centerX: -110,
        centerY: 0,
    },
    9: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -110,
    },
    10: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 10,
    },
    11: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 10,
    },
    12: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 10,
    },
    13: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 10,
    },
    14: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 10,
    },
    15: {
        position: { top: '20%', left: '50%' },
        centerX: -50,
        centerY: 10,
    },
    16: {
        position: { top: '80%', left: '50%' },
        centerX: -50,
        centerY: -110,
    },
    17: {
        position: { top: '70%', left: '0%' },
        centerX: 0,
        centerY: -100,
    },
    18: {
        position: { top: '70%', left: '0%' },
        centerX: 0,
        centerY: -100,
    },
    19: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    20: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    21: {
        position: { top: '80%', left: '20%' },
        centerX: 0,
        centerY: -100,
    },
    22: {
        position: { top: '84%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    23: {
        position: { top: '84%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    24: {
        position: { top: '80%', left: '20%' },
        centerX: 0,
        centerY: -100,
    },
    25: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    26: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    27: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    28: {
        position: { top: '80%', left: '20%' },
        centerX: 0,
        centerY: -100,
    },
    29: {
        position: { top: '50%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    30: {
        position: { top: '50%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    31: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    32: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    33: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    34: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    35: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    36: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    37: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    38: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
};

export const defaultVisibleTiles = {
    agent: false,
    observation: false,
    spawn: false,
    empty: false,
    wall: false,
    trigger: false,
    key: false,
    door: false,
    lockedDoor: false,
    treasure: false,
    treasureBig: false,
    outside: false,
};

export const visibleTilesTrue = {
    agent: true,
    observation: true,
    spawn: true,
    empty: true,
    wall: true,
    trigger: true,
    key: true,
    door: true,
    lockedDoor: true,
    treasure: true,
    treasureBig: true,
    outside: true,
};

export const falseStoryProgress: StoryProgress = {
    agent: {
        opened: false,
        name: false,
        img: false,
        obsShape: false,
        closed: false,
    },
    design: {
        opened: false,
        closed: false,
        goal: false,
        solid: false,
        spawn: false,
        tools: false,
        clickOkay: false,
    },
    environment: {
        name: false,
        opened: false,
        props: false,
        goalSet: false,
        closed: false,
    },
    gamePlay: {
        bigTreasureCollected: false,
        goal: false,
        noTrapsCollected: false,
        treasureCollected: false,
        newHighScore: false,
        lockProgress: false,
    },
    rewards: {
        opened: false,
        closed: false,
    },
    settings: {
        opened: false,
        closed: false,
    },
    agentView: {
        steps: false,
        opened: false,
    },
    controls: {
        test: false,
        step: false,
        play: false,
        ff: false,
        inspect: false,
    },
};

export const defaultControlOptions: ControlOptions = {
    test: true,
    play: true,
    ff: true,
    step: true,
    inspect: true,
};

export const defaultHUDvis: HUDvisibility = {
    text: false,
    charts: false,
    agentVision: false,
    qTable: false,
    cableLeft: false,
    cableRight: false,
    gameBar: false,
    gameBarContent: {
        picked: true,
        score: true,
        toBeat: false,
    },
    controlBar: false,
    controls: {
        test: true,
        ff: true,
        play: true,
        inspect: true,
        step: true,
    },
    alpha: false,
    gamma: false,
    epsilon: false,
    progress: false,
    buildCluster: false,
    inspectCluster: false,
    rewardCluster: false,
    agentCluster: false,
    reward: {
        step: false,
        time: false,
        props: false,
    },
    agent: {
        img: false,
        obs: false,
        prm: false,
        trash: false,
    },
    build: {
        create: false,
        tools: false,
        settings: false,
    },
    inspect: {
        charts: false,
        agentVision: false,
        qMap: false,
    },
    options: {
        autoPlay: false,
    },
};

export const playStoryProgress: StoryProgress = {
    agent: {
        opened: true,
        name: true,
        img: true,
        obsShape: true,
        closed: true,
    },
    design: {
        opened: true,
        closed: true,
        goal: true,
        solid: true,
        spawn: true,
        tools: true,
        clickOkay: true,
    },
    environment: {
        name: true,
        opened: true,
        props: true,
        goalSet: true,
        closed: true,
    },
    gamePlay: {
        bigTreasureCollected: false,
        goal: false,
        noTrapsCollected: false,
        treasureCollected: false,
        newHighScore: false,
        lockProgress: false,
    },
    rewards: {
        opened: true,
        closed: true,
    },
    settings: {
        opened: true,
        closed: true,
    },
    agentView: {
        steps: true,
        opened: false,
    },
    controls: {
        test: true,
        step: true,
        play: true,
        ff: true,
        inspect: true,
    },
};

export const playHudVis: HUDvisibility = {
    text: false,
    charts: true,
    agentVision: false,
    qTable: false,
    cableLeft: false,
    cableRight: false,
    gameBar: true,
    controlBar: true,
    gameBarContent: {
        picked: true,
        score: true,
        toBeat: false,
    },
    controls: {
        test: true,
        ff: true,
        play: true,
        inspect: true,
        step: true,
    },
    alpha: false,
    gamma: true,
    epsilon: true,
    progress: false,
    buildCluster: false,
    inspectCluster: true,
    rewardCluster: true,
    agentCluster: true,
    reward: {
        step: true,
        time: true,
        props: true,
    },
    agent: {
        img: true,
        obs: true,
        prm: true,
        trash: true,
    },
    build: {
        create: false,
        tools: false,
        settings: false,
    },
    inspect: {
        charts: true,
        agentVision: true,
        qMap: true,
    },
    options: {
        autoPlay: false,
    },
};

export const hudVisFalse: HUDvisibility = {
    text: false,
    charts: false,
    agentVision: false,
    qTable: false,
    cableLeft: false,
    cableRight: false,
    gameBar: false,
    controlBar: false,
    gameBarContent: {
        picked: false,
        score: false,
        toBeat: false,
    },
    controls: {
        test: false,
        ff: false,
        play: false,
        inspect: false,
        step: false,
    },
    alpha: false,
    gamma: false,
    epsilon: false,
    progress: false,
    buildCluster: false,
    inspectCluster: false,
    rewardCluster: false,
    agentCluster: false,
    reward: {
        step: false,
        time: false,
        props: false,
    },
    agent: {
        img: false,
        obs: false,
        prm: false,
        trash: false,
    },
    build: {
        create: false,
        tools: false,
        settings: false,
    },
    inspect: {
        charts: false,
        agentVision: false,
        qMap: false,
    },
    options: {
        autoPlay: false,
    },
};

export const hudVisLevels: HUDvisibility = {
    ...hudVisFalse,
    gameBarContent: {
        picked: false,
        score: false,
        toBeat: true,
    },
};

export const hudVisBuild: HUDvisibility = {
    text: false,
    charts: true,
    agentVision: true,
    qTable: true,
    cableLeft: true,
    cableRight: true,
    gameBar: true,
    controlBar: true,
    gameBarContent: {
        picked: true,
        score: true,
        toBeat: false,
    },
    controls: {
        test: true,
        ff: true,
        play: true,
        inspect: false,
        step: true,
    },
    alpha: true,
    gamma: true,
    epsilon: true,
    progress: false,
    buildCluster: true,
    inspectCluster: true,
    rewardCluster: true,
    agentCluster: true,
    reward: {
        step: true,
        time: true,
        props: true,
    },
    agent: {
        img: true,
        obs: true,
        prm: true,
        trash: true,
    },
    build: {
        create: true,
        tools: true,
        settings: true,
    },
    inspect: {
        charts: true,
        agentVision: true,
        qMap: true,
    },
    options: {
        autoPlay: false,
    },
};

export const playVisibleTiles = {
    agent: true,
    observation: true,
    spawn: true,
    empty: true,
    wall: true,
    trigger: true,
    key: true,
    door: true,
    lockedDoor: true,
    treasure: true,
    treasureBig: true,
    outside: true,
};

export const playUIHelp: UiHelp = {
    mode: 'loaded',
    designMenu: false,
    devMenu: false,
    creativeClose: false,
    textArrow: false,
    hideSideOpener: false,
    createTile: false,
    sideOpener: undefined,
};

export const playControls: ControlOptions = {
    test: true,
    ff: true,
    play: true,
    step: true,
    inspect: true,
};

export const defAgentContent: AgentCluster = {
    img: false,
    obs: false,
    prm: false,
    trash: false,
};

export const defBuildContent: BuildCluster = {
    create: false,
    tools: false,
    settings: false,
};

export const defInspectContent: InspectCluster = {
    charts: false,
    agentVision: false,
    qMap: false,
};

export const defRewardContent: RewardCluster = {
    step: false,
    time: false,
    props: false,
};

export const defaultAgents = {
    robodog: {
        name: 'Robo Dog',
        type: 'robodog',
        img: '/images/agents/robo_dog.png',
    },
    adventurer: {
        name: 'Adventurer',
        type: 'adventurer',
        img: '/images/agents/adventure_256.png',
    },
    roboMover: {
        name: 'Robo-Mover',
        type: 'mover',
        img: '/images/agents/robo_mover.png',
    },
    roboHoover: {
        name: 'Robo-Hoover',
        type: 'mover',
        img: '/images/agents/robo_hoover.png',
    },
    created: {
        name: '',
        type: 'created',
        img: '/images/agents/ownAgent.png',
    },
} as const;

export const defaultEmptyCell: Cell = {
    type: CellType.Empty,
    reloadTime: 0,
    timer: 0,
    image: '/images/assets/cleanWhiteStone.png',
};

const E: Cell = defaultEmptyCell;

const W: Cell = {
    type: CellType.Solid,
    reloadTime: 0,
    timer: 0,
    image: '/images/assets/wall.png',
};

export const defaultSpawnCell = {
    type: CellType.Spawn,
    reloadTime: 0,
    timer: 0,
    image: '/images/assets/start.png',
};

// Do not point to defaultSpawnCell from this S!! The need to be different objects!
const S: Cell = {
    type: CellType.Spawn,
    reloadTime: 0,
    timer: 0,
    image: '/images/assets/start.png',
};

export const defaultBackground: BackgroundTile = { emoji: '', image: '/images/assets/grass.png' };

export const defaultWorldGrid: Cell[][] = [
    [W, W, W, W, W, W, W, W, W, W, W, W],
    [W, E, E, E, E, E, E, E, E, E, E, W],
    [W, E, E, E, E, E, E, E, E, E, E, W],
    [W, E, E, E, E, E, E, E, E, E, E, W],
    [W, E, E, E, E, E, E, E, E, E, E, W],
    [W, E, E, E, E, S, E, E, E, E, E, W],
    [W, E, E, E, E, E, E, E, E, E, E, W],
    [W, E, E, E, E, E, E, E, E, E, E, W],
    [W, E, E, E, E, E, E, E, E, E, E, W],
    [W, E, E, E, E, E, E, E, E, E, E, W],
    [W, E, E, E, E, E, E, E, E, E, E, W],
    [W, W, W, W, W, W, W, W, W, W, W, W],
];

export const testTeacherControls: TeacherControl = {
    wait: false,
};

export const defaultSprites: Record<number, string> = {
    [-1]: '/images/assets/cleanWhiteStone.png', // Spawn
    0: '/images/assets/cleanWhiteStone.png', // Empty
    1: '/images/assets/wall.png', // Solid
    2: '/images/assets/bush_240.png', // Trigger
    3: '/images/assets/key1.png', // Key
    4: '/images/assets/door1.png', // Door
    5: '/images/assets/doorLocked1_260.png', // Locked Door
    6: '/images/assets/smallTreasure_260.png', // Treasure
    7: '/images/assets/bigTreasure_260.png', // Big Treasure
    8: '/images/assets/cleanWhiteStone.png', // Outside
    9: '/images/assets/trap2_260.png', // Trap
    10: '/images/assets/burglar.png',
    11: '/images/assets/hau.png',
};

export const defaultPotsAndBurglarSprites: Record<number, string> = {
    [-1]: '/images/assets/cleanWhiteStone.png', // Spawn
    0: '/images/assets/cleanWhiteStone.png', // Empty
    1: '/images/assets/pot_intact.png', // Solid
    2: '/images/assets/wall.png', // Trigger
    3: '/images/assets/cleanWhiteStone.png', // Key
    4: '/images/assets/cleanWhiteStone.png', // Door
    5: '/images/assets/cleanWhiteStone.png', // Locked Door
    6: '/images/assets/cleanWhiteStone.png', // Treasure
    7: '/images/assets/cleanWhiteStone.png', // Big Treasure
    8: '/images/assets/cleanWhiteStone.png', // Outside
    9: '/images/assets/cleanWhiteStone.png', // Trap
    10: '/images/assets/burglar.png',
    11: '/images/assets/hau.png',
};
