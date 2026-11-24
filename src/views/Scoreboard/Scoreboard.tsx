import style from './style.module.css';
import Leaderboard from './Leaderboard/Leaderboard';

export default function Scoreboard() {
    return (
        <div className={style.scoreboard}>
            <Leaderboard />
        </div>
    );
}
