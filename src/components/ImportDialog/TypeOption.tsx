import style from './typeOption.module.css';
import { CellType } from '../../types';
import { useTranslation } from 'react-i18next';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { InnerFillCellAtom } from '../../atoms/gameState';
import { useAtomValue } from 'jotai';

interface TypeOption {
    type: CellType | 'background';
    onSelect: (type: CellType | 'background') => void;
    selected: CellType | null | 'background';
    disabled: boolean;
    hint?: boolean;
    sx?: SxProps<Theme>;
}
export default function TypeOption({ type, onSelect, selected, disabled, hint = false, sx }: TypeOption) {
    const { t } = useTranslation();
    const innerTile = useAtomValue(InnerFillCellAtom);

    return (
        <button
            className={`${style.typeOption} ${selected === type ? style.activeType : style.types} ${hint ? style.gloss : ''} ${!disabled ? style.enabled : style.disabled}`}
            onClick={() => onSelect(type)}
            style={sx as React.CSSProperties}
            disabled={disabled}
        >
            {type !== 'background' && <h3 className={style.buttonTitle}>{t(`common.cell.${type}`)}</h3>}
            <div className={style.buttonContent}>
                <em>{t(`wizard.tiles.desc.${type}`)}</em>
                {type === 'background' && (
                    <>
                        <em>Current:</em>
                        <img
                            src={innerTile.image ? innerTile.image : innerTile.emoji}
                            height={40}
                        />
                    </>
                )}
            </div>
        </button>
    );
}
