import { useAtom, useAtomValue } from 'jotai';
import style from './style.module.css';
import { TextField } from '@mui/material';
import { TempSettingsAtom, ActiveGameAtom } from '../../../atoms/state';
/*
const SPOOKED_BURGLAR_REWARD = 10;
const BROKE_POT_REWARD = -20;
const BARK_SUCCESS_REWARD = 100;
const BARK_FAIL_REWARD = -1;
const BURGLAR_WON_REWARD = -100;
*/

export default function RewardControl() {
    const [tempSettings, setTempSettings] = useAtom(TempSettingsAtom);
    const activeGame = useAtomValue(ActiveGameAtom);
    const reward = tempSettings[activeGame];

    return (
        <main className={style.content}>
            <h2>Reward function:</h2>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <TextField
                    label="Burglar spooked by bark"
                    type="number"
                    fullWidth
                    value={reward.reward.settings?.spookedBurglarReward}
                    onChange={(e) => {
                        setTempSettings((old) => ({
                            ...old,
                            [activeGame]: {
                                ...old[activeGame],
                                reward: {
                                    settings: {
                                        spookedBurglarReward: Number(e.target.value) || 10,
                                        brokePotReward: old[activeGame].reward.settings?.brokePotReward ?? -2,
                                        barkSuccessReward: old[activeGame].reward.settings?.barkSuccessReward ?? 10,
                                        barkFailReward: old[activeGame].reward.settings?.barkFailReward ?? -1,
                                        burglarWonReward: old[activeGame].reward.settings?.burglarWonReward ?? -10,
                                    },
                                },
                            },
                        }));
                    }}
                />
                <TextField
                    label="RoboDog broke furniture"
                    type="number"
                    fullWidth
                    value={reward.reward.settings?.brokePotReward}
                    onChange={(e) => {
                        setTempSettings((old) => ({
                            ...old,
                            [activeGame]: {
                                ...old[activeGame],
                                reward: {
                                    settings: {
                                        spookedBurglarReward:
                                            old[activeGame].reward.settings?.spookedBurglarReward ?? 10,
                                        brokePotReward: Number(e.target.value) || -2,
                                        barkSuccessReward: old[activeGame].reward.settings?.barkSuccessReward ?? 10,
                                        barkFailReward: old[activeGame].reward.settings?.barkFailReward ?? -1,
                                        burglarWonReward: old[activeGame].reward.settings?.burglarWonReward ?? -10,
                                    },
                                },
                            },
                        }));
                    }}
                />
                <TextField
                    label="Burglar spooked by noise"
                    type="number"
                    fullWidth
                    value={reward.reward.settings?.barkSuccessReward}
                    onChange={(e) => {
                        setTempSettings((old) => ({
                            ...old,
                            [activeGame]: {
                                ...old[activeGame],
                                reward: {
                                    settings: {
                                        spookedBurglarReward:
                                            old[activeGame].reward.settings?.spookedBurglarReward ?? 10,
                                        brokePotReward: old[activeGame].reward.settings?.brokePotReward ?? -2,
                                        barkSuccessReward: Number(e.target.value) || 10,
                                        barkFailReward: old[activeGame].reward.settings?.barkFailReward ?? -1,
                                        burglarWonReward: old[activeGame].reward.settings?.burglarWonReward ?? -10,
                                    },
                                },
                            },
                        }));
                    }}
                />
                <TextField
                    label="RoboDog Barks"
                    type="number"
                    fullWidth
                    value={reward.reward.settings?.barkFailReward}
                    onChange={(e) => {
                        setTempSettings((old) => ({
                            ...old,
                            [activeGame]: {
                                ...old[activeGame],
                                reward: {
                                    settings: {
                                        spookedBurglarReward:
                                            old[activeGame].reward.settings?.spookedBurglarReward ?? 10,
                                        brokePotReward: old[activeGame].reward.settings?.brokePotReward ?? -2,
                                        barkSuccessReward: old[activeGame].reward.settings?.barkSuccessReward ?? 10,
                                        barkFailReward: Number(e.target.value) || -1,
                                        burglarWonReward: old[activeGame].reward.settings?.burglarWonReward ?? -10,
                                    },
                                },
                            },
                        }));
                    }}
                />
                <TextField
                    label="Burglar wins"
                    type="number"
                    fullWidth
                    value={reward.reward.settings?.burglarWonReward}
                    onChange={(e) => {
                        setTempSettings((old) => ({
                            ...old,
                            [activeGame]: {
                                ...old[activeGame],
                                reward: {
                                    settings: {
                                        spookedBurglarReward:
                                            old[activeGame].reward.settings?.spookedBurglarReward ?? 10,
                                        brokePotReward: old[activeGame].reward.settings?.brokePotReward ?? -2,
                                        barkSuccessReward: old[activeGame].reward.settings?.barkSuccessReward ?? 10,
                                        barkFailReward: old[activeGame].reward.settings?.barkFailReward ?? -1,
                                        burglarWonReward: Number(e.target.value) || -10,
                                    },
                                },
                            },
                        }));
                    }}
                />
            </div>
        </main>
    );
}
