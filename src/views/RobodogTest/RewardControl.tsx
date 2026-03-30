import style from './style.module.css';
import { TextField } from '@mui/material';
/*
const SPOOKED_BURGLAR_REWARD = 10;
const BROKE_POT_REWARD = -20;
const BARK_SUCCESS_REWARD = 100;
const BARK_FAIL_REWARD = -1;
const BURGLAR_WON_REWARD = -100;
*/

type RewardControlProps = {
    spookedBurglarReward: number;
    brokePotReward: number;
    barkSuccessReward: number;
    barkFailReward: number;
    burglarWonReward: number;
    onSpookedBurglarRewardChange: (value: number) => void;
    onBrokePotRewardChange: (value: number) => void;
    onBarkSuccessRewardChange: (value: number) => void;
    onBarkFailRewardChange: (value: number) => void;
    onBurglarWonRewardChange: (value: number) => void;
};

export default function RewardControl({
    spookedBurglarReward,
    brokePotReward,
    barkSuccessReward,
    barkFailReward,
    burglarWonReward,
    onSpookedBurglarRewardChange,
    onBrokePotRewardChange,
    onBarkSuccessRewardChange,
    onBarkFailRewardChange,
    onBurglarWonRewardChange,
}: RewardControlProps) {
    return (
        <main className={style.content}>
            <h2>Reward function:</h2>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <TextField
                    label="Burglar spooked by bark"
                    type="number"
                    fullWidth
                    value={spookedBurglarReward}
                    onChange={(e) => onSpookedBurglarRewardChange(Number(e.target.value) || 0)}
                />
                <TextField
                    label="Burglar spooked by noise"
                    type="number"
                    fullWidth
                    value={brokePotReward}
                    onChange={(e) => onBrokePotRewardChange(Number(e.target.value) || 0)}
                />
                <TextField
                    label="RoboDog broke furniture"
                    type="number"
                    fullWidth
                    value={barkSuccessReward}
                    onChange={(e) => onBarkSuccessRewardChange(Number(e.target.value) || 0)}
                />
                <TextField
                    label="Robodog Barks"
                    type="number"
                    fullWidth
                    value={barkFailReward}
                    onChange={(e) => onBarkFailRewardChange(Number(e.target.value) || 0)}
                />
                <TextField
                    label="Burglar wins"
                    type="number"
                    fullWidth
                    value={burglarWonReward}
                    onChange={(e) => onBurglarWonRewardChange(Number(e.target.value) || 0)}
                />
            </div>
        </main>
    );
}
