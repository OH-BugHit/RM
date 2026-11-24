import { useNavigate } from 'react-router-dom';
import { useViewNavigation } from '../../../../hooks/useViewNavigation';
import { StudentViews } from '../../../../types';
import style from './main.module.css';
import MenuItem from './MenuItem';
import { useGameScale } from '../../../../context/GameScale/useGameScale';
import SettingsIcon from '@mui/icons-material/Settings';
import ReportIcon from '@mui/icons-material/Report';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Dialog, IconButton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { ActiveViewAtom } from '../../../../atoms/uiState';
import { useTranslation } from 'react-i18next';
import { featureFlagsAtom } from '../../../../atoms/featureState';

interface MainMenuProps {
    mode?: 'single' | 'classroom' | 'singleTournament';
}

export default function MainMenu({ mode = 'single' }: MainMenuProps) {
    const view = useAtomValue(ActiveViewAtom);
    const { t } = useTranslation();
    const { s, scaleWidth, scale } = useGameScale();
    const { goToView } = useViewNavigation();
    const navigate = useNavigate();
    const { allowSingleplayerReportProblem, allowReportProblem } = useAtomValue(featureFlagsAtom);

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
            open={view.overlay === 'menu'}
            onClose={() => goToView({ overlay: null })}
            maxWidth="sm"
            scroll="paper"
            fullWidth
        >
            <div className={style.main}>
                <div className={style.content}>
                    <h1 style={{ fontFamily: 'Tektur', scale: 0.9 }}>{t('common.title')}</h1>
                    {mode === 'single' && (
                        <div
                            className={style.mainActions}
                            style={{ width: `${Math.min(500, scaleWidth * 700)}px` }}
                        >
                            <MenuItem
                                height={s(60)}
                                width={scaleWidth * 260}
                                title={t('menu.items.levels')}
                                onSelect={() => onSelect('levels')}
                            />
                            <MenuItem
                                height={s(60)}
                                width={scaleWidth * 260}
                                title={t('menu.items.recap')}
                                onSelect={() => onSelect('recap')}
                            />
                            <MenuItem
                                height={s(60)}
                                width={scaleWidth * 260}
                                title={t('menu.items.creative')}
                                onSelect={() => onSelect('ownLevels')}
                            />
                        </div>
                    )}

                    <div className={style.secondaryActions}>
                        {mode === 'singleTournament' && (
                            <IconButton
                                sx={{ height: `${s(60)}` }}
                                title={t('settings.titles.leave')}
                                color="primary"
                                onClick={() => navigate('/student/single/main?view=main&overlay=menu')}
                            >
                                <LogoutIcon fontSize={scale < 0.5 ? 'medium' : 'large'} />
                            </IconButton>
                        )}
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
                        {mode === 'single' ||
                            (mode === 'singleTournament' && (
                                <IconButton
                                    sx={{ height: `${s(60)}` }}
                                    title={t('tutorial.actions.goStory')}
                                    color="primary"
                                    onClick={() => onSelect('frontpage')}
                                >
                                    <HomeIcon fontSize={scale < 0.5 ? 'medium' : 'large'} />
                                </IconButton>
                            ))}
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
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
