import style from '../style.module.css';
import SelectorItem from '../SelectorItem';
import { Dispatch, SetStateAction } from 'react';
import { Agent } from '../../../../types';
import DrawObservation from '../../../Observation/DrawObservation';
import { useSetAtom } from 'jotai';
import { ActiveAgentAtom } from '../../../../atoms/state';

interface AgentProps {
    selectedAgent: Agent;
    setSelectedAgent: Dispatch<SetStateAction<Agent>>;
}
export default function ObservationSelector({ selectedAgent, setSelectedAgent }: AgentProps) {
    const setActiveAgent = useSetAtom(ActiveAgentAtom);

    return (
        <div className={style.selectorContainer}>
            <div className={style.textSection}>
                <h3>Select observation shape</h3>
                <p>
                    Agents can have different observation spaces, meaning some agents see further away. Seeing more can
                    help agent to find solutions, but learning is also harder and slower.
                </p>
            </div>
            <ul className={style.selectorItemContainer}>
                <SelectorItem
                    title="Small"
                    onClick={() => {
                        setSelectedAgent((old) => {
                            return {
                                ...old,
                                observationShape: 'small',
                            };
                        });
                        setActiveAgent((old) => {
                            return { ...old, observationShape: 'small' };
                        });
                    }}
                    selected={selectedAgent.observationShape === 'small'}
                    children={
                        <DrawObservation
                            state="0101-1"
                            disabled={false}
                            actionValues={[0.12, -0.5, 0.16, -0.5, -0.46, -0.4]}
                            type={'small'}
                        />
                    }
                />
                <SelectorItem
                    title="Large"
                    onClick={() => {
                        setSelectedAgent((old) => {
                            return {
                                ...old,
                                observationShape: 'large',
                            };
                        });
                        setActiveAgent((old) => {
                            return { ...old, observationShape: 'large' };
                        });
                    }}
                    selected={selectedAgent.observationShape === 'large'}
                    children={
                        <DrawObservation
                            state="10020000201021100222-1"
                            disabled={false}
                            actionValues={[0.8, -0.47, -0.44, -0.5, -0.42, -0.4]}
                            type="large"
                        />
                    }
                />
            </ul>
        </div>
    );
}
