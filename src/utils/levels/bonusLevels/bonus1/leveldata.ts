import { Level } from '../../../../types';
import { defaultAgents, defaultAgentSettings, defaultBackground } from '../../../defaults';
import { blevel1HudConfig, level1Env, level1Grid } from './blevel1';
import { testTileDef } from '../../../testLevel/tileDefinitions';
import { LoadedGame } from '../../../types';

const level1Data: LoadedGame = {
    manifest: {
        gameName: 'Bonus 1',
        highScore: -1,
        saveVersion: 2,
        createdAt: '123',
        levelID: 'basic-b-1',
    },
    tools: { tileDefinitions: testTileDef, background: defaultBackground },
    game: {
        world: level1Grid,
        envSettings: level1Env,
    },
    agent: {
        settings: defaultAgentSettings,
        activeAgent: {
            ...defaultAgents.roboMover,
            observationShape: 'large',
        },
    },
};

export const basicsBonusLevel1: Level = {
    level: level1Data,
    hudSettings: blevel1HudConfig,
};
