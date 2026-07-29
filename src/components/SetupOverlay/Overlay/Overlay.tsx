import { useAtomValue } from 'jotai';
import { SetupVisibleAtom } from '../../../atoms/uiState';
import style from './style.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import AgentIndex from '../../../views/Story/Selectors/AgentSelector/AgentIndex';
import RewardsSelector from '../../../views/Story/Selectors/RewardsSelector/RewardsSelector';
import GameSettings from '../../../views/Story/Selectors/GameSettings/GameSettings';
import DesignMenu from '../../../views/Story/Selectors/DesignMenu/DesignMenu';

export default function Overlay() {
    const setup = useAtomValue(SetupVisibleAtom);

    return (
        <AnimatePresence>
            {setup.visible && (
                <>
                    <motion.div
                        className={`${style.wrapper} ${setup.content === 'design' ? style.designWrapper : ''}`}
                        key="menu"
                        layout
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={style.container}>
                            {setup.content === 'agent' && <AgentIndex />}
                            {setup.content === 'reward' && <RewardsSelector />}
                            {setup.content === 'settings' && <GameSettings />}
                            {setup.content === 'design' && <DesignMenu />}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
