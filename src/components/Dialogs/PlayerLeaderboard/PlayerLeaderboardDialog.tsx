import style from './style.module.css';
import { Dialog, DialogActions, DialogContent, IconButton, Tab, Tabs } from '@mui/material';
import { useCallback, useState } from 'react';
import { Button } from '@genai-fi/base';
import { useTranslation } from 'react-i18next';
import { ActiveViewAtom } from '../../../atoms/uiState';
import { useAtom, useAtomValue } from 'jotai';
import { useLocation, useNavigate } from 'react-router-dom';
import LeaderboardTab from './LeaderboardTab';
import TournamentStatus from './TournamentStatus';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { useGameScale } from '../../../context/GameScale/useGameScale';
import { useViewNavigation } from '../../../hooks/useViewNavigation';
import { featureFlagsAtom } from '../../../atoms/featureState';
import { StudentViews } from '../../../types';

interface ReportDialogProps {
    onClose?: () => void;
}

export default function PlayerLeaderboardDialog({ onClose = () => {} }: ReportDialogProps) {
    const { t } = useTranslation();
    const { s, scale } = useGameScale();
    const [activeView, setActiveView] = useAtom(ActiveViewAtom);
    const [tabNumber, setTabNumber] = useState(0);
    const { goToView } = useViewNavigation();
    const navigate = useNavigate();
    const location = useLocation();
    const { allowSingleplayerReportProblem, allowReportProblem } = useAtomValue(featureFlagsAtom);

    const doClose = useCallback(() => {
        onClose();
        const params = new URLSearchParams(location.search);
        params.delete('overlay');
        const search = params.toString();

        navigate(search ? `${location.pathname}?${search}` : location.pathname, { replace: false });
        setActiveView((old) => ({ ...old, overlay: undefined }));
    }, [location, navigate, setActiveView, onClose]);

    const onSelect = (item: StudentViews | 'frontpage') => {
        if (item === 'frontpage') {
            navigate('/');
        } else {
            goToView({
                main: item,
                sub: null,
                overlay: null,
            });
        }
    };

    return (
        <Dialog
            open={activeView.overlay === 'tournamentMenu'}
            onClose={doClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogContent className={style.dialogContent}>
                <Tabs
                    value={tabNumber}
                    onChange={(_, value) => setTabNumber(value)}
                    variant="scrollable"
                    scrollButtons="auto"
                    orientation="vertical"
                    sx={{ borderRight: '1px solid #008297' }}
                >
                    <Tab label={t('settings.titles.general')} />
                    <Tab label={t('settings.titles.userGridSettings')} />
                </Tabs>
                {tabNumber === 0 && <LeaderboardTab />}
                {tabNumber === 1 && <TournamentStatus />}
            </DialogContent>
            <DialogActions className={style.actions}>
                <IconButton
                    sx={{ height: `${s(60)}` }}
                    title={t('settings.titles.leave')}
                    color="primary"
                    onClick={() => navigate('/student/single/main?view=main&overlay=menu')}
                >
                    <LogoutIcon fontSize={scale < 0.5 ? 'medium' : 'large'} />
                </IconButton>
                <IconButton
                    sx={{ height: `${s(60)}` }}
                    title={t('settings.titles.settings')}
                    color="primary"
                    onClick={() =>
                        goToView({
                            overlay: 'settings',
                        })
                    }
                >
                    <SettingsIcon fontSize={scale < 0.5 ? 'medium' : 'large'} />
                </IconButton>
                <IconButton
                    sx={{ height: `${s(60)}` }}
                    title={t('tutorial.actions.goStory')}
                    color="primary"
                    onClick={() => onSelect('frontpage')}
                >
                    <HomeIcon fontSize={scale < 0.5 ? 'medium' : 'large'} />
                </IconButton>
                {allowSingleplayerReportProblem && allowReportProblem && (
                    <IconButton
                        sx={{ height: `${s(60)}` }}
                        title={t('app.reportProblemTip')}
                        color="primary"
                        onClick={() => {
                            goToView({
                                overlay: 'report',
                            });
                        }}
                    >
                        <ReportIcon fontSize={scale < 0.5 ? 'medium' : 'large'} />
                    </IconButton>
                )}
                <Button
                    variant="outlined"
                    onClick={doClose}
                >
                    {t('common.close')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
