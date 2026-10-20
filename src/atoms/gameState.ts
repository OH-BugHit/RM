import { atom } from 'jotai';
import {
    AgentTest,
    Cell,
    EnvSettings,
    EpisodicData,
    FireworkPulse,
    GenericObservation,
    Level,
    TestWinData,
    ObservationShape,
    StateData,
    TimeStepData,
} from '../types';
import { getDefaultObservation } from '../components/GameComponents/agentProps';
import { ChartState } from '../components/Charts/rewardStreamEngine';
import { defaultCell, defaultEnvSettings } from '../utils/defaults';
import { basicsLevel1 } from '../utils/levels/1basics/leveldata';
import { levelMapNodes } from '../views/StudentView/Levels/LevelSelect/levelMapData';
import { LevelMapNode } from '../views/StudentView/Levels/LevelSelect/levelMapTypes';

export const SmallObsAtom = atom<GenericObservation>(getDefaultObservation('small'));
export const LargeObsAtom = atom<GenericObservation>(getDefaultObservation('large'));
export const FacingAtom = atom<1 | 0 | -1>(1);
export const TimeStepDataAtom = atom<TimeStepData>();
export const EpisodicDataAtom = atom<EpisodicData>();
export const StateDataAtom = atom<StateData>({ previous: '', current: '' }); // Used by AgentVision to show current state
export const TestWinAtom = atom<TestWinData>({ beatsScore: 0 });

export const SelectedObsShapeAtom = atom<ObservationShape>('unset');

export const WorldGridRenderAtom = atom<Cell[][]>();
export const InnerFillCellAtom = atom<Cell>(defaultCell);

export const ChartAtom = atom<ChartState>({
    episode: [],
    reward: [],
    win: [],
});
export const EnvSettingsAtom = atom<EnvSettings>(defaultEnvSettings);

export const RewardsPulseAtom = atom<boolean>(true);

export const MoveQmapAtom = atom<boolean>(true);

export const StepsLeftAtom = atom<number>(0);

export const LevelConfAtom = atom<Level | undefined>(basicsLevel1);

/**
 * If test phase active
 */
export const TestAgentAtom = atom<AgentTest>('no');

/**
 * Contains completed levels
 */
export const LevelMapNodesAtom = atom<LevelMapNode[]>(levelMapNodes);

// Set true to activate. Disarms itself
export const FireWorksPulseAtom = atom<FireworkPulse>({ highScore: false, bestScore: false });
