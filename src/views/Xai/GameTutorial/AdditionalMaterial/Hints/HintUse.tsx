import style from '../style.module.css';
import { CellSave } from '../../../../../utils/types';
import { useTranslation } from 'react-i18next';
import { PropsWithChildren } from 'react';

export default function HintUse({ children }: PropsWithChildren) {
    const { t } = useTranslation();
    const plus1 = new Map<string, CellSave>();

    const cell: CellSave = {
        type: 6,
        emoji: '',
        image: '/images/assets/smallTreasure_260.png',
    };
    const key = cell.image || cell.emoji;
    plus1.set(key, cell);

    return (
        <div className={style.container}>
            <div className={style.hintNext}>
                <em>{t(`levels.common.hintUse`)}</em>
                <div
                    inert
                    className={style.hintContent}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
