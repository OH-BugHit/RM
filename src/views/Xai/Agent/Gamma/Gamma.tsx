import style from './style.module.css';
import { Slider, Tooltip } from '@mui/material';
import { useAtom, useAtomValue } from 'jotai';
import { ActiveAgentAtom, AgentSettingsAtom } from '../../../../atoms/state';
import StraightIcon from '@mui/icons-material/Straight';
import RouteIcon from '@mui/icons-material/Route';
import { useTranslation } from 'react-i18next';
import Foresight from '../../../../components/Foresight/Foresight';
import { TilePropsAtom } from '../../../../atoms/uiState';
import { CellType } from '../../../../types';

/**
 * Gamma gauge was:
 * <ExplGauge
                value={agentSettings.gamma}
                green={{ from: 0.85, to: 0.95 }}
                yellow={{ from: 0.15, to: 1 }}
                red={{ from: 0, to: 1 }}
 */

export default function Gamma() {
    const { t } = useTranslation();
    const [agentSettings, setAgentSettings] = useAtom(AgentSettingsAtom);
    const tooltiles = useAtomValue(TilePropsAtom);
    const treasure = tooltiles.find((tile) => tile.type === CellType.Treasure);
    const trap = tooltiles.find((tile) => tile.type === CellType.Trap);
    const big = tooltiles.find((tile) => tile.type === CellType.TreasureBig);
    const agent = useAtomValue(ActiveAgentAtom);
    return (
        <div>
            <h3>{t('gauge.title.gamma')}</h3>
            <div className={style.sightWrapper}>
                <Foresight value={agentSettings.gamma} />
                {agent.img && (
                    <img
                        className={style.agent}
                        src={agent.img}
                        width={34}
                    />
                )}
                {treasure && (
                    <img
                        className={style.treasure}
                        src={treasure.image}
                        width={34}
                    />
                )}
                {trap && (
                    <img
                        className={style.trap}
                        src={trap.image}
                        width={34}
                    />
                )}
                {big && (
                    <img
                        className={style.big}
                        src={big.image}
                        width={34}
                    />
                )}
                <img
                    className={style.goal}
                    src={tooltiles[2].image}
                    width={34}
                />
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
                    step={0.01}
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
