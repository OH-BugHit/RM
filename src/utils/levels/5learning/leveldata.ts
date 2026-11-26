import { Level } from '../../../types';
import { defaultAgents, defaultAgentSettings, defaultBackground } from '../../defaults';
import { testTileDef } from '../../testLevel/tileDefinitions';
import { LoadedGame } from '../../types';
import {
    level1Env,
    level1Grid,
    level1HudConfig,
    level1Layout,
    level1Tasks,
    level1TextModes,
    level1uiControls,
} from './olevel1';

const level1Data: LoadedGame = {
    manifest: { gameName: 'Learning', highScore: 0, saveVersion: 2, createdAt: '123', levelID: 'learn-1' },
    tools: { tileDefinitions: testTileDef, background: defaultBackground },
    game: {
        world: level1Grid,
        envSettings: level1Env,
    },
    agent: {
        settings: defaultAgentSettings,
        activeAgent: {
            ...defaultAgents.adventurer,
            observationShape: 'large',
        },
    },
};

export const learningLevel1: Level = {
    level: level1Data,
    levelTasks: level1Tasks,
    hudSettings: level1HudConfig,
    uiControls: level1uiControls,
    levelText: { modes: level1TextModes, textKey: 'levels.5', layouts: level1Layout },
};
