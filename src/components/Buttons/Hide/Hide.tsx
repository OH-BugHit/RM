import { IconButton } from '@mui/material';
import MinimizeIcon from '@mui/icons-material/Minimize';
import MaximizeIcon from '@mui/icons-material/Maximize';
import { HUDvisibility } from '../../../types';
import { useSetAtom } from 'jotai';
import { MinimizeAtom } from '../../../atoms/uiState';

interface HideProps {
    component: keyof HUDvisibility;
    state: boolean;
}
export default function Hide({ component, state }: HideProps) {
    const setMinimize = useSetAtom(MinimizeAtom);

    return (
        <IconButton
            onClick={() => {
                setMinimize((old) => {
                    return {
                        ...old,
                        [component]: !old[component],
                    };
                });
            }}
        >
            {state ? <MaximizeIcon /> : <MinimizeIcon />}
        </IconButton>
    );
}
