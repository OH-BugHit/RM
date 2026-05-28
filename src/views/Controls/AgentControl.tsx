import { useAtom } from 'jotai';
import style from './style.module.css';
import { Checkbox, FormControlLabel, FormLabel, Slider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AgentSettingsAtom } from '../../atoms/state';

export default function AgentControl() {
    const { t } = useTranslation();
    const [agentSettings, setAgentSettings] = useAtom(AgentSettingsAtom);
    return (
        <main className={style.content}>
            <h2>Agent parameters:</h2>
            <div className={style.sliderItem}>
                <FormLabel>Epsilon (exploration rate): {agentSettings.epsilon}</FormLabel>
                <Slider
                    value={agentSettings.epsilon}
                    min={0}
                    max={1}
                    step={0.1}
                    valueLabelDisplay="auto"
                    onChange={(_, newValue) => {
                        setAgentSettings((prev) => ({
                            ...prev,
                            epsilon: newValue,
                        }));
                    }}
                />

                <FormLabel>Gamma (discount factor): {agentSettings.gamma}</FormLabel>
                <Slider
                    value={agentSettings.gamma}
                    min={0}
                    max={1}
                    step={0.1}
                    valueLabelDisplay="auto"
                    onChange={(_, newValue) => {
                        setAgentSettings((prev) => ({
                            ...prev,
                            gamma: newValue,
                        }));
                    }}
                />
                <FormLabel>Alpha (learning rate): {agentSettings.alpha}</FormLabel>
                <Slider
                    value={agentSettings.alpha}
                    min={0}
                    max={1}
                    step={0.1}
                    valueLabelDisplay="auto"
                    onChange={(_, newValue) => {
                        setAgentSettings((prev) => ({
                            ...prev,
                            alpha: newValue,
                        }));
                    }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={agentSettings.learning}
                            onChange={(e) => {
                                setAgentSettings((prev) => ({
                                    ...prev,
                                    learning: e.target.checked,
                                }));
                            }}
                        />
                    }
                    label={t('Learning enabled')}
                />
            </div>
        </main>
    );
}
