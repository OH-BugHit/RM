import { useAtom, useAtomValue } from 'jotai';
import style from './style.module.css';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { TempSettingsAtom, ActiveGameAtom } from '../../atoms/state';

export default function ObservationControl() {
    const [tempSettings, setTempSettings] = useAtom(TempSettingsAtom);
    const activeGame = useAtomValue(ActiveGameAtom);
    const env = tempSettings[activeGame];

    if (env.env.settings === undefined) {
        return null;
    } else {
        return (
            <main className={style.content}>
                <h2>Observation space:</h2>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <TextField
                        label="Observation space size"
                        type="number"
                        fullWidth
                        value={env.env.settings.gridSize}
                        onChange={(e) => {
                            setTempSettings((old) => ({
                                ...old,
                                [activeGame]: {
                                    ...old[activeGame],
                                    env: {
                                        settings: {
                                            gridSize: Number(e.target.value) || 10,
                                            maxTurns: old[activeGame].env.settings?.maxTurns ?? 20,
                                            numberOfPots: old[activeGame].env.settings?.numberOfPots ?? 10,
                                            potReloadDelay: old[activeGame].env.settings?.potReloadDelay ?? 25,
                                            breakPotSpooksBurglar:
                                                old[activeGame].env.settings?.breakPotSpooksBurglar ?? true,
                                        },
                                    },
                                },
                            }));
                        }}
                        slotProps={{ htmlInput: { min: 2, max: 20 } }}
                    />
                    <TextField
                        label="Turns taken to break in for burglar"
                        type="number"
                        fullWidth
                        value={env.env.settings.maxTurns}
                        onChange={(e) => {
                            setTempSettings((old) => ({
                                ...old,
                                [activeGame]: {
                                    ...old[activeGame],
                                    env: {
                                        settings: {
                                            gridSize: old[activeGame].env.settings?.gridSize ?? 10,
                                            maxTurns: Number(e.target.value) || 20,
                                            numberOfPots: old[activeGame].env.settings?.numberOfPots ?? 10,
                                            potReloadDelay: old[activeGame].env.settings?.potReloadDelay ?? 25,
                                            breakPotSpooksBurglar:
                                                old[activeGame].env.settings?.breakPotSpooksBurglar ?? true,
                                        },
                                    },
                                },
                            }));
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={env.env.settings.breakPotSpooksBurglar}
                                onChange={(e) => {
                                    setTempSettings((old) => ({
                                        ...old,
                                        [activeGame]: {
                                            ...old[activeGame],
                                            env: {
                                                settings: {
                                                    gridSize: old[activeGame].env.settings?.gridSize ?? 10,
                                                    maxTurns: old[activeGame].env.settings?.maxTurns ?? 20,
                                                    numberOfPots: old[activeGame].env.settings?.numberOfPots ?? 10,
                                                    potReloadDelay: old[activeGame].env.settings?.potReloadDelay ?? 25,
                                                    breakPotSpooksBurglar: e.target.checked,
                                                },
                                            },
                                        },
                                    }));
                                }}
                            />
                        }
                        label="Burglar visible"
                    />
                </div>
            </main>
        );
    }
}
