import style from './teacherContent.module.css';
import { useAtomValue } from 'jotai';
import { ActiveViewAtom } from '../../../atoms/uiState';
import UserGrid from './Users/UserGrid/UserGrid';
import React from 'react';
import Levels from './Levels/Levels';
import Tournament from './Tournament/Tournament';
import Tutorial from '../../Tutorial/Tutorial';
import BuildTournament from './Tournament/Build/BuildTournament';

function TeacherContent() {
    const activeView = useAtomValue(ActiveViewAtom);

    return (
        <div className={style.content}>
            <>
                {activeView.main === 'users' && (
                    <>
                        <h1>Users</h1>
                        <UserGrid />
                    </>
                )}
                {activeView.main === 'levels' && (
                    <>
                        <h1>Levels</h1>
                        <Levels />
                    </>
                )}
                {activeView.main === 'tournamentBuild' && (
                    <>
                        <h1>Tournament</h1>
                        <BuildTournament />
                    </>
                )}
                {activeView.main === 'tournamentPlay' && (
                    <>
                        <h1>Tournament</h1>
                        <Tournament />
                    </>
                )}
                {activeView.main === 'recap' && <Tutorial />}
            </>
        </div>
    );
}

export default React.memo(TeacherContent);
