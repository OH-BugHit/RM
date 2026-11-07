import { useEffect } from 'react';
import { useTypewriter } from './useTypewriter';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    startDelay?: number;
    onComplete?: () => void;
}
/**
 * Not used anymore
 * @param param0
 * @returns
 */
export default function TypewriterText({ text, speed = 30, startDelay = 0, onComplete }: TypewriterTextProps) {
    const visibleCount = useTypewriter(text, speed, startDelay);

    useEffect(() => {
        if (visibleCount >= text.length && text.length > 0) {
            onComplete?.();
        }
    }, [visibleCount, text, onComplete]);

    return (
        <span style={{ whiteSpace: 'pre-line' }}>
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

interface SampleWriterProps {
    sample: string;
    speed?: number;
    startDelay?: number;
    onComplete?: () => void;
}

export function SampleWriter({ sample, speed = 30, startDelay = 0, onComplete }: SampleWriterProps) {
    const visibleCount = useTypewriter(sample, speed, startDelay);
    const collapsedCount = visibleCount >= sample.length ? sample.length : Math.max(0, visibleCount - 19);

    useEffect(() => {
        if (visibleCount >= sample.length && sample.length > 0) {
            onComplete?.();
        }
    }, [visibleCount, sample, onComplete]);

    return (
        <span style={{ whiteSpace: 'pre-line' }}>
            {collapsedCount > 0 && <span>{sample.slice(0, collapsedCount)}</span>}
            {sample
                .split('')
                .slice(collapsedCount)
                .map((char, index) => {
                    const charIndex = collapsedCount + index;

                    return (
                        <span
                            key={charIndex}
                            style={{ visibility: charIndex < visibleCount ? 'visible' : 'hidden' }}
                        >
                            {char}
                        </span>
                    );
                })}
        </span>
    );
}
