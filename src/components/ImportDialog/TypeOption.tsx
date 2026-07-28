import style from './style.module.css';
import { CellType } from '../../types';
import { useTranslation } from 'react-i18next';

interface TypeOption {
    type: CellType;
    onSelect: (type: CellType) => void;
    selected: CellType | null;
    disabled: boolean;
    hint?: boolean;
}
export default function TypeOption({ type, onSelect, selected, disabled, hint = false }: TypeOption) {
    const { t } = useTranslation();
    return (
        <button
            className={`${selected === type ? style.activeType : style.types} ${hint ? style.gloss : ''} ${!disabled ? style.enabled : ''}`}
            onClick={() => onSelect(type)}
            disabled={disabled}
        >
            {t(`common.cell.${type}`)}
        </button>
    );
}
