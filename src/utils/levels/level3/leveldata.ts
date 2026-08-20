import { Level } from '../../../types';
import { defaultAgents, defaultAgentSettings } from '../../defaults';
import { testTileDef } from '../../testLevel/tileDefinitions';
import { LoadedGame } from '../../types';
import {
    level3Env,
    level3Grid,
    level3HudConfig,
    level3Layout,
    level3Tasks,
    level3TextModes,
    level3uiControls,
} from './level3';

const level3Data: LoadedGame = {
    manifest: { gameName: 'Explore and Exploit', highScore: 0, saveVersion: 1, createdAt: '123', levelIndex: 3 },
    tools: { tileDefinitions: testTileDef },
    game: {
        world: level3Grid,
        envSettings: level3Env,
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

export const level3: Level = {
    level: level3Data,
    levelTasks: level3Tasks,
    hudSettings: level3HudConfig,
    uiControls: level3uiControls,
    levelText: { modes: level3TextModes, textKey: 'levels.3', layouts: level3Layout },
};
