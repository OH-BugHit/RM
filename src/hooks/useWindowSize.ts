import { useEffect, useState } from 'react';

type Size = { width: number; height: number };

const isClient = typeof window !== 'undefined';

let current: Size = {
    width: isClient ? window.innerWidth : 1024,
    height: isClient ? window.innerHeight : 768,
};

const listeners = new Set<(s: Size) => void>();

function notify() {
    listeners.forEach((cb) => cb(current));
}

function handleResize() {
    current = { width: window.innerWidth, height: window.innerHeight };
    notify();
}

if (isClient) {
    // single global listener for the module
    window.addEventListener('resize', handleResize, { passive: true });
}

export function getWindowSize(): Size {
    return current;
}

export function subscribeWindowSize(cb: (s: Size) => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
}

export default function useWindowSize() {
    const [size, setSize] = useState<Size>(current);

    useEffect(() => {
        const unsubscribe = subscribeWindowSize(setSize);
        // ensure state is current on mount
        setSize(current);
        return () => {
            unsubscribe();
        };
    }, []);

    return size;
}
