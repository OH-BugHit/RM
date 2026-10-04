import style from './style.module.css';
import { IconButton, Tooltip } from '@mui/material';
import { useMemo } from 'react';
import { useAtom } from 'jotai';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { useTranslation } from 'react-i18next';
import { configAtom } from '../../../atoms/state';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ActionButtons() {
    const [config, setConfig] = useAtom(configAtom);
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

    const doClick = (action: 'pause' | 'share') => {
        switch (action) {
            case 'pause': {
                setConfig((old) => {
                    return {
                        ...old,
                        pause: !old.pause,
                    };
                });
                break;
            }
            case 'share': {
                params.set('overlay', 'share');
                navigate(`${location.pathname}?${params.toString()}`, { replace: false });
                break;
            }
        }
    };
    return (
        <div className={style.actionContainer}>
            <Tooltip title={config.pause ? t('sidePanel.actions.enableApp') : t('sidePanel.actions.disableApp')}>
                <IconButton
                    onClick={() => doClick('pause')}
                    data-testid="action-button"
                    color={'secondary'}
                    aria-label={config.pause ? t('sidePanel.actions.enableApp') : t('sidePanel.actions.disableApp')}
                >
                    {config.pause ? <PlayArrowIcon /> : <PauseIcon />}
                </IconButton>
            </Tooltip>

            <Tooltip title={t('sidePanel.actions.connectUsers')}>
                <IconButton
                    onClick={() => doClick('share')}
                    data-testid="action-button"
                    aria-label={t('sidePanel.actions.connectUsers')}
                >
                    <QrCode2Icon sx={{ color: 'black' }} />
                </IconButton>
            </Tooltip>
        </div>
    );
}
