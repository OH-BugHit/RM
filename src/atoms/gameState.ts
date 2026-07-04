import { atom } from 'jotai';
import {
    Cell,
    CellType,
    EnvSettings,
    EpisodicData,
    GenericObservation,
    ObservationShape,
    StateData,
    TimeStepData,
} from '../types';
import { getDefaultObservation } from '../components/GameComponents/agentProps';
import { ChartState } from '../components/Charts/rewardStreamEngine';
import { defaultEnvSettings } from '../utils/defaults';

export const SmallObsAtom = atom<GenericObservation>(getDefaultObservation('small'));
export const LargeObsAtom = atom<GenericObservation>(getDefaultObservation('large'));
export const FacingAtom = atom<1 | 0 | -1>(1);
export const TimeStepDataAtom = atom<TimeStepData>();
export const EpisodicDataAtom = atom<EpisodicData>();
export const StateDataAtom = atom<StateData>({ previous: '', current: '' });

export const SelectedObsShapeAtom = atom<ObservationShape>('unset');

export const WorldGridRenderAtom = atom<Cell[][]>();
export const InnerFillCellAtom = atom<Cell>({
    type: CellType.Spawn,
    reloadTime: 0,
    timer: 0,
    image: 'images/assets/smallTreasure_260.png',
});

export const ChartAtom = atom<ChartState>({
    episode: [],
    reward: [],
    win: [],
});
export const TempSettingsAtom = atom<EnvSettings>(defaultEnvSettings);
export const EnvSettingsAtom = atom<EnvSettings>(defaultEnvSettings);

export const RewardsPulseAtom = atom<boolean>(true);
