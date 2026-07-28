import style from '../../../style.module.css';
import { Button } from '@genai-fi/base';
import { useSetAtom } from 'jotai';
import { CurrentTileToolAtom } from '../../../../../../atoms/uiState';
import { TileDefinition } from '../../../../../../types';
import IconButtons from './IconButtons';
import { CELL_TYPE_COLORS } from '../../../../../../utils/defaults';

interface PropRowProps {
    tile: TileDefinition;
    selected?: boolean;
    disabled?: boolean;
}
export default function PropToolIcon({ tile, selected, disabled = false }: PropRowProps) {
    const setSelected = useSetAtom(CurrentTileToolAtom);
    if (tile.image === 'none') return; // Core tiles have 'none' as default image.
    return (
        <Button
            style={{ backgroundColor: CELL_TYPE_COLORS[tile.type] }}
            className={`${style.icon} ${selected ? style.selectedIcon : style.notSelectedIcon}`}
            disabled={disabled}
            onPointerDown={() => setSelected(tile)}
            onClick={() => {
                setSelected(tile);
            }}
        >
            <img
                src={tile.image}
                width={64}
                height={64}
            />
            {selected && <IconButtons />}
        </Button>
    );
}
