import React, { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';
import { useAtom, useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import style from './style.module.css';
import { ActiveViewAtom } from '../../../atoms/uiState';
import { IconMenuItem } from '@genai-fi/base';
import { MenuButton } from '../../../components/Buttons/MenuButton';
import { featureFlagsAtom } from '../../../atoms/featureState';
import ReportDialog from '../../../components/ReportDialog/ReportDialog';

function MiscButtons() {
    const { t } = useTranslation();
    const [activeView] = useAtom(ActiveViewAtom);
    const [, setSearchParams] = useSearchParams();
    const [showReportDialog, setShowReportDialog] = useState(false);
    const { allowReportProblem } = useAtomValue(featureFlagsAtom);

    const toMain = () => {
        window.location.href = `/`;
        sessionStorage.clear();
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            {allowReportProblem && (
                <IconMenuItem
                    tooltip={t('app.reportProblemTip')}
                    selected={showReportDialog}
                    fullWidth
                >
                    <MenuButton
                        variant="text"
                        color="inherit"
                        size={'large'}
                        onClick={() => setShowReportDialog(true)}
                    >
                        <ReportIcon fontSize="large" />
                        <p className={style.guidanceTitle}>{t('app.reportProblem')}</p>
                    </MenuButton>
                </IconMenuItem>
            )}
            <IconMenuItem
                tooltip={t('sidePanel.labels.settings')}
                selected={activeView.overlay === 'settings'}
                fullWidth
            >
                <MenuButton
                    style={{}}
                    color="inherit"
                    onClick={() => {
                        setSearchParams((prev) => {
                            prev.set('overlay', 'settings');
                            return prev;
                        });
                    }} // setActiveView((old) => ({ ...old, overlay: 'settings' }))}
                    aria-label={t('sidePanel.aria.settings')}
                    size={'large'}
                    variant="text"
                    fullWidth
                >
                    <SettingsIcon fontSize={'large'} />
                    <p className={style.guidanceTitle}>{t('sidePanel.labels.settings')}</p>
                </MenuButton>
            </IconMenuItem>
            <IconMenuItem
                tooltip={t('sidePanel.labels.exit')}
                selected={false}
                fullWidth
            >
                <MenuButton
                    style={{}}
                    color="inherit"
                    onClick={toMain}
                    aria-label={t('sidePanel.labels.exit')}
                    size={'large'}
                    variant="text"
                    fullWidth
                >
                    <LogoutIcon fontSize={'large'} />
                    <p className={style.guidanceTitle}>{t('sidePanel.labels.exitShort')}</p>
                </MenuButton>
            </IconMenuItem>
            <div style={{ marginBottom: '1rem' }}></div>
            {allowReportProblem && showReportDialog && (
                <ReportDialog
                    open={showReportDialog}
                    onClose={() => setShowReportDialog(false)}
                />
            )}
        </div>
    );
}

export default React.memo(MiscButtons);
