import style from './style.module.css';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
/*
const SPOOKED_BURGLAR_REWARD = 10;
const BROKE_POT_REWARD = -20;
const BARK_SUCCESS_REWARD = 100;
const BARK_FAIL_REWARD = -1;
const BURGLAR_WON_REWARD = -100;
*/

type EnvironmentControlProps = {
    gridSize: number;
    maxTurns: number;
    numberOfPots: number;
    potReloadDelay: number;
    breakPotSpooksBurglar: boolean;
    onGridSizeChange: (value: number) => void;
    onMaxTurnsChange: (value: number) => void;
    onNumberOfPotsChange: (value: number) => void;
    onPotReloadDelayChange: (value: number) => void;
    onBreakPotSpooksBurglarChange: (value: boolean) => void;
};

export default function EnvironmentControl({
    gridSize,
    maxTurns,
    numberOfPots,
    potReloadDelay,
    breakPotSpooksBurglar,
    onGridSizeChange,
    onMaxTurnsChange,
    onNumberOfPotsChange,
    onPotReloadDelayChange,
    onBreakPotSpooksBurglarChange,
}: EnvironmentControlProps) {
    return (
        <main className={style.content}>
            <h2>Environment Settings:</h2>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <TextField
                    label="Grid Size"
                    type="number"
                    fullWidth
                    value={gridSize}
                    onChange={(e) => onGridSizeChange(Number(e.target.value) || 0)}
                    slotProps={{ htmlInput: { min: 2, max: 20 } }}
                />
                <TextField
                    label="Turns taken to break in for burglar"
                    type="number"
                    fullWidth
                    value={maxTurns}
                    onChange={(e) => onMaxTurnsChange(Number(e.target.value) || 0)}
                />
                <TextField
                    label="Number of flower pots"
                    type="number"
                    fullWidth
                    value={numberOfPots}
                    onChange={(e) => onNumberOfPotsChange(Number(e.target.value) || 0)}
                    slotProps={{ htmlInput: { min: 0, max: gridSize * gridSize - 1 } }}
                />

                <TextField
                    label="Pot reload delay"
                    type="number"
                    fullWidth
                    value={potReloadDelay}
                    onChange={(e) => onPotReloadDelayChange(Number(e.target.value) || 0)}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={breakPotSpooksBurglar}
                            onChange={(e) => onBreakPotSpooksBurglarChange(e.target.checked)}
                        />
                    }
                    label="Does breaking pot cause burglar to go away?"
                />
            </div>
        </main>
    );
}
