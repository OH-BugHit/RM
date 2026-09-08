import { useNavigate } from 'react-router-dom';
import { useViewNavigation } from '../../../../hooks/useViewNavigation';
import { StudentViews } from '../../../../types';
import style from './main.module.css';
import MenuItem from './MenuItem';
import { useGameScale } from '../../../../context/GameScale/useGameScale';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { ActiveViewAtom } from '../../../../atoms/uiState';

export default function MainMenu() {
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
        <AnimatePresence>
            {view.overlay === 'menu' && (
                <motion.div
                    className={style.main}
                    initial={{
                        transform: 'translate(-50%, -45%)',
                        opacity: 0,
                    }}
                    animate={{
                        transform: 'translate(-50%, -50%)',
                        opacity: 1,
                    }}
                    exit={{
                        transform: 'translate(-50%, -45%)',
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.25,
                        ease: 'easeInOut',
                    }}
                    style={{
                        height: s(500),
                    }}
                >
                    <div className={style.content}>
                        <h1 style={{ fontFamily: 'Tektur', scale: 0.9 }}>Reward Machine</h1>

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

                        <div className={style.secondaryActions}>
                            <IconButton
                                sx={{ height: `${s(60)}` }}
                                title="Settings"
                                color="primary"
                                onClick={() => onSelect('levels')}
                            >
                                <SettingsIcon fontSize={scale < 0.5 ? 'medium' : 'large'} />
                            </IconButton>
                            <IconButton
                                sx={{ height: `${s(60)}` }}
                                title="Home"
                                color="primary"
                                onClick={() => onSelect('frontpage')}
                            >
                                <HomeIcon fontSize={scale < 0.5 ? 'medium' : 'large'} />
                            </IconButton>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
