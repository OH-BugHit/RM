import style from './style.module.css';
import { getQColor } from '../../../utils/common';

interface Props {
    qvalueRef?: React.RefObject<number[]>;
    actionValues?: number[];
}
function QValues({ qvalueRef, actionValues }: Props) {
    if (qvalueRef) {
        const qValues = qvalueRef.current;
        const maxQ = Math.max(...qValues);
        const minQ = Math.min(...qValues);
        return (
            <div className={style.qValuesContainer}>
                <div style={{ textAlign: 'center', background: getQColor(qvalueRef.current[4], minQ, maxQ) }}>
                    bark: {qvalueRef.current[4]?.toFixed(1)}
                </div>
                <div />
                <div />
                <div />
                <div style={{ textAlign: 'center', background: getQColor(qvalueRef.current[0], minQ, maxQ) }}>
                    ↑ {qvalueRef.current[0]?.toFixed(1)}
                </div>
                <div />

                <div style={{ textAlign: 'center', background: getQColor(qvalueRef.current[2], minQ, maxQ) }}>
                    ← {qvalueRef.current[2]?.toFixed(1)}
                </div>
                <div style={{ textAlign: 'center', background: getQColor(qvalueRef.current[5], minQ, maxQ) }}>
                    • {qvalueRef.current[5]?.toFixed(1)}
                </div>
                <div style={{ textAlign: 'center', background: getQColor(qvalueRef.current[3], minQ, maxQ) }}>
                    → {qvalueRef.current[3]?.toFixed(1)}
                </div>

                <div />
                <div style={{ textAlign: 'center', background: getQColor(qvalueRef.current[1], minQ, maxQ) }}>
                    ↓ {qvalueRef.current[1]?.toFixed(1)}
                </div>
                <div />
            </div>
        );
    } else if (actionValues) {
        const qValues = actionValues;
        const maxQ = Math.max(...qValues);
        const minQ = Math.min(...qValues);
        return (
            <div className={style.qValuesContainer}>
                <div style={{ textAlign: 'center', background: getQColor(actionValues[4], minQ, maxQ) }}>
                    bark: {actionValues[4]?.toFixed(1)}
                </div>
                <div />
                <div />
                <div />
                <div style={{ textAlign: 'center', background: getQColor(actionValues[0], minQ, maxQ) }}>
                    ↑ {actionValues[0]?.toFixed(1)}
                </div>
                <div />

                <div style={{ textAlign: 'center', background: getQColor(actionValues[2], minQ, maxQ) }}>
                    ← {actionValues[2]?.toFixed(1)}
                </div>
                <div style={{ textAlign: 'center', background: getQColor(actionValues[5], minQ, maxQ) }}>
                    • {actionValues[5]?.toFixed(1)}
                </div>
                <div style={{ textAlign: 'center', background: getQColor(actionValues[3], minQ, maxQ) }}>
                    → {actionValues[3]?.toFixed(1)}
                </div>

                <div />
                <div style={{ textAlign: 'center', background: getQColor(actionValues[1], minQ, maxQ) }}>
                    ↓ {actionValues[1]?.toFixed(1)}
                </div>
                <div />
            </div>
        );
    }
}

export default QValues;
