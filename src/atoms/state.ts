import { atom } from 'jotai';
import { Agent, AgentProps, Control, EnvironmentSelection, EnvSettings, SubView, View } from '../types';
import { defaultEnvSettings, defaultWorld } from '../utils/defaults';

export const TempSettingsAtom = atom<EnvSettings>(defaultEnvSettings);
export const EnvSettingsAtom = atom<EnvSettings>(defaultEnvSettings);

export const AgentSettingsAtom = atom<AgentProps>({ epsilon: 0.1, gamma: 0.9, alpha: 0.1, learning: true });

export const ResetUiPulseAtom = atom<boolean>(false);
export const GameControlAtom = atom<Control>({ isRunning: false, isFast: false, takeStep: false });

export const StoryStepAtom = atom<number>(1);

export const ActiveViewAtom = atom<View>(undefined);
export const ActiveSubViewAtom = atom<SubView>(undefined); // not used yet

export const ActiveEnvironmentAtom = atom<EnvironmentSelection>({ name: '', type: undefined, world: defaultWorld });
export const ActiveAgentAtom = atom<Agent>({ name: '', type: 'robodog' });

export const TutorialStepAtom = atom<number>(0);
