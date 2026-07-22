import style from './style.module.css';
import { Slider, Tooltip } from '@mui/material';
import ExplGauge from '../../../../components/Gauges/Gauge';
import { useAtom } from 'jotai';
import { AgentSettingsAtom } from '../../../../atoms/state';
import StraightIcon from '@mui/icons-material/Straight';
import RouteIcon from '@mui/icons-material/Route';
import { useTranslation } from 'react-i18next';

export default function Gamma() {
    const { t } = useTranslation();
    const [agentSettings, setAgentSettings] = useAtom(AgentSettingsAtom);
    return (
        <div>
            <h3>Discount factor gauge</h3>
            <ExplGauge
                value={agentSettings.gamma}
                green={{ from: 0.85, to: 0.95 }}
                yellow={{ from: 0.15, to: 1 }}
                red={{ from: 0, to: 1 }}
            />
            <div className={style.epsilonSlider}>
                <Tooltip
                    title={t('gauge.tooltip.smallGamma')}
                    arrow
                >
                    <span>
                        <StraightIcon fontSize="large" />
                    </span>
                </Tooltip>

                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={agentSettings.gamma}
                    onChange={(_, value) => {
                        setAgentSettings((old) => ({
                            ...old,
                            gamma: value as number,
                        }));
                    }}
                />

                <Tooltip
                    title={t('gauge.tooltip.largeGamma')}
                    arrow
                >
                    <span>
                        <RouteIcon fontSize="large" />
                    </span>
                </Tooltip>
            </div>
        </div>
    );
}
