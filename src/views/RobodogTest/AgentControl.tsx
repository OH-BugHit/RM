import style from './style.module.css';
import { TextField } from '@mui/material';

type AgentControlProps = {
    epsilon: number;
    gamma: number;
    alpha: number;
    onEpsilonChange: (value: number) => void;
    onGammaChange: (value: number) => void;
    onAlphaChange: (value: number) => void;
};

export default function AgentControl({
    epsilon,
    gamma,
    alpha,
    onEpsilonChange,
    onGammaChange,
    onAlphaChange,
}: AgentControlProps) {
    return (
        <main className={style.content}>
            <h2>Agent parameters:</h2>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <TextField
                    label="Epsilon (exploration rate)"
                    type="number"
                    value={epsilon}
                    fullWidth
                    onChange={(e) => onEpsilonChange(Number(e.target.value) || 0)}
                />

                <TextField
                    label="Gamma (discount factor)"
                    type="number"
                    value={gamma}
                    fullWidth
                    onChange={(e) => onGammaChange(Number(e.target.value) || 0)}
                />

                <TextField
                    label="Alpha (learning rate)"
                    value={alpha}
                    fullWidth
                    onChange={(e) => onAlphaChange(Number(e.target.value) || 0)}
                />
            </div>
        </main>
    );
}
