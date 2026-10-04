import style from './tournament.module.css';
import ChallengeButton from '../../../../../components/Buttons/ButtonIcons/SelectChallenge/SelectChallengeButton';
import { Button } from '@genai-fi/base';
import { useState } from 'react';
import SelectChallenge from './SelectChallenge/SelectChallenge';
import Scoreboard from '../../../../Scoreboard/Scoreboard';
import TournamentEnvironmentWrapper from './Environment/TournamentEnvironmentWrapper';

export default function Tournament() {
    const [openSelect, setOpenSelect] = useState(false);

    return (
        <div className={style.container}>
            <SelectChallenge
                visible={openSelect}
                setVisible={setOpenSelect}
            />
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
                <Button onClick={() => setOpenSelect((old) => !old)}>
                    <ChallengeButton isOpen={openSelect} />
                </Button>
            </div>
        </div>
    );
}
