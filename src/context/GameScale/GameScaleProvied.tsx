import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { GameScaleContext } from './GameScaleContext';

const DESIGN_HEIGHT = 1080;
const DESIGN_WIDTH = 1940;

const MIN_SCALE = 0.425;
const MAX_SCALE = 1;

const MAX_TILE_SIZE = 70;

interface GameScaleProviderProps {
    children: ReactNode;
}

export function GameScaleProvider({ children }: GameScaleProviderProps) {
    const [viewport, setViewport] = useState(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
    }));

    useEffect(() => {
        const handleResize = () => {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const scale = Math.min(Math.max(viewport.height / DESIGN_HEIGHT, MIN_SCALE), MAX_SCALE);
    const trueScale = viewport.width / DESIGN_WIDTH;

    const scaleWidth = viewport.width / DESIGN_WIDTH;

    const value = useMemo(
        () => ({
            scale,
            scaleWidth,
            trueScale,
            s: (value: number) => value * scale,
            sw: (value: number) => value * scaleWidth,
            maxTile: (
                containerHeight: number,
                rowCount: number,
                containerWidth: number,
                columnCount: number
            ): number => {
                if (
                    !Number.isFinite(containerHeight) ||
                    !Number.isFinite(containerWidth) ||
                    !Number.isFinite(rowCount) ||
                    !Number.isFinite(columnCount) ||
                    containerHeight <= 0 ||
                    containerWidth <= 0 ||
                    rowCount <= 0 ||
                    columnCount <= 0
                ) {
                    return 0;
                }

                return Math.min(MAX_TILE_SIZE,Math.min(containerHeight / rowCount, containerWidth / columnCount));
            },
        }),
        [scale, scaleWidth, trueScale]
    );

    return <GameScaleContext.Provider value={value}>{children}</GameScaleContext.Provider>;
}
