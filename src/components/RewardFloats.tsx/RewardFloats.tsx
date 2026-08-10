import style from './style.module.css';
import { motion } from 'framer-motion';
import { FloatItem } from '../../hooks/useRewardFloats';
import { displayReward } from '../../utils/common';

type Props = {
    items: FloatItem[];
    cellSize?: number;
    visible?: boolean;
    onComplete?: (id: number) => void;
};

export default function RewardFloats({ items, cellSize = 40, visible = true, onComplete }: Props) {
    if (!visible) return null;

    return (
        <div style={{ position: 'absolute' }}>
            {items.map((f) =>
                f.active && f.value ? (
                    <motion.div
                        key={f.id + f.key}
                        className={`${f.value > 0 ? style.positive : style.negative}`}
                        style={{
                            left: f.x * cellSize + 30,
                            top: f.y * cellSize - 10,
                        }}
                        initial={{ opacity: 1, y: 0, filter: 'brightness(1)' }}
                        animate={{
                            opacity: [1, 1, 0.4],
                            y: [0, -24, -40],
                            filter: ['brightness(1)', 'brightness(1)', 'brightness(0.4)'],
                            backgroundColor: [
                                'var(--color-backReward)',
                                'var(--color-backReward)',
                                'rgba(17, 34, 51, 0)',
                            ],
                        }}
                        transition={{ duration: 1.2, times: [0, 0.6, 1] }}
                        onAnimationComplete={() => onComplete?.(f.id)}
                    >
                        {displayReward({ value: f.value })}
                    </motion.div>
                ) : null
            )}
        </div>
    );
}
