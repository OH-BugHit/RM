import { IconButton } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import { useSetAtom } from 'jotai';
import { ActiveViewAtom } from '../../../../../../atoms/uiState';

export default function IconButtons() {
    const setActiveView = useSetAtom(ActiveViewAtom);
    const openImport = () => {
        setActiveView((old) => ({ ...old, overlay: 'import' }));
    };

    return (
        <IconButton
            onClick={() => openImport()}
            size="large"
            color="primary"
        >
            <BuildIcon fontSize="large" />
        </IconButton>
    );
}
