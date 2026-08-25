import { EnvSettings, HUDvisibilityField, TextMode, TutorialLayout, UiControlsField } from '../../../types';
import { TaskGroup } from '../../progress';
import { CellSave } from '../../types';

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
    'hidden', // 9
];

export const level2uiControls: UiControlsField[][] = [[], [], [], [], [], [], [], ['rewardC.time'], ['rewardC.props']];

export const level2HudConfig: HUDvisibilityField[][] = [
    [],
    [
        'text',
        'gameBar',
        'progress',
        'agent.img',
        'agentCluster',
        'controlBar',
        'controls.play',
        'controls.ff',
        'controls.step',
    ],
    ['gameBarContent.picked', 'gameBarContent.score'],
    [],
    [],
    [],
    [],
    ['rewardCluster', 'reward.time'],
    ['reward.props'],
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
                id: 'traps',
                text: 'levels.2.tasks.p2.task.1',
                field: 'gamePlay.noTrapsCollected',
            },
            {
                id: 'treasure',
                text: 'levels.2.tasks.p2.task.2',
                field: 'gamePlay.treasureCollected',
            },
            {
                id: 'bigTreasure',
                text: 'levels.2.tasks.p2.task.3',
                field: 'gamePlay.bigTreasureCollected',
            },
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
            maxTurns: 30,
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
            image: '/images/assets/bush_240.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
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
            image: '/images/assets/bush_240.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
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
            image: '/images/assets/bush_240.png',
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
            type: 9,
            emoji: '🍄',
            image: '',
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
            type: -1,
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
            image: '/images/assets/bush_240.png',
        },
        {
            type: -1,
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
            type: 9,
            emoji: '🍄',
            image: '',
        },
        {
            type: 9,
            emoji: '🍄',
            image: '',
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
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/cleanWhiteStone.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
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
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
        {
            type: 6,
            emoji: '',
            image: '/images/assets/smallTreasure_260.png',
        },
        {
            type: 7,
            emoji: '💰',
            image: '',
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
        {
            type: 1,
            emoji: '',
            image: '/images/assets/wall.png',
        },
    ],
];
