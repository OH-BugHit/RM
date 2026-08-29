import { useAtom } from 'jotai';
import { ObsViewTypeAtom, QmapViewTypeAtom } from '../../../atoms/uiState';
import GameButton from '../GameButton/GameButton';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

interface StateViewTypeProps {
    screen: 'observation' | 'qMap';
    disabled?: boolean;
}
export default function StateViewTypeButton({ screen }: StateViewTypeProps) {
    const atom = screen === 'observation' ? ObsViewTypeAtom : QmapViewTypeAtom;
    const [viewType, setStateViewType] = useAtom(atom);

    return (
        <GameButton
            title={viewType === 'sprite' ? 'Actual state' : 'Visualized state'}
            onClick={() =>
                setStateViewType(() => {
                    if (viewType === 'sprite') return 'agent';
                    return 'sprite';
                })
            }
        >
            {viewType === 'sprite' ? <SmartToyIcon /> : <ImageOutlinedIcon />}
        </GameButton>
    );
}
