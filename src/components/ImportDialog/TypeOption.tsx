import style from './typeOption.module.css';
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
            className={`${style.typeOption} ${selected === type ? style.activeType : style.types} ${hint ? style.gloss : ''} ${!disabled ? style.enabled : style.disabled}`}
            onClick={() => onSelect(type)}
            disabled={disabled}
        >
            <h3 className={style.buttonTitle}>{t(`common.cell.${type}`)}</h3>
            <div className={style.buttonContent}>
                <em>{t(`wizard.tiles.desc.${type}`)}</em>
            </div>
        </button>
    );
}
