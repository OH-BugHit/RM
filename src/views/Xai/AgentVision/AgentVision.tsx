import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { ActiveAgentAtom } from '../../../atoms/state';
import ObservationCanvas from '../../Observation/ObservationCanvas';
import { useGameScale } from '../../../context/GameScale/useGameScale';
import { useTranslation } from 'react-i18next';

interface AgentVisionProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
}
export default function AgentVision({ agentRef }: AgentVisionProps) {
    const agent = useAtomValue(ActiveAgentAtom);
    const { t } = useTranslation();
    const { s } = useGameScale();

    return (
        <div className={style.agentVisionWrapper}>
            <h3 style={{ margin: '0.5rem', justifySelf: 'center' }}>{t('hud.agentVision.observation.title')}</h3>
            {agentRef.current && (
                <ObservationCanvas
                    agentRef={agentRef}
                    size={s(256)}
                    observationShape={agent.observationShape}
                />
            )}
        </div>
    );
}
