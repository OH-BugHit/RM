import { createContext } from 'react';

export interface GameScaleContextValue {
    scale: number;
    scaleWidth: number;
    trueScale: number;
    s: (value: number) => number;
    sw: (value: number) => number;
}

export const GameScaleContext = createContext<GameScaleContextValue | null>(null);
