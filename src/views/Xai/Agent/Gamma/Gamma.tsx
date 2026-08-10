import style from './style.module.css';
import { Slider, Tooltip } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { ActiveAgentAtom, AgentSettingsAtom } from '../../../../atoms/state';
import StraightIcon from '@mui/icons-material/Straight';
import RouteIcon from '@mui/icons-material/Route';
import { useTranslation } from 'react-i18next';
import Foresight from '../../../../components/AgentTuners/Foresight/Foresight';
import { Help } from '@genai-fi/base';

/**
 * Gamma gauge was:
 * <ExplGauge
                value={agentSettings.gamma}
                green={{ from: 0.85, to: 0.95 }}
                yellow={{ from: 0.15, to: 1 }}
                red={{ from: 0, to: 1 }}
 */
const gradient = `
linear-gradient(
    to right,
    #d32f2f 0%,
    #d32f2f 15%,
    #ffc354 20%,
    #ffc354 60%,
    #2e7d32 85%,
    #2e7d32 90%,
    #ffc354 95%,
    #ffc354 100%
)
`;

export default function Gamma() {
    const { t } = useTranslation();
    const [agentSettings, setAgentSettings] = useAtom(AgentSettingsAtom);
    const agent = useAtomValue(ActiveAgentAtom);
    return (
        <div>
            <h3 style={{ position: 'relative', display: 'flex', justifyContent: 'center', left: 10 }}>
                <span>
                    <Help
                        inplace
                        keepOpen
                        message={t('help.hud.gamma')}
                    >
                        {t('gauge.title.gamma')}
                    </Help>
                </span>
            </h3>
            <div className={style.sightWrapper}>
                <Foresight value={agentSettings.gamma} />
                {agent.img && (
                    <img
                        className={style.agent}
                        src={agent.img}
                        width={34}
                        height={40}
                    />
                )}
                <b className={style.treasure}>+2</b>
                <b className={style.trap}>-1</b>
                <b className={style.trap2}>-1</b>
                <b className={style.trap3}>-5</b>
                <b className={style.goal}>+10</b>
            </div>
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
                    sx={{
                        '& .MuiSlider-rail': {
                            opacity: 1,
                            background: gradient,
                            height: '6px',
                            borderRadius: '9px',
                        },

                        '& .MuiSlider-track': {
                            background: 'transparent',
                            border: 'none',
                        },
                        '& .MuiSlider-thumb': {
                            width: 24,
                            height: 24,
                            background: 'linear-gradient(180deg, #fff8c5 0%, #ffd54f 45%, #c98b00 100%)',
                            border: '2px solid rgb(161, 25, 7)',
                            boxShadow: '0 2px 6px rgba(0,0,0,.35)',
                            position: 'relative',

                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                left: 3,
                                right: 3,
                                top: 3,
                                height: '35%',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,.45)',
                            },
                        },
                    }}
                    step={0.05}
                    valueLabelDisplay="auto"
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
