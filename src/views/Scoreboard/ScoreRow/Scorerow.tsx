import { useAtomValue } from 'jotai';
import style from './scoreRow.module.css';
import { settingAtom } from '../../../atoms/state';

interface Props {
    index: number;
    student: {
        totalScore: number;
        studentId: string;
        studentPic: string | undefined;
    };
}

/**
 *
 * @param index States the placement on leaderboard (starting at 0)
 * @param student Student's data on scorerow
 * @param term Classifying term that row is assosiated. If null, then it's the overall standings
 * @param setOpenImage For opening images to preview
 * @returns Single student's scores for given term (or overall scores if term is null)
 */
export default function ScoreRow({ index, student }: Props) {
    const settings = useAtomValue(settingAtom);

    /* Structure of the score row:
     *  Position in scores
     *  Student data containing:
     *      Crown if leading
     *      Student profile picture (if available)
     *      Name of the student
     *  Top image (or all top images if no class specified)
     *  Score
     */
    return (
        <>
            <div className={style.leaderboardPlace}>
                <div
                    className={style.infoData}
                    aria-label={`Position ${index + 1}`}
                >
                    {index + 1}
                </div>
            </div>
            <div className={style.scoreRow}>
                <div className={style.studentInfo}>
                    <div className={style.avatarWrapper}>
                        {index === 0 && (
                            <img
                                src="/aiKruunuSmall.png"
                                className={style.crownImg}
                                height="80"
                                alt={''}
                            />
                        )}
                        {student.studentPic && <p>image here</p>}
                    </div>
                    <div
                        className={style.infoData}
                        aria-label={`Student ${student.studentId}`}
                    >
                        {student.studentId}
                    </div>
                </div>
                <div style={{ flexGrow: 1 }} />
                <div className={style.score}>
                    {(settings.limitScoreboard.showAll || index < settings.limitScoreboard.limit) && (
                        <div
                            className={style.infoData}
                            aria-label={`Score ${student.totalScore.toFixed(2)}`}
                        >
                            {student.totalScore.toFixed(2)}
                        </div>
                    )}
                    {!settings.limitScoreboard.showAll && index >= settings.limitScoreboard.limit && (
                        <div className={style.infoData}>???</div>
                    )}
                </div>
            </div>
        </>
    );
}
