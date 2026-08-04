import style from '../../../style.module.css';
import { Button } from '@genai-fi/base';
import { useSetAtom } from 'jotai';
import { CurrentTileToolAtom } from '../../../../../../atoms/uiState';
import { TileDefinition } from '../../../../../../types';
import IconButtons from './IconButtons';
import { CELL_TYPE_COLORS } from '../../../../../../utils/defaults';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface PropRowProps {
    tile: TileDefinition;
    selected?: boolean;
    disabled?: boolean;
}
export default function PropToolIcon({ tile, selected, disabled = false }: PropRowProps) {
    const { t } = useTranslation();
    const setSelected = useSetAtom(CurrentTileToolAtom);
    const [showError, setShowError] = useState(false);
    if (tile.image === 'none') return; // Core tiles have 'none' as default image.
    const handleClick = () => {
        if (disabled) {
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
            return;
        }

        setSelected(tile);
    };
    return (
        <div
            style={{ backgroundColor: CELL_TYPE_COLORS[tile.type] }}
            className={`${style.icon} ${selected ? style.selectedIcon : style.notSelectedIcon} ${disabled ? style.disabled : ''}`}
            key={tile.id}
        >
            {showError && (
                <span
                    style={{
                        position: 'absolute',
                        right: 'calc(100% + 8px)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'red',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {t('progress.help.toolsDisabled')}
                </span>
            )}
            <Button
                aria-disabled={disabled}
                onPointerDown={handleClick}
                onClick={handleClick}
                style={{
                    cursor: disabled ? 'not-allowed' : 'pointer',
                }}
            >
                <img
                    src={tile.image}
                    width={64}
                    height={64}
                />
            </Button>
            {selected && <IconButtons />}
        </div>
    );
}
