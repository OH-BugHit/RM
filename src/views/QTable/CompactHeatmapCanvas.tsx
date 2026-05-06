import { useEffect, useMemo, useRef } from 'react';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { GridConfig } from '../../types';
import { getQColor } from '../../utils/common';

interface CompactHeatmapCanvasProps {
    agent: React.RefObject<QLearningAgent | undefined>;
    config: GridConfig;
    scrollToState?: string;
    updateTrigger?: number;
}

const STATE_SIZE = 6; // pixels per state
const STATE_GAP = 1; // pixels between states
const CELL_SIZE = STATE_SIZE + STATE_GAP; // total size including gap

/**
 * Ultra-compact heatmap canvas rendering all states at once.
 * Each state is a 6x6 pixel square with 1px gaps, arranged in spiral layout.
 */
export default function CompactHeatmapCanvas({
    agent,
    config,
    scrollToState,
    updateTrigger,
}: CompactHeatmapCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Calculate grid dimensions based on state count
    const gridDims = useMemo(() => {
        if (!agent.current) return { cols: 0, rows: 0, totalStates: 0 };

        const qTable = agent.current.getQTable();
        const totalStates = Object.keys(qTable).length;
        const cols = Math.ceil(Math.sqrt(totalStates));
        const rows = Math.ceil(totalStates / cols);

        return { cols, rows, totalStates };
    }, [agent, updateTrigger]);

    // Find scrollToState index for highlighting
    const scrollToStateIndex = useMemo(() => {
        if (!scrollToState || !agent.current) return -1;
        const qTable = agent.current.getQTable();
        const states = Object.keys(qTable);
        return states.indexOf(scrollToState);
    }, [scrollToState, agent, updateTrigger]);

    // Render all states to compact heatmap
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !agent.current) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const qTable = agent.current.getQTable();
        const states = Object.keys(qTable);

        // Calculate Q-value range for color mapping
        let minQ = Infinity;
        let maxQ = -Infinity;
        for (const state of states) {
            const actions = qTable[state];
            for (const q of Object.values(actions)) {
                if (q < minQ) minQ = q;
                if (q > maxQ) maxQ = q;
            }
        }
        if (minQ === Infinity) minQ = 0;
        if (maxQ === -Infinity) maxQ = 0;

        // Clear canvas
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw each state as a 6x6 pixel heatmap square in spiral layout
        for (let idx = 0; idx < states.length; idx++) {
            const state = states[idx];
            const actions = qTable[state];

            // Calculate average Q-value
            const qValues = Object.values(actions);
            const avgQ = qValues.length > 0 ? qValues.reduce((a, b) => a + b, 0) / qValues.length : 0;

            // Get color based on Q-value
            const color = getQColor(avgQ, minQ, maxQ);

            // Position in spiral grid
            const row = Math.floor(idx / gridDims.cols);
            const col = idx % gridDims.cols;
            const x = col * CELL_SIZE;
            const y = row * CELL_SIZE;

            // Draw state square
            ctx.fillStyle = color;
            ctx.fillRect(x, y, STATE_SIZE, STATE_SIZE);

            // Highlight scrollToState with red outline
            if (idx === scrollToStateIndex) {
                ctx.strokeStyle = '#ff0000';
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, STATE_SIZE, STATE_SIZE);
            }
        }
    }, [agent, config, scrollToStateIndex, updateTrigger, gridDims]);

    // Set canvas size based on grid
    const canvasWidth = gridDims.cols * CELL_SIZE;
    const canvasHeight = gridDims.rows * CELL_SIZE;

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            style={{
                border: '1px solid #ccc',
                display: 'block',
                imageRendering: 'pixelated',
            }}
        />
    );
}
