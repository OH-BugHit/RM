import { Level } from '../../../types';
import { defaultAgents, defaultBackground } from '../../defaults';
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
    level4Focus,
} from './olevel1';

const level1Data: LoadedGame = {
    manifest: { gameName: 'Foresight', highScore: 0, saveVersion: 2, createdAt: '123', levelIndex: 4 },
    tools: { tileDefinitions: testTileDef, background: defaultBackground },
    game: {
        world: level1Grid,
        envSettings: level1Env,
    },
    agent: {
        settings: { alpha: 0.1, epsilon: 0.1, gamma: 0, learning: true },
        activeAgent: {
            ...defaultAgents.adventurer,
            observationShape: 'large',
        },
    },
};

export const observationLevel1: Level = {
    level: level1Data,
    levelTasks: level1Tasks,
    hudSettings: level1HudConfig,
    uiControls: level1uiControls,
    levelText: {
        modes: level1TextModes,
        textKey: 'levels.4',
        layouts: level1Layout,
        focusPoints: level4Focus,
    },
};
