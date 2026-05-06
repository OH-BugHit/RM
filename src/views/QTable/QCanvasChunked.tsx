/*

import { useEffect, useMemo, useRef, useState } from 'react';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { AgentType, Camera } from '../../types';
import { gridAdventurerConfig, gridRoboDogConfig } from '../Observation/gridConfigs';
import StateChunk from './StateChunk';
import { ChunkGridConfig, getChunkInfo } from './chunkUtils';


interface QCanvasChunkedProps {
    agent: React.RefObject<QLearningAgent | undefined>;
    type: AgentType;
    disabled?: boolean;
    scrollToState?: string | undefined;
}

/**
 * Chunked Q-table canvas renderer
 * Divides Q-table into manageable chunks to avoid rendering 250k states at once
 
export default function QCanvasChunked({ agent, type, disabled, scrollToState }: QCanvasChunkedProps) {
    // ===== TUNABLE CONFIGURATION =====
    const chunkConfig: ChunkGridConfig = useMemo(
        () => ({
            statesPerSide: 10, // 10x10 = 100 states per chunk (9x9=81, 8x8=64 also work)
            stateSpacing: 40 + (type === 'adventurer' ? 200 : 240), // This should match your config.size
        }),
        [type]
    );
    // ===== END TUNABLE CONFIG =====

    const gridConfig = useMemo(() => {
        switch (type) {
            case 'adventurer':
                return gridAdventurerConfig;
            case 'hoover':
                return gridRoboDogConfig;
            default:
                return gridRoboDogConfig;
        }
    }, [type]);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const cameraRef = useRef<Camera>({
        x: 0,
        y: 0,
        scale: 1,
    });

    const [, setRenderTrigger] = useState(0); // Force re-render when visitTimes change
    const lastVisitTimesRef = useRef<Record<string, number>>({});

    // Monitor visitTimes changes to trigger chunk redraws
    useEffect(() => {
        if (disabled || !agent.current) return;

        const interval = setInterval(() => {
            const currentVisitTimes = agent.current!.visitTimes;
            const hasChanges = Object.keys(currentVisitTimes).length !== Object.keys(lastVisitTimesRef.current).length;

            if (!hasChanges) {
                // Check for updated visit times
                for (const [state, visitTime] of Object.entries(currentVisitTimes)) {
                    if ((lastVisitTimesRef.current[state] || 0) !== visitTime) {
                        lastVisitTimesRef.current = { ...currentVisitTimes };
                        setRenderTrigger((prev) => prev + 1);
                        return;
                    }
                }
            } else {
                lastVisitTimesRef.current = { ...currentVisitTimes };
                setRenderTrigger((prev) => prev + 1);
            }
        }, 100); // Check every 100ms (tunable)

        return () => clearInterval(interval);
    }, [disabled, agent]);

    // Calculate number of chunks needed
    const numChunks = useMemo(() => {
        if (!agent.current) return 0;
        const qTable = agent.current.getQTable();
        const statesPerChunk = chunkConfig.statesPerSide * chunkConfig.statesPerSide;
        return Math.ceil(Object.keys(qTable).length / statesPerChunk);
    }, [agent, chunkConfig]);

    // Handle scroll to state
    useEffect(() => {
        if (!scrollToState || !agent.current || !containerRef.current) return;

        const qTable = agent.current.getQTable();
        const stateIndex = Object.keys(qTable).indexOf(scrollToState);
        if (stateIndex === -1) return;

        const chunkInfo = getChunkInfo(stateIndex, chunkConfig);
        const chunkCanvasSize = chunkConfig.statesPerSide * chunkConfig.stateSpacing;

        // Calculate chunk position
        const chunksPerRow = 10;
        const chunkX = (chunkInfo.chunkIndex % chunksPerRow) * chunkCanvasSize;
        const chunkY = Math.floor(chunkInfo.chunkIndex / chunksPerRow) * chunkCanvasSize;

        // Add state offset within chunk
        const stateOffsetX = chunkInfo.xInChunk * chunkConfig.stateSpacing;
        const stateOffsetY = chunkInfo.yInChunk * chunkConfig.stateSpacing;

        const targetX = chunkX + stateOffsetX;
        const targetY = chunkY + stateOffsetY;

        // Smooth scroll to center the state
        const container = containerRef.current;
        const centerX = targetX - container.clientWidth / 2 / cameraRef.current.scale;
        const centerY = targetY - container.clientHeight / 2 / cameraRef.current.scale;

        cameraRef.current.x = centerX * cameraRef.current.scale * -1;
        cameraRef.current.y = centerY * cameraRef.current.scale * -1;
    }, [scrollToState, agent, chunkConfig]);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        cameraRef.current.scale *= zoomFactor;
        setRenderTrigger((prev) => prev + 1);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (e.buttons !== 1) return;
        cameraRef.current.x += e.movementX;
        cameraRef.current.y += e.movementY;
    };

    if (disabled) {
        return <div style={{ padding: '20px', color: '#999' }}>Game is running</div>;
    }

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '800px',
                overflow: 'auto',
                border: '1px solid black',
                cursor: 'grab',
                background: '#f5f5f5',
            }}
            onWheel={handleWheel}
            onMouseMove={handleMouseMove}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(10, ${chunkConfig.statesPerSide * chunkConfig.stateSpacing}px)`,
                    gap: '0px',
                    transform: `scale(${cameraRef.current.scale}) translate(${cameraRef.current.x}px, ${cameraRef.current.y}px)`,
                    transformOrigin: '0 0',
                    width: 'fit-content',
                }}
            >
                {Array.from({ length: numChunks }).map((_, chunkIndex) => (
                    <StateChunk
                        key={chunkIndex}
                        agent={agent}
                        chunkIndex={chunkIndex}
                        config={gridConfig}
                        chunkConfig={chunkConfig}
                        lastKnownVisitTimes={lastVisitTimesRef.current}
                    />
                ))}
            </div>
        </div>
    );
}
*/
