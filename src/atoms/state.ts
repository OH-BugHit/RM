import { atom } from 'jotai';
import { Agent, AgentProps, Control, EnvSettings, Games, RewardSettings, SubView, TempSettings, View } from '../types';

export const TempSettingsAtom = atom<TempSettings>({
    robodog: {
        env: {
            settings: {
                gridSize: 10,
                maxTurns: 20,
                numberOfPots: 10,
                potReloadDelay: 20,
                breakPotSpooksBurglar: false,
            },
        },
        reward: {
            settings: {
                spookedBurglarReward: 10,
                brokePotReward: -15,
                barkSuccessReward: 10,
                barkFailReward: -3,
                burglarWonReward: -10,
            },
        },
    },
    none: {
        env: { settings: undefined },
        reward: { settings: undefined },
    },
});

export const EnvSettingsAtom = atom<EnvSettings>({ settings: undefined });
export const RewardSettingsAtom = atom<RewardSettings>({ settings: undefined });
export const AgentSettingsAtom = atom<AgentProps>({ epsilon: 0.1, gamma: 0.9, alpha: 0.1, learning: true });

export const ResetUiPulseAtom = atom<boolean>(false);
export const GameControlAtom = atom<Control>({ isRunning: false, isFast: false, takeStep: false });
export const ActiveGameAtom = atom<Games>('robodog');

export const StoryStepAtom = atom<number>(1);

export const ActiveViewAtom = atom<View>(undefined);
export const ActiveSubViewAtom = atom<SubView>(undefined); // not used yet

export const agentAtom = atom<Agent>({ name: '', type: undefined });
