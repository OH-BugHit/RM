import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Grid, GridImperativeAPI, type CellComponentProps } from 'react-window';

import DrawObservation from '../../../Observation/DrawObservation';
import { QLearningAgent } from '../../../../components/agents/rlAgentQ';
import { ObservationShape } from '../../../../types';
import { useAtomValue } from 'jotai';
import { ActiveAgentAtom, ActiveEnvironmentAtom } from '../../../../atoms/state';

interface LodNearProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    gridRef: RefObject<GridImperativeAPI | null>;
}

const ITEM_WIDTH = 240;
const ITEM_HEIGHT = 240;

const MemoObservation = React.memo(DrawObservation);

// Cell component, make separate if this is good
type CellProps = {
    stateEntries: {
        state: string;
        actionValues: number[];
    }[];
    columnCount: number;
    observationShape: ObservationShape;
};

function CellComponent({
    columnIndex,
    rowIndex,
    style,
    stateEntries,
    columnCount,
    observationShape,
}: CellComponentProps<CellProps>) {
    const environment = useAtomValue(ActiveEnvironmentAtom);
    const index = rowIndex * columnCount + columnIndex;

    const item = stateEntries[index];
    if (!item) return null;

    return (
        <div style={style}>
            <MemoObservation
                state={item.state}
                actionValues={item.actionValues}
                type={observationShape}
                disabled={false}
                envType={environment.type}
            />
        </div>
    );
}

export default function LodNear({ agentRef, gridRef }: LodNearProps) {
    const agent = useAtomValue(ActiveAgentAtom);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const dragStart = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
    const pendingScroll = useRef({ left: 0, top: 0 });

    useEffect(() => {
        const up = () => (isDragging.current = false);
        window.addEventListener('mouseup', up);
        return () => window.removeEventListener('mouseup', up);
    }, []);

    const handleMouseDown = (e: React.MouseEvent) => {
        const gridElement = gridRef.current?.element ?? null;
        if (!gridElement) return;

        isDragging.current = true;
        dragStart.current = {
            x: e.clientX,
            y: e.clientY,
            scrollLeft: gridElement.scrollLeft,
            scrollTop: gridElement.scrollTop,
        };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return;

        const gridElement = gridRef.current?.element ?? null;
        if (!gridElement) return;

        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;

        gridElement.scrollLeft = dragStart.current.scrollLeft - dx;
        gridElement.scrollTop = dragStart.current.scrollTop - dy;
    };

    const stopDrag = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        const up = () => {
            isDragging.current = false;
        };
        window.addEventListener('mouseup', up);
        return () => window.removeEventListener('mouseup', up);
    }, []);

    const [size, setSize] = useState({ width: 0, height: 0 });
    const [, forceUpdate] = useState(0);

    // resize
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const update = () => {
            setSize({
                width: el.clientWidth,
                height: el.clientHeight,
            });
        };

        update();

        const ro = new ResizeObserver(update);
        ro.observe(el);

        return () => ro.disconnect();
    }, []);

    // update trigger
    useEffect(() => {
        const id = setInterval(() => forceUpdate((x) => x + 1), 200);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const gridElement = gridRef.current?.element ?? null;
        if (!gridElement) return;

        gridElement.scrollLeft = pendingScroll.current.left;
        gridElement.scrollTop = pendingScroll.current.top;
    }, [gridRef]);

    const stateEntries = useMemo(() => {
        const qTable = agentRef.current?.getQTable();
        if (!qTable) return [];

        return Object.entries(qTable).map(([state, actions]) => ({
            state,
            actionValues: Object.values(actions),
        }));
    }, [agentRef]);

    const columnCount = Math.max(1, Math.floor(Math.sqrt(stateEntries.length)));

    const rowCount = Math.ceil(stateEntries.length / columnCount);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
                cursor: isDragging.current ? 'grabbing' : 'grab',
                userSelect: 'none',
                overflow: 'auto',
            }}
            onMouseDown={(e) => {
                handleMouseDown(e);
                e.preventDefault();
                e.stopPropagation();
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
        >
            {size.width > 0 && size.height > 0 && (
                <Grid
                    gridRef={gridRef}
                    columnCount={columnCount}
                    rowCount={rowCount}
                    columnWidth={ITEM_WIDTH}
                    rowHeight={ITEM_HEIGHT}
                    defaultWidth={Math.max(size.width, columnCount * ITEM_WIDTH)}
                    defaultHeight={Math.max(size.height, rowCount * ITEM_HEIGHT)}
                    style={{
                        width: Math.max(size.width, columnCount * ITEM_WIDTH),
                        height: Math.max(size.height, rowCount * ITEM_HEIGHT),
                    }}
                    cellComponent={CellComponent}
                    cellProps={{
                        stateEntries,
                        columnCount,
                        observationShape: agent?.observationShape,
                    }}
                />
            )}
        </div>
    );
}
