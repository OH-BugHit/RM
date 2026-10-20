import { useNavigate } from 'react-router-dom';
import { useViewNavigation } from '../../../../hooks/useViewNavigation';
import { StudentViews } from '../../../../types';
import style from './main.module.css';
import MenuItem from './MenuItem';
import { useGameScale } from '../../../../context/GameScale/useGameScale';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { Dialog, IconButton } from '@mui/material';
import { useAtomValue } from 'jotai';
import { ActiveViewAtom } from '../../../../atoms/uiState';
import { t } from 'i18next';

interface MainMenuProps {
    mode?: 'single' | 'classroom';
}

export default function MainMenu({ mode = 'single' }: MainMenuProps) {
    const view = useAtomValue(ActiveViewAtom);
    const { s, scaleWidth, scale } = useGameScale();
    const { goToView } = useViewNavigation();
    const navigate = useNavigate();

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
                                title="Levels"
                                onSelect={() => onSelect('levels')}
                            />
                            <MenuItem
                                height={s(60)}
                                width={scaleWidth * 260}
                                title="Recap"
                                onSelect={() => onSelect('recap')}
                            />
                            <MenuItem
                                height={s(60)}
                                width={scaleWidth * 260}
                                title="Create"
                                onSelect={() => onSelect('ownLevels')}
                            />
                        </div>
                    )}

                    <div className={style.secondaryActions}>
                        <IconButton
                            sx={{ height: `${s(60)}` }}
                            title="Settings"
                            color="primary"
                            onClick={() =>
                                goToView({
                                    overlay: 'settings',
                                })
                            }
                        >
                            <SettingsIcon fontSize={scale < 0.5 ? 'medium' : 'large'} />
                        </IconButton>
                        {mode === 'single' && (
                            <IconButton
                                sx={{ height: `${s(60)}` }}
                                title="Home"
                                color="primary"
                                onClick={() => onSelect('frontpage')}
                            >
                                <HomeIcon fontSize={scale < 0.5 ? 'medium' : 'large'} />
                            </IconButton>
                        )}
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
