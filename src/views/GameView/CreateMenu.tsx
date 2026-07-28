import style from './style.module.css';
import AgentIndex from '../Story/Selectors/AgentSelector/AgentIndex';
import { useAtomValue } from 'jotai';
import { SetupVisibleAtom } from '../../atoms/uiState';
import RewardsSelector from '../Story/Selectors/RewardsSelector/RewardsSelector';
import GameSettings from '../Story/Selectors/GameSettings/GameSettings';

function CreateMenu() {
    const content = useAtomValue(SetupVisibleAtom);

    return (
        <div className={style.tuneContainer}>
            <div className={style.tuneContent}>
                {content.content === 'agent' && <AgentIndex />}
                {content.content === 'reward' && <RewardsSelector />}
                {content.content === 'settings' && <GameSettings />}
            </div>
        </div>
    );
}

export default CreateMenu;
