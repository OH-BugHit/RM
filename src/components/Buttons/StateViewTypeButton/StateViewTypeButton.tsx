import { useAtom, useAtomValue } from 'jotai';
import { ObsViewTypeAtom, QmapViewTypeAtom, StoryStepAtom } from '../../../atoms/uiState';
import GameButton from '../GameButton/GameButton';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

interface StateViewTypeProps {
    screen: 'observation' | 'qMap';
    disabled?: boolean;
}
export default function StateViewTypeButton({ screen, disabled = false }: StateViewTypeProps) {
    const atom = screen === 'observation' ? ObsViewTypeAtom : QmapViewTypeAtom;
    const [viewType, setStateViewType] = useAtom(atom);
    const storyDisable = useAtomValue(StoryStepAtom);

    return (
        <GameButton
            title={viewType === 'sprite' ? 'Actual state' : 'Visualized state'}
            disabled={disabled || storyDisable < 23}
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
