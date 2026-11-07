import { useAtomValue } from 'jotai';
import { studentGamesAtom } from '../../../../../atoms/state';
import style from './bTournament.module.css';
import LevelPreview from '../../../../../components/Dialogs/LevelPreview/LevelPreview';
import { LoadedGame } from '../../../../../utils/types';
import { renderWorldPreview } from '../../../../../components/EnvironmentRender/renderWorldPreview';
import { useTranslation } from 'react-i18next';

export default function BuildTournament() {
    const {t} = useTranslation()

    const games = useAtomValue(studentGamesAtom);

    const createPreview = async (game: LoadedGame) => {
        const canvas = await renderWorldPreview(game.game.world);
        return canvas.toDataURL();
    };

    return (
        <div className={style.content}>
            <ul className={style.buildInformation}>
                <li>
                    <b>{t('teacher.tournament.build.tipTitle.1')}</b>
                    <em>{t('teacher.tournament.build.tipText.1')}</em>
                </li>
                <li>
                    <b>{t('teacher.tournament.build.tipTitle.2')}</b>
                    <em>{t('teacher.tournament.build.tipText.2')}</em>
                </li>
                <li>
                    <b>{t('teacher.tournament.build.tipTitle.3')}</b>
                    <em>{t('teacher.tournament.build.tipText.3')}</em>
                </li>
                <li>
                    <b>{t('teacher.tournament.build.tipTitle.4')}</b>
                    <em>{t('teacher.tournament.build.tipText.4')}</em>
                </li>
                <li>
                    <b>{t('teacher.tournament.build.tipTitle.5')}</b>
                    <em>{t('teacher.tournament.build.tipText.5')}</em>
                </li>
                <li>
                    <b>{t('teacher.tournament.build.tipTitle.6')}</b>
                    <em>{t('teacher.tournament.build.tipText.6')}</em>
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
