import { useAtomValue } from 'jotai';
import { tournamentAgentUpdatesAtom } from '../../../../../../atoms/state';
import React, { useEffect } from 'react';
import { QPolicyAgent } from '../../../../../../components/agents/policyQagent';

interface AgentBridgeProps {
    agentsRef: React.RefObject<QPolicyAgent[]>;
}
export default function AgentBridge({ agentsRef }: AgentBridgeProps) {
    const updates = useAtomValue(tournamentAgentUpdatesAtom);
    useEffect(() => {
        const currentAgents = agentsRef.current ?? [];

        for (const [studentId, update] of updates.data) {
            const agent = currentAgents.find((agent) => agent.studentId === studentId);

            if (!agent) {
                const newAgent = new QPolicyAgent({
                    Q: update.Q,
                    Rewards: update.rewards,
                    ObservationShape: update.observationShape,
                    studentId,
                });

                currentAgents.push(newAgent);
            } else {
                agent.setQTable(update.Q);
            }
        }

        agentsRef.current = currentAgents;
    }, [updates, agentsRef]);

    return null;
}
