import { useEffect, useRef, useCallback } from 'react';

export function useSound(url: string): () => void {
    const audioContextRef = useRef<AudioContext | null>(null);
    const bufferRef = useRef<AudioBuffer | null>(null);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;

        const context: AudioContext = new AudioContextClass();
        audioContextRef.current = context;

        let isMounted = true;

        fetch(url)
            .then((res) => res.arrayBuffer())
            .then((data) => context.decodeAudioData(data))
            .then((buffer) => {
                if (isMounted) {
                    bufferRef.current = buffer;
                }
            })
            .catch((err) => {
                console.error('Audio load error:', err);
            });

        return () => {
            isMounted = false;
            context.close();
        };
    }, [url]);

    const play = useCallback((): void => {
        const context = audioContextRef.current;
        const buffer = bufferRef.current;

        if (!context || !buffer) return;

        if (context.state === 'suspended') {
            context.resume();
        }

        const source: AudioBufferSourceNode = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start(0);
    }, []);

    return play;
}
