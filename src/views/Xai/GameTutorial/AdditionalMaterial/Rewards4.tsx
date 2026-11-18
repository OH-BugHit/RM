import style from './style.module.css';
import InfoRow from '../../../../components/Dialogs/LevelPopup/InfoRow';
import { CellSave } from '../../../../utils/types';

export default function Rewards4() {
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
            <div
                className={style.content}
                style={{ width: '120px' }}
            >
                <InfoRow
                    title={'+1'}
                    nodes={plus1}
                    backgroundColour="rgba(211, 255, 129, 0.2)"
                    invert
                />
            </div>
        </div>
    );
}
