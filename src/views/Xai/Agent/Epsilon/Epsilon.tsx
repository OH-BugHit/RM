import style from './style.module.css';
import { Slider, Tooltip } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { ActiveAgentAtom, AgentSettingsAtom } from '../../../../atoms/state';
import MemoryIcon from '@mui/icons-material/Memory';
import CasinoIcon from '@mui/icons-material/Casino';
import { useTranslation } from 'react-i18next';
import Curiosity from '../../../../components/AgentTuners/Curiosity/Curiosity';
import { Help } from '@genai-fi/base';

/*
<ExplGauge
                value={agentSettings.epsilon}
                green={{ from: 0, to: 0.1 }}
                yellow={{ from: 0.1, to: 0.18 }}
                red={{ from: 0.18, to: 1 }}
            />*/
const gradient = `
linear-gradient(
    to right,
    #ffc354 0%,
    #2e7d32 5%,
    #2e7d32 15%,
    #ffc354 30%,
    #ffc354 50%,
    #d32f2f 80%,
    #d32f2f 100%
)
`;

export default function Epsilon() {
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
                        message={t('help.hud.epsilon')}
                    >
                        {t('gauge.title.epsilon')}
                    </Help>
                </span>
            </h3>
            <div className={style.sightWrapper}>
                <Curiosity value={agentSettings.epsilon} />
                {agent.img && (
                    <img
                        className={style.agent}
                        src={agent.img}
                        width={34}
                        height={40}
                    />
                )}
                <b className={style.treasure2}>+2</b>
                <b className={style.trap}>-5</b>
                <b className={style.goal}>+10</b>
            </div>
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
