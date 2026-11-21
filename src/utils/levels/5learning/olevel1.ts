import { EnvSettings, HUDvisibilityField, TextMode, TutorialLayout, UiControlsField } from '../../../types';
import { TaskGroup } from '../../progress';
import { CellSave } from '../../types';

export const level1TextModes: TextMode[] = [
    'hidden', // 0
    'textNext', // 1
    'textNext', // 2
    'textNext', // 3
    'textNext', // 4
    'textNext', // 5
    'textNext', // 6
    'textNext', // 7
    'textNext', // 8
    'textNext', // 9
    'textNext', // 10
    'textNext', // 11
    'text', // 12
    'hidden', // 13
    'textNext', // 14
    'textNext', // 15
];

export const level1uiControls: UiControlsField[][] = [[], [], [], [], [], [], [], [], ['inspectC.qMap'], [], []];

export const level1HudConfig: HUDvisibilityField[][] = [
    [],
    ['text', 'gameBar', 'progress', 'agent.img', 'agentCluster', 'options.autoPlay'],
    [],
    [],
    [],
    [],
    [],
    ['inspectCluster', 'inspect.qMap'],
    [],
    [],
    [],
    [],
    ['controlBar', 'controls.inspect', 'controls.step', 'controls.ff', 'controls.test'],
    [],
];

export const level1Layout: Record<number, TutorialLayout> = {
    1: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 110,
        variant: 'wide',
    },
    2: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 110,
        variant: 'wide',
    },
    3: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 110,
        variant: 'wide',
    },
    4: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 110,
        variant: 'wide',
    },
    5: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 110,
        variant: 'wide',
    },
    6: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 110,
        variant: 'wide',
    },
    7: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 110,
        variant: 'wide',
    },
    8: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 110,
        variant: 'wide',
    },
    9: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 110,
        variant: 'wide',
    },
    10: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 110,
        variant: 'wide',
    },
    11: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 110,
        variant: 'wide',
    },
};

export const level1Tasks: TaskGroup[] = [
    {
        id: 'Curiosity',
        title: 'levels.5.tasks.p1.title',
        visibleFrom: 0,
        visibleTo: 12,
        tasks: [
            {
                id: 'highscore',
                text: 'levels.4.tasks.p1.task.1',
                field: 'gamePlay.newHighScore',
            },
        ],
    },
];

export const level1Env: EnvSettings = {
    generic: {
        env: {
            maxTurns: 40,
            numberOfItemsToGet: 1,
            propReloadDelay1: 'unlimited',
            collectItems: undefined,
        },
        reward: {
            rewardStep: 0,
            reward1: 8,
            reward2: 2,
            rPickObject: 5,
            rTrap: -5,
            rUseObject: 5,
            abilitySuccessReward: 10,
            abilityFailureReward: 0,
            endByTrigger: 10,
            rLoseByTimeEnds: -4,
            winByCount: 20,
        },
    },
};

export const level1Grid: CellSave[][] = [
    [
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
            image: '/images/assets/bush_240.png',
        },
    ],
    [
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
            type: 7,
            emoji: '💰',
            image: '',
        },
        {
            type: 7,
            emoji: '💰',
            image: '',
        },
        {
            type: 2,
            emoji: '',
            image: '/images/assets/bigTreasure_260.png',
        },
        {
            type: 7,
            emoji: '💰',
            image: '',
        },
        {
            type: 7,
            emoji: '💰',
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
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
    ],
    [
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
            type: 6,
            emoji: '',
            image: '/images/assets/smallTreasure_260.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
    ],
    [
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
            image: '/images/assets/wall.png',
        },
        {
            type: 2,
            emoji: '',
            image: '/images/assets/bigTreasure_260.png',
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
            type: 2,
            emoji: '',
            image: '/images/assets/bigTreasure_260.png',
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
            image: '/images/assets/bush_240.png',
        },
    ],
    [
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
            image: '/images/assets/wall.png',
        },
        {
            type: 7,
            emoji: '💰',
            image: '',
        },
        {
            type: 7,
            emoji: '💰',
            image: '',
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
            type: 9,
            emoji: '🍄',
            image: '',
        },
        {
            type: 6,
            emoji: '',
            image: '/images/assets/smallTreasure_260.png',
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
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
    ],
    [
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
            type: -1,
            emoji: '',
            image: '/images/assets/start.png',
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
            image: '/images/assets/bush_240.png',
        },
    ],
    [
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
            type: 7,
            emoji: '💰',
            image: '',
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
            image: '/images/assets/bush_240.png',
        },
    ],
    [
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
            type: 6,
            emoji: '',
            image: '/images/assets/smallTreasure_260.png',
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
    ],
    [
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
            type: 6,
            emoji: '',
            image: '/images/assets/smallTreasure_260.png',
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
    ],
    [
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
    ],
    [
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
            type: 6,
            emoji: '',
            image: '/images/assets/smallTreasure_260.png',
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
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
    ],
    [
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
            image: '/images/assets/bush_240.png',
        },
    ],
];
