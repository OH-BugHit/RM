import { useAtomValue } from 'jotai';
import DrawObservation from '../../Observation/DrawObservation';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { ActiveAgentAtom, ActiveEnvironmentAtom, GameControlAtom } from '../../../atoms/state';
import { LargeObsAtom, SmallObsAtom } from '../../../atoms/gameState';

interface AgentVisionProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    qvalueRef: React.RefObject<number[]>;
}
export default function AgentVision({ agentRef, qvalueRef }: AgentVisionProps) {
    const agent = useAtomValue(ActiveAgentAtom);
    const controls = useAtomValue(GameControlAtom);
    const obsAtom = agent.observationShape === 'large' ? LargeObsAtom : SmallObsAtom;
    const obs = useAtomValue(obsAtom);
    const environment = useAtomValue(ActiveEnvironmentAtom);

    return (
        <>
            <h3 style={{ margin: '0.5rem', justifySelf: 'center' }}>Agent Vision</h3>
            {agentRef.current && (
                <DrawObservation
                    state={agentRef.current.getStateKey(obs)}
                    disabled={controls.isFast}
                    actionValues={qvalueRef.current}
                    type={agent.observationShape}
                    envType={environment.type}
                />
            )}
        </>
    );
}
