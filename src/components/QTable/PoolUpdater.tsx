import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { WorkerPool } from './workers/WorkerPool';
import { WorldStore } from './utils';
import { QLearningAgent } from '../agents/rlAgentQ';
import { UpdateWorldPulseAtom, UpdateSpritesPulseAtom } from '../../atoms/state';
import { CustomGridLayer } from '../../views/Xai/NewQTable/TileTable/TileTable';

interface SpriteUpdaterProps {
    pool: WorkerPool;
    lWorld: WorldStore;
    agentRef: React.RefObject<QLearningAgent | undefined>;
    layerRef: React.RefObject<CustomGridLayer | null>;
}
export default function PoolUpdater({ pool, lWorld, agentRef, layerRef }: SpriteUpdaterProps) {
    const updateSpritesPulse = useAtomValue<boolean>(UpdateSpritesPulseAtom);
    const updateWorldPulse = useAtomValue<boolean>(UpdateWorldPulseAtom);

    /**
     * Updates world to workers
     */
    useEffect(() => {
        if (pool !== undefined) {
            pool.updateWorld({ type: 'updateWorld', world: Array.from(lWorld.grid.entries()) });
            layerRef?.current?.redraw(); //TODO: Cache tiles and do not use this mehtod to re-draw
        }
    }, [layerRef, pool, lWorld, updateWorldPulse]);

    /**
     * Updates sprite images for workers
     */
    useEffect(() => {
        const spriteStore = agentRef.current?.spriteStore;
        if (!spriteStore) return;

        let cancelled = false;

        (async () => {
            const sprites = await Promise.all(
                Array.from(spriteStore.images.entries()).map(async ([id, img]) => ({
                    id,
                    bitmap: await createImageBitmap(img),
                }))
            );

            if (cancelled) {
                sprites.forEach((s) => s.bitmap.close());
                return;
            }

            pool.updateSprites({
                type: 'updateSprites',
                sprites,
            });
            layerRef.current?.clearCache();
            layerRef.current?.redraw();
        })();

        return () => {
            cancelled = true;
        };
    }, [pool, agentRef, layerRef, updateSpritesPulse]);

    return null;
}
