import style from './single.module.css';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { OpenLevelGroupsAtom } from '../../../atoms/state';
import { ActiveViewAtom } from '../../../atoms/uiState';
import Levels from '../Levels/Levels';
import MainMenu from '../Student/MainMenu/MainView';
import ViewHandler from '../../../components/ViewHandler';
import { allGroups } from '../../../utils/levels/levelGroups';
import MenuButton from '../../../components/Buttons/ButtonIcons/OtherIcons/MenuIcon';
import Tutorial from '../../Tutorial/Tutorial';
import PlayEnv from '../../PlayEnv/PlayEnv';
import BuildView from '../../BuildView/BuildView';
import GameView from '../../GameView/GameView';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { OrientationPrompt } from '../../../components/Orientation/OrientationPrompt';
import { GameScaleProvider } from '../../../context/GameScale/GameScaleProvied';

export default function SinglePlayer() {
    const view = useAtomValue(ActiveViewAtom);
    const setOpenGroups = useSetAtom(OpenLevelGroupsAtom);
    const agentRef = useRef<QLearningAgent>(undefined);

    useEffect(() => {
        setOpenGroups(allGroups);
    }, [setOpenGroups]);

    return (
        <GameScaleProvider>
            <div className={style.studentContainer}>
                <OrientationPrompt />
                <MenuButton />
                <ViewHandler />
                <MainMenu />
                {view.main === 'recap' && <Tutorial />}
                {view.main === 'ownLevels' && <PlayEnv />}
                {view.main === 'build' && <BuildView />}
                {view.main === 'play' && <GameView agentRef={agentRef} />}
                {view.main === 'levels' && <Levels view={view.sub} />}
            </div>
        </GameScaleProvider>
    );
}
