import { atom } from 'jotai';
import { EpisodicData, GenericObservation, StateData, TimeStepData } from '../types';
import { getAgentObservationShape } from '../components/GameComponents/agentProps';
import { ChartState } from '../components/Charts/rewardStreamEngine';

export const SmallObsAtom = atom<GenericObservation>(getAgentObservationShape('small'));
export const LargeObsAtom = atom<GenericObservation>(getAgentObservationShape('large'));
export const FacingAtom = atom<1 | 0 | -1>(1);
export const TimeStepDataAtom = atom<TimeStepData>();
export const EpisodicDataAtom = atom<EpisodicData>();
export const StateDataAtom = atom<StateData>({ previous: '', current: '' });

export const ChartAtom = atom<ChartState>({
    episode: [],
    reward: [],
    win: [],
});
