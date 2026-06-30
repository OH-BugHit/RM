import style from './style.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import RewardControl from '../../../Controls/RewardControl';
import { useAtom } from 'jotai';
import { EnvSettingsAtom } from '../../../../atoms/gameState';
import { useTranslation } from 'react-i18next';

export default function TimeUpReward() {
    const { t } = useTranslation();
    const [envSettings, setEnvSettings] = useAtom(EnvSettingsAtom);

    const updateReward = (reward: number) => {
        setEnvSettings((old) => ({
            ...old,
            generic: {
                ...old.generic,
                reward: {
                    ...old.generic.reward,
                    rLoseByTimeEnds: reward,
                },
            },
        }));
    };

    return (
        <div className={style.rewardTuneRow}>
            <h3>{t(`common.cell.timeUp`)}</h3>
            <div className={style.rewardRow}>
                <HeartBrokenIcon
                    color="error"
                    fontSize="large"
                />

                <RewardControl
                    min={-20}
                    max={20}
                    value={envSettings.generic.reward.rLoseByTimeEnds}
                    step={1}
                    onChange={updateReward}
                />

                <FavoriteIcon
                    color="success"
                    fontSize="large"
                />
            </div>
        </div>
    );
}
