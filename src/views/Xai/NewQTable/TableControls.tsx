import GameButton from '../../../components/Buttons/GameButton/GameButton';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import { useAtom } from 'jotai';
import { LodStateAtom } from '../../../atoms/uiState';
import { AnimatePresence, motion } from 'framer-motion';
import { WorldStore } from '../../../components/QTable/utils';
import L from 'leaflet';

interface TableControlsProps {
    mapRef: React.RefObject<L.Map | null>;
    world: WorldStore;
    currentStateRef: React.RefObject<string>;
    layerRef: React.RefObject<L.GridLayer | null>;
}

export default function TableControls({ mapRef, world, currentStateRef, layerRef }: TableControlsProps) {
    const [lod, setLod] = useAtom(LodStateAtom);
    const handlePrevious = () => {
        if (lod === 1) return;
        const map = mapRef.current;
        if (!map) return;

        const pos = world.statePos.get(currentStateRef.current);
        if (!pos) return;

        const p = L.point((pos.x + 0.5) * 256, (pos.y + 0.5) * 256);
        map.unproject(p, 14);
        map.setView(map.unproject(p, 14), 14, { animate: true });
        layerRef.current?.redraw();
    };

    const handleLodChange = () => {
        setLod((old) => {
            if (old === 1) return 2;
            return 1;
        });
    };

    const Icon = lod === 1 ? ZoomInMapIcon : ZoomOutMapIcon;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                position: 'relative',
                justifyContent: 'center',
                gap: '5%',
            }}
        >
            <GameButton
                title="Center Qtable"
                onClick={handlePrevious}
                disabled={lod === 1}
                variant="outlined"
            >
                <CenterFocusWeakIcon
                    fontSize="large"
                    color="primary"
                />
            </GameButton>
            <AnimatePresence mode="wait">
                <GameButton
                    title={lod === 1 ? 'Zoom in' : 'Zoom out'}
                    onClick={handleLodChange}
                    variant="outlined"
                >
                    <motion.div
                        key={lod}
                        style={{ display: 'flex' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <Icon
                            fontSize="large"
                            color="primary"
                        />
                    </motion.div>
                </GameButton>
            </AnimatePresence>
        </div>
    );
}
