import style from './style.module.css';
import GameButton from '../../../components/Buttons/GameButton/GameButton';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import { useAtomValue } from 'jotai';
import { LodStateAtom } from '../../../atoms/uiState';
import { WorldStore } from '../../../components/QTable/utils';
import L from 'leaflet';
import { StateData } from '../../../types';

interface TableControlsProps {
    mapRef: React.RefObject<L.Map | null>;
    world: WorldStore;
    currentStateRef: React.RefObject<StateData>;
    layerRef: React.RefObject<L.GridLayer | null>;
}

export default function TableControls({ mapRef, world, currentStateRef, layerRef }: TableControlsProps) {
    const lod = useAtomValue(LodStateAtom);
    const handlePrevious = () => {
        if (lod === 1) return;
        const map = mapRef.current;
        if (!map) return;

        const pos = world.statePos.get(currentStateRef.current.current);
        if (!pos) return;

        const p = L.point((pos.x + 0.5) * 256, (pos.y + 0.5) * 256);
        map.unproject(p, 14);
        map.setView(map.unproject(p, 14), 14, { animate: true });
        layerRef.current?.redraw();
    };

    return (
        <div className={style.controlsContainer}>
            <GameButton
                title="Show current state"
                onClick={handlePrevious}
                disabled={lod === 1}
                variant="outlined"
            >
                <CenterFocusWeakIcon
                    fontSize="large"
                    color="primary"
                />
            </GameButton>
        </div>
    );
}
