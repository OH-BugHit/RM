import style from '../style.module.css';
import { useTranslation } from 'react-i18next';
import SelectorItem from './SelectorItem';
import { TextField } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import { Agent, TextErrors } from '../../../types';
import DrawObservation from '../../Observation/DrawObservation';

interface AgentProps {
    selectedAgent: Agent;
    setSelectedAgent: Dispatch<SetStateAction<Agent>>;
}
export default function AgentSelector({ selectedAgent, setSelectedAgent }: AgentProps) {
    const { t } = useTranslation();
    const [errors, setErrors] = useState<TextErrors>({});

    const handleSubmit = (e: string) => {
        const trimmed = e.trim();
        const errs: TextErrors = {};

        if (!trimmed) {
            errs.username = 'missing';
        } else if (trimmed.length < 3) {
            errs.username = 'short';
        } else if (trimmed.length > 16) {
            errs.username = 'long';
        } else {
            errs.username = undefined;
        }

        if (!e) {
            errs.type = 'missing';
        }

        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
    };

    return (
        <div className={style.selectorContainer}>
            <h1>{t('story.agents.title')}</h1>
            <div className={style.separator} />
            <div className={style.textSection}>
                <h3>Select your agent</h3>
                <p>
                    Agents have different observation spaces, meaning some agents see further away. Seeing more can help
                    agent to find solutions, but learning is also harder and slower.
                </p>
            </div>
            <ul className={style.selectorItemContainer}>
                <SelectorItem
                    title="Robo-Dog"
                    img="images/agents/robo_dog.png"
                    onClick={() => {
                        console.log('selected  RObodogo');
                        setSelectedAgent((old) => {
                            return {
                                ...old,
                                type: 'robodog',
                            };
                        });
                    }}
                    selected={selectedAgent.type === 'robodog'}
                    children={
                        <DrawObservation
                            state="0101-1"
                            disabled={false}
                            actionValues={[0.12, -0.5, 0.16, -0.5, -0.46, -0.4]}
                            type={'robodog'}
                        />
                    }
                />
                <SelectorItem
                    title="Adventurer"
                    img="images/agents/adventurer.png"
                    onClick={() => {
                        setSelectedAgent((old) => {
                            return {
                                ...old,
                                type: 'adventurer',
                            };
                        });
                    }}
                    selected={selectedAgent.type === 'adventurer'}
                    children={
                        <DrawObservation
                            state="10020000201021100222-1"
                            disabled={false}
                            actionValues={[0.8, -0.47, -0.44, -0.5, -0.42, -0.4]}
                            type="adventurer"
                        />
                    }
                />
            </ul>
            <div className={style.separator} />
            <div className={style.selectorItemContainer}>
                <h3>Give your agent an epic name: </h3>
                <TextField
                    label={t('story.agent.nameInputLabel')}
                    value={selectedAgent.name}
                    sx={{ color: 'white' }}
                    onChange={(e) => {
                        setSelectedAgent((old) => {
                            return {
                                ...old,
                                name: e.target.value,
                            };
                        });
                        handleSubmit(e.target.value);
                    }}
                    required
                    error={!!errors.username}
                    helperText={
                        errors.username ? t(`enterUsername.messages.usernameError.${errors.username}`) : undefined
                    }
                    fullWidth
                    margin="normal"
                />
            </div>
            <div className={style.separator} />
        </div>
    );
}
