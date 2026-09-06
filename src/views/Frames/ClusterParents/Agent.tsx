import style from './style.module.css';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ActiveAgentAtom } from '../../../atoms/state';
import { AgentCAtom, BuildCAtom, ClusterOpenAtom, HUDvisAtom, InspectCAtom, RewardCAtom } from '../../../atoms/uiState';
import AgentIcon from '../../../components/Buttons/ButtonIcons/Agent/AgentIcon';
import { Button } from '@genai-fi/base';
import CloseIcon from '../../../components/Buttons/ButtonIcons/OtherIcons/CloseIcon';
import { useGameScale } from '../../../context/GameScale/useGameScale';

const DESIGN_SIZE = 160;
const CLOSE_SIZE = 140;

export default function AgentClusterParent() {
    const { s } = useGameScale();
    const agent = useAtomValue(ActiveAgentAtom);
    const vis = useAtomValue(HUDvisAtom);
    const [clusters, setClusters] = useAtom(ClusterOpenAtom);
    const setA = useSetAtom(AgentCAtom);
    const setB = useSetAtom(BuildCAtom);
    const setI = useSetAtom(InspectCAtom);
    const setR = useSetAtom(RewardCAtom);

    const handleClick = () => {
        if (clusters.agent) setA({ prm: false, img: false, obs: false, trash: true });
        setB({ tools: false, create: false, settings: false });
        setI({ qMap: false, charts: false, agentVision: false });
        setR({ time: false, step: false, props: false });

        setClusters((old) => {
            return {
                agent: !old.agent,
                build: false,
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
                {vis.agent && (
                    <>
                        {agent.img ? (
                            <>
                                <img
                                    src={agent.img}
                                    style={{ marginTop: '16px' }}
                                    height={s(CLOSE_SIZE)}
                                />
                                <div style={{ position: 'absolute' }}>
                                    {clusters.agent && (
                                        <CloseIcon
                                            size={s(CLOSE_SIZE)}
                                            type="dark"
                                        />
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <AgentIcon size={s(DESIGN_SIZE)} />
                                <div style={{ position: 'absolute' }}>
                                    {clusters.agent && (
                                        <CloseIcon
                                            size={s(CLOSE_SIZE)}
                                            type="dark"
                                        />
                                    )}
                                </div>
                            </>
                        )}
                    </>
                )}
            </Button>
        </div>
    );
}
