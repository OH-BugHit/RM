import style from './style.module.css';
import { Slider, Tooltip } from '@mui/material';
import ExplGauge from '../../../../components/Gauges/Gauge';
import { useAtom } from 'jotai';
import { AgentSettingsAtom } from '../../../../atoms/state';
import TimelineIcon from '@mui/icons-material/Timeline';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import { useTranslation } from 'react-i18next';

export default function Alpha() {
    const { t } = useTranslation();
    const [agentSettings, setAgentSettings] = useAtom(AgentSettingsAtom);
    return (
        <div>
            <h3>{t('gauge.title.alpha')}</h3>
            <ExplGauge
                value={agentSettings.alpha}
                green={{ from: 0.05, to: 0.15 }}
                yellow={{ from: 0.02, to: 0.2 }}
                red={{ from: 0, to: 1 }}
            />
            <div className={style.epsilonSlider}>
                <Tooltip
                    title={t('gauge.tooltip.smallAlpha')}
                    arrow
                >
                    <span>
                        <LinearScaleIcon fontSize="large" />
                    </span>
                </Tooltip>

                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    value={agentSettings.alpha}
                    onChange={(_, value) => {
                        setAgentSettings((old) => ({
                            ...old,
                            alpha: value as number,
                        }));
                    }}
                />

                <Tooltip
                    title={t('gauge.tooltip.largeAlpha')}
                    arrow
                >
                    <span>
                        <TimelineIcon fontSize="large" />
                    </span>
                </Tooltip>
            </div>
        </div>
    );
}
