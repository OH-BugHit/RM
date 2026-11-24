import style from './style.module.css';
import Leaderboard from './Leaderboard/Leaderboard';

interface ScoreboardProps {
    dialog?: boolean;
}

export default function Scoreboard({ dialog = false }: ScoreboardProps) {
    return (
        <div className={style.scoreboard}>
            <Leaderboard dialog={dialog} />
        </div>
    );
}
