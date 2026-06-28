import { RefObject, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { EnvSettingsAtom, SetRewardsPulseAtom, WorldGridRenderAtom } from '../../atoms/gameState';
import { GenericRLEnv } from '../../views/Environments/Generic/environment';

interface AgentBridgeProps {
    envRef: RefObject<GenericRLEnv | undefined>;
}
export default function AgentBridge({ envRef }: AgentBridgeProps) {
    const envSettings = useAtomValue(EnvSettingsAtom);
    const setRewards = useAtomValue(SetRewardsPulseAtom);
    const worldGrid = useAtomValue(WorldGridRenderAtom);

    useEffect(() => {
        if (envRef.current !== undefined) {
            envRef.current.setRewards(envSettings.generic.reward);
            console.log('rewards setted', envSettings.generic.reward);
            if (worldGrid !== undefined) {
                envRef.current.setWorld(worldGrid);
            }
        }
    }, [envSettings, envRef, setRewards, worldGrid]);
    return null;
}
