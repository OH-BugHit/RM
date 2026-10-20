import { useAtom, useAtomValue, useSetAtom, useStore } from 'jotai';
import style from './selectChallenge.module.css';
import {
    GameControlAtom,
    studentGamesAtom,
    studentGameZipsAtom,
    TournamentFileAtom,
    TournamentGameAtom,
} from '../../../../../../atoms/state';
import LevelPreview from '../../../../../../components/Dialogs/LevelPreview/LevelPreview';
import { createPreview } from '../../../../../../utils/common';
import { Button } from '@genai-fi/base';
import { AnimatePresence, motion } from 'framer-motion';
import { LoadedGame } from '../../../../../../utils/types';
import LoadEnv from '../LoadEnv/LoadEnv';
import { loadMissingImagesFromEmojis } from '../../../../../../utils/import';
import { Dispatch, SetStateAction } from 'react';

interface SelectChallengeProps {
    visible?: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}
export default function SelectChallenge({ visible = true, setVisible }: SelectChallengeProps) {
    const games = useAtomValue(studentGamesAtom);
    const store = useStore();
    const setTournamentFile = useSetAtom(TournamentFileAtom);
    const setControls = useSetAtom(GameControlAtom);
    const [tournamentGame, setTournamentGame] = useAtom(TournamentGameAtom);

    const handleGameChange = async (studentId: string, game: LoadedGame) => {
        const file = store.get(studentGameZipsAtom).students.get(studentId);
        if (file) {
            setTournamentFile(file);
            const grid = game.game.world.map((row) => row.map(loadMissingImagesFromEmojis));
            setTournamentGame({
                ...game,
                game: { envSettings: game.game.envSettings, world: grid },
            });
            setVisible(false);
            setControls((old) => {
                return { isRunning: false, takeStep: !old.takeStep, isFast: false };
            });
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
                        <div style={{ position: 'sticky', top: '0', textAlign: 'right', width: '100%', height: 0 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    setVisible(false);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
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

                            <LoadEnv />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
