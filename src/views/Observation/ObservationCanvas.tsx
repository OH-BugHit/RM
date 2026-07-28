import { useEffect, useMemo, useRef } from 'react';
import { GRID_5, GRID_7 } from '../../components/QTable/gridConfigs';
import { ObservationShape } from '../../types';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { renderObservation } from '../../components/QTable/observationRenderer';
import { useAtomValue } from 'jotai';
import { StateDataAtom } from '../../atoms/gameState';
import { ObsViewTypeAtom } from '../../atoms/uiState';

interface ObservationCanvasProps {
    size?: number;
    observationShape: ObservationShape;
    agentRef: React.RefObject<QLearningAgent | undefined>;
}

export default function ObservationCanvas({ size = 256, observationShape, agentRef }: ObservationCanvasProps) {
    const state = useAtomValue(StateDataAtom);
    const stateViewType = useAtomValue(ObsViewTypeAtom);
    const stateId = state.current;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const grid = useMemo(() => {
        switch (observationShape) {
            case 'small':
                return GRID_5;
            case 'large':
            default:
                return GRID_7;
        }
    }, [observationShape]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const imgStore = agentRef.current?.spriteStore?.images;
        if (!imgStore) return;

        ctx.clearRect(0, 0, size, size);

        ctx.fillStyle = '#f7f7f7';
        ctx.fillRect(0, 0, size, size);

        ctx.strokeStyle = '#ddd';
        ctx.strokeRect(0, 0, size, size);

        renderObservation({
            ctx,
            stateId,
            x: 0,
            y: 0,
            cellSize: size / grid.size,
            grid,
            imgStore,
            qValues: agentRef.current?.Q[stateId],
            type: stateViewType,
        });
    }, [stateId, size, grid, agentRef, stateViewType]);

    return (
        <canvas
            ref={canvasRef}
            width={size}
            height={size}
            style={{
                display: 'block',
                border: '1px solid #ccc',
                imageRendering: 'pixelated',
            }}
        />
    );
}
