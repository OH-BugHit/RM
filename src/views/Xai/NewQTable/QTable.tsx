import { QLearningAgent } from '../../../components/agents/rlAgentQ';
import style from './style.module.css';
import LodNear from './LodNear/LodNear';
import LodFar from './LodFar/LodFar';
import { useAtomValue } from 'jotai';
import { LodStateAtom } from '../../../atoms/uiState';
import { GridImperativeAPI } from 'react-window';
import { RefObject } from 'react';

interface QTableProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    gridRef: RefObject<GridImperativeAPI | null>;
    disabled?: boolean;
}

export default function QTable({ agentRef, disabled, gridRef }: QTableProps) {
    const lod = useAtomValue(LodStateAtom);

    return (
        <main className={style.tableContainer}>
            {disabled && <em>Game is running</em>}
            {!disabled &&
                (lod == 1 ? (
                    <LodFar agentRef={agentRef} />
                ) : (
                    <LodNear
                        agentRef={agentRef}
                        gridRef={gridRef}
                    />
                ))}
        </main>
    );
}
