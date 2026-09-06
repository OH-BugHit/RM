import style from './style.module.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { CellType, GenericReward, TileDefinition } from '../../../../types';
import RewardControl from '../../../Controls/RewardControl';
import { useAtom } from 'jotai';
import { EnvSettingsAtom } from '../../../../atoms/gameState';
import { useTranslation } from 'react-i18next';
import { useGameScale } from '../../../../context/GameScale/useGameScale';
interface PropRewardProps {
    tiles: TileDefinition[];
}

const rewardKeyByType: Record<CellType, keyof GenericReward | ''> = {
    [CellType.Treasure]: 'reward1',
    [CellType.TreasureBig]: 'reward2',
    [CellType.Key]: 'rPickObject',
    [CellType.Trap]: 'rTrap',
    [CellType.Spawn]: '',
    [CellType.Empty]: '',
    [CellType.Trigger]: 'endByTrigger',
    [CellType.Door]: '',
    [CellType.Solid]: '',
    [CellType.LockedDoor]: 'rUseObject',
    [CellType.Outside]: '',
};

export default function PropRewardItem({ tiles }: PropRewardProps) {
    const { t } = useTranslation();
    const { s, scale, scaleWidth } = useGameScale();
    const [envSettings, setEnvSettings] = useAtom(EnvSettingsAtom);

    const type = tiles[0].type;
    const key = rewardKeyByType[type];
    const value = key ? envSettings.generic.reward[key] : 0;

    const updateReward = (reward: number) => {
        if (!key) return;

        setEnvSettings((old) => ({
            ...old,
            generic: {
                ...old.generic,
                reward: {
                    ...old.generic.reward,
                    [key]: reward,
                },
            },
        }));
    };

    return (
        <div
            className={style.rewardTuneRow}
            style={{
                padding: `${s(0.5)}px 0px ${s(0.5)}px 0px`,
                border: scale < 0.8 ? '' : '2px solid rgb(238, 238, 238)',
            }}
        >
            <h4>{t(`common.cell.${type}`)}</h4>
            <div className={style.reward}>
                {tiles.map((tile) => (
                    <div
                        key={tile.id}
                        style={{ flexDirection: 'column' }}
                    >
                        <img
                            key={tile.id}
                            src={tile.image}
                            width={s(48)}
                        />
                    </div>
                ))}
            </div>

            <div className={style.rewardRow}>
                <RemoveIcon
                    color="error"
                    fontSize={scaleWidth < 1 ? (scaleWidth < 0.6 ? 'small' : 'medium') : 'large'}
                />

                <RewardControl
                    min={-20}
                    max={20}
                    value={value}
                    step={1}
                    onChange={updateReward}
                />

                <AddIcon
                    color="primary"
                    fontSize={scaleWidth < 1 ? (scaleWidth < 0.6 ? 'small' : 'medium') : 'large'}
                />
            </div>
        </div>
    );
}
