import DrawObservation from '../../Observation/DrawObservation';
import style from '../style.module.css';
import { useTranslation } from 'react-i18next';

export default function InteractionC() {
    const { t } = useTranslation();

    return (
        <div className={style.conceptContent}>
            <h1>💰{t('story.interaction.title')}💸</h1>
            <div className={style.separator} />
            <div className={style.textSection}>
                <h3>What is reward?</h3>
                <p>
                    In reinforcement learning, rewards are used in the agent's learning process to help the agent
                    calculate values for different states. The environment provides a reward to the agent for each
                    action. The reward function defines the reward received by the agent. Richard S. Sutton and Andrew
                    G. Barto (1998) note that rewards should be defined according to the achievement of the goal, and
                    the agent should not be told how to achieve that goal. Otherwise, the agent may learn to accomplish
                    something other than the intended objective. In this game, the agent's rewards could be determined,
                    for example, as follows: You receive a reward of +10 if you manage to scare the thief. You receive a
                    reward of -10 if time runs out. You receive a reward of -4 if you break a flower pot. All other
                    states have a reward of 0.
                </p>
            </div>
            <div className={style.separator} />
            <div className={style.textSection}>
                <h3>What is action?</h3>
                <p>
                    An action is a command issued by the agent to the environment (Stefano et al., 2024; Richard S.
                    Sutton & Andrew G. Barto, 1998). Actions can be either continuous or discrete (Stefano et al., 2024;
                    Sutton & Barto, 1998). In this game, the agent's actions consist only of single discrete variable.
                    The actions available to the game agents include moving one step in the x or y direction and
                    producing a scare sound. In this game, the agent can perform only one action per timestep, although
                    performing multiple actions during the same step would also be possible.
                </p>
            </div>
            <ul className={style.exampleContainer}>
                <DrawObservation
                    state="0101-1"
                    disabled={false}
                    actionValues={[0.12, -0.5, 0.16, -0.5, -0.46, -0.4]}
                    type={'robodog'}
                />

                <DrawObservation
                    state="10020000201021100222-1"
                    disabled={false}
                    actionValues={[0.8, -0.47, -0.44, -0.5, -0.42, -0.4]}
                    type="adventurer"
                />
            </ul>
            <div className={style.separator} />
        </div>
    );
}
