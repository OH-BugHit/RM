import style from './style.module.css';
import { useAtom, useSetAtom } from 'jotai';
import { AgentCAtom, BuildCAtom, ClusterOpenAtom, InspectCAtom, RewardCAtom } from '../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import CloseIcon from '../../../components/Buttons/ButtonIcons/OtherIcons/CloseIcon';
import InspectClusterIcon from '../../../components/Buttons/ButtonIcons/Inspect/Inspect';

export default function InspectClusteParent() {
    const [clusters, setClusters] = useAtom(ClusterOpenAtom);
    const setA = useSetAtom(AgentCAtom);
    const setB = useSetAtom(BuildCAtom);
    const setI = useSetAtom(InspectCAtom);
    const setR = useSetAtom(RewardCAtom);
    const size = 160;

    const handleClick = () => {
        setA({ prm: false, img: false, obs: false, trash: true });
        setB({ tools: false, create: false, settings: false });
        if (clusters.inspect) setI({ qMap: false, charts: false, agentVision: false });
        setR({ time: false, step: false, props: false });

        setClusters((old) => {
            return {
                agent: false,
                build: false,
                inspect: !old.inspect,
                reward: old.reward,
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
                    <InspectClusterIcon
                        size={size}
                        title="INSPECT"
                    />
                    <div style={{ position: 'absolute' }}>
                        {clusters.inspect && (
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
