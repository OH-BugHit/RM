import { useEffect, useState } from 'react';
import style from './style.module.css';

interface GamePreviewProps {
    gameName?: string;
    preview: string | Promise<string> | null;
    size?: number;
}

function LevelPreview({ gameName, preview, size = 96 }: GamePreviewProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        if (!preview) {
            setPreviewUrl(null);
            return;
        }

        Promise.resolve(preview).then((url) => {
            if (!cancelled) {
                setPreviewUrl(url);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [preview]);

    return (
        <div className={style.previewSection}>
            {previewUrl ? (
                <>
                    {gameName && <h4>{gameName}</h4>}
                    <img
                        src={previewUrl}
                        alt="preview"
                        width={size}
                        height={size}
                    />
                </>
            ) : (
                <div className={style.emptyPreview}>No selection</div>
            )}
        </div>
    );
}

export default LevelPreview;
