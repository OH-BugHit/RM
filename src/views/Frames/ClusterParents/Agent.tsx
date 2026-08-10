import style from './style.module.css';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ActiveAgentAtom } from '../../../atoms/state';
import { AgentCAtom, BuildCAtom, ClusterOpenAtom, HUDvisAtom, InspectCAtom, RewardCAtom } from '../../../atoms/uiState';
import AgentIcon from '../../../components/Buttons/ButtonIcons/Agent/AgentIcon';
import { Button } from '@genai-fi/base';
import CloseIcon from '../../../components/Buttons/ButtonIcons/OtherIcons/CloseIcon';

export default function AgentClusterParent() {
    const agent = useAtomValue(ActiveAgentAtom);
    const vis = useAtomValue(HUDvisAtom);
    const [clusters, setClusters] = useAtom(ClusterOpenAtom);
    const setA = useSetAtom(AgentCAtom);
    const setB = useSetAtom(BuildCAtom);
    const setI = useSetAtom(InspectCAtom);
    const setR = useSetAtom(RewardCAtom);

    const handleClick = () => {
        if (clusters.agent) setA({ prm: false, img: false, obs: false });
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
        <Button
            className={style.agentImg}
            onClick={() => handleClick()}
        >
            {vis.agent && (
                <>
                    {agent.img ? (
                        <>
                            <img
                                src={agent.img}
                                style={{ marginTop: '16px' }}
                                height={140}
                            />
                            <div style={{ position: 'absolute' }}>
                                {clusters.agent && (
                                    <CloseIcon
                                        size={140}
                                        type="dark"
                                    />
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <AgentIcon size={160} />
                            <div style={{ position: 'absolute' }}>
                                {clusters.agent && (
                                    <CloseIcon
                                        size={140}
                                        type="dark"
                                    />
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
        </Button>
    );
}
