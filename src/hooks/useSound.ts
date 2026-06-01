import { useAtomValue } from 'jotai';
import { useEffect, useRef, useCallback } from 'react';
import { AudioSettingsAtom } from '../atoms/state';

export function useSound(urls: string[]): () => void {
    const audioSettings = useAtomValue(AudioSettingsAtom);
    const audioContextRef = useRef<AudioContext | null>(null);
    const buffersRef = useRef<AudioBuffer[]>([]);
    const gainRef = useRef<GainNode | null>(null);

    useEffect(() => {
        if (!gainRef.current) return;

        gainRef.current.gain.value = audioSettings.volume ?? 1;
    }, [audioSettings.volume]);

    useEffect(() => {
        if (audioContextRef.current) return; // luo vain kerran

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;

        const context: AudioContext = new AudioContextClass();
        audioContextRef.current = context;

        const gain = context.createGain();
        gain.connect(context.destination);
        gainRef.current = gain;

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
        const gain = gainRef.current;

        if (!context || !gain || buffers.length === 0) {
            console.warn('Audio not ready yet');
            return;
        }

        if (context.state === 'suspended') {
            context.resume();
        }

        const buffer = buffers[Math.floor(Math.random() * buffers.length)];

        const source = context.createBufferSource();
        source.buffer = buffer;

        source.connect(gain);
        source.start(0);
    }, []);

    return play;
}
