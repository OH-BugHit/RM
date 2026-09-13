import React from 'react';
import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import TypeOption from '../TypeOption';
import { BASIC_CELL_TYPE_OPTIONS, CellType } from '../../../types';
import { useGameScale } from '../../../context/GameScale/useGameScale';
import { Help } from '@genai-fi/base';

interface TypeOptionsProps {
    selectedType: CellType | 'background' | null;
    onSelectType: (type: CellType | 'background') => void;
    allowedTypes: Set<CellType>;
    hint: Set<CellType | 'background'>;
}

function TypeOptions({ selectedType, onSelectType, allowedTypes, hint }: TypeOptionsProps) {
    const { t } = useTranslation();
    const { s } = useGameScale();

    return (
        <div className={style.typeOptionContainer}>
            <div className={style.titleRow}>
                <div className={style.stripes}></div>
                <h1
                    className={style.title}
                    style={{ padding: `0 ${s(2)}rem ${s(8)}px` }}
                >
                    {t('import.titles.tileType')}
                </h1>
                <div className={style.stripes}></div>
            </div>

            <div className={style.optionContainer}>
                <div className={style.helpMessage}>
                    <span>
                        <Help
                            inplace
                            message={t('import.messages.selectType')}
                        />
                    </span>
                </div>
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
