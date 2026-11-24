import style from './tournament.module.css';
import Scoreboard from '../../../../Scoreboard/Scoreboard';
import TournamentEnvironmentWrapper from './Environment/TournamentEnvironmentWrapper';
import SelectChallenge from './SelectChallenge/SelectChallenge';

export default function Tournament() {
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
        </div>
    );
}
