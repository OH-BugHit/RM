import style from './style.module.css';
import { useAtom, useSetAtom } from 'jotai';
import BuildIcon from '../../../components/Buttons/ButtonIcons/Build/BuildIcon';
import { AgentCAtom, BuildCAtom, ClusterOpenAtom, InspectCAtom, RewardCAtom } from '../../../atoms/uiState';
import { Button } from '@genai-fi/base';
import CloseIcon from '../../../components/Buttons/ButtonIcons/OtherIcons/CloseIcon';
import { useGameScale } from '../../../context/GameScale/useGameScale';

const DESIGN_SIZE = 160;
const CLOSE_SIZE = 140;

export default function BuildClusteParent() {
    const { s } = useGameScale();
    const [clusters, setClusters] = useAtom(ClusterOpenAtom);
    const setA = useSetAtom(AgentCAtom);
    const setB = useSetAtom(BuildCAtom);
    const setI = useSetAtom(InspectCAtom);
    const setR = useSetAtom(RewardCAtom);

    const handleClick = () => {
        setA({ prm: false, img: false, obs: false, trash: true });
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
        <div
            className={style.clusterParent}
            style={{ inset: `${s(40)}px` }}
        >
            <Button
                onClick={() => handleClick()}
                style={{ width: s(DESIGN_SIZE), height: s(DESIGN_SIZE) }}
            >
                <>
                    <BuildIcon
                        size={s(DESIGN_SIZE)}
                        title="BUILD"
                    />
                    <div style={{ position: 'absolute' }}>
                        {clusters.build && (
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
