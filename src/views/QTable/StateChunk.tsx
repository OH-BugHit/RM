import { useEffect, useRef, useMemo } from 'react';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { GridConfig } from '../../types';
import { buildRenderSpec, renderCells } from '../Observation/renderTools';
import { ChunkGridConfig, getStateOffsetInChunk, getChunkCanvasSize } from './chunkUtils';

interface StateChunkProps {
    agent: React.RefObject<QLearningAgent | undefined>;
    chunkIndex: number;
    config: GridConfig;
    chunkConfig: ChunkGridConfig;
    updateTrigger: number; // Trigger redraws when this changes
    lastKnownVisitTimes: Record<string, number>;
    scrollToState?: string; // State to highlight with red outline
}

export default function StateChunk({
    agent,
    chunkIndex,
    config,
    chunkConfig,
    updateTrigger,
    lastKnownVisitTimes,
    scrollToState,
}: StateChunkProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const lastVisitTimesRef = useRef<Record<string, number>>({});

    const chunkCanvasSize = useMemo(() => getChunkCanvasSize(chunkConfig), [chunkConfig]);
    const statesPerChunk = useMemo(
        () => chunkConfig.statesPerSide * chunkConfig.statesPerSide,
        [chunkConfig.statesPerSide]
    );

    // Find if scrollToState is in this chunk for highlighting
    const scrollToStateIndexInChunk = useMemo(() => {
        if (!scrollToState || !agent.current) return -1;

        const qTable = agent.current.getQTable();
        const allStates = Object.keys(qTable);
        const stateIndex = allStates.indexOf(scrollToState);

        if (stateIndex === -1) return -1;

        const chunkStartIndex = chunkIndex * statesPerChunk;
        const chunkEndIndex = chunkStartIndex + statesPerChunk;

        if (stateIndex >= chunkStartIndex && stateIndex < chunkEndIndex) {
            return stateIndex - chunkStartIndex;
        }

        return -1;
    }, [scrollToState, agent, chunkIndex, statesPerChunk]);

    // Render chunk when updateTrigger changes or on mount
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !agent.current) {
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Determine which state indices belong to this chunk
        const startStateIndex = chunkIndex * statesPerChunk;
        const endStateIndex = startStateIndex + statesPerChunk;

        const qTable = agent.current.getQTable();
        const allStates = Object.entries(qTable);

        // Check if any states in this chunk were updated
        let shouldRedraw = false;
        for (let i = startStateIndex; i < endStateIndex && i < allStates.length; i++) {
            const [state] = allStates[i];
            const currentVisitTime = lastKnownVisitTimes[state] || 0;
            const lastVisitTime = lastVisitTimesRef.current[state] || -1;

            if (currentVisitTime !== lastVisitTime) {
                shouldRedraw = true;
                lastVisitTimesRef.current[state] = currentVisitTime;
            }
        }

        if (!shouldRedraw && updateTrigger > 0) {
            return;
        }

        // Clear canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Render states in this chunk
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cells: any[] = [];

        for (let i = startStateIndex; i < endStateIndex && i < allStates.length; i++) {
            const [state, actions] = allStates[i];
            const indexInChunk = i - startStateIndex;
            const xInChunk = indexInChunk % chunkConfig.statesPerSide;
            const yInChunk = Math.floor(indexInChunk / chunkConfig.statesPerSide);

            const offset = getStateOffsetInChunk(xInChunk, yInChunk, chunkConfig.stateSpacing);

            // Render full detail for this state
            const spec = buildRenderSpec(state, actions, config);

            // Offset cells for this state's position in the chunk
            for (const c of spec.cells) {
                cells.push({
                    ...c,
                    x: c.x + offset.x,
                    y: c.y + offset.y,
                });
            }
        }

        renderCells(ctx, { cells }, { x: 0, y: 0, scale: 1 });

        // Draw red outline for scrollToState if it's in this chunk
        if (scrollToStateIndexInChunk >= 0) {
            const xInChunk = scrollToStateIndexInChunk % chunkConfig.statesPerSide;
            const yInChunk = Math.floor(scrollToStateIndexInChunk / chunkConfig.statesPerSide);
            const offset = getStateOffsetInChunk(xInChunk, yInChunk, chunkConfig.stateSpacing);

            // Get state size from config (assuming square grid cells)
            const cellPixelSize = config.size * 40; // config.size cells × 40px per cell

            ctx.strokeStyle = '#ff0000';
            ctx.lineWidth = 2;
            ctx.strokeRect(offset.x, offset.y, cellPixelSize, cellPixelSize);
        }
    }, [
        agent,
        chunkIndex,
        config,
        chunkConfig,
        statesPerChunk,
        updateTrigger,
        lastKnownVisitTimes,
        scrollToStateIndexInChunk,
    ]);

    return (
        <canvas
            ref={canvasRef}
            width={chunkCanvasSize}
            height={chunkCanvasSize}
            style={{
                border: '1px solid #ccc',
                display: 'block',
            }}
        />
    );
}
