import { useAtomValue, useSetAtom } from 'jotai';
import { StoryProgressAtom, TopbarAtom } from '../../../atoms/uiState';
import { EpisodicDataAtom } from '../../../atoms/gameState';
import { useEffect } from 'react';

export default function GameProgressBridge() {
    const setProgress = useSetAtom(StoryProgressAtom);
    const episodeData = useAtomValue(EpisodicDataAtom);
    const score = useAtomValue(TopbarAtom);

    useEffect(() => {
        if (episodeData) {
            if (episodeData?.triggered > 0) {
                setProgress((old) => {
                    return {
                        ...old,
                        gamePlay: {
                            ...old.gamePlay,
                            goal: true,
                        },
                    };
                });
            }
        }
    }, [episodeData, setProgress]);

    useEffect(() => {
        setProgress((old) => {
            return {
                ...old,
                gamePlay: {
                    ...old.gamePlay,
                    noTrapsCollected: old.gamePlay.lockProgress || score.traps === 0,
                    treasureCollected: old.gamePlay.lockProgress || score.treasures > 0,
                    bigTreasureCollected: old.gamePlay.lockProgress || score.bigTreasures > 0,
                    newHighScore: score.topScore > score.toBeat,
                    lockProgress:
                        (old.gamePlay.newHighScore || score.topScore > score.toBeat) &&
                        score.bigTreasures > 0 &&
                        score.treasures > 0 &&
                        score.traps === 0,
                },
            };
        });
    }, [score, setProgress]);

    return null;
}
