import style from './player.module.css';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { profilePictureAtom, studentBouncerAtom, usernameAtom } from '../../../../atoms/state';
import { ActiveViewAtom } from '../../../../atoms/uiState';
import { usePlayerProtocol } from '../../../../services/PlayerProtocol';
import { useLeaveWarning } from '../../../../hooks/useLeaveBlocker';
import ScoreBridge from '../../../StudentView/Student/ScoreBridge';
import MenuIcon from '../../../../components/Buttons/MenuButton/MenuIcon';
import { MENU_AT_TOP } from '../../../../types';
import MessageDisplay from '../../../../components/MessageDisplay/MessageDisplay';
import MainMenu from '../../../StudentView/Student/MainMenu/MainView';
import ReportDialog from '../../../../components/Dialogs/ReportDialog/ReportDialog';
import Settings from '../../../Settings/Settings';
import StudentTournamentWrapper from '../../../StudentView/Student/Tournament/StudentTournamentWrapper';

interface StudentProps {
    serverCode?: string;
}

export default function Player({ serverCode }: StudentProps) {
    const { doRegister, doSendScore } = usePlayerProtocol();
    const username = useAtomValue(usernameAtom);
    const profilePicture = useAtomValue(profilePictureAtom);
    const bouncer = useAtomValue(studentBouncerAtom);
    const sentRef = useRef(false);
    const blockRef = useRef(true);
    const [showError, setShowError] = useState(false);
    const view = useAtomValue(ActiveViewAtom);

    useLeaveWarning(blockRef); // Blocks unintended leaving (refreshing)

    /**
     * Registers first!
     */
    useEffect(() => {
        if (serverCode && !sentRef.current && doRegister && username) {
            doRegister({ username, profilePicture });
            sentRef.current = true;
        }
    }, [doRegister, serverCode, username, profilePicture]);

    /**
     * Kicks user (by teacher) if bouncer.reload is set
     */
    useEffect(() => {
        if (bouncer.reload && serverCode) {
            blockRef.current = false;
            setShowError(true);
            setTimeout(() => {
                window.location.href = `/join/${serverCode}/main`;
            }, 8000);
        }
    }, [bouncer.reload, serverCode]);

    const getMenuButtonPosition = (): 'right' | 'top-right' => {
        if (view.main === 'tournamentPlay') return 'right';
        if (view.sub === 'playLevel') return 'right';
        if (view.main && MENU_AT_TOP.includes(view.main)) return 'top-right';
        return 'right';
    };

    return (
        <div className={style.studentContainer}>
            <ScoreBridge doSendScore={doSendScore} />
            <MenuIcon
                position={getMenuButtonPosition()}
                single
            />
            <MessageDisplay open={showError} />
            <MainMenu mode="singleTournament" />
            <ReportDialog />
            <Settings mode="student" />
            <StudentTournamentWrapper />
        </div>
    );
}
