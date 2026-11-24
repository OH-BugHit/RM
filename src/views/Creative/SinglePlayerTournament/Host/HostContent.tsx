import style from './hostContent.module.css';
import { useAtomValue } from 'jotai';
import React from 'react';
import UserGrid from '../../../Teacher/TeacherContent/Users/UserGrid/UserGrid';
import { ActiveViewAtom } from '../../../../atoms/uiState';
import HostView from './HostView';
import ScoreSender from '../../../Scoreboard/ScoreSender';

function HostContent() {
    const activeView = useAtomValue(ActiveViewAtom);

    return (
        <div className={style.content}>
            <ScoreSender />
            <>
                {activeView.main === 'users' && (
                    <>
                        <h1>Users</h1>
                        <UserGrid />
                    </>
                )}
                {activeView.main === 'tournamentPlay' && (
                    <>
                        <HostView />
                    </>
                )}
            </>
        </div>
    );
}

export default React.memo(HostContent);
