import style from './tournament.module.css';
import Scoreboard from '../../../../Scoreboard/Scoreboard';
import TournamentEnvironmentWrapper from './Environment/TournamentEnvironmentWrapper';
import SelectChallenge from './SelectChallenge/SelectChallenge';
import { Button } from '@mui/material';
import { useViewNavigation } from '../../../../../hooks/useViewNavigation';
import { useTranslation } from 'react-i18next';

export default function Tournament() {
    const { goToView } = useViewNavigation();
    const { t } = useTranslation();

    return (
        <div className={style.container}>
            <SelectChallenge />
            <div className={style.title}>
                <h1>{t('teacher.tournament.play.title')}</h1>
                <div className={style.buttons}>
                    <Button
                        onClick={() => goToView({ sub: 'selectChallenge' })}
                        style={{ borderRadius: '2rem' }}
                        variant="contained"
                    >
                        {t('teacher.tournament.play.selectChallenge')}
                    </Button>
                </div>
            </div>

            <div className={style.content}>
                <div className={style.leaderboard}>
                    <Scoreboard />
                </div>
                <div className={style.environment}>
                    <TournamentEnvironmentWrapper />
                </div>
            </div>
        </div>
    );
}
