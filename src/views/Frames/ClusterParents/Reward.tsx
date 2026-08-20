import style from './style.module.css';
import { useAtom, useSetAtom } from 'jotai';
import { AgentCAtom, BuildCAtom, ClusterOpenAtom, InspectCAtom, RewardCAtom } from '../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import CloseIcon from '../../../components/Buttons/ButtonIcons/OtherIcons/CloseIcon';
import Reward from '../../../components/Buttons/ButtonIcons/Rewards/RewardIcon';
import { useTranslation } from 'react-i18next';

export default function RewardClusteParent() {
    const { t } = useTranslation();
    const [clusters, setClusters] = useAtom(ClusterOpenAtom);
    const setA = useSetAtom(AgentCAtom);
    const setB = useSetAtom(BuildCAtom);
    const setI = useSetAtom(InspectCAtom);
    const setR = useSetAtom(RewardCAtom);
    const size = 160;

    const handleClick = () => {
        setA({ prm: false, img: false, obs: false, trash: true });
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
        <div className={style.clusterParent}>
            <Button
                onClick={() => handleClick()}
                style={{ width: size, height: size }}
            >
                <>
                    <Reward
                        size={size}
                        title={t('reward.title')}
                    />
                    <div style={{ position: 'absolute' }}>
                        {clusters.reward && (
                            <CloseIcon
                                size={size - 20}
                                type="dark"
                            />
                        )}
                    </div>
                </>
            </Button>
        </div>
    );
}
