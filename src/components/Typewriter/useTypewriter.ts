import { useEffect, useState } from 'react';

export function useTypewriter(text: string, speed = 30, startDelay = 0) {
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        setVisibleCount(0);

        let timeoutId: number;

        const typeNext = (index: number) => {
            setVisibleCount(index);

            if (index < text.length) {
                timeoutId = window.setTimeout(() => {
                    typeNext(index + 1);
                }, speed);
            }
        };

        timeoutId = window.setTimeout(() => {
            typeNext(1);
        }, startDelay);

        return () => window.clearTimeout(timeoutId);
    }, [text, speed, startDelay]);

    return visibleCount;
}
