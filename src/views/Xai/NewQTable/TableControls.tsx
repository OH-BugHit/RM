import GameButton from '../../../components/Buttons/GameButton/GameButton';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import GpsOffIcon from '@mui/icons-material/GpsOff';
import { useAtom, useAtomValue } from 'jotai';
import { LodStateAtom, ZoomLevelAtom } from '../../../atoms/uiState';
import { WorldStore } from '../../../components/QTable/utils';
import L from 'leaflet';
import { StateData } from '../../../types';
import { MoveQmapAtom } from '../../../atoms/gameState';
import StateViewTypeButton from '../../../components/Buttons/StateViewTypeButton/StateViewTypeButton';
import { FocusOverlay } from '../../../components/QTable/FocusOverlay/FocusOverlay';

interface TableControlsProps {
    mapRef: React.RefObject<L.Map | null>;
    lWorld: WorldStore;
    currentStateRef: React.RefObject<StateData>;
    layerRef: React.RefObject<L.GridLayer | null>;
    focusFrameRef: React.RefObject<FocusOverlay | undefined>;
}

export default function TableControls({
    mapRef,
    lWorld: world,
    currentStateRef,
    layerRef,
    focusFrameRef,
}: TableControlsProps) {
    const lod = useAtomValue(LodStateAtom);
    const [mapFollow, setMapFollow] = useAtom(MoveQmapAtom);
    const zoomLevel = useAtomValue(ZoomLevelAtom);
    const handlePrevious = () => {
        if (lod === 1) return;
        const map = mapRef.current;
        if (!map) return;

        const pos = world.statePos.get(currentStateRef.current.current);
        if (!pos) return;

        const p = L.point((pos.x + 0.5) * 256, (pos.y + 0.5) * 256);
        const latlng = map.unproject(p, 14);
        map.setView(latlng, 14, { animate: true });
        if (focusFrameRef.current) focusFrameRef.current.show(latlng, 1000);
        layerRef.current?.redraw();
    };

    return (
        <>
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
            <GameButton
                title={!mapFollow ? 'Move map to current state' : 'Disable moving'}
                onClick={() => setMapFollow(!mapFollow)}
                disabled={lod === 1}
                variant="outlined"
            >
                {!mapFollow ? (
                    <GpsOffIcon
                        fontSize="large"
                        color="primary"
                    />
                ) : (
                    <GpsFixedIcon
                        fontSize="large"
                        color="primary"
                    />
                )}
            </GameButton>
            <StateViewTypeButton
                screen="qMap"
                disabled={zoomLevel < 13}
            />
        </>
    );
}
