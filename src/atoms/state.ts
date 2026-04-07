import { atom } from 'jotai';
import { AgentProps, Control, EnvSettings, Games, RewardSettings, TempSettings } from '../types';

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
        agent: { epsilon: 0.1, gamma: 0.9, alpha: 0.1 },
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
        agent: { epsilon: 0.1, gamma: 0.9, alpha: 0.1 },
        reward: { settings: undefined },
    },
});

export const EnvSettingsAtom = atom<EnvSettings>({ settings: undefined });
export const RewardSettingsAtom = atom<RewardSettings>({ settings: undefined });
export const AgentSettingsAtom = atom<AgentProps>({ epsilon: 0.1, gamma: 0.9, alpha: 0.1 });

export const ResetUiPulseAtom = atom<boolean>(false);
export const GameControlAtom = atom<Control>({ isRunning: false, isFast: false, takeStep: false });
export const ActiveGameAtom = atom<Games>('robodog');
