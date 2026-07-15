import style from './style.module.css';
import AgentIndex from '../Story/Selectors/AgentSelector/AgentIndex';
import { useAtomValue } from 'jotai';
import { UiHelpAtom, UiShowSidePanelAtom } from '../../atoms/uiState';
import RewardsSelector from '../Story/Selectors/RewardsSelector/RewardsSelector';
import GameSettings from '../Story/Selectors/GameSettings/GameSettings';
import Arrow from '../../components/HelperArrow/Arrow';
import PropSelector from '../Story/Selectors/EnvironmentSelector/PropSelector';
import ModifyEnvironment from '../Story/Selectors/EnvironmentSelector/ModifyEnvironment';

function CreateMenu() {
    const uiHelp = useAtomValue(UiHelpAtom);
    const content = useAtomValue(UiShowSidePanelAtom);

    return (
        <div className={style.tuneContainer}>
            {uiHelp.creativeClose && (
                <Arrow
                    position="fixed"
                    right={28}
                    top={25}
                    radius={70}
                    angle={170}
                />
            )}
            <div className={style.tuneContent}>
                {content.content === 'agent' && <AgentIndex />}
                {content.content === 'props' && <PropSelector />}
                {content.content === 'world' && <ModifyEnvironment />}
                {content.content === 'reward' && <RewardsSelector />}
                {content.content === 'settings' && <GameSettings />}
            </div>
        </div>
    );
}

export default CreateMenu;
