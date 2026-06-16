import style from '../style.module.css';
import { useTranslation } from 'react-i18next';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { TextErrors, ViewEnum } from '../../../../types';
import Separator from '../../../../components/Separator/Separator';
import { useAtom, useSetAtom } from 'jotai';
import { ActiveEnvironmentAtom } from '../../../../atoms/state';
import { ActiveViewAtom } from '../../../../atoms/uiState';
import { useNavigate } from 'react-router';
import EnvironmentSelector from './EnvironmentSelector';

export default function EnvironmentIndex() {
    const { t } = useTranslation();
    const [errors, setErrors] = useState<TextErrors>({});
    const [selectedEnvironment, setSelectedEnvironment] = useAtom(ActiveEnvironmentAtom);
    const setActiveView = useSetAtom(ActiveViewAtom);
    const navigate = useNavigate();

    const goNext = () => {
        setActiveView((old) => {
            return { ...old, sub: 'rewards' };
        });
        const params = new URLSearchParams(location.search);

        params.set(ViewEnum.Subview, 'rewards');

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
            <h1>{t('story.environment.title')}</h1>
            <Separator />
            <EnvironmentSelector />
            <Separator />

            <div className={style.selectorContainer}>
                <h3>Give your environment an epic name: </h3>
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
                    margin="normal"
                />
            </div>
            <Separator />
            {!errors.username && selectedEnvironment.name && selectedEnvironment.type && (
                <Button onClick={goNext}>Go next</Button>
            )}
        </div>
    );
}
