import style from '../style.module.css';
import { useTranslation } from 'react-i18next';
import SelectorItem from './SelectorItem';
import { Dispatch, useState } from 'react';
import { GameEnvironment, TextErrors } from '../../../types';
import { SetStateAction } from 'jotai';
import { TextField } from '@mui/material';
import EnvironmentControl from '../../Controls/GameSettingsControl';
import WorldSetter from '../../Environments/WorldSetter/WorldSetter';

interface EnvironmentProps {
    selectedEnvironment: GameEnvironment;
    setSelectedEnvironment: Dispatch<SetStateAction<GameEnvironment>>;
    agentName: string;
}
export default function EnvironmentSelector({
    agentName,
    selectedEnvironment,
    setSelectedEnvironment,
}: EnvironmentProps) {
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
            <h1>{t('story.environment.title')}</h1>
            <div className={style.separator} />
            <div className={style.textSection}>
                <h3>Select you Environment</h3>
                <p>Environment is the playground of the agent. You can use premade playing areas or create your own!</p>
            </div>
            <ul className={style.selectorItemContainer}>
                <SelectorItem
                    title="Pots and Burglar"
                    img="images/environments/potsAndBurglar.png"
                    onClick={() => {
                        console.log('selected  potsAndBurglar');
                        setSelectedEnvironment((old) => {
                            return {
                                ...old,
                                type: 'potsAndBurglar',
                            };
                        });
                    }}
                    selected={selectedEnvironment.type === 'potsAndBurglar'}
                    columnChilds={true}
                    children={
                        <p style={{ maxWidth: '400px' }}>
                            {`In Pots and Burglar, ${agentName ? agentName : 'Agents'}'s goal (if rewarded well) is to spook the burglar away while avoiding
                            pots around the floor!`}
                        </p>
                    }
                />
                <SelectorItem
                    title="Treasure Hunter"
                    img="images/agents/adventurer.png"
                    onClick={() => {
                        setSelectedEnvironment((old) => {
                            return {
                                ...old,
                                type: 'treasureHunter',
                            };
                        });
                    }}
                    selected={selectedEnvironment.type === 'treasureHunter'}
                    columnChilds={true}
                    children={
                        <p style={{ maxWidth: '400px' }}>
                            {`In Treasure Hunter, ${agentName ? agentName : 'Agents'}'s goal (if rewarded well) is to gather treasures and escape the area!`}
                        </p>
                    }
                />
            </ul>
            <div className={style.separator} />
            <div className={style.selectorItemContainer}>
                <h3>Give your Environment an epic name: </h3>
                <TextField
                    label={t('story.agent.nameInputLabel')}
                    value={selectedEnvironment.name}
                    sx={{ color: 'white' }}
                    onChange={(e) => {
                        setSelectedEnvironment((old) => {
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
            <EnvironmentControl />
            <div className={style.separator} />
            {selectedEnvironment.type === 'treasureHunter' && (
                <WorldSetter
                    selectedEnvironment={selectedEnvironment}
                    setSelectedEnvironment={setSelectedEnvironment}
                />
            )}
            <div className={style.separator} />
        </div>
    );
}
