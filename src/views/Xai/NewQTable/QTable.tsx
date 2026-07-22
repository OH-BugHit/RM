import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import style from './style.module.css';
import LodFar from './LodFar/LodFar';
import { useAtomValue } from 'jotai';
import { LodStateAtom } from '../../../atoms/uiState';
import TileTable, { CustomGridLayer } from './TileTable/TileTable';
import { WorldStore } from '../../../components/QTable/utils';

interface QTableProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    lWorld: WorldStore;
    mapRef: React.RefObject<L.Map | null>;
    layerRef: React.RefObject<CustomGridLayer | null>;
}

export default function QTable({ agentRef, lWorld, mapRef, layerRef }: QTableProps) {
    const lod = useAtomValue(LodStateAtom);

    return (
        <main className={style.tableContainer}>
            {lod == 1 ? (
                <LodFar agentRef={agentRef} />
            ) : (
                <TileTable
                    agentRef={agentRef}
                    lWorld={lWorld}
                    mapRef={mapRef}
                    layerRef={layerRef}
                />
            )}
        </main>
    );
}
