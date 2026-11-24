import style from './leaderboard.module.css';
import { profilePicturesAtom, studentDataAtom } from '../../../atoms/state';
import { useAtom } from 'jotai';
import { motion, AnimatePresence } from 'framer-motion';
import ScoreRow from '../ScoreRow/Scorerow';
import { generateScores } from './generateScores';
import ChallengeScoreSelect from '../ClassSelect/ChallengeScoreSelect';
import { useState } from 'react';

interface LeaderboardProps {
    dialog?: boolean;
}

export default function Leaderboard({ dialog = false }: LeaderboardProps) {
    const [studentData] = useAtom(studentDataAtom);
    const [profilePics] = useAtom(profilePicturesAtom);
    const [selected, setSelected] = useState<string>('total-RM-olli');

    const scores = generateScores(studentData, profilePics, selected);

    return (
        <>
            <div
                className={`${style.leaderboard} ${dialog ? '' : style.normal}`}
                role="list"
            >
                <ChallengeScoreSelect
                    openResult={selected}
                    setOpenResult={setSelected}
                />
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
