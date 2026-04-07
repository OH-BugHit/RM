import { useAtom, useAtomValue } from 'jotai';
import style from './style.module.css';
import { TextField } from '@mui/material';
import { TempSettingsAtom, ActiveGameAtom } from '../../../atoms/state';

export default function AgentControl() {
    const [tempSettings, setTempSettings] = useAtom(TempSettingsAtom);
    const activeGame = useAtomValue(ActiveGameAtom);
    const agent = tempSettings[activeGame];
    return (
        <main className={style.content}>
            <h2>Agent parameters:</h2>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <TextField
                    label="Epsilon (exploration rate)"
                    type="number"
                    value={agent?.agent.epsilon}
                    fullWidth
                    onChange={(e) => {
                        setTempSettings((prev) => ({
                            ...prev,
                            [activeGame]: {
                                ...prev[activeGame],
                                agent: {
                                    ...prev[activeGame].agent,
                                    epsilon: Number(e.target.value),
                                },
                            },
                        }));
                    }}
                    slotProps={{
                        htmlInput: {
                            min: 0,
                            max: 1,
                            step: 0.1,
                        },
                    }}
                />

                <TextField
                    label="Gamma (discount factor)"
                    type="number"
                    value={agent?.agent.gamma}
                    fullWidth
                    onChange={(e) =>
                        setTempSettings((prev) => ({
                            ...prev,
                            [activeGame]: {
                                ...prev[activeGame],
                                agent: {
                                    ...prev[activeGame].agent,
                                    gamma: Number(e.target.value),
                                },
                            },
                        }))
                    }
                    slotProps={{
                        htmlInput: {
                            min: 0,
                            max: 1,
                            step: 0.1,
                        },
                    }}
                />

                <TextField
                    label="Alpha (learning rate)"
                    value={agent?.agent.alpha}
                    fullWidth
                    onChange={(e) =>
                        setTempSettings((prev) => ({
                            ...prev,
                            [activeGame]: {
                                ...prev[activeGame],
                                agent: {
                                    ...prev[activeGame].agent,
                                    alpha: Number(e.target.value),
                                },
                            },
                        }))
                    }
                    slotProps={{
                        htmlInput: {
                            min: 0,
                            max: 1,
                            step: 0.1,
                        },
                    }}
                />
            </div>
        </main>
    );
}
