import style from './style.module.css';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { LargeButton } from '@genai-fi/base';
import { availableUsernamesAtom, configAtom, takenUsernamesAtom, usernameAtom } from '../../../../atoms/state';
import { useViewNavigation } from '../../../../hooks/useViewNavigation';

interface Props {
    onReady: () => void;
}

export interface RegisterFormErrors {
    username?: 'missing' | 'long' | 'short' | 'takenFree' | 'taken';
    image?: 'missing';
}

export default function EnterUserInfo({ onReady }: Props) {
    const { t } = useTranslation();
    const [users] = useAtom(availableUsernamesAtom);
    const [takenUsernames] = useAtom(takenUsernamesAtom);
    const [showRestore, setShowRestore] = useState(false);
    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [username, setUsername] = useAtom(usernameAtom);
    const [config] = useAtom(configAtom);
    const { goToView } = useViewNavigation();

    const onUsername = async (name: string) => {
        setUsername(name);
        onReady();
        goToView({
            main: 'main',
        });
    };

    const handleSubmit = () => {
        const trimmed = username.trim();
        const errs: RegisterFormErrors = {};

        if (!trimmed) {
            errs.username = 'missing';
        } else if (trimmed.length < 3) {
            errs.username = 'short';
        } else if (trimmed.length > 16) {
            errs.username = 'long';
        } else if (users.find((u) => u.username === trimmed)) {
            errs.username = 'takenFree';
        } else if (takenUsernames.find((u) => u.username === trimmed)) {
            errs.username = 'taken';
        }

        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        onUsername(trimmed);
    };

    const handleSelect = (e: SelectChangeEvent) => {
        const name = e.target.value;
        const item = users.find((u) => u.username === name);
        if (item) {
            setErrors((prev) => ({ ...prev, username: undefined }));
            onUsername(e.target.value);
        }
    };

    return (
        <>
            {config && (
                <div className={style.noPicContainer}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div className={style.textField}>
                            <TextField
                                autoFocus
                                label={t('enterUsername.labels.enterUsername')}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                error={!!errors.username}
                                helperText={
                                    errors.username
                                        ? t(`enterUsername.messages.usernameError.${errors.username}`)
                                        : undefined
                                }
                                fullWidth
                                margin="normal"
                                autoComplete="username"
                            />
                        </div>

                        <LargeButton
                            type="submit"
                            variant="contained"
                        >
                            {t('enterUsername.actions.enterUser')}
                        </LargeButton>
                    </form>
                    <div className={style.restore}>
                        {!showRestore && (
                            <IconButton
                                onClick={() => setShowRestore(true)}
                                className={style.restoreButton}
                            >
                                <em>Return to Game</em>
                                <RestoreIcon />
                            </IconButton>
                        )}

                        {showRestore && (
                            <Select
                                value=""
                                onChange={handleSelect}
                                displayEmpty
                                fullWidth
                            >
                                {users.map((u) => (
                                    <MenuItem
                                        key={u.username}
                                        value={u.username}
                                    >
                                        {u.username}
                                    </MenuItem>
                                ))}
                            </Select>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
