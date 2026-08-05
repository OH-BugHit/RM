import { RefObject, useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { EnvSettingsAtom, RewardsPulseAtom, WorldGridRenderAtom } from '../../atoms/gameState';
import { GenericRLEnv } from '../../views/Environments/Generic/environment';
import { TileDefinition } from '../../types';
import { TilePropsAtom } from '../../atoms/uiState';
import { QLearningAgent } from '../agents/rlAgentQ';
import { UpdateSpritesPulseAtom } from '../../atoms/state';

interface AgentBridgeProps {
    envRef: RefObject<GenericRLEnv | undefined>;
    agentRef: React.RefObject<QLearningAgent | undefined>;
}
export default function AgentBridge({ envRef, agentRef }: AgentBridgeProps) {
    const envSettings = useAtomValue(EnvSettingsAtom);
    const setRewards = useAtomValue(RewardsPulseAtom);
    const worldGrid = useAtomValue(WorldGridRenderAtom);
    const tiles = useAtomValue<TileDefinition[]>(TilePropsAtom);
    const setSpritePulse = useSetAtom(UpdateSpritesPulseAtom);

    /**
     * Updates max steps
     */

    /**
     * Updates rewards to agent when they are changed
     */
    useEffect(() => {
        if (envRef.current !== undefined) {
            envRef.current.setRewards(envSettings.generic.reward);
            if (worldGrid !== undefined) {
                envRef.current.setWorld(worldGrid);
            }
            envRef.current.maxTurns = envSettings.generic.env.maxTurns;
        }
    }, [envSettings, envRef, setRewards, worldGrid]);

    /**
     * Updates sprite images for rendering Q-table and Agentvision
     */
    useEffect(() => {
        if (agentRef.current !== undefined) {
            tiles.forEach((tile) => {
                const img = new Image();
                img.src = tile.image;
                if (img.width) agentRef.current?.spriteStore.set(tile.type, img); // Prevents update when props wihtout image added.
            });
            setSpritePulse((old) => !old);
        }
    }, [agentRef, tiles, setSpritePulse]);
    return null;
}
