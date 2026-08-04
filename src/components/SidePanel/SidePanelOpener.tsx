import style from './style.module.css';

import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DeveloperBoardOffIcon from '@mui/icons-material/DeveloperBoardOff';
import BrushIcon from '@mui/icons-material/Brush';

import { JSX, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { DesignOpenAtom, CurrentTileToolAtom, StoryStepAtom, UiHelpAtom, SetupVisibleAtom } from '../../atoms/uiState';
import { SidePanelButton, SidePanelContent } from './SidePanelButtons/SidePanelButton';
import { AnimatePresence, motion } from 'framer-motion';

import Arrow from '../HelperArrow/Arrow';
import SideButtonGroup from './SidePanelButtons/SideButtonGroup';
import { EnvironmentTypes } from '../../types';

const iconStyle = {
    width: '3rem',
    height: '3rem',
    padding: '0.5rem',
};

export function SidePanelOpener() {
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
    const [opened, setOpen] = useAtom(SetupVisibleAtom);
    const [uiHelp, setUiHelp] = useAtom(UiHelpAtom);
    const setSelectedTool = useSetAtom(CurrentTileToolAtom);
    const setDesignOpen = useSetAtom(DesignOpenAtom);
    const helperArrow = useAtomValue(UiHelpAtom);
    const currentStep = useAtomValue(StoryStepAtom);

    if (uiHelp.hideSideOpener) return null;

    const buttons: {
        value: SidePanelContent;
        icon: JSX.Element;
        disabled: boolean;
        visibleIn: EnvironmentTypes[];
    }[] = [
        {
            value: 'agent',
            icon: <SmartToyIcon style={iconStyle} />,
            disabled: currentStep < 0,
            visibleIn: ['created', 'loaded'],
        },
        {
            value: 'reward',
            icon: <FavoriteBorderIcon style={iconStyle} />,
            disabled: currentStep < 10,
            visibleIn: ['created', 'loaded'],
        },
        {
            value: 'settings',
            icon: <RoomPreferencesIcon style={iconStyle} />,
            disabled: currentStep < 14,
            visibleIn: ['created', 'modify'],
        },
        {
            value: 'design',
            icon: <BrushIcon style={iconStyle} />,
            disabled: currentStep < 5,
            visibleIn: ['created', 'modify'],
        },
    ];

    const toggleSettingsMenu = () => {
        if (settingsMenuOpen) {
            setSettingsMenuOpen(false);
            setDesignOpen(false);
            setSelectedTool(undefined);
            setOpen({
                visible: false,
                content: undefined,
            });
            return;
        }
        setUiHelp((old) => {
            return {
                ...old,
                devMenu: false,
            };
        });
        setSettingsMenuOpen(true);
    };

    const openPanel = (content: SidePanelContent) => {
        if (opened.content === content) {
            setOpen({
                visible: false,
                content: undefined,
            });
            return;
        }
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
                    key={'background'}
                    className={style.background}
                    initial={false}
                    animate={{
                        width: settingsMenuOpen ? '100%' : '0%',
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 220,
                        damping: 24,
                    }}
                />
            </div>
            <SideButtonGroup
                key={'devButton'}
                mode={uiHelp.mode}
                open={settingsMenuOpen}
                onClick={toggleSettingsMenu}
                saveDisabled={currentStep < 44}
                main={
                    <>
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
                    </>
                }
            >
                {buttons
                    .filter((button) => button.visibleIn.includes(uiHelp.mode))
                    .map((button) => (
                        <SidePanelButton
                            key={button.value}
                            className={style.icon}
                            disabled={button.disabled}
                            value={button.value}
                            icon={button.icon}
                            activeHelp={uiHelp.sideOpener}
                            onClick={openPanel}
                            selected={opened.content === button.value}
                        />
                    ))}
            </SideButtonGroup>
        </AnimatePresence>
    );
}
