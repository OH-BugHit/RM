import { useAtomValue } from 'jotai';
import style from './style.module.css';
import { ActiveEnvironmentAtom } from '../../../atoms/state';
import { Agent, AgentType } from '../../../types';
import DrawObservation from '../../Observation/DrawObservation';
import Separator from '../../../components/Separator/Separator';

interface SelectedStoryProps {
    agent: Agent;
}
export default function SelectedEnvironment({ agent }: SelectedStoryProps) {
    const environment = useAtomValue(ActiveEnvironmentAtom);

    const showObservation = (type: AgentType) => {
        switch (type) {
            case 'robodog':
                return (
                    <>
                        <img
                            src={'images/agents/robo_dog.png'}
                            width={180}
                        />
                        <DrawObservation
                            state="0101-1"
                            disabled={false}
                            actionValues={[0, 0, 0, 0, 0, 0]}
                            drawActions={false}
                            type={'small'}
                        />
                    </>
                );
            case 'adventurer': {
                return (
                    <div>
                        <img
                            src={'images/agents/adventurer.png'}
                            width={180}
                        />
                        <DrawObservation
                            state="10020000201021100222-1"
                            disabled={false}
                            actionValues={[0, 0, 0, 0, 0, 0]}
                            drawActions={false}
                            type="large"
                        />
                    </div>
                );
            }
            default:
                return null;
        }
    };

    return (
        <div className={style.selectedStory}>
            <h1>Your current story</h1>
            <h3>Name of you agent:</h3>
            {agent.name ? <h2>{agent.name}</h2> : <p>Give agent a name</p>}
            <h3>Observation space:</h3>
            {agent.type ? <>{showObservation(agent.type)}</> : <p>select agent</p>}
            <Separator />
            <h3>Your Environment:</h3>
            {environment.name ? <h2>{environment.name}</h2> : <p>select agent</p>}

            <img src="images/environments/potsAndBurglar.png" />
        </div>
    );
}
