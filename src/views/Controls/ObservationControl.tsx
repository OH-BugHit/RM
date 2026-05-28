import { useAtom, useAtomValue } from 'jotai';
import style from './style.module.css';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { TempSettingsAtom, ActiveEnvironmentAtom } from '../../atoms/state';

export default function ObservationControl() {
    const [tempSettings, setTempSettings] = useAtom(TempSettingsAtom);
    const activeGame = useAtomValue(ActiveEnvironmentAtom);

    if (!tempSettings) return null;
    if (activeGame.type !== 'potsAndBurglar') return null;

    const env = tempSettings.potsAndBurglar.env;

    return (
        <main className={style.content}>
            <h2>Observation space:</h2>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <TextField
                    label="Observation space size"
                    type="number"
                    fullWidth
                    value={env.gridSize}
                    onChange={(e) => {
                        setTempSettings((old) => ({
                            ...old,
                            potsAndBurglar: {
                                ...old.potsAndBurglar,
                                env: {
                                    ...old.potsAndBurglar.env,
                                    gridSize: Number(e.target.value) || 10,
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
                    value={env.maxTurns}
                    onChange={(e) => {
                        setTempSettings((old) => ({
                            ...old,
                            potsAndBurglar: {
                                ...old.potsAndBurglar,
                                env: {
                                    ...old.potsAndBurglar.env,
                                    maxTurns: Number(e.target.value) || 20,
                                },
                            },
                        }));
                    }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={env.breakPotSpooksBurglar}
                            onChange={(e) => {
                                setTempSettings((old) => ({
                                    ...old,
                                    potsAndBurglar: {
                                        ...old.potsAndBurglar,
                                        env: {
                                            ...old.potsAndBurglar.env,
                                            breakPotSpooksBurglar: e.target.checked,
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
