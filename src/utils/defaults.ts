import {
    Actions,
    Cell,
    CellType,
    EnvSettings,
    EpisodicData,
    HUDvisibility,
    PropImages,
    StoryProgress,
    TileDefinition,
    TimeStepData,
    UiHelp,
    WorldGeneratorProps,
} from '../types';

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
    creativeClose: false,
    statsArrow: false,
    hideSideOpener: true, // Set to false on normal game?
    sideOpener: undefined,
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
    created: <PropImages>{
        n1: '/images/assets/cleanWhiteStone.png',
        p0: '/images/assets/cleanWhiteStone.png',
        p1: '/images/assets/wall1.png',
        p2: '/images/assets/trap2_260.png',
        p3: 'images/assets/key1.png',
        p4: 'images/assets/door1.png',
        p5: 'images/assets/doorLocked1_260.png',
        p6: '/images/assets/smallTreasure_260.png',
        p7: '/images/assets/bigTreasure_260.png',
        p8: '/images/assets/wall1.png',
        specialAction1: '/images/assets/hau.png',
        burglar1: 'none',
        burglar2: 'none',
    },
};

export const rewardConfigs = {
    potsAndBurglar: [
        {
            key: 'spookedBurglarReward',
            label: 'Burglar spooked by bark',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: 10,
            type: 'number',
        },
        {
            key: 'brokePotReward',
            label: 'RoboDog broke furniture',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: -2,
            type: 'number',
        },
        {
            key: 'barkSuccessReward',
            label: 'Burglar spooked by noise',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: 10,
            type: 'number',
        },
        {
            key: 'barkFailReward',
            label: 'RoboDog Barks',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: -1,
            type: 'number',
        },
        {
            key: 'burglarWonReward',
            label: 'Burglar wins',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: -10,
            type: 'number',
        },
    ],
    generic: [
        {
            key: 'stepReward',
            label: 'Step reward',
            min: -5,
            max: 5,
            step: 1,
            defaultValue: 1,
            type: 'number',
        },
        {
            key: 'reward1',
            label: 'Reward 1',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: 5,
            type: 'number',
        },
        {
            key: 'reward2',
            label: 'Reward 2',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: 5,
            type: 'number',
        },
        {
            key: 'reward3',
            label: 'Reward 3',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: 5,
            type: 'number',
        },
        {
            key: 'reward4',
            label: 'Reward 4',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: 5,
            type: 'number',
        },
        {
            key: 'reward5',
            label: 'Reward 5',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: 5,
            type: 'number',
        },
        {
            key: 'reward6',
            label: 'Reward 6',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: 5,
            type: 'number',
        },
        {
            key: 'abilitySuccessReward',
            label: 'Ability success',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: 10,
            type: 'number',
        },
        {
            key: 'abilityFailureReward',
            label: 'Ability failure',
            min: -20,
            max: 20,
            step: 1,
            defaultValue: -5,
            type: 'number',
        },
        {
            key: 'trap1',
            label: 'Trap penalty',
            min: -20,
            max: 0,
            step: 1,
            defaultValue: -10,
            type: 'number',
        },
        {
            key: 'win',
            label: 'Win reward',
            min: 0,
            max: 50,
            step: 1,
            defaultValue: 20,
            type: 'number',
        },
        {
            key: 'lose',
            label: 'Lose penalty',
            min: -50,
            max: 0,
            step: 1,
            defaultValue: -20,
            type: 'number',
        },
        {
            key: 'killed',
            label: 'Killed penalty',
            min: -100,
            max: 0,
            step: 1,
            defaultValue: -50,
            type: 'number',
        },
        {
            key: 'trapLethal',
            label: 'Trap is lethal',
            type: 'boolean',
            defaultValue: false,
        },
    ],
};

export const defaultEnvSettings: EnvSettings = {
    potsAndBurglar: {
        env: {
            gridSize: 10,
            maxTurns: 20,
            numberOfPots: 10,
            potReloadDelay: 20,
            breakPotSpooksBurglar: false,
        },
        reward: {
            spookedBurglarReward: 10,
            brokePotReward: -15,
            barkSuccessReward: 10,
            barkFailReward: -3,
            burglarWonReward: -10,
            rewardStep: 0,
        },
    },
    generic: {
        env: {
            maxTurns: 20,
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

export const defaultStoryProgress: StoryProgress = {
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
    },
    environment: {
        name: false,
        opened: false,
        props: false,
        goalSet: false,
        closed: false,
    },
    rewards: {
        opened: false,
        closed: false,
    },
    settings: {
        opened: false,
        closed: false,
    },
};

export const defaultHUDvis: HUDvisibility = {
    charts: false,
    agentVision: false,
    qTable: false,
    stats: false,
    cableLeft: false,
    cableRight: false,
    agent: false,
    envTitle: false,
    controls: false,
};

export const defaultAgents = {
    robodog: {
        name: 'Robo Dog',
        type: 'robodog',
        img: 'images/agents/robo_dog.png',
    },
    adventurer: {
        name: 'Adventurer',
        type: 'adventurer',
        img: 'images/agents/adventurerRobo2.png',
    },
    created: {
        name: '',
        type: 'created',
        img: 'images/agents/ownAgent.png',
    },
} as const;

const S: Cell = {
    type: CellType.Spawn,
    reloadTime: 0,
    timer: 0,
    image: 'images/assets/cleanWhiteStone.png',
};

const W: Cell = {
    type: CellType.Solid,
    reloadTime: 0,
    timer: 0,
    image: 'images/assets/wall1.png',
};

export const defaultWorldGrid: Cell[][] = [
    [W, W, W, W, W, W, W, W, W, W, W, W],
    [W, S, S, S, S, S, S, S, S, S, S, W],
    [W, S, S, S, S, S, S, S, S, S, S, W],
    [W, S, S, S, S, S, S, S, S, S, S, W],
    [W, S, S, S, S, S, S, S, S, S, S, W],
    [W, S, S, S, S, S, S, S, S, S, S, W],
    [W, S, S, S, S, S, S, S, S, S, S, W],
    [W, S, S, S, S, S, S, S, S, S, S, W],
    [W, S, S, S, S, S, S, S, S, S, S, W],
    [W, S, S, S, S, S, S, S, S, S, S, W],
    [W, S, S, S, S, S, S, S, S, S, S, W],
    [W, W, W, W, W, W, W, W, W, W, W, W],
];

export const initialTiles: TileDefinition[] = [
    {
        id: '0',
        type: CellType.Solid,
        image: 'none',
        isCoreTile: true,
        reloadTime: -1,
        timer: 0,
    },
    {
        id: '1',
        type: CellType.Spawn,
        image: 'none',
        isCoreTile: true,
        reloadTime: -1,
        timer: 0,
    },
    {
        id: '2',
        type: CellType.Trigger,
        image: 'none',
        isCoreTile: true,
        reloadTime: -1,
        timer: 0,
    },
];

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
