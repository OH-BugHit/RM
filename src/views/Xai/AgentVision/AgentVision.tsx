import { useAtomValue } from 'jotai';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { ActiveAgentAtom } from '../../../atoms/state';
import ObservationCanvas from '../../Observation/ObservationCanvas';

interface AgentVisionProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
}
export default function AgentVision({ agentRef }: AgentVisionProps) {
    const agent = useAtomValue(ActiveAgentAtom);

    return (
        <>
            asdasd
            <h3 style={{ margin: '0.5rem', justifySelf: 'center' }}>Agent's Observation</h3>
            {agentRef.current && (
                <ObservationCanvas
                    agentRef={agentRef}
                    size={256}
                    observationShape={agent.observationShape}
                />
            )}
        </>
    );
}
