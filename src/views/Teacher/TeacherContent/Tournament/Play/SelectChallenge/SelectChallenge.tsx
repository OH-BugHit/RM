import { useAtom, useAtomValue, useSetAtom, useStore } from 'jotai';
import style from './selectChallenge.module.css';
import {
    studentGamesAtom,
    studentGameZipsAtom,
    TournamentFileAtom,
    TournamentGameAtom,
} from '../../../../../../atoms/state';
import LevelPreview from '../../../../../../components/ImportDialog/LevelPreview/LevelPreview';
import { createPreview } from '../../../../../../utils/common';
import { Button } from '@genai-fi/base';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadedGame } from '../../../../../../utils/types';

interface SelectChallengeProps {
    visible?: boolean;
}
export default function SelectChallenge({ visible = true }: SelectChallengeProps) {
    const games = useAtomValue(studentGamesAtom);
    const store = useStore();
    const setTournamentFile = useSetAtom(TournamentFileAtom);
    const [tournamentGame, setTournamentGame] = useAtom(TournamentGameAtom);

    const handleGameChange = async (studentId: string, game: LoadedGame) => {
        const file = store.get(studentGameZipsAtom).students.get(studentId);
        if (file) {
            setTournamentFile(file);
            setTournamentGame(game);
        } else {
            console.error('Error selecting the tournament game.');
        }
    };

    return (
        <AnimatePresence mode="popLayout">
            {visible && (
                <motion.div
                    className={style.container}
                    initial={{
                        transform: 'translate(-50%, -20%)',
                        scale: 0.95,
                        opacity: 0,
                    }}
                    animate={{
                        transform: 'translate(-50%, -50%)',
                        scale: 1,
                        opacity: 1,
                    }}
                    exit={{
                        overflow: 'hidden',
                        transform: 'translate(-50%, 0%)',
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.45,
                        ease: 'easeInOut',
                    }}
                >
                    <div className={style.levels}>
                        <h2>Select Game</h2>
                        <div className={style.content}>
                            {Array.from(games.students?.entries() ?? []).map(([studentId, game]) => (
                                <Button
                                    key={studentId}
                                    onClick={() => handleGameChange(studentId, game)}
                                    className={`${style.levelItem} ${game === tournamentGame ? style.active : ''}`}
                                >
                                    <h3>{game.manifest.gameName}</h3>
                                    <LevelPreview
                                        size={180}
                                        preview={createPreview(game)}
                                    />
                                </Button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
