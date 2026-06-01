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
                f.active ? (
                    <motion.div
                        key={f.id + f.key}
                        style={{
                            position: 'absolute',
                            left: f.x * cellSize + 30,
                            top: f.y * cellSize - 10,
                            pointerEvents: 'none',
                            fontSize: 'xx-large',
                        }}
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 0, y: -40 }}
                        transition={{ duration: 1.2 }}
                        onAnimationComplete={() => onComplete?.(f.id)}
                    >
                        {displayReward({ value: f.value })}
                    </motion.div>
                ) : null
            )}
        </div>
    );
}
