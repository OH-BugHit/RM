import { useAtomValue, useStore } from 'jotai';
import { studentResultsAtom, usernameAtom } from '../../../atoms/state';
import { useEffect, useRef } from 'react';
import { ScoreData, StudentScores } from '../../../types';

interface ScoreBridgeProps {
    doSendScore: ((data: ScoreData) => void) | undefined;
}

export default function ScoreBridge({ doSendScore }: ScoreBridgeProps) {
    const store = useStore();
    const scores = useAtomValue(studentResultsAtom);

    const prevRef = useRef<StudentScores | null>(null);

    useEffect(() => {
        if (!scores) return;

        const previous = prevRef.current;

        if (previous) {
            for (const [levelName, score] of scores.data) {
                const previousScore = previous.data.get(levelName);

                if (previousScore?.score !== score.score && score.score) {
                    const studentId = store.get(usernameAtom);
                    if (doSendScore && studentId && levelName)
                        doSendScore({
                            studentId: studentId,
                            levelName,
                            score: score.score,
                        });
                    break;
                }
            }
        }

        prevRef.current = scores;
    }, [scores, store, doSendScore]);

    return null;
}
