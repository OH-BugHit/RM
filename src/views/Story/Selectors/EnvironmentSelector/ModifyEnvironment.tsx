import style from '../style.module.css';
import { useTranslation } from 'react-i18next';
import { IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { TextErrors } from '../../../../types';
import Separator from '../../../../components/Separator/Separator';
import { useAtom, useSetAtom } from 'jotai';
import { ActiveEnvironmentAtom } from '../../../../atoms/state';
import { StoryProgressAtom } from '../../../../atoms/uiState';
import PropTool from './Prop/PropTool/PropTool';
interface EnvModeProps {
    goHome: () => void;
}
export default function ModifyEnvironment({ goHome }: EnvModeProps) {
    const { t } = useTranslation();
    const [errors, setErrors] = useState<TextErrors>({});
    const [environment, setEnvironment] = useAtom(ActiveEnvironmentAtom);
    const setStoryProgress = useSetAtom(StoryProgressAtom);

    useEffect(() => {
        setStoryProgress((old) => {
            return {
                ...old,
                environment: {
                    ...old.environment,
                    modifyOpened: true,
                },
            };
        });
        return () =>
            setStoryProgress((old) => {
                return {
                    ...old,
                    environment: {
                        ...old.environment,
                        modifyOpened: false,
                    },
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
            <IconButton onClick={goHome}>prev</IconButton>
            <div className={style.textSection}>
                <h3>Alter your environment!</h3>
                <p>You can resize your world by clicking on the edges of your world.</p>
                <p>You can change bordering tiles style, but they always have to be "Solid"-type.</p>
            </div>
            <PropTool />
            <div className={style.selectorContainer}>
                <h3>Lastly, give your environment an epic name: </h3>
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
            <Separator />
        </div>
    );
}
