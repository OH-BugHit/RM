import { EnvSettings, HUDvisibilityField, TextMode, TutorialLayout, UiControlsField } from '../../../types';
import { TaskGroup } from '../../progress';
import { CellSave, TileDefinitionSave } from '../../types';

export const rewardTileDef: TileDefinitionSave[] = [
    {
        id: 'c6733b76-6909-4d6a-951a-dc59f343dde0',
        type: 1,
        reloadTime: -1,
        timer: 0,
        emoji: '',
        image: '/images/assets/wall.png',
        isCoreTile: true,
    },
    {
        id: '9a18c997-1493-4382-9528-c10cbac8bfe5',
        type: -1,
        reloadTime: -1,
        timer: 0,
        emoji: '',
        image: '/images/assets/cleanWhiteStone.png',
        isCoreTile: true,
    },
    {
        id: '09ea4284-02f0-44e6-ab01-3a02b93b3574',
        type: 2,
        reloadTime: -1,
        timer: 0,
        emoji: '',
        image: '/images/assets/bigTreasure_260.png',
        isCoreTile: true,
    },
    {
        id: '7ca037a8-c2a4-405a-a6ae-504485ff112d',
        type: 6,
        reloadTime: -1,
        timer: 0,
        emoji: '',
        image: '/images/assets/smallTreasure_260.png',
        isCoreTile: false,
    },
    {
        id: 'd46cf016-3e3f-4386-a2da-313af846fae4',
        type: 0,
        reloadTime: -1,
        timer: 0,
        emoji: '',
        image: '/images/assets/cleanWhiteStone.png',
        isCoreTile: false,
    },
];

export const level2TextModes: TextMode[] = [
    'hidden', // 0
    'text', // 2
    'textNext', // 1
    'textNext', // 3
    'textNext', // 4
    'textNext', // 5
    'textNext', // 6
    'textNext',
    'textNext', // 7
    'textNext', // 8
    'textNext', // 9
    'hidden', // 10
];

export const level2uiControls: UiControlsField[][] = [[], [], [], [], [], [], [], ['rewardC.time'], ['rewardC.props']];

export const level2HudConfig: HUDvisibilityField[][] = [
    [],
    ['text', 'gameBar', 'progress', 'agentCluster', 'controlBar', 'controls.play', 'controls.ff', 'controls.step'],
    ['gameBarContent.picked', 'gameBarContent.score', 'gameBarContent.toBeat'],
    [],
    [],
    [],
    [],
    ['rewardCluster', 'reward.time'],
    ['reward.props'],
    ['agent.trash'],
];

export const level2Layout: Record<number, TutorialLayout> = {
    1: {
        position: { top: '20%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
};

export const level2Tasks: TaskGroup[] = [
    {
        id: 'agent',
        title: 'levels.2.tasks.p1.title',
        visibleFrom: 0,
        visibleTo: 3,
        tasks: [
            {
                id: 'reach goal',
                text: 'levels.2.tasks.p1.task.1',
                field: 'gamePlay.goal',
                takeStep: true,
            },
        ],
    },
    {
        id: 'rewards',
        title: 'levels.2.tasks.p2.title',
        visibleFrom: 3,
        visibleTo: 12,
        tasks: [
            {
                id: 'highscore',
                text: 'levels.2.tasks.p2.task.4',
                field: 'gamePlay.newHighScore',
            },
        ],
    },
];

export const level2Env: EnvSettings = {
    generic: {
        env: {
            maxTurns: 25,
            numberOfItemsToGet: 1,
            propReloadDelay1: 'unlimited',
            collectItems: undefined,
        },
        reward: {
            rewardStep: 0,
            reward1: 0,
            reward2: 0,
            rPickObject: 5,
            rTrap: 0,
            rUseObject: 5,
            abilitySuccessReward: 10,
            abilityFailureReward: -2,
            endByTrigger: 20,
            rLoseByTimeEnds: -1,
            winByCount: 20,
        },
    },
};

export const level2Grid: CellSave[][] = [
    [
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
    ],
    [
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 6,
            emoji: '',
            image: '/images/assets/smallTreasure_260.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
    ],
    [
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 6,
            emoji: '',
            image: '/images/assets/smallTreasure_260.png',
        },
        {
            type: 6,
            emoji: '',
            image: '/images/assets/smallTreasure_260.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 6,
            emoji: '',
            image: '/images/assets/smallTreasure_260.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
    ],
    [
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 6,
            emoji: '',
            image: '/images/assets/smallTreasure_260.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
    ],
    [
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: -1,
            emoji: '',
            image: '/images/assets/start.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 2,
            emoji: '',
            image: '/images/assets/bigTreasure_260.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
    ],
    [
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
    ],
    [
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
    ],
];
