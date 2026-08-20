import { Level } from '../../../types';
import { defaultAgents, defaultAgentSettings } from '../../defaults';
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
} from './level2';

const level2Data: LoadedGame = {
    manifest: { gameName: 'Rewards', highScore: 4, saveVersion: 1, createdAt: '123', levelIndex: 2 },
    tools: { tileDefinitions: testTileDef },
    game: {
        world: level2Grid,
        envSettings: level2Env,
    },
    agent: {
        settings: defaultAgentSettings,
        activeAgent: {
            name: 'Testiagentti',
            type: 'robodog',
            observationShape: 'large',
            img: defaultAgents.robodog.img,
        },
    },
};

export const level2: Level = {
    level: level2Data,
    levelTasks: level2Tasks,
    hudSettings: level2HudConfig,
    uiControls: level2uiControls,
    levelText: { modes: level2TextModes, textKey: 'levels.2', layouts: level2Layout },
};
