import style from './single.module.css';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { OpenLevelGroupsAtom } from '../../../atoms/state';
import { ActiveViewAtom } from '../../../atoms/uiState';
import Levels from '../Levels/Levels';
import MainMenu from '../Student/MainMenu/MainView';
import ViewHandler from '../../../components/ViewHandler';
import { allGroups } from '../../../utils/levels/levelGroups';
import MenuIcon from '../../../components/Buttons/MenuButton/MenuIcon';
import Tutorial from '../../Tutorial/Tutorial';
import PlayEnv from '../../PlayEnv/PlayEnv';
import BuildView from '../../BuildView/BuildView';
import GameView from '../../GameView/GameView';
import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import { OrientationPrompt } from '../../../components/Orientation/OrientationPrompt';
import { GameScaleProvider } from '../../../context/GameScale/GameScaleProvied';
import Settings from '../../Settings/Settings';
import { MENU_AT_TOP } from '../../../types';
import ModifyView from '../../BuildView/ModifyView';

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
                <MenuIcon
                    position={
                        view.sub === 'playLevel'
                            ? 'right'
                            : view.main && MENU_AT_TOP.includes(view.main)
                              ? 'top-right'
                              : 'right'
                    }
                />
                <Settings mode="student" />
                <ViewHandler />
                <MainMenu />
                {view.main === 'recap' && <Tutorial />}
                {view.main === 'ownLevels' && <PlayEnv />}
                {view.main === 'build' && <BuildView />}
                {view.main === 'modify' && <ModifyView />}
                {view.main === 'play' && <GameView agentRef={agentRef} />}
                {view.main === 'levels' && <Levels view={view.sub} />}
            </div>
        </GameScaleProvider>
    );
}
