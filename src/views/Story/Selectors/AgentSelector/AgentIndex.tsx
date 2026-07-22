import style from '../style.module.css';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { TextErrors } from '../../../../types';
import Separator from '../../../../components/Separator/Separator';
import { useAtom, useSetAtom } from 'jotai';
import { ActiveAgentAtom, ImportedAgentImgAtom } from '../../../../atoms/state';
import AgentSelector from './AgentSelector';
import ObservationSelector from './ObservationSelector';
import { StoryProgressAtom } from '../../../../atoms/uiState';
import ImportDialog from '../../../../components/ImportDialog/ImportDialog';
import { preprocessImageWScale } from '../../../../utils/import';

export default function AgentIndex() {
    const { t } = useTranslation();
    const [errors, setErrors] = useState<TextErrors>({});
    const [selectedAgent, setSelectedAgent] = useAtom(ActiveAgentAtom);
    const [storyProgress, setStoryProgress] = useAtom(StoryProgressAtom);
    const setActiveAgent = useSetAtom(ActiveAgentAtom);
    const setImportedImg = useSetAtom(ImportedAgentImgAtom);

    useEffect(() => {
        setStoryProgress((old) => {
            return {
                ...old,
                agent: { ...old.agent, name: !errors.username && selectedAgent.name.length > 0 },
            };
        });

        if (selectedAgent.img) {
            setStoryProgress((old) => {
                return {
                    ...old,
                    agent: { ...old.agent, img: true },
                };
            });
        }
    }, [errors, selectedAgent, setStoryProgress]);

    useEffect(() => {
        setStoryProgress((old) => {
            return {
                ...old,
                agent: {
                    ...old.agent,
                    opened: true,
                },
            };
        });
    }, [setStoryProgress]);

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
            <h1>{t('createMenu.agent.title')}</h1>
            <em>{t('createMenu.agent.titleDesc')}</em>
            <ImportDialog
                preprocess={preprocessImageWScale}
                onSelect={(image) => {
                    setActiveAgent((old) => ({
                        ...old,
                        type: 'created',
                        img: image,
                    }));
                    setImportedImg(image);
                }}
            />
            <Separator />
            <AgentSelector />
            {storyProgress.agent.img && (
                <>
                    <Separator />
                    <ObservationSelector />
                </>
            )}
            {storyProgress.agent.obsShape && (
                <div className={style.selectorContainer}>
                    <>
                        <Separator />
                        <h3>{t('createMenu.agent.giveName')}</h3>
                        <em>{t('createMenu.agent.giveNameDesc')}</em>
                        <br />
                        <TextField
                            label={t('createMenu.agent.nameInputLabel')}
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
                                errors.username
                                    ? t(`enterUsername.messages.usernameError.${errors.username}`)
                                    : undefined
                            }
                            margin="normal"
                        />
                    </>
                </div>
            )}
            <Separator />
        </div>
    );
}
