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
import { MarkerManager } from '../../../../components/QTable/MarkerManager/MargerManager';

interface TileTableProps {
    lWorld: WorldStore;
    mapRef: React.RefObject<L.Map | null>;
    agentRef: React.RefObject<QLearningAgent | undefined>;
    layerRef: React.RefObject<CustomGridLayer | null>;
}
export interface CustomGridLayer extends L.GridLayer {
    clearCache(): void;
}
export default function TileTable({ agentRef, lWorld, mapRef, layerRef }: TileTableProps) {
    const agentSelections = useAtomValue(ActiveAgentAtom);

    const pool = useMemo(() => new WorkerPool(), []);

    // Workers init world
    useEffect(() => {
        pool.initWorld({
            type: 'initWorld',
            world: Array.from(lWorld.grid.entries()),
        });
    }, [pool, lWorld]);

    // Workers init sprites
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
            () => agentRef.current?.Q ?? {},
            (x, y, z) => lWorld.getTileVersion(x, y, z)
        );

        const map = L.map('map', {
            crs: L.CRS.Simple,
            fadeAnimation: false,
            minZoom: 9,
            maxZoom: 14,
        }).setView([0, 0], 14);
        const agent = agentRef.current;

        mapRef.current = map;

        const markerManager = new MarkerManager(map, lWorld, agentSelections.observationShape);

        agent?.setMarkerManager(markerManager);

        const layer = new CustomLayer() as CustomGridLayer;

        layer.addTo(map);

        layerRef.current = layer;
        mapRef.current = map;

        return () => {
            agent?.setMarkerManager(undefined);
            markerManager.destroy();
            pool.destroy();
            map.remove();
        };
    }, [pool, layerRef, mapRef, agentRef, lWorld, agentSelections.observationShape]);

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
