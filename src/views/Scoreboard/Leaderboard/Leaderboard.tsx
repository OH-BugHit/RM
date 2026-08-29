import style from './leaderboard.module.css';
import { profilePicturesAtom, studentDataAtom } from '../../../atoms/state';
import { useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ScoreRow from '../ScoreRow/Scorerow';
import { generateScores } from './generateScores';

interface Props {
    className: string | null;
}

export default function Leaderboard({ className }: Props) {
    const { t } = useTranslation();
    const [studentData] = useAtom(studentDataAtom);
    const [profilePics] = useAtom(profilePicturesAtom);

    const scores = generateScores(studentData, profilePics, className);

    return (
        <>
            <div
                className={style.leaderboard}
                role="list"
            >
                <h1>{t('scoreboard.labels.standings')}</h1>

                <AnimatePresence>
                    {scores.map((student, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.7 }}
                            key={student.studentId}
                            className={style.leaderboardItem}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            role="listitem"
                        >
                            <ScoreRow
                                index={index}
                                student={student}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </>
    );
}
