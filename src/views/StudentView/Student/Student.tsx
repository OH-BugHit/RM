import style from './student.module.css';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { configAtom, profilePictureAtom, studentBouncerAtom, usernameAtom } from '../../../atoms/state';
import { useLeaveWarning } from '../../../hooks/useLeaveBlocker';
import { useRewardProtocol } from '../../../services/StudentProtocol';
import MessageDisplay from '../../../components/MessageDisplay/MessageDisplay';
import { ActiveViewAtom } from '../../../atoms/uiState';
import Levels from '../Levels/Levels';
import MainMenu from './MainMenu/MainView';
import MenuButton from '../../../components/Buttons/ButtonIcons/OtherIcons/MenuIcon';
import BuildView from '../../BuildView/BuildView';
import StudentTournamentWrapper from './Tournament/StudentTournamentWrapper';
import ScoreBridge from './ScoreBridge';
import PauseLayer from '../../../components/Pause/PauseLayer';

interface StudentProps {
    serverCode?: string;
}

export default function Student({ serverCode }: StudentProps) {
    const { doRegister, doSendEnvironment } = useRewardProtocol();
    const username = useAtomValue(usernameAtom);
    const profilePicture = useAtomValue(profilePictureAtom);
    const bouncer = useAtomValue(studentBouncerAtom);
    const sentRef = useRef(false);
    const blockRef = useRef(true);
    const [showError, setShowError] = useState(false);
    const config = useAtomValue(configAtom);
    const view = useAtomValue(ActiveViewAtom);
    const envStateRef = useRef<string | null>(null);

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
                window.location.href = `/student/${serverCode}/main`;
            }, 8000);
        }
    }, [bouncer.reload, serverCode]);

    return (
        <div className={style.studentContainer}>
            <PauseLayer />
            <ScoreBridge />
            <MenuButton />
            <MessageDisplay open={showError} />
            <MainMenu />
            {config.phase === 'levels' && view.main === 'levels' && <Levels view={view.sub} />}
            {config.phase === 'tournamentBuild' && view.main === 'tournamentBuild' && (
                <BuildView
                    doSendEnvironment={doSendEnvironment}
                    envStateRef={envStateRef}
                />
            )}
            {config.phase === 'tournamentPlay' && view.main === 'tournamentPlay' && <StudentTournamentWrapper />}
        </div>
    );
}
