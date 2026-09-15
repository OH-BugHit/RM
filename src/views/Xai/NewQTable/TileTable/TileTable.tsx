import { useAtomValue, useSetAtom, useStore } from 'jotai';
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
import { MapCenterAtom, QmapViewTypeAtom, ZoomLevelAtom } from '../../../../atoms/uiState';
import { FocusOverlay } from '../../../../components/QTable/FocusOverlay/FocusOverlay';
import { InspectMarkerManager } from '../../../../components/QTable/InspectMarkerManager/InspectMarkerManager';

interface TileTableProps {
    lWorld: WorldStore;
    mapRef: React.RefObject<L.Map | null>;
    agentRef: React.RefObject<QLearningAgent | undefined>;
    layerRef: React.RefObject<CustomGridLayer | null>;
    focusFrameRef: React.RefObject<FocusOverlay | undefined>;
}
export interface CustomGridLayer extends L.GridLayer {
    clearCache(): void;
}
export default function TileTable({ agentRef, lWorld, mapRef, layerRef, focusFrameRef }: TileTableProps) {
    const agentSelections = useAtomValue(ActiveAgentAtom);
    const pool = useMemo(() => new WorkerPool(), []);
    const viewType = useAtomValue(QmapViewTypeAtom);
    const setZoomLevel = useSetAtom(ZoomLevelAtom);
    const setMapCenter = useSetAtom(MapCenterAtom);
    const setMapType = useSetAtom(QmapViewTypeAtom);
    const store = useStore();

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
            viewType,
            () => agentRef.current?.Q ?? {},
            (x, y, z) => lWorld.getTileVersion(x, y, z)
        );

        const center = store.get(MapCenterAtom);

        const map = L.map('map', {
            crs: L.CRS.Simple,
            fadeAnimation: false,
            minZoom: 9,
            maxZoom: 14,
        }).setView(center ? [center.lat, center.lng] : [0, 0], store.get(ZoomLevelAtom));
        const agent = agentRef.current;

        mapRef.current = map;

        map.on('moveend', () => {
            setMapCenter(map.getCenter());
            const zoom = map.getZoom();
            setZoomLevel(zoom);
            if (zoom < 13) setMapType('sprite');
        });

        const inspectMarkerManager = new InspectMarkerManager(map, lWorld, agentSelections.observationShape);
        const markerManager = new MarkerManager(map, lWorld, agentSelections.observationShape);
        const focusOverlay = new FocusOverlay(map);
        focusFrameRef.current = focusOverlay;

        agent?.setMarkerManagers(markerManager, inspectMarkerManager);

        const layer = new CustomLayer() as CustomGridLayer;

        layer.addTo(map);

        layerRef.current = layer;
        mapRef.current = map;

        return () => {
            agent?.setMarkerManagers(undefined);
            markerManager.destroy();
            inspectMarkerManager.destroy();
            focusOverlay.destroy();
            pool.destroy();
            map.off('moveend');
            map.remove();
        };
    }, [
        pool,
        layerRef,
        mapRef,
        agentRef,
        lWorld,
        agentSelections.observationShape,
        viewType,
        focusFrameRef,
        setZoomLevel,
        store,
        setMapCenter,
        setMapType,
    ]);

    return (
        <>
            <PoolUpdater
                agentRef={agentRef}
                lWorld={lWorld}
                pool={pool}
                layerRef={layerRef}
            />
            <div
                data-dismissible-exclude
                id="map"
                className={style.map}
            />
        </>
    );
}
