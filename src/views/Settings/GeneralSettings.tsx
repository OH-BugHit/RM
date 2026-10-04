import { useAtom } from 'jotai';
import style from './style.module.css';
import { Trans, useTranslation } from 'react-i18next';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import LangSelect from '../../components/LangSelect/LangSelect';
import { settingAtom } from '../../atoms/state';

interface GeneralSettingsProps {
    mode?: 'teacher' | 'student';
}

export default function GeneralSettings({ mode }: GeneralSettingsProps) {
    const { t } = useTranslation();
    const [settings, setSettings] = useAtom(settingAtom);

    return (
        <div className={style.column}>
            <LangSelect />
            <div className={style.spacer} />
            {mode === 'teacher' && (
                <>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={settings.limitScoreboard.showAll}
                                onChange={(_, checked) =>
                                    setSettings((old) => ({
                                        ...old,
                                        limitScoreboard: { limit: old.limitScoreboard.limit, showAll: checked },
                                    }))
                                }
                            />
                        }
                        label={t('settings.labels.showFullScoreboard')}
                    />
                    <div className={style.spacer} />
                    <TextField
                        type="number"
                        disabled={settings.limitScoreboard.showAll}
                        value={settings.limitScoreboard.limit}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setSettings((old) => ({
                                ...old,
                                limitScoreboard: {
                                    limit: parseInt(event.target.value),
                                    showAll: old.limitScoreboard.showAll,
                                },
                            }));
                        }}
                        sx={{ maxWidth: 'fit-content' }}
                        label={
                            <Trans
                                values={{ limit: settings.limitScoreboard.limit }}
                                i18nKey="settings.labels.scoreboardLimit"
                            />
                        }
                        slotProps={{
                            input: {
                                inputProps: {
                                    min: 0,
                                    step: 1,
                                },
                            },
                        }}
                    />
                </>
            )}
        </div>
    );
}
