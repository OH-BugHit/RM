import { useEffect, useRef, useCallback } from 'react';

export function useSound(urls: string[]): () => void {
    const audioContextRef = useRef<AudioContext | null>(null);
    const buffersRef = useRef<AudioBuffer[]>([]);

    useEffect(() => {
        if (audioContextRef.current) return; // luo vain kerran

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;

        const context: AudioContext = new AudioContextClass();
        audioContextRef.current = context;

        Promise.allSettled(
            urls.map((url) =>
                fetch(url)
                    .then((res) => res.arrayBuffer())
                    .then((data) => context.decodeAudioData(data))
            )
        ).then((results) => {
            const validBuffers = results
                .filter((r): r is PromiseFulfilledResult<AudioBuffer> => r.status === 'fulfilled')
                .map((r) => r.value);

            buffersRef.current = validBuffers;
        });
        // EI close() tässä
    }, [urls]);

    const play = useCallback((): void => {
        const context = audioContextRef.current;
        const buffers = buffersRef.current;

        if (!context || buffers.length === 0) {
            console.warn('Audio not ready yet');
            return;
        }

        if (context.state === 'suspended') {
            context.resume();
        }

        const randomBuffer = buffers[Math.floor(Math.random() * buffers.length)];

        const source = context.createBufferSource();
        source.buffer = randomBuffer;
        source.connect(context.destination);
        source.start(0);
    }, []);

    return play;
}
