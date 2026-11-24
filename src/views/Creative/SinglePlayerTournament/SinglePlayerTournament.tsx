import { useState } from 'react';
import StartBox from '../../../components/StartBox/StartBox';
import style from './singleTournament.module.css';
import { useNavigate } from 'react-router-dom';

export default function SinglePlayerTournamentStart() {
    const [inputCode, setInputCode] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(false);
    const navigate = useNavigate();

    const onReady = (action: 'create' | 'join') => {
        if (action === 'create') {
            toCreate();
            return;
        }
        toJoin();
    };

    const toJoin = () => {
        setDisabled(true);
        navigate(`/join/${inputCode}/main?view=join`);
    };

    const toCreate = () => {
        setDisabled(true);
        navigate(`/host/?view=users`);
    };

    return (
        <main className={style.siteContainer}>
            <StartBox
                onReady={onReady}
                type={'single'}
                inputCode={inputCode}
                setInputCode={setInputCode}
                disabled={disabled}
            />
            <div className={style.selectGroup}></div>
        </main>
    );
}
