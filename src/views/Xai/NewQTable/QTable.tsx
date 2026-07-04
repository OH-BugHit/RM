import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import style from './style.module.css';
import LodFar from './LodFar/LodFar';
import { useAtomValue } from 'jotai';
import { LodStateAtom } from '../../../atoms/uiState';
import TileTable from './TileTable/TileTable';
import { WorldStore } from '../../../components/QTable/utils';

interface QTableProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    disabled?: boolean;
    lWorld: WorldStore;
    mapRef: React.RefObject<L.Map | null>;
    layerRef: React.RefObject<L.GridLayer | null>;
}

export default function QTable({ agentRef, disabled, lWorld, mapRef, layerRef }: QTableProps) {
    const lod = useAtomValue(LodStateAtom);

    return (
        <main className={style.tableContainer}>
            {disabled && <em>Game is running</em>}
            {!disabled &&
                (lod == 1 ? (
                    <LodFar agentRef={agentRef} />
                ) : (
                    <TileTable
                        agentRef={agentRef}
                        lWorld={lWorld}
                        mapRef={mapRef}
                        layerRef={layerRef}
                    />
                ))}
        </main>
    );
}
