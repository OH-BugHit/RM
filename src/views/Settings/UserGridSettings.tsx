import { useAtom, useStore } from 'jotai';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { Checkbox, FormControlLabel, Slider } from '@mui/material';
import { settingAtom, takenUsernamesAtom } from '../../atoms/state';

/**
 *
 * @returns Settings for user grid view
 */
export default function UserGridSettings() {
    const { t } = useTranslation();
    const [settings, setSettings] = useAtom(settingAtom);

    const store = useStore();

    const autoGrow = (checked: boolean) => {
        const allUNs = store.get(takenUsernamesAtom);

        setSettings((old) => ({
            ...old,
            userGridSettings: {
                ...old.userGridSettings,
                userGridAutoGrow: checked,
                userGridMaxColumns: allUNs.length > 0 ? Math.min(Math.round(allUNs.length / 2) + 3, 16) : 2,
            },
        }));
    };

    return (
        <div className={style.column}>
            <div className={style.spacer} />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={settings.userGridSettings.userGridShowCrowns}
                        onChange={(_, checked) =>
                            setSettings((old) => ({
                                ...old,
                                userGridSettings: {
                                    ...old.userGridSettings,
                                    userGridShowCrowns: checked,
                                },
                            }))
                        }
                    />
                }
                label={t('settings.labels.showCrowns')}
            />
            <div className={style.spacer} />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={settings.userGridSettings.userGridAutoGrow}
                        onChange={(_, checked) => {
                            autoGrow(checked);
                        }}
                    />
                }
                label={t('settings.labels.autoGrow')}
            />
            <div className={style.spacer} />
            <FormControlLabel
                disabled={settings.userGridSettings.userGridAutoGrow}
                style={{ flexDirection: 'column', maxWidth: '80%' }}
                label={t('settings.labels.userGridMaxColumns')}
                control={
                    <Slider
                        value={settings.userGridSettings.userGridMaxColumns}
                        onChange={(_, value) =>
                            setSettings((old) => ({
                                ...old,
                                userGridSettings: {
                                    ...old.userGridSettings,
                                    userGridMaxColumns: value as number,
                                },
                            }))
                        }
                        min={2}
                        max={16}
                    />
                }
            />
        </div>
    );
}
