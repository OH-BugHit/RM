import { useAtomValue } from 'jotai';
import { studentGamesAtom } from '../../../../../atoms/state';
import style from './bTournament.module.css';
import LevelPreview from '../../../../../components/ImportDialog/LevelPreview/LevelPreview';
import { LoadedGame } from '../../../../../utils/types';
import { renderWorldPreview } from '../../../../../components/EnvironmentRender/renderWorldPreview';

export default function BuildTournament() {
    const games = useAtomValue(studentGamesAtom);

    const createPreview = async (game: LoadedGame) => {
        const canvas = await renderWorldPreview(game.game.world);
        return canvas.toDataURL();
    };

    return (
        <div className={style.content}>
            <div className={style.buildInformation}>
                <h2>Tips for building title</h2>
                <p>Tips here as text</p>
            </div>
            <div className={style.studentLevels}>
                {Array.from(games.students?.entries() ?? []).map(([studentId, game]) => (
                    <div
                        key={studentId}
                        className={style.levelItem}
                    >
                        <h3>{game.manifest.gameName}</h3>
                        <LevelPreview
                            size={280}
                            preview={createPreview(game)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
