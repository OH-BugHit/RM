import { EnvSettings, HUDvisibilityField, TextMode, TutorialLayout, UiControlsField } from '../../../types';
import { TaskGroup } from '../../progress';
import { CellSave } from '../../types';

export const level1TextModes: TextMode[] = [
    'hidden',
    'textNext',
    'textNext',
    'textNext',
    'textNext',
    'text',
    'textNext',
    'text',
    'text',
    'textNext',
    'text',
    'textNext',
    'textNext',
    'hidden',
];

export const level1uiControls: UiControlsField[][] = [[], [], [], [], [], ['agentC.img']];

export const level1HudConfig: HUDvisibilityField[][] = [
    [],
    ['text'],
    [],
    [],
    ['progress'],
    ['agentCluster', 'agent.img'],
    ['gameBar'],
    ['controlBar', 'controls.step'],
    ['controls.play'],
    [],
    ['controls.ff'],
];

export const level1Layout: Record<number, TutorialLayout> = {
    1: {
        position: { top: '20%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
};

export const level1Tasks: TaskGroup[] = [
    {
        id: 'agent',
        title: 'levels.1.tasks.p1.title',
        visibleFrom: 0,
        visibleTo: 8,
        tasks: [
            {
                id: 'agent-image',
                text: 'levels.1.tasks.p1.task.1',
                field: 'agent.img',
                takeStep: true,
            },
        ],
    },
    {
        id: 'controls',
        title: 'levels.1.tasks.p2.title',
        visibleFrom: 0,
        visibleTo: 12,
        tasks: [
            {
                id: 'step',
                text: 'levels.1.tasks.p2.task.1',
                field: 'controls.step',
                takeStep: true,
            },
            {
                id: 'play',
                text: 'levels.1.tasks.p2.task.2',
                field: 'controls.play',
                takeStep: true,
            },
            {
                id: 'ff',
                text: 'levels.1.tasks.p2.task.3',
                field: 'controls.ff',
                takeStep: true,
            },
        ],
    },
];

export const level1Env: EnvSettings = {
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

export const level1Grid: CellSave[][] = [
    [
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
    ],
    [
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/bush_240.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/bush_240.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/bush_240.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
    ],
    [
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: -1,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 2,
            emoji: '',
            image: 'images/assets/bigTreasure_260.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
    ],
    [
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/bush_240.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/bush_240.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 0,
            emoji: '',
            image: 'images/assets/cleanWhiteStone.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
    ],
    [
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
        {
            type: 1,
            emoji: '',
            image: 'images/assets/wall.png',
        },
    ],
];
