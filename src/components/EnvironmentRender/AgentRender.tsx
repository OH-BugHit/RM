import style from './style.module.css';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { ActiveAgentAtom } from '../../atoms/state';
import { GenericRLEnv } from '../../views/Environments/Generic/environment';
import { FacingAtom } from '../../atoms/gameState';
import { TileVisibilityAtom } from '../../atoms/uiState';

interface AgentRenderInterface {
    env: GenericRLEnv;
}

export default function AgentRender({ env }: AgentRenderInterface) {
    const agent = useAtomValue(ActiveAgentAtom);
    const facing = useAtomValue(FacingAtom);
    const visibleTiles = useAtomValue(TileVisibilityAtom);
    return (
        <motion.div
            style={{
                position: 'absolute',
                zIndex: 20,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
            }}
            animate={{
                x: env.position.x * 40,
                y: env.position.y * 40,
                opacity: 1,
            }}
        >
            <motion.img
                src={agent.img}
                alt="Agent Image"
                className={`${style.tileLayer} ${style.tileForeground}`}
                style={{
                    position: 'relative',
                    top: '16px',
                    left: '16px',
                    width: 40,
                    height: 40,
                    opacity: visibleTiles.agent ? 1 : 0,
                }}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    scaleX: facing ?? 1,
                }}
            />
        </motion.div>
    );
}
