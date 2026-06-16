import { useAtom, useAtomValue } from 'jotai';
import style from './style.module.css';
import RewardControl from './RewardControl';

import { TempSettingsAtom, ActiveEnvironmentAtom } from '../../atoms/state';
import { rewardConfigs } from '../../utils/defaults';
import BooleanControl from './BooleanControl';

export default function RewardControlContainer() {
    const [tempSettings, setTempSettings] = useAtom(TempSettingsAtom);
    const activeGame = useAtomValue(ActiveEnvironmentAtom);

    if (!tempSettings || !activeGame?.type) return null;

    const isGameType = (type: string): type is keyof typeof rewardConfigs => type in rewardConfigs;

    if (!isGameType(activeGame.type)) return null;

    const type = activeGame.type;

    const config = rewardConfigs[type];
    const rewardState = tempSettings[type];

    const updateReward = (key: string, value: number | boolean) => {
        setTempSettings((old) => ({
            ...old,
            [type]: {
                ...old[type],
                reward: {
                    ...old[type].reward,
                    [key]: value,
                },
            },
        }));
    };

    return (
        <main className={style.content}>
            <h2>Reward function:</h2>

            <div className={style.sliderItem}>
                {config.map((field) => {
                    const key = field.key as keyof typeof rewardState.reward;

                    const value = rewardState.reward[key];

                    if (field.type === 'boolean') {
                        return (
                            <BooleanControl
                                key={String(field.key)}
                                label={field.label}
                                value={Boolean(value)}
                                onChange={(val) => updateReward(field.key, val)}
                            />
                        );
                    }

                    return (
                        <RewardControl
                            key={String(field.key)}
                            label={field.label}
                            value={Number(value)}
                            min={field.min ?? -20}
                            max={field.max ?? 20}
                            step={field.step ?? 1}
                            onChange={(val) => updateReward(field.key, val)}
                        />
                    );
                })}
            </div>
        </main>
    );
}
