import { Level } from '../../../types';
import { defaultAgents, defaultAgentSettings, defaultBackground } from '../../defaults';
import { testTileDef } from '../../testLevel/tileDefinitions';
import { LoadedGame } from '../../types';
import {
    level2Env,
    level2Grid,
    level2HudConfig,
    level2Layout,
    level2Tasks,
    level2TextModes,
    level2uiControls,
} from './rlevel1';

const level2Data: LoadedGame = {
    manifest: { gameName: 'Rewards 1', highScore: 4, saveVersion: 2, createdAt: '123', levelIndex: 2 },
    tools: { tileDefinitions: testTileDef, background: defaultBackground },
    game: {
        world: level2Grid,
        envSettings: level2Env,
    },
    agent: {
        settings: defaultAgentSettings,
        activeAgent: {
            ...defaultAgents.adventurer,
            observationShape: 'large',
        },
    },
};

export const rewardsLevel1: Level = {
    level: level2Data,
    levelTasks: level2Tasks,
    hudSettings: level2HudConfig,
    uiControls: level2uiControls,
    levelText: { modes: level2TextModes, textKey: 'levels.2', layouts: level2Layout },
};
