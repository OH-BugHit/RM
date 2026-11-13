import { EnvSettings, HUDvisibilityField } from '../../../../types';
import { CellSave, TileDefinitionSave } from '../../../types';

export const tileDef: TileDefinitionSave[] = [
    {
        id: '7b2c50c0-9754-4763-876a-8470a1200b2c',
        type: 1,
        reloadTime: -1,
        timer: 0,
        emoji: '',
        image: '/images/assets/bush_240.png',
        isCoreTile: true,
    },
    {
        id: 'ea2ac3a7-eeec-4cd8-a0ee-dbecbe040d12',
        type: 0,
        reloadTime: -1,
        timer: 0,
        emoji: '',
        image: '/images/assets/grass.png',
        isCoreTile: true,
    },
    {
        id: '7f608ff0-a4e4-41d4-8a0a-12945abd5426',
        type: 2,
        reloadTime: -1,
        timer: 0,
        emoji: '',
        image: '/images/assets/mover_charge_128.png',
        isCoreTile: true,
    },
    {
        id: '584f5362-d4db-4bbb-8334-fe657a640254',
        type: 6,
        reloadTime: -1,
        timer: 0,
        emoji: '',
        image: '/images/assets/grassLong.png',
        isCoreTile: false,
    },
    {
        id: 'cdedbdb7-07a1-4130-86a5-614b1c055f6f',
        type: 9,
        reloadTime: -1,
        timer: 0,
        emoji: '🌻',
        image: '',
        isCoreTile: false,
    },
    {
        id: 'cfa817a7-6026-4531-81bf-f7f2143febd0',
        type: 9,
        reloadTime: -1,
        timer: 0,
        emoji: '🌷',
        image: '',
        isCoreTile: false,
    },
    {
        id: 'bef32878-67ee-46e2-8fe4-1b6ee313b489',
        type: 7,
        reloadTime: -1,
        timer: 0,
        emoji: '🍃',
        image: '',
        isCoreTile: false,
    },
];

export const blevel2HudConfig: HUDvisibilityField[][] = [
    [
        'text',
        'gameBar',
        'progress',
        'agentCluster',
        'controlBar',
        'controls.play',
        'controls.ff',
        'controls.step',
        'gameBarContent.picked',
        'gameBarContent.score',
        'rewardCluster',
        'reward.time',
        'reward.props',
        'agent.trash',
    ],
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
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 9,
            emoji: '🌷',
            image: '',
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
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 9,
            emoji: '🌻',
            image: '',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 2,
            emoji: '',
            image: '/images/assets/mover_charge_128.png',
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
            type: -1,
            emoji: '',
            image: '/images/assets/start.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
        {
            type: -1,
            emoji: '',
            image: '/images/assets/start.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 9,
            emoji: '🌷',
            image: '',
        },
        {
            type: 9,
            emoji: '🌻',
            image: '',
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
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
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
            image: '/images/assets/grass.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 6,
            emoji: '',
            image: '/images/assets/grassLong.png',
        },
        {
            type: 6,
            emoji: '',
            image: '/images/assets/grassLong.png',
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
            type: 9,
            emoji: '🌻',
            image: '',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 0,
            emoji: '',
            image: '/images/assets/grass.png',
        },
        {
            type: 1,
            emoji: '',
            image: '/images/assets/bush_240.png',
        },
        {
            type: 6,
            emoji: '',
            image: '/images/assets/grassLong.png',
        },
        {
            type: 7,
            emoji: '🍃',
            image: '',
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
    ],
];
