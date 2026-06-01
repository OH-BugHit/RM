import { atom } from 'jotai';
import { Agent, AgentProps, Control, EnvironmentSelection, EnvSettings, SoundSettings, SubView, View } from '../types';
import {
    defaultAgentSettings,
    defaultControls,
    defaultEnvSettings,
    defaultSoundSettings,
    defaultWorld,
} from '../utils/defaults';

export const AudioSettingsAtom = atom<SoundSettings>(defaultSoundSettings);

export const TempSettingsAtom = atom<EnvSettings>(defaultEnvSettings);
export const EnvSettingsAtom = atom<EnvSettings>(defaultEnvSettings);

export const AgentSettingsAtom = atom<AgentProps>(defaultAgentSettings);

export const ResetUiPulseAtom = atom<boolean>(false);
export const GameControlAtom = atom<Control>(defaultControls);

export const StoryStepAtom = atom<number>(1);

export const ActiveViewAtom = atom<View>(undefined);
export const ActiveSubViewAtom = atom<SubView>(undefined); // not used yet

export const ActiveEnvironmentAtom = atom<EnvironmentSelection>({ name: '', type: undefined, world: defaultWorld });
export const ActiveAgentAtom = atom<Agent>({ name: '', type: 'robodog' });

export const TutorialStepAtom = atom<number>(0);
export const StepsTakenAtom = atom<number>(0);
export const TutorialPhaseAtom = atom<'basics' | 'recap' | 'startRecap' | 'ready'>('basics');
