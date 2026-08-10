import style from './style.module.css';
import { useAtom, useSetAtom } from 'jotai';
import BuildIcon from '../../../components/Buttons/ButtonIcons/Build/BuildIcon';
import { AgentCAtom, BuildCAtom, ClusterOpenAtom, InspectCAtom, RewardCAtom } from '../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import CloseIcon from '../../../components/Buttons/ButtonIcons/OtherIcons/CloseIcon';

export default function BuildClusteParent() {
    const [clusters, setClusters] = useAtom(ClusterOpenAtom);
    const setA = useSetAtom(AgentCAtom);
    const setB = useSetAtom(BuildCAtom);
    const setI = useSetAtom(InspectCAtom);
    const setR = useSetAtom(RewardCAtom);

    const handleClick = () => {
        setA({ prm: false, img: false, obs: false });
        if (clusters.build) setB({ tools: false, create: false, settings: false });
        setI({ qMap: false, charts: false, agentVision: false });
        setR({ time: false, step: false, props: false });

        setClusters((old) => {
            return {
                agent: false,
                build: !old.build,
                inspect: false,
                reward: old.reward,
            };
        });
    };
    return (
        <Button
            className={style.icon}
            onClick={() => handleClick()}
        >
            <>
                <BuildIcon
                    size={220}
                    title="BUILD"
                />
                <div style={{ position: 'absolute' }}>
                    {clusters.build && (
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
