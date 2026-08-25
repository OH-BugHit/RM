import { useEffect, useState } from 'react';
import style from './level.module.css';
import { renderWorldPreview } from '../../../../components/EnvironmentRender/renderWorldPreview';
import { Level } from '../../../../types';
import { useAtomValue } from 'jotai';
import { studentResultsAtom } from '../../../../atoms/state';

interface LevelItemProps {
    level: Level;
    selected?: boolean;
    score?: boolean;
}

export default function LevelItem({ level, selected = false, score = true }: LevelItemProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [studentScore, setStudentScore] = useState<number>(0);
    const results = useAtomValue(studentResultsAtom);

    useEffect(() => {
        const loadPreview = async () => {
            try {
                const canvas = await renderWorldPreview(level.level.game.world);
                const previewUrl = canvas.toDataURL();
                setPreview(previewUrl);
            } catch (err) {
                console.error(err);
                setPreview(null);
            }
        };

        loadPreview();
    }, [level]);

    useEffect(() => {
        const topScore = results.data.get(level.level.manifest.gameName);

        if (topScore?.score) {
            setStudentScore(topScore.score);
        }
    }, [results, level]);

    return (
        <div className={`${style.level} ${selected ? style.selected : style.notSelected}`}>
            <div className={style.previewSection}>
                {preview ? (
                    <>
                        <h3>{level.level.manifest.gameName}</h3>

                        <img
                            src={preview}
                            alt={level.level.manifest.gameName}
                        />

                        {score && (
                            <div className={style.score}>
                                Highscore: <b>{studentScore}</b>
                            </div>
                        )}
                    </>
                ) : (
                    <div className={style.emptyPreview}>No selection</div>
                )}
            </div>
        </div>
    );
}
