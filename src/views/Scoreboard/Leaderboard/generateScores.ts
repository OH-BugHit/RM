import { profilePicturesAtom, studentDataAtom } from '../../../atoms/state';

interface StudentScore {
    totalScore: number;
    studentId: string;
    studentPic: string | undefined;
}

/**
 *
 * @param studentData Dataset containing gamedata
 * @param profilePics Profilepics (might not be provided)
 * @param className Selected classifying term to gather scores from or null
 * @returns Scores for selected classifying term or overall scores if null. Sorted by score
 */
export function generateScores(
    studentData: typeof studentDataAtom extends import('jotai').Atom<infer T> ? T : never,
    profilePics: typeof profilePicturesAtom extends import('jotai').Atom<infer T> ? T : never,
    className: string | null
): StudentScore[] {
    const scores: StudentScore[] = [];

    // For each student in studendata
    for (const [studentId, studentScores] of studentData.students.entries()) {
        let studentScore = 0;
        // If result for overall scores, we take overall score
        if (className === null) {
            for (const [, score] of studentScores.data.entries()) {
                studentScore += score.score ? score.score : 0;
            }
        } else {
            // Otherwise we take only score for selected class
            const entry = studentScores.data.get(className);
            studentScore = entry?.score ? entry.score : 0;
        }
        scores.push({
            studentId,
            totalScore: studentScore,
            studentPic: profilePics.get(studentId),
        });
    }

    return scores.sort((a, b) => b.totalScore - a.totalScore);
}
