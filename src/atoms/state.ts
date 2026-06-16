import { atom } from 'jotai';
import { Agent, AgentProps, Control, EnvironmentSelection, EnvSettings, SoundSettings } from '../types';
import {
    defaultAgentSettings,
    defaultControls,
    defaultEnvSettings,
    defaultAudioSettings,
    defaultWorld,
} from '../utils/defaults';

export const AudioSettingsAtom = atom<SoundSettings>(defaultAudioSettings);

export const TempSettingsAtom = atom<EnvSettings>(defaultEnvSettings);
export const EnvSettingsAtom = atom<EnvSettings>(defaultEnvSettings);

export const AgentSettingsAtom = atom<AgentProps>(defaultAgentSettings);

export const ResetUiPulseAtom = atom<boolean>(false);
export const GameControlAtom = atom<Control>(defaultControls);

export const ActiveEnvironmentAtom = atom<EnvironmentSelection>({
    name: '',
    type: undefined,
    envProps: undefined,
    world: defaultWorld,
});
export const ActiveAgentAtom = atom<Agent>({ name: '', observationShape: 'none', type: 'none', img: '' });
export const ImportedAgentImgAtom = atom<string | undefined>(undefined);
