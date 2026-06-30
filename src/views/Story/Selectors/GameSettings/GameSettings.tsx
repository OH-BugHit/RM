import { useAtom, useSetAtom } from 'jotai';
import style from '../style.module.css';
import { useTranslation } from 'react-i18next';
import { StoryProgressAtom } from '../../../../atoms/uiState';
import { TextErrors } from '../../../../types';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { ActiveEnvironmentAtom } from '../../../../atoms/state';

export default function GameSettings() {
    const { t } = useTranslation();
    const setStoryProgress = useSetAtom(StoryProgressAtom);
    const [errors, setErrors] = useState<TextErrors>({});
    const [environment, setEnvironment] = useAtom(ActiveEnvironmentAtom);

    useEffect(() => {
        setStoryProgress((old) => {
            return {
                ...old,
                rewards: true,
            };
        });
    }, [setStoryProgress]);

    useEffect(() => {
        setStoryProgress((old) => {
            return {
                ...old,
                environment: { ...old.environment, name: !errors.username && environment.name.length > 0 },
            };
        });
    }, [errors, environment, setStoryProgress]);

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
            <h1>{t('story.settings.title')}</h1>
            <p>TODO: Here just slider for episode length</p>
            <p>Last thing to do:.</p>

            <div className={style.selectorContainer}>
                <h3>Give your environment an epic name: </h3>
                <TextField
                    label={t('story.agent.nameInputLabel')}
                    value={environment.name}
                    sx={{ color: 'white' }}
                    onChange={(e) => {
                        setEnvironment((old) => {
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
        </div>
    );
}
