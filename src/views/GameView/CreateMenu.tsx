import AgentIndex from '../Story/Selectors/AgentSelector/AgentIndex';
import { useAtomValue } from 'jotai';
import { SetupVisibleAtom } from '../../atoms/uiState';
import RewardsSelector from '../Story/Selectors/RewardsSelector/RewardsSelector';
import GameSettings from '../Story/Selectors/GameSettings/GameSettings';
import DesignMenu from '../Story/Selectors/DesignMenu/DesignMenu';

// Not in use
function CreateMenu() {
    const content = useAtomValue(SetupVisibleAtom);

    return (
        <>
            {content.content === 'agent' && <AgentIndex />}
            {content.content === 'reward' && <RewardsSelector />}
            {content.content === 'settings' && <GameSettings />}
            {content.content === 'design' && <DesignMenu />}
        </>
    );
}

export default CreateMenu;
