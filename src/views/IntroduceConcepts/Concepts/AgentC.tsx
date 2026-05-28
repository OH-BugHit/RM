import style from '../style.module.css';
import { useTranslation } from 'react-i18next';

export default function AgentC() {
    const { t } = useTranslation();

    return (
        <div className={style.conceptContent}>
            <h1>{t('story.agents.title')}</h1>
            <div className={style.separator} />
            <div className={style.textSection}>
                <h3>What is agent?</h3>
                <p>
                    In machine learning, an agent refers to an entity that responds to inputs from its environment
                    (Brookshear et al., 2020, p. 576). According to Brookshear and colleagues, an agent can also be a
                    single process that communicates with other processes. Stefano and colleagues (2024) emphasize in
                    their definition that an agent has a goal it seeks to achieve through its actions. An example of an
                    agent is an autonomous robotic vacuum cleaner that learns to optimize its cleaning route based on
                    the layout of an apartment and the obstacles within it. An agent can also refer to a computer game
                    player.
                </p>
            </div>
            <div className={style.separator} />
            <div className={style.exampleContainer}>
                <img
                    width={200}
                    src="images/agents/robo_dog.png"
                />
            </div>
            <div className={style.separator} />
        </div>
    );
}
