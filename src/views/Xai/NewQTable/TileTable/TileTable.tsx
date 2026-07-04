import { useAtomValue } from 'jotai';
import * as L from 'leaflet';
import { useEffect, useMemo } from 'react';

import { ActiveAgentAtom } from '../../../../atoms/state';
import { QLearningAgent } from '../../../../components/agents/rlAgentQ';
import { createTileLayer } from '../../../../components/QTable/leafletUtils';
import { WorldStore } from '../../../../components/QTable/utils';
import { WorkerPool } from '../../../../components/QTable/workers/WorkerPool';
import style from './style.module.css';
import PoolUpdater from '../../../../components/QTable/PoolUpdater';

interface TileTableProps {
    lWorld: WorldStore;
    mapRef: React.RefObject<L.Map | null>;
    agentRef: React.RefObject<QLearningAgent | undefined>;
    layerRef: React.RefObject<L.GridLayer | null>;
}

export default function TileTable({ agentRef, lWorld, mapRef, layerRef }: TileTableProps) {
    const agentSelections = useAtomValue(ActiveAgentAtom);

    const pool = useMemo(() => new WorkerPool(), []);

    // Init world
    useEffect(() => {
        pool.initWorld({
            type: 'initWorld',
            world: Array.from(lWorld.grid.entries()),
        });
    }, [pool, lWorld]);

    // Init Sprites
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

            pool.initSprites({
                type: 'initSprites',
                sprites,
            });
        })();

        return () => {
            cancelled = true;
        };
    }, [pool, agentRef]);

    useEffect(() => {
        const CustomLayer = createTileLayer(
            pool,
            256,
            agentSelections.observationShape,
            () => agentRef.current?.Q ?? {}
        );

        const map = L.map('map', {
            crs: L.CRS.Simple,
            minZoom: 9,
            maxZoom: 14,
        }).setView([0, 0], 14);

        const layer = new CustomLayer();

        layer.addTo(map);

        layerRef.current = layer;
        mapRef.current = map;

        return () => {
            pool.destroy();
            map.remove();
        };
    }, [pool, layerRef, mapRef, agentRef, agentSelections.observationShape]);

    return (
        <>
            <PoolUpdater
                agentRef={agentRef}
                lWorld={lWorld}
                pool={pool}
                layerRef={layerRef}
            />
            <div
                id="map"
                className={style.map}
            />
        </>
    );
}
