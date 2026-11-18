import style from './style.module.css';
import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { ActiveAgentAtom } from '../../atoms/state';
import { GenericRLEnv } from '../../views/Environments/Generic/environment';
import { FacingAtom } from '../../atoms/gameState';
import { AgentRenderPulseAtom, TileSizeAtom, TileVisibilityAtom } from '../../atoms/uiState';
import { useEffect } from 'react';

interface AgentRenderInterface {
    env: GenericRLEnv;
}

export default function AgentRender({ env }: AgentRenderInterface) {
    const trigger = useAtomValue(AgentRenderPulseAtom);
    const agent = useAtomValue(ActiveAgentAtom);
    const facing = useAtomValue(FacingAtom);
    const visibleTiles = useAtomValue(TileVisibilityAtom);
    const tileSize = useAtomValue(TileSizeAtom);

    useEffect(() => {}, [trigger]);

    if (agent.img === '') return;

    return (
        <motion.div
            style={{
                position: 'absolute',
                zIndex: 2,
            }}
            transition={
                trigger.mode === 'normal'
                    ? {
                          type: 'tween',
                          duration: 0.2,
                          ease: 'easeInOut',
                          delay: 0,
                      }
                    : {}
            }
            animate={{
                x: env.position.x * Math.min(tileSize,  tileSize),
                y: env.position.y * Math.min(tileSize, tileSize),
                opacity: 1,
            }}
        >
            <motion.img
                src={agent.img}
                alt="Agent Image"
                className={`${style.tileLayer} ${style.tileForeground}`}
                style={{
                    position: 'relative',
                    top: `16px`,
                    left: `16px`,
                    height: tileSize,
                    display: visibleTiles.agent ? 'block' : 'none',
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
