import style from './style.module.css';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai';
import { UiHelpAtom, UiShowSidePanelAtom } from '../../atoms/uiState';
import Arrow from '../HelperArrow/Arrow';

export function SidePanelOpener() {
    const setOpenSidePanel = useSetAtom(UiShowSidePanelAtom);
    const [uiHelp, setUiHelp] = useAtom(UiHelpAtom);
    if (uiHelp.hideSideOpener) return;

    return (
        <>
            <IconButton
                className={style.icon}
                onClick={() => {
                    setOpenSidePanel(true);
                    setUiHelp((old) => {
                        return {
                            ...old,
                            sideOpener: false,
                        };
                    });
                }}
                size="large"
            >
                {uiHelp.sideOpener && (
                    <Arrow
                        radius={110}
                        angle={180}
                    />
                )}
                {<MenuOpenIcon fontSize="large" />}
            </IconButton>
        </>
    );
}
