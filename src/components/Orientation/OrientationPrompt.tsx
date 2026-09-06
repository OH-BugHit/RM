import { useEffect, useState } from 'react';
import { Button } from '@genai-fi/base';
import style from './orientation.module.css';

interface OrientationPromptProps {
    onReady?: () => void;
}

const SMALL_SCREEN = 800;

export function OrientationPrompt({ onReady }: OrientationPromptProps) {
    const [isPortrait, setIsPortrait] = useState(window.matchMedia('(orientation: portrait)').matches);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < SMALL_SCREEN);

    const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

    useEffect(() => {
        const orientationQuery = window.matchMedia('(orientation: portrait)');

        const checkState = () => {
            setIsPortrait(orientationQuery.matches);
            setIsSmallScreen(window.innerWidth < SMALL_SCREEN);
            setIsFullscreen(!!document.fullscreenElement);
        };

        const handleOrientationChange = () => {
            setIsPortrait(orientationQuery.matches);
            setIsSmallScreen(window.innerWidth < SMALL_SCREEN);
        };

        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        orientationQuery.addEventListener('change', handleOrientationChange);

        window.addEventListener('resize', checkState);
        document.addEventListener('fullscreenchange', handleFullscreenChange);

        checkState();

        return () => {
            orientationQuery.removeEventListener('change', handleOrientationChange);

            window.removeEventListener('resize', checkState);

            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    const needsOrientation = isSmallScreen && isPortrait;
    const needsFullscreen = isSmallScreen && !isFullscreen;

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
            // No fullscreen
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
