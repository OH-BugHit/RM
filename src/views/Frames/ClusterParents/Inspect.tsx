import style from './style.module.css';
import { useAtom, useSetAtom } from 'jotai';
import { AgentCAtom, BuildCAtom, ClusterOpenAtom, InspectCAtom, RewardCAtom } from '../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import CloseIcon from '../../../components/Buttons/ButtonIcons/OtherIcons/CloseIcon';
import InspectClusterIcon from '../../../components/Buttons/ButtonIcons/Inspect/Inspect';
import { useGameScale } from '../../../context/GameScale/useGameScale';

const DESIGN_SIZE = 160;
const CLOSE_SIZE = 140;

export default function InspectClusteParent() {
    const { s } = useGameScale();
    const [clusters, setClusters] = useAtom(ClusterOpenAtom);
    const setA = useSetAtom(AgentCAtom);
    const setB = useSetAtom(BuildCAtom);
    const setI = useSetAtom(InspectCAtom);
    const setR = useSetAtom(RewardCAtom);

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
        <div
            className={style.clusterParent}
            style={{ inset: `${s(40)}px` }}
        >
            <Button
                onClick={() => handleClick()}
                style={{ width: s(DESIGN_SIZE), height: s(DESIGN_SIZE) }}
            >
                <>
                    <InspectClusterIcon
                        size={s(DESIGN_SIZE)}
                        title="INSPECT"
                    />
                    <div style={{ position: 'absolute' }}>
                        {clusters.inspect && (
                            <CloseIcon
                                size={s(CLOSE_SIZE)}
                                type="dark"
                            />
                        )}
                    </div>
                </>
            </Button>
        </div>
    );
}
