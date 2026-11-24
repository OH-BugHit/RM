import style from './style.module.css';
import PlayEnv from './PlayEnv/PlayEnv';
import SinglePlayerTournamentStart from './SinglePlayerTournament/SinglePlayerTournament';
import Separator from '../../components/Separator/Separator';
import { useTranslation } from 'react-i18next';

export default function Creative() {
    const { t } = useTranslation();
    return (
        <main className={style.container}>
            <h1 className={style.header}>{t('playEnv.load.title')}</h1>
            <div className={style.mainContainer}>
                <section className={style.creativeContent}>
                    <SinglePlayerTournamentStart />
                </section>
                <Separator vertical />
                <section className={style.creativeContent}>
                    <PlayEnv />
                </section>
            </div>
        </main>
    );
}
