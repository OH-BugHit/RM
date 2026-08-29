import style from './style.module.css';
import { useState } from 'react';
import ClassSelect from './ClassSelect/ClassSelect';
import Leaderboard from './Leaderboard/Leaderboard';

export default function Scoreboard() {
    const [openResult, setOpenResult] = useState<string | null>(null);

    return (
        <div className={style.scoreboard}>
            <ClassSelect
                openResult={openResult}
                setOpenResult={setOpenResult}
            />
            <Leaderboard className={openResult} />
        </div>
    );
}
