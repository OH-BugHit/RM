import { atom } from 'jotai';
import { Agent, AgentProps, Control, EnvironmentSelection, SoundSettings } from '../types';
import { defaultAgentSettings, defaultControls, defaultAudioSettings } from '../utils/defaults';

export const AudioSettingsAtom = atom<SoundSettings>(defaultAudioSettings);

export const AgentSettingsAtom = atom<AgentProps>(defaultAgentSettings);

export const ResetUiPulseAtom = atom<boolean>(false);
export const GameControlAtom = atom<Control>(defaultControls);

export const ActiveEnvironmentAtom = atom<EnvironmentSelection>({
    name: '',
    type: undefined,
});
export const ActiveAgentAtom = atom<Agent>({ name: '', observationShape: 'unset', type: 'unset', img: '' });
export const ImportedAgentImgAtom = atom<string | undefined>(undefined);
