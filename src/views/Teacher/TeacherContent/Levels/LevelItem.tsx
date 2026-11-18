import { useEffect, useState } from 'react';
import style from './level.module.css';
import { renderWorldPreview } from '../../../../components/EnvironmentRender/renderWorldPreview';
import { Level } from '../../../../types';

interface LevelItemProps {
    level: Level;
    selected?: boolean;
    cellSize?: number;
}

export default function LevelItem({ level, selected = false, cellSize = 40 }: LevelItemProps) {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const loadPreview = async () => {
            try {
                const canvas = await renderWorldPreview(level.level.game.world, cellSize);
                const previewUrl = canvas.toDataURL();
                setPreview(previewUrl);
            } catch (err) {
                console.error(err);
                setPreview(null);
            }
        };

        loadPreview();
    }, [level, cellSize]);

    return (
        <div className={`${style.level} ${selected ? style.selected : style.notSelected}`}>
            <div className={style.previewSection}>
                {preview ? (
                    <>
                        <h3>{level.level.manifest.gameName}</h3>
                        <img
                            src={preview}
                            alt={level.level.manifest.gameName}
                            style={{ pointerEvents: 'none' }}
                        />
                    </>
                ) : (
                    <div className={style.emptyPreview}>Loading...</div>
                )}
            </div>
        </div>
    );
}
