import { useEffect, useRef } from 'react';

import { useAtom, useAtomValue } from 'jotai';
import { Fireworks } from './fireworks';
import { FireWorksPulseAtom, TestAgentAtom } from '../../atoms/gameState';

export function FireworksEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fireworksRef = useRef<Fireworks | null>(null);
    const gameState = useAtomValue(TestAgentAtom);
    const [pulse, setPulse] = useAtom(FireWorksPulseAtom);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const fireworks = new Fireworks(canvasRef.current);
        fireworksRef.current = fireworks;

        return () => {
            fireworks.destroy();
            fireworksRef.current = null;
        };
    }, []);

    useEffect(() => {
        if (gameState === 'passed') {
            fireworksRef.current?.fireworkShow(10, 120);
        }
    }, [gameState]);

    useEffect(() => {
        if (pulse.bestScore) {
            fireworksRef.current?.fireworkShow(10, 120);
            setPulse({ highScore: false, bestScore: false });
        } else if (pulse.highScore) {
            fireworksRef.current?.explodeAt(57, 6);
            fireworksRef.current?.explodeAt(60, 4);
        }
    }, [pulse, setPulse]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                zIndex: 999,
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
            }}
        />
    );
}
