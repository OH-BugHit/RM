import style from '../style.module.css';
import { CellType, GenericReward, TileDefinition } from '../../../../types';
import RewardControl from '../../../Controls/RewardControl';
import { useAtom } from 'jotai';
import { EnvSettingsAtom } from '../../../../atoms/gameState';
import { useTranslation } from 'react-i18next';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
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

export default function SettingsItem({ tiles }: PropRewardProps) {
    const { t } = useTranslation();
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
        <div className={style.rewardTuneRow}>
            <h3>{t(`common.cell.${type}`)}</h3>
            <div className={style.reward}>
                {tiles.map((tile) => (
                    <div style={{ flexDirection: 'column' }}>
                        <img
                            key={tile.id}
                            src={tile.image}
                            width={64}
                        />
                    </div>
                ))}
            </div>
            <div className={style.rewardRow}>
                <HourglassEmptyIcon
                    color="primary"
                    fontSize="large"
                />

                <RewardControl
                    min={-20}
                    max={20}
                    value={value}
                    step={1}
                    onChange={updateReward}
                    label="on"
                />

                <HourglassFullIcon
                    color="primary"
                    fontSize="large"
                />
            </div>
        </div>
    );
}
