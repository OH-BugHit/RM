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
            <ul className={style.buildInformation}>
                <li>
                    <b>Consider a problem</b>
                    <em>What would you like your agent to learn to do?</em>
                </li>
                <li>
                    <b>Think about the goal</b>
                    <em>What should the agent try to achieve?</em>
                </li>
                <li>
                    <b>Design the environment</b>
                    <em>What does the world look like? What can the agent see and do?</em>
                </li>
                <li>
                    <b>Plan the rewards</b>
                    <em>What should the agent be rewarded for? What should it avoid?</em>
                </li>
                <li>
                    <b>Build your environment</b>
                    <em>Use the tools to create the world where your agent can learn.</em>
                </li>
                <li>
                    <b>Test your agent</b>
                    <em>Let the agent learn and see if it can solve the problem.</em>
                </li>
            </ul>
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
