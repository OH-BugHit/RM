import GameButton from '../../../components/Buttons/GameButton/GameButton';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import { useAtom } from 'jotai';
import { LodStateAtom } from '../../../atoms/uiState';
import { AnimatePresence, motion } from 'framer-motion';
import { RefObject } from 'react';
import { GridImperativeAPI } from 'react-window';

interface TableControlsProps {
    gridRef: RefObject<GridImperativeAPI | null>;
}
export default function TableControls({ gridRef }: TableControlsProps) {
    const [lod, setLod] = useAtom(LodStateAtom);
    const handlePrevious = () => {
        const grid = gridRef.current;
        grid?.scrollToCell({
            behavior: 'smooth',
            columnAlign: 'center',
            rowAlign: 'center',
            columnIndex: 0,
            rowIndex: 1,
        });
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
