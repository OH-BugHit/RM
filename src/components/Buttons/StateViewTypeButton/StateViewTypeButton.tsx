import { useAtom } from 'jotai';
import { ObsViewTypeAtom, QmapViewTypeAtom } from '../../../atoms/uiState';
import AndroidIcon from '@mui/icons-material/Android';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { IconButton } from '@mui/material';

interface StateViewTypeProps {
    screen: 'observation' | 'qMap';
    disabled?: boolean;
}
export default function StateViewTypeButton({ screen }: StateViewTypeProps) {
    const atom = screen === 'observation' ? ObsViewTypeAtom : QmapViewTypeAtom;
    const [viewType, setStateViewType] = useAtom(atom);

    return (
        <IconButton
            title={viewType === 'sprite' ? 'Actual state' : 'Visualized state'}
            onClick={() =>
                setStateViewType(() => {
                    if (viewType === 'sprite') return 'agent';
                    return 'sprite';
                })
            }
            color="secondary"
        >
            {viewType === 'sprite' ? <AndroidIcon fontSize="small" /> : <ImageOutlinedIcon />}
        </IconButton>
    );
}
