import style from './style.module.css';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { IconButton } from '@mui/material';
import { useSetAtom } from 'jotai';
import { UiShowSidePanelAtom } from '../../atoms/uiState';

export function SidePanelOpener() {
    const setOpenSidePanel = useSetAtom(UiShowSidePanelAtom);
    return (
        <IconButton
            className={style.icon}
            onClick={() => setOpenSidePanel(true)}
            size="large"
        >
            {<MenuOpenIcon fontSize="large" />}
        </IconButton>
    );
}
