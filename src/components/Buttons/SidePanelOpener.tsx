import style from './style.module.css';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddBoxIcon from '@mui/icons-material/AddBox'; // Border was nice also
import { IconButton } from '@mui/material';
import { useAtom, useAtomValue, useStore } from 'jotai';
import { StoryProgressAtom, StoryStepAtom, UiHelpAtom, UiShowSidePanelAtom } from '../../atoms/uiState';
import { JSX, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DeveloperBoardOffIcon from '@mui/icons-material/DeveloperBoardOff';
import { SidePanelButton, SidePanelContent } from './SidePanelButton/SidePanelButton';

const iconStyle = {
    width: '3rem',
    height: '3rem',
    padding: '0.5rem',
};

const menuVariants = {
    closed: {
        top: '50%',
        y: '-50%',
    },
    open: {
        top: 20,
        y: 0,
    },
};

const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.12,
            staggerChildren: 0.08,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

export function SidePanelOpener() {
    const store = useStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const [open, setOpen] = useAtom(UiShowSidePanelAtom);
    const [uiHelp, setUiHelp] = useAtom(UiHelpAtom);
    const [showButtons, setShowButtons] = useState(false);
    const currentStep = useAtomValue(StoryStepAtom);

    if (uiHelp.hideSideOpener) return null;

    const buttons: {
        value: SidePanelContent;
        icon: JSX.Element;
        disabled: boolean;
    }[] = [
        {
            value: 'agent',
            icon: <SmartToyIcon style={iconStyle} />,
            disabled: currentStep < 0,
        },
        {
            value: 'props',
            icon: <EditSquareIcon style={iconStyle} />,
            disabled: currentStep < 3,
        },
        {
            value: 'world',
            icon: <AddBoxIcon style={iconStyle} />,
            disabled: currentStep < 7,
        },
        {
            value: 'reward',
            icon: <FavoriteBorderIcon style={iconStyle} />,
            disabled: currentStep < 10,
        },
        {
            value: 'settings',
            icon: <RoomPreferencesIcon style={iconStyle} />,
            disabled: currentStep < 14,
        },
    ];

    const toggleMenu = () => {
        if (menuOpen) {
            setShowButtons(false);
            setMenuOpen(false);
        } else {
            setMenuOpen(true);
            setShowButtons(true);
        }
    };

    const openPanel = (content: SidePanelContent) => {
        const progress = store.get(StoryProgressAtom);
        setOpen({
            visible: true,
            content,
        });

        setUiHelp((old) => ({
            ...old,
            sideOpener: undefined,
        }));

        setShowButtons(false);
        if (progress.rewards.closed) {
            toggleMenu();
        }
    };

    return (
        <div className={style.sideOpenerItems}>
            {!open.visible && (
                <>
                    <motion.div
                        className={style.menuButton}
                        variants={menuVariants}
                        animate={menuOpen ? 'open' : 'closed'}
                        transition={{
                            type: 'spring',
                            stiffness: 220,
                            damping: 22,
                        }}
                        onAnimationComplete={() => {
                            if (menuOpen) {
                                setShowButtons(true);
                            }
                        }}
                    >
                        <IconButton
                            className={style.icon}
                            onClick={toggleMenu}
                            size="large"
                        >
                            {menuOpen ? (
                                <DeveloperBoardOffIcon style={iconStyle} />
                            ) : (
                                <DeveloperBoardIcon style={iconStyle} />
                            )}
                        </IconButton>
                    </motion.div>
                    <motion.div
                        className={style.background}
                        initial={false}
                        animate={{
                            scaleX: menuOpen ? 1 : 0,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 220,
                            damping: 24,
                        }}
                    />

                    <AnimatePresence>
                        {showButtons && (
                            <motion.div
                                className={style.buttonList}
                                style={{
                                    y: -90,
                                }}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {buttons.map((button) => (
                                    <SidePanelButton
                                        key={button.value}
                                        className={style.icon}
                                        disabled={button.disabled}
                                        value={button.value}
                                        icon={button.icon}
                                        activeHelp={uiHelp.sideOpener}
                                        onClick={openPanel}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
}
