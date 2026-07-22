import style from './style.module.css';
import { Slider, Tooltip } from '@mui/material';
import ExplGauge from '../../../../components/Gauges/Gauge';
import { useAtom } from 'jotai';
import { AgentSettingsAtom } from '../../../../atoms/state';
import MemoryIcon from '@mui/icons-material/Memory';
import CasinoIcon from '@mui/icons-material/Casino';
import { useTranslation } from 'react-i18next';

export default function Epsilon() {
    const { t } = useTranslation();
    const [agentSettings, setAgentSettings] = useAtom(AgentSettingsAtom);
    return (
        <div>
            <h3>Exploration rate gauge</h3>
            <ExplGauge
                value={agentSettings.epsilon}
                green={{ from: 0, to: 0.1 }}
                yellow={{ from: 0.1, to: 0.18 }}
                red={{ from: 0.18, to: 1 }}
            />
            <div className={style.epsilonSlider}>
                <Tooltip
                    title={t('gauge.tooltip.exploit')}
                    arrow
                >
                    <span>
                        <MemoryIcon fontSize="large" />
                    </span>
                </Tooltip>

                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={agentSettings.epsilon}
                    onChange={(_, value) => {
                        setAgentSettings((old) => ({
                            ...old,
                            epsilon: value as number,
                        }));
                    }}
                />

                <Tooltip
                    title={t('gauge.tooltip.explore')}
                    arrow
                >
                    <span>
                        <CasinoIcon fontSize="large" />
                    </span>
                </Tooltip>
            </div>
        </div>
    );
}
