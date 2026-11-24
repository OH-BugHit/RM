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
import { LoadedGame } from '../../../../../../utils/types';
import LoadEnv from '../LoadEnv/LoadEnv';
import { loadMissingImagesFromEmojis } from '../../../../../../utils/import';
import { ActiveViewAtom } from '../../../../../../atoms/uiState';
import { useViewNavigation } from '../../../../../../hooks/useViewNavigation';
import { Dialog } from '@mui/material';

export default function SelectChallenge() {
    const games = useAtomValue(studentGamesAtom);
    const view = useAtomValue(ActiveViewAtom);
    const { goToView } = useViewNavigation();
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
            setControls((old) => {
                return { isRunning: false, takeStep: !old.takeStep, isFast: false };
            });
            goToView({ sub: null });
        } else {
            console.error('Error selecting the tournament game.');
        }
    };

    return (
        <Dialog
            open={view.sub === 'selectChallenge'}
            onClose={() => goToView({ sub: null })}
            maxWidth="lg"
            scroll="paper"
            fullWidth
        >
            <div className={style.main}>
                <div className={style.content}>
                    <h2>Select Game</h2>
                    <div className={style.levelList}>
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
                    <div className={style.actions}>
                        <LoadEnv />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                goToView({ sub: null });
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
