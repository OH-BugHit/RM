import { Level } from '../../../types';
import { defaultAgentSettings } from '../../defaults';
import {
    level1Env,
    level1Grid,
    level1HudConfig,
    level1Layout,
    level1Tasks,
    level1TextModes,
    level1uiControls,
} from './blevel1';
import { testTileDef } from '../../testLevel/tileDefinitions';
import { LoadedGame } from '../../types';

const level1Data: LoadedGame = {
    manifest: { gameName: 'Basics 1', highScore: -1, saveVersion: 1, createdAt: '123', levelIndex: 1 },
    tools: { tileDefinitions: testTileDef },
    game: {
        world: level1Grid,
        envSettings: level1Env,
    },
    agent: {
        settings: defaultAgentSettings,
        activeAgent: {
            name: 'Level 1 agent',
            type: 'unset',
            observationShape: 'large',
            img: '',
        },
    },
};

export const basicsLevel1: Level = {
    level: level1Data,
    levelTasks: level1Tasks,
    hudSettings: level1HudConfig,
    uiControls: level1uiControls,
    levelText: { modes: level1TextModes, textKey: 'levels.1', layouts: level1Layout },
};
