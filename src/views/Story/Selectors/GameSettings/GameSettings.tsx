import { useAtom, useSetAtom, useStore } from 'jotai';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { StoryProgressAtom } from '../../../../atoms/uiState';
import { TextErrors } from '../../../../types';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { ActiveEnvironmentAtom } from '../../../../atoms/state';
import Separator from '../../../../components/Separator/Separator';
import { EnvSettingsAtom } from '../../../../atoms/gameState';
import SaveButton from '../../../../components/Buttons/SaveButton/SaveButton';
import { Help } from '@genai-fi/base';

export default function GameSettings() {
    const { t } = useTranslation();
    const setStoryProgress = useSetAtom(StoryProgressAtom);
    const [errors, setErrors] = useState<TextErrors>({});
    const [environment, setEnvironment] = useAtom(ActiveEnvironmentAtom);
    const [envSettings, setEnvsettings] = useAtom(EnvSettingsAtom);
    const store = useStore();

    useEffect(() => {
        setStoryProgress((old) => {
            return {
                ...old,
                settings: {
                    ...old.settings,
                    opened: true,
                },
            };
        });

        return () => {
            const progress = store.get(StoryProgressAtom);
            if (!progress.settings.closed && progress.environment.name) {
                setStoryProgress((old) => {
                    return {
                        ...old,
                        settings: {
                            ...old.settings,
                            closed: true,
                        },
                    };
                });
            }
        };
    }, [store, setStoryProgress]);

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
        <div className={style.wrapper}>
            <div className={style.gameSettings}>
                <h1>{t('createMenu.settings.title')}</h1>
                <Separator />
                <div className={style.selectorContainer}>
                    <Help
                        keepOpen
                        inplace
                        message={t('createMenu.settings.episodeLengthDesc')}
                    >
                        <h3>{t('createMenu.settings.episodeLength')}</h3>
                    </Help>
                    <br />
                    <TextField
                        label={t('createMenu.settings.lengthInputLabel')}
                        type="number"
                        slotProps={{
                            htmlInput: {
                                min: 1,
                                max: 200,
                                step: 1,
                            },
                        }}
                        value={envSettings.generic.env.maxTurns}
                        sx={{ color: 'white' }}
                        onChange={(e) => {
                            setEnvsettings((old) => {
                                return {
                                    ...old,
                                    generic: {
                                        ...old.generic,
                                        env: {
                                            ...old.generic.env,
                                            maxTurns: Number(e.target.value),
                                        },
                                    },
                                };
                            });
                        }}
                        required
                        margin="normal"
                    />
                </div>
                <Separator />
                <div className={style.selectorContainer}>
                    <Help
                        keepOpen
                        inplace
                        message={t('createMenu.settings.nameDesc')}
                    >
                        <h3>{t('createMenu.settings.nameTitle')}</h3>
                    </Help>{' '}
                    <br />
                    <TextField
                        label={t('createMenu.settings.nameInputLabel')}
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
                <Separator />
                <h3>Save</h3>
                <SaveButton />
            </div>
        </div>
    );
}
