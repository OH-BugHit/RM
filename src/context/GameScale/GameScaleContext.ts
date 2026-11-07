import { createContext } from 'react';

export interface GameScaleContextValue {
    scale: number;
    scaleWidth: number;
    trueScale: number;
    s: (value: number) => number;
    sw: (value: number) => number;
    maxTile: (containerHeight: number, rowCount: number, containerWidth: number, columnCount: number) => number;
}

export const GameScaleContext = createContext<GameScaleContextValue | null>(null);
