import { useEffect } from 'react';
import { useTypewriter } from './useTypewriter';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    startDelay?: number;
    onComplete?: () => void;
}

export default function TypewriterText({ text, speed = 30, startDelay = 0, onComplete }: TypewriterTextProps) {
    const visibleCount = useTypewriter(text, speed, startDelay);

    useEffect(() => {
        if (visibleCount >= text.length && text.length > 0) {
            onComplete?.();
        }
    }, [visibleCount, text, onComplete]);

    return (
        <span>
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    style={{
                        visibility: index < visibleCount ? 'visible' : 'hidden',
                    }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
}
