import { Level } from '../../../types';
import { defaultAgents, defaultAgentSettings, defaultBackground } from '../../defaults';
import {
    additionalMaterial,
    hintNext,
    level1Env,
    level1Focus,
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
    manifest: {
        gameName: 'Basics 1',
        highScore: -1,
        saveVersion: 2,
        createdAt: '123',
        levelIndex: 1,
        stepsRequired: 12,
    },
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

export const basicsLevel1: Level = {
    level: level1Data,
    levelTasks: level1Tasks,
    hudSettings: level1HudConfig,
    uiControls: level1uiControls,
    levelText: {
        modes: level1TextModes,
        additionalMaterial: additionalMaterial,
        hintNext: hintNext,
        textKey: 'levels.1',
        layouts: level1Layout,
        focusPoints: level1Focus,
    },
};
