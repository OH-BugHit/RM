import style from './style.module.css';
import { useAtom, useSetAtom } from 'jotai';
import { AgentCAtom, BuildCAtom, ClusterOpenAtom, InspectCAtom, RewardCAtom } from '../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import CloseIcon from '../../../components/Buttons/ButtonIcons/OtherIcons/CloseIcon';
import Reward from '../../Xai/Reward/Reward';
import { useTranslation } from 'react-i18next';

export default function RewardClusteParent() {
    const { t } = useTranslation();
    const [clusters, setClusters] = useAtom(ClusterOpenAtom);
    const setA = useSetAtom(AgentCAtom);
    const setB = useSetAtom(BuildCAtom);
    const setI = useSetAtom(InspectCAtom);
    const setR = useSetAtom(RewardCAtom);

    const handleClick = () => {
        setA({ prm: false, img: false, obs: false });
        setB({ tools: false, create: false, settings: false });
        setI({ qMap: false, charts: false, agentVision: false });
        if (clusters.reward) setR({ time: false, step: false, props: false });

        setClusters((old) => {
            return {
                agent: false,
                build: false,
                inspect: false,
                reward: !old.reward,
            };
        });
    };

    return (
        <Button
            className={style.icon}
            onClick={() => handleClick()}
        >
            <>
                <Reward title={t('reward.title')} />
                <div style={{ position: 'absolute' }}>
                    {clusters.reward && (
                        <CloseIcon
                            size={140}
                            type="dark"
                        />
                    )}
                </div>
            </>
        </Button>
    );
}
