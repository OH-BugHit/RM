import style from '../style.module.css';
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { TextErrors, ViewEnum } from '../../../../types';
import Separator from '../../../../components/Separator/Separator';
import { useAtom, useSetAtom } from 'jotai';
import { ActiveAgentAtom } from '../../../../atoms/state';
import AgentSelector from './AgentSelector';
import ObservationSelector from './ObservationSelector';
import { ActiveViewAtom } from '../../../../atoms/uiState';
import { useNavigate } from 'react-router';

export default function AgentIndex() {
    const { t } = useTranslation();
    const [errors, setErrors] = useState<TextErrors>({});
    const setActiveAgent = useSetAtom(ActiveAgentAtom);
    const [selectedAgent, setSelectedAgent] = useAtom(ActiveAgentAtom);
    const setActiveView = useSetAtom(ActiveViewAtom);
    const navigate = useNavigate();

    const goNext = () => {
        setActiveView((old) => {
            return { ...old, sub: 'environment' };
        });
        const params = new URLSearchParams(location.search);

        params.set(ViewEnum.Subview, 'environment');

        navigate(`${location.pathname}?${params.toString()}`, {
            replace: false,
        });
    };

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
            <Separator />
            <AgentSelector />
            <Separator />
            <ObservationSelector
                selectedAgent={selectedAgent}
                setSelectedAgent={setActiveAgent}
            />
            <div className={style.selectorContainer}>
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
                    margin="normal"
                />
            </div>
            <Separator />
            {!errors.username && selectedAgent.name && selectedAgent.observationShape && selectedAgent.img && (
                <Button onClick={goNext}>Go next</Button>
            )}
        </div>
    );
}
