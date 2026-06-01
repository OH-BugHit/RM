import { useCallback, useRef, useState } from 'react';

export type FloatItem = {
    id: number;
    active: boolean;
    x: number;
    y: number;
    value: number;
    key: number;
};

type Options = {
    size?: number;
};

export function useRewardFloats({ size = 32 }: Options = {}) {
    const poolRef = useRef<FloatItem[]>(
        Array.from({ length: size }).map((_, i) => ({
            id: i,
            active: false,
            x: 0,
            y: 0,
            value: 0,
            key: 0,
        }))
    );

    const indexRef = useRef(0);

    // renderTrigger
    const [, setTick] = useState(0);

    const forceUpdate = useCallback(() => {
        setTick((v) => v + 1);
    }, []);

    const spawnFloat = useCallback(
        (x: number, y: number, value: number) => {
            const pool = poolRef.current;
            const i = indexRef.current;

            pool[i] = {
                id: i,
                active: true,
                x,
                y,
                value,
                key: Date.now(),
            };

            indexRef.current = (i + 1) % size;
            forceUpdate();
        },
        [forceUpdate, size]
    );

    const deactivate = useCallback(
        (id: number) => {
            const item = poolRef.current[id];
            if (item) item.active = false;
            forceUpdate();
        },
        [forceUpdate]
    );

    return {
        items: poolRef.current,
        spawnFloat,
        deactivate,
    };
}
