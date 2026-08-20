import { atom } from 'jotai';
import { Agent, AgentProps, Control, EnvironmentSelection, SoundSettings, TeacherControl } from '../types';
import { defaultAgentSettings, defaultControls, defaultAudioSettings, testTeacherControls } from '../utils/defaults';

export const GameModeAtom = atom<'single' | 'student'>('single');

export const AudioSettingsAtom = atom<SoundSettings>(defaultAudioSettings);

export const AgentSettingsAtom = atom<AgentProps>(defaultAgentSettings);

export const ResetUiPulseAtom = atom<boolean>(false);
export const GameControlAtom = atom<Control>(defaultControls);

export const ActiveEnvironmentAtom = atom<EnvironmentSelection>({
    name: '',
    type: undefined,
});
export const ActiveAgentAtom = atom<Agent>({ name: 'Agent X', observationShape: 'large', type: 'created', img: '' });
export const ImportedAgentImgAtom = atom<string | undefined>(undefined);

export const UpdateSpritesPulseAtom = atom<boolean>(true);
export const UpdateWorldPulseAtom = atom<boolean>(true);

export const TeacherControlAtom = atom<TeacherControl>(testTeacherControls);
