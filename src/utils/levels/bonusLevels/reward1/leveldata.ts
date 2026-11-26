import { Level } from '../../../../types';
import { defaultAgents, defaultAgentSettings, defaultBackground } from '../../../defaults';
import { LoadedGame } from '../../../types';

import { level2Env, level2Grid, blevel2HudConfig, tileDef } from './rlevel1';

const rewardBonus1Data: LoadedGame = {
    manifest: { gameName: 'Bonus 2', highScore: 0, saveVersion: 2, createdAt: '123', levelID: 'rewards-b-1' },
    tools: { tileDefinitions: tileDef, background: defaultBackground },
    game: {
        world: level2Grid,
        envSettings: level2Env,
    },
    agent: {
        settings: defaultAgentSettings,
        activeAgent: {
            ...defaultAgents.roboMover,
            observationShape: 'large',
        },
    },
};

export const rewardsBonusLevel1: Level = {
    level: rewardBonus1Data,
    hudSettings: blevel2HudConfig,
};
