import style from './style.module.css';

import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DeveloperBoardOffIcon from '@mui/icons-material/DeveloperBoardOff';
import BrushIcon from '@mui/icons-material/Brush';

import { JSX, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import {
    DesignOpenAtom,
    HideHudAtom,
    CurrentTileToolAtom,
    StoryStepAtom,
    TilePropsAtom,
    UiHelpAtom,
    SetupVisibleAtom,
    StoryProgressAtom,
} from '../../atoms/uiState';
import { SidePanelButton, SidePanelContent } from './SidePanelButtons/SidePanelButton';
import FloatingButton from './SidePanelButtons/FloatingButton';
import SideButtonMenu from './SidePanelButtons/SideButtonMenu';
import { AnimatePresence, motion } from 'framer-motion';
import PropToolIcon from '../../views/Story/Selectors/EnvironmentSelector/Prop/PropTool/PropToolIcon';
import CreateTile from './SidePanelButtons/CreateTile';
import Arrow from '../HelperArrow/Arrow';

const iconStyle = {
    width: '3rem',
    height: '3rem',
    padding: '0.5rem',
};

export function SidePanelOpener() {
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
    const [drawMenuOpen, setDrawMenuOpen] = useState(false);
    const separated = settingsMenuOpen;
    const setOpen = useSetAtom(SetupVisibleAtom);
    const [uiHelp, setUiHelp] = useAtom(UiHelpAtom);
    const currentStep = useAtomValue(StoryStepAtom);
    const tiles = useAtomValue(TilePropsAtom);
    const [selectedTool, setSelectedTool] = useAtom(CurrentTileToolAtom);
    const setDesignOpen = useSetAtom(DesignOpenAtom);
    const setHideHud = useSetAtom(HideHudAtom);
    const helperArrow = useAtomValue(UiHelpAtom);
    const setProgress = useSetAtom(StoryProgressAtom);

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

    const progressTutorial = () => {
        if (currentStep === 11) {
            setProgress((old) => {
                return {
                    ...old,
                    design: { ...old.design, closed: true },
                };
            });
        }
    };

    const toggleSettingsMenu = () => {
        if (settingsMenuOpen) {
            setSettingsMenuOpen(false);
            setDesignOpen(false);
            setHideHud(false);
            setSelectedTool(undefined);
            setDrawMenuOpen(false);
            progressTutorial();
            return;
        }
        setDrawMenuOpen(false);
        setSettingsMenuOpen(true);
    };

    const toggleDrawMenu = () => {
        if (drawMenuOpen) {
            setDrawMenuOpen(false);
            setSelectedTool(undefined);
            setDesignOpen(false);
            setHideHud(false);
            progressTutorial();
            return;
        }
        setUiHelp((old) => {
            return {
                ...old,
                designMenu: false,
            };
        });
        setDesignOpen(true);
        setDrawMenuOpen(true);
        setHideHud(true);
        setOpen({ visible: false, content: undefined });
    };

    const openPanel = (content: SidePanelContent) => {
        setOpen({
            visible: true,
            content,
        });

        setUiHelp((old) => ({
            ...old,
            sideOpener: undefined,
        }));
    };

    return (
        <AnimatePresence mode="popLayout">
            <div className={style.backgroundWrap}>
                <motion.div
                    className={style.background}
                    initial={false}
                    animate={{
                        scaleX: separated ? 1 : 0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 220,
                        damping: 24,
                    }}
                />
            </div>
            <>
                <FloatingButton
                    position="top"
                    open={separated}
                    onClick={toggleSettingsMenu}
                >
                    {helperArrow.devMenu && (
                        <Arrow
                            radius={110}
                            angle={180}
                        />
                    )}
                    {settingsMenuOpen ? (
                        <DeveloperBoardOffIcon style={iconStyle} />
                    ) : (
                        <DeveloperBoardIcon style={iconStyle} />
                    )}
                </FloatingButton>
            </>

            <SideButtonMenu
                open={settingsMenuOpen && !drawMenuOpen}
                position="right"
                design={
                    <FloatingButton
                        position="bottom"
                        open={drawMenuOpen}
                        onClick={toggleDrawMenu}
                        disabled={currentStep < 5}
                    >
                        {helperArrow.designMenu && (
                            <Arrow
                                radius={110}
                                angle={180}
                            />
                        )}
                        <BrushIcon style={iconStyle} />
                    </FloatingButton>
                }
                designShown={settingsMenuOpen}
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
            </SideButtonMenu>

            <SideButtonMenu
                open={drawMenuOpen}
                position="bottom"
            >
                <CreateTile />
                {tiles.map((tile) => (
                    <PropToolIcon
                        key={tile.id}
                        tile={tile}
                        selected={tile === selectedTool}
                        disabled={false}
                    />
                ))}
            </SideButtonMenu>
        </AnimatePresence>
    );
}
