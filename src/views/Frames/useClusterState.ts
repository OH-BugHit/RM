import { useAtom, useSetAtom } from 'jotai';
import {
    AgentCAtom,
    BuildCAtom,
    BuildSavedClustersAtom,
    DesignOpenAtom,
    InspectCAtom,
    RewardCAtom,
    StoryProgressAtom,
} from '../../atoms/uiState';
import type { AgentCluster, BuildCluster, ClusterType, InspectCluster, RewardCluster } from '../../types';

type ClusterState = AgentCluster | BuildCluster | InspectCluster | RewardCluster;

type ClusterOpenSetter<T extends ClusterState> = (value: T | ((prev: T) => T)) => void;

function closeCluster<T extends Record<string, boolean>>(state: T): T {
    return Object.keys(state).reduce(
        (acc, key) => ({
            ...acc,
            [key]: false,
        }),
        {} as T
    );
}

export function useClusterOpenState(type: ClusterType) {
    const [agentOpen, setAgentOpen] = useAtom(AgentCAtom);
    const [inspectOpen, setInspectOpen] = useAtom(InspectCAtom);
    const [rewardOpen, setRewardOpen] = useAtom(RewardCAtom);
    const [buildOpen, setBuildOpen] = useAtom(BuildCAtom);
    const [savedClusterState, setSavedClusterState] = useAtom(BuildSavedClustersAtom);
    const setStoryProgress = useSetAtom(StoryProgressAtom);
    const setDesignOpen = useSetAtom(DesignOpenAtom);

    const openState =
        type === 'agent' ? agentOpen : type === 'inspect' ? inspectOpen : type === 'reward' ? rewardOpen : buildOpen;

    const setOpenState =
        type === 'agent'
            ? (setAgentOpen as ClusterOpenSetter<ClusterState>)
            : type === 'inspect'
              ? (setInspectOpen as ClusterOpenSetter<ClusterState>)
              : type === 'reward'
                ? (setRewardOpen as ClusterOpenSetter<ClusterState>)
                : (setBuildOpen as ClusterOpenSetter<ClusterState>);

    const handleOpenClick = (id: string) => {
        if (type === 'build') {
            const buildKey = id as keyof BuildCluster;
            const isBuildOpen = buildOpen[buildKey];
            const anyBuildOpen = Object.values(buildOpen).some(Boolean);
            const nextBuildOpen = isBuildOpen
                ? closeCluster(buildOpen)
                : {
                      ...closeCluster(buildOpen),
                      [buildKey]: true,
                  };

            if (!anyBuildOpen && !isBuildOpen) {
                setSavedClusterState({
                    agent: agentOpen,
                    inspect: inspectOpen,
                    reward: rewardOpen,
                });
                setAgentOpen(closeCluster(agentOpen));
                setInspectOpen(closeCluster(inspectOpen));
                setRewardOpen(closeCluster(rewardOpen));
                setBuildOpen(nextBuildOpen);
                return;
            }

            setBuildOpen(nextBuildOpen);

            const closedBuild = Object.values(nextBuildOpen).every((value) => !value);
            if (closedBuild) {
                setAgentOpen(savedClusterState.agent);
                setInspectOpen(savedClusterState.inspect);
                setRewardOpen(savedClusterState.reward);
                setDesignOpen(false);
            } else {
                setDesignOpen(true);
            }

            return;
        }

        setOpenState((old) => {
            const key = id as keyof typeof old;
            const isOpen = old[key];

            /* Multiple cluster components open. Just to remind how it was done...
            if (type === 'reward') {
                return {
                    ...old,
                    [key]: !isOpen,
                };
            }*/

            if (type === 'inspect') {
                setStoryProgress((old) => {
                    return {
                        ...old,
                        agentView: {
                            ...old.agentView,
                            opened: true,
                        },
                    };
                });
            }

            if (isOpen) {
                return closeCluster(old);
            }

            return {
                ...closeCluster(old),
                [key]: true,
            };
        });
    };

    return {
        openState,
        handleOpenClick,
    };
}
