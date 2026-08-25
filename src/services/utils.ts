import { SetStateAction } from 'jotai';
import { StudentData, TopThreeResults } from '../types';

interface TopScoreProps {
    levelName: string;
    studentId: string;
    score: number | 'delete';
    topScores: TopThreeResults;
    setTopScores: (args_0: SetStateAction<TopThreeResults>) => void;
    studentData?: StudentData;
}
// Utility to clone a canvas and its contents
export function updateTopScores({ levelName, studentId, score, topScores, setTopScores, studentData }: TopScoreProps) {
    const currentTop = topScores.scores.get(levelName);
    if (score === 'delete') {
        // If some result is deleted, count new topScores. Takes N-number (number of students) of steps but neccessary.
        if (!studentData) return; // safe
        const newTopScore = {
            bestScore: null as { studentId: string; score: number } | null,
            secondScore: null as { studentId: string; score: number } | null,
            thirdScore: null as { studentId: string; score: number } | null,
        };
        for (const [studentId, studentScores] of studentData.students) {
            const labelScore = studentScores.data.get(levelName);

            if (!labelScore || labelScore.score === null) {
                continue;
            }

            const entry = { studentId, score: labelScore.score ? labelScore.score : 0 };

            if (!newTopScore.bestScore || entry.score > newTopScore.bestScore.score) {
                newTopScore.thirdScore = newTopScore.secondScore;
                newTopScore.secondScore = newTopScore.bestScore;
                newTopScore.bestScore = entry;
            } else if (!newTopScore.secondScore || entry.score > newTopScore.secondScore.score) {
                newTopScore.thirdScore = newTopScore.secondScore;
                newTopScore.secondScore = entry;
            } else if (!newTopScore.thirdScore || entry.score > newTopScore.thirdScore.score) {
                newTopScore.thirdScore = entry;
            }
        }
        setTopScores((old) => {
            const newScores = new Map(old.scores);
            newScores.set(levelName, newTopScore);
            return { scores: newScores };
        });
        return; // delete not done for top scores, could be implemeted here. If so, add call to if (data.data.image === 'delete') part
    }
    if (currentTop === undefined) {
        setTopScores((old) => {
            const newScores = new Map(old.scores);
            newScores.set(levelName, {
                bestScore: { score: score, studentId: studentId },
                secondScore: null,
                thirdScore: null,
            });
            return { scores: newScores };
        });
    } else {
        // Something is saved already for this classification term
        if (currentTop.thirdScore !== null && currentTop.thirdScore.score > score) {
            // No need to check if score is lower than top three
            return;
        }
        if (currentTop.bestScore === null || score > currentTop.bestScore.score) {
            // New best score
            if (currentTop.bestScore?.studentId === studentId) {
                // Same student improved his own best score
                currentTop.bestScore.score = score;
            } else {
                currentTop.thirdScore = currentTop.secondScore;
                currentTop.secondScore = currentTop.bestScore;
                currentTop.bestScore = { score: score, studentId: studentId };
            }
        } else if (currentTop.secondScore === null || score > currentTop.secondScore.score) {
            // New second score
            if (currentTop.secondScore?.studentId === studentId && currentTop.bestScore?.studentId !== studentId) {
                // Same student improved his own second score and is not best score holder and Update only if student is not already ranked higher
                currentTop.secondScore.score = score;
            } else {
                currentTop.thirdScore = currentTop.secondScore;
                currentTop.secondScore = { score: score, studentId: studentId };
            }
        } else if (currentTop.thirdScore === null || score > currentTop.thirdScore.score) {
            // New third score
            if (currentTop.bestScore?.studentId !== studentId && currentTop.secondScore?.studentId !== studentId) {
                // Update only if student is not already ranked higher
                currentTop.thirdScore = { score: score, studentId: studentId };
            }
        }
        setTopScores((old) => {
            const newScores = new Map(old.scores);
            newScores.set(levelName, {
                bestScore: currentTop.bestScore,
                secondScore: currentTop.secondScore,
                thirdScore: currentTop.thirdScore,
            });
            return { scores: newScores };
        });
    }
}
