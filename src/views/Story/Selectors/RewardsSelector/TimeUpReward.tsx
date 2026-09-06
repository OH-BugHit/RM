import style from './style.module.css';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import RewardControl from '../../../Controls/RewardControl';
import { useAtom } from 'jotai';
import { EnvSettingsAtom } from '../../../../atoms/gameState';
import { useTranslation } from 'react-i18next';
import { useGameScale } from '../../../../context/GameScale/useGameScale';

export default function TimeUpReward() {
    const { t } = useTranslation();
    const { scaleWidth } = useGameScale();
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
        <div className={style.selectorContainer}>
            <h3>{t(`common.cell.timeUp`)}</h3>
            <div className={style.rowContent}>
                <RemoveIcon
                    color="error"
                    fontSize={scaleWidth < 1 ? (scaleWidth < 0.6 ? 'small' : 'medium') : 'large'}
                />

                <RewardControl
                    min={-20}
                    max={20}
                    value={envSettings.generic.reward.rLoseByTimeEnds}
                    step={1}
                    onChange={updateReward}
                />

                <AddIcon
                    color="success"
                    fontSize={scaleWidth < 1 ? (scaleWidth < 0.6 ? 'small' : 'medium') : 'large'}
                />
            </div>
        </div>
    );
}
