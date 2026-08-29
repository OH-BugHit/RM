import { useEffect } from 'react';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { createSaveAgent } from '../../../utils/export';
import { useStore } from 'jotai';
import { usernameAtom } from '../../../atoms/state';
import { useRewardProtocol } from '../../../services/StudentProtocol';

interface AgentSendBridgeProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
}

export default function AgentSendBridge({ agentRef }: AgentSendBridgeProps) {
    const { doSendAgent } = useRewardProtocol();
    const store = useStore();

    useEffect(() => {
        let cancelled = false;

        const checkEnvironment = async () => {
            while (!cancelled) {
                await new Promise((resolve) => setTimeout(resolve, 10_000));

                if (cancelled) return;

                const agent = agentRef.current;

                if (!agent) {
                    continue;
                }

                const blob = await createSaveAgent(agent, store);

                if (cancelled) return;
                if (doSendAgent)
                    doSendAgent({
                        file: blob,
                        studentId: store.get(usernameAtom),
                    });
            }
        };

        checkEnvironment();

        return () => {
            cancelled = true;
        };
    }, [store, doSendAgent, agentRef]);

    return null;
}
