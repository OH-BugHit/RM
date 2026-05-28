import DrawObservation from '../../Observation/DrawObservation';
import style from '../style.module.css';
import { useTranslation } from 'react-i18next';

export default function EnvironmentsC() {
    const { t } = useTranslation();

    return (
        <div className={style.conceptContent}>
            <h1>{t('story.environment.title')}</h1>
            <div className={style.separator} />
            <div className={style.textSection}>
                <h3>What is Environment</h3>
                <p>
                    According to Stefano and colleagues (2024), in reinforcement learning, the environment refers to the
                    setting in which the agent operates. The environment may be physical or virtual. It defines the
                    possible actions available to the agent and provides observations and rewards to the agent. An
                    observation represents the state of the environment at a particular moment in time. The observation
                    received by the agent may also be partial (Kaelbling et al., 1998). According to Richard S. Sutton
                    and Andrew G. Barto (1998), the boundary between the environment and the agent consists of the
                    variables under the agent's control. Personally, I find the boundary easiest to understand when
                    approached from the perspective of programming the agent and the environment. According to the
                    guidelines of the Farama Foundation (2024), the environment defines the agent's available actions
                    and observation space. The agent can only influence which actions it selects from the given action
                    space. Therefore, the processes related to action selection belong to the agent, while everything
                    else, including reward definition, belongs to the environment. In a game, the environment consists
                    of the game field in which players (agents) move and perform their other actions. The state of the
                    environment includes, among other things, the agent's location on the game field as x and y
                    coordinates. The environment also contains a game timer, and the episode ends when the allotted time
                    runs out.
                </p>
            </div>
            <h3>Example environment</h3>
            <ul className={style.exampleContainer}>
                <img
                    width={400}
                    src="images/environments/potsAndBurglar.png"
                />
            </ul>
            <h3>Examples of partial observation, two sizes:</h3>
            <ul className={style.exampleContainer}>
                <DrawObservation
                    state="0101-1"
                    disabled={false}
                    actionValues={[0.12, -0.5, 0.16, -0.5, -0.46, -0.4]}
                    type={'robodog'}
                    drawActions={false}
                />

                <DrawObservation
                    state="10020000201021100222-1"
                    disabled={false}
                    actionValues={[0.8, -0.47, -0.44, -0.5, -0.42, -0.4]}
                    type="adventurer"
                    drawActions={false}
                />
            </ul>
            <div className={style.separator} />
        </div>
    );
}
