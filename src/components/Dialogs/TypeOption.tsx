import style from './typeOption.module.css';
import { CellType } from '../../types';
import { useTranslation } from 'react-i18next';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { useGameScale } from '../../context/GameScale/useGameScale';

interface TypeOption {
    type: CellType;
    onSelect: (type: CellType) => void;
    selected: CellType | null;
    disabled: boolean;
    hint?: boolean;
    sx?: SxProps<Theme>;
}

export default function TypeOption({ type, onSelect, selected, disabled, hint = false, sx }: TypeOption) {
    const { t } = useTranslation();
    const { s, scaleWidth } = useGameScale();

    return (
        <button
            className={`${style.typeOption} ${selected === type ? style.activeType : style.types} ${hint ? style.gloss : ''} ${!disabled ? style.enabled : style.disabled}`}
            onClick={() => onSelect(type)}
            style={{ ...(sx as React.CSSProperties), minHeight: `${s(86)}px`, padding: `${s(8)}px ${14}px` }}
            disabled={disabled}
        >
            <h4
                className={style.buttonTitle}
                style={{ marginLeft: `${scaleWidth * 1}rem` }}
            >
                {t(`common.cell.${type}`)}
            </h4>

            <div
                className={style.buttonContent}
                style={{ paddingLeft: `${Math.min(1, scaleWidth) * 2}rem` }}
            >
                <em>{t(`wizard.tiles.desc.${type}`)}</em>
            </div>
        </button>
    );
}
