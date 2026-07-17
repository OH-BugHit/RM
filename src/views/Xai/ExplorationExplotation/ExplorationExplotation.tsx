import style from './style.module.css';
import { Slider, Tooltip } from '@mui/material';
import ExplGauge from '../../../components/Gauges/Gauge';
import { useAtom } from 'jotai';
import { AgentSettingsAtom } from '../../../atoms/state';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CasinoIcon from '@mui/icons-material/Casino';
import { useTranslation } from 'react-i18next';

export default function ExplotationExploration() {
    const { t } = useTranslation();
    const [agentSettings, setAgentSettings] = useAtom(AgentSettingsAtom);
    return (
        <div>
            <h3>Exploration Gauge</h3>
            <ExplGauge value={agentSettings.epsilon} />
            <div className={style.epsilonSlider}>
                <Tooltip
                    title={t('exploGauge.tooltip.exploit')}
                    arrow
                >
                    <span>
                        <TrendingUpIcon fontSize="large" />
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
                    title={t('exploGauge.tooltip.explore')}
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
