import { useAtom, useAtomValue } from 'jotai';
import style from './style.module.css';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { ActiveEnvironmentAtom } from '../../atoms/state';
import { TempSettingsAtom } from '../../atoms/gameState';
/*
const SPOOKED_BURGLAR_REWARD = 10;
const BROKE_POT_REWARD = -20;
const BARK_SUCCESS_REWARD = 100;
const BARK_FAIL_REWARD = -1;
const BURGLAR_WON_REWARD = -100;
*/

export default function EnvironmentControl() {
    const [tempSettings, setTempSettings] = useAtom(TempSettingsAtom);
    const activeGame = useAtomValue(ActiveEnvironmentAtom);

    if (!tempSettings) return null;
    let env = null;

    switch (activeGame.type) {
        case 'potsAndBurglar': {
            env = tempSettings.potsAndBurglar.env;
            return (
                <main className={style.content}>
                    <h2>Environment Settings:</h2>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <TextField
                            label="Grid Size"
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
                        <TextField
                            label="Number of flower pots"
                            type="number"
                            fullWidth
                            value={env.numberOfPots}
                            onChange={(e) => {
                                setTempSettings((old) => ({
                                    ...old,
                                    potsAndBurglar: {
                                        ...old.potsAndBurglar,
                                        env: {
                                            ...old.potsAndBurglar.env,
                                            numberOfPots: Number(e.target.value) || 10,
                                        },
                                    },
                                }));
                            }}
                            slotProps={{
                                htmlInput: {
                                    min: 0,
                                    max: env.gridSize ? env.gridSize ** 2 - 1 : 0,
                                },
                            }}
                        />

                        <TextField
                            label="Pot reload delay"
                            type="number"
                            fullWidth
                            value={env.potReloadDelay}
                            onChange={(e) => {
                                setTempSettings((old) => ({
                                    ...old,
                                    potsAndBurglar: {
                                        ...old.potsAndBurglar,
                                        env: {
                                            ...old.potsAndBurglar.env,
                                            potReloadDelay: Number(e.target.value) || 25,
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
                            label="Does breaking pot cause burglar to go away?"
                        />
                    </div>
                </main>
            );
        }
        default: {
            env = tempSettings.generic.env;
            break;
        }
    }

    if (env === undefined) {
        return null;
    } else {
        return null;
    }
}
