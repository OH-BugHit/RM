import style from './tournament.module.css';
import { Button } from '@genai-fi/base';
import Scoreboard from '../../../../Scoreboard/Scoreboard';
import TournamentEnvironmentWrapper from './Environment/TournamentEnvironmentWrapper';
import { useViewNavigation } from '../../../../../hooks/useViewNavigation';
import SelectChallenge from './SelectChallenge/SelectChallenge';

export default function Tournament() {
    const { goToView } = useViewNavigation();
    return (
        <div className={style.container}>
            <SelectChallenge />
            <div className={style.title}>
                <h1>Tournament</h1>
            </div>

            <div className={style.content}>
                <div className={style.leaderboard}>
                    <Scoreboard />
                </div>
                <div className={style.environment}>
                    <TournamentEnvironmentWrapper />
                </div>
            </div>

            <div className={style.buttons}>
                <Button
                    onClick={() => goToView({ sub: 'selectChallenge' })}
                    style={{ borderRadius: '2rem' }}
                    variant="contained"
                >
                    Select Challenge
                </Button>
            </div>
        </div>
    );
}
