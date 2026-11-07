import { EnvSettings, HUDvisibilityField } from '../../../../types';
import { CellSave } from '../../../types';

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

export const blevel1HudConfig: HUDvisibilityField[][] = [
    ['text', 'agentCluster', 'progress', 'gameBar', 'controlBar', 'controls.step', 'controls.play', 'controls.ff'],
];

export const level1Grid: CellSave[][] = [
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
