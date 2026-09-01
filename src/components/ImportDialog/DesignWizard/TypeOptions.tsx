import React from 'react';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import TypeOption from '../TypeOption';
import { BASIC_CELL_TYPE_OPTIONS, CellType } from '../../../types';

interface TypeOptionsProps {
    selectedType: CellType | 'background' | null;
    onSelectType: (type: CellType | 'background') => void;
    allowedTypes: Set<CellType>;
    hint: Set<CellType | 'background'>;
}

function TypeOptions({ selectedType, onSelectType, allowedTypes, hint }: TypeOptionsProps) {
    const { t } = useTranslation();

    return (
        <div>
            <div className={style.titleRow}>
                <div className={style.stripes}></div>
                <h1 className={style.title}>{t('import.titles.tileType')}</h1>
                <div className={style.stripes}></div>
            </div>
            <div className={style.selectModelMessage}>
                <h2 className={style.columnItem}>{t('import.messages.selectType')}</h2>
            </div>

            <div className={style.optionContainer}>
                {BASIC_CELL_TYPE_OPTIONS.map((type) => (
                    <TypeOption
                        key={type}
                        type={type}
                        selected={selectedType}
                        disabled={!allowedTypes.has(type)}
                        onSelect={onSelectType}
                        hint={hint.has(type)}
                    />
                ))}
            </div>
        </div>
    );
}

export default React.memo(TypeOptions);
