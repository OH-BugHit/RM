import style from './style.module.css';
import { useAtomValue } from 'jotai';
import { ActiveAgentAtom } from '../../../atoms/state';
import { HUDvisAtom } from '../../../atoms/uiState';
import AgentIcon from '../../../components/Buttons/ButtonIcons/Agent/AgentIcon';

export default function Agent() {
    const agent = useAtomValue(ActiveAgentAtom);
    const vis = useAtomValue(HUDvisAtom);
    return (
        <div className={style.agentImg}>
            {vis.agent && (
                <>
                    {agent.img ? (
                        <img
                            src={agent.img}
                            style={{ marginTop: '16px' }}
                            height={140}
                        />
                    ) : (
                        <AgentIcon size={160} />
                    )}
                </>
            )}
        </div>
    );
}
