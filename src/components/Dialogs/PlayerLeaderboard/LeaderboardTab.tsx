import style from './style.module.css';
import Scoreboard from '../../../views/Scoreboard/Scoreboard';

export default function LeaderboardTab() {
    return (
        <div className={style.scoreboard}>
            <Scoreboard dialog />
        </div>
    );
}
