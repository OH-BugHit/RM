import { useEffect, useState } from 'react';
import { Button } from '@genai-fi/base';
import style from './orientation.module.css';

interface OrientationPromptProps {
    onReady?: () => void;
}

const SMALL_SCREEN = 600;

interface Viewport {
    width: number;
    height: number;
}

export function OrientationPrompt({ onReady }: OrientationPromptProps) {
    const [viewport, setViewport] = useState<Viewport>(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
    }));

    const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

    useEffect(() => {
        const updateViewport = () => {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            updateViewport();
        };

        window.addEventListener('resize', updateViewport);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        updateViewport();

        return () => {
            window.removeEventListener('resize', updateViewport);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const shortSide = Math.min(viewport.width, viewport.height);

    const isSmallScreen = shortSide < SMALL_SCREEN;
    const isPortrait = viewport.height > viewport.width;

    const needsOrientation = isSmallScreen && isPortrait;
    const needsFullscreen = isSmallScreen && !isPortrait && !isFullscreen;

    const isReady = !needsOrientation && !needsFullscreen;

    useEffect(() => {
        if (isReady) {
            onReady?.();
        }
    }, [isReady, onReady]);

    if (isReady) {
        return null;
    }

    const handleFullscreen = async () => {
        try {
            await document.documentElement.requestFullscreen();
        } catch {
            console.warn('No fullscreen');
        }

        try {
            const orientation = screen.orientation as ScreenOrientation & {
                lock?: (orientation: string) => Promise<void>;
            };

            if (orientation.lock) {
                await orientation.lock('landscape');
            }
        } catch {
            console.warn('No orientation lock');
        }
    };

    return (
        <div className={style.overlay}>
            <div className={style.content}>
                {needsOrientation ? (
                    <>
                        <div className={style.icon}>↔</div>

                        <h1>Rotate to landscape</h1>

                        <p>Please rotate your device to landscape mode to continue.</p>
                    </>
                ) : (
                    <>
                        <div className={style.icon}>⛶</div>

                        <h1>Enter fullscreen</h1>

                        <p>Fullscreen mode is required to continue.</p>

                        <Button
                            onClick={handleFullscreen}
                            variant="contained"
                        >
                            Enter fullscreen
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
