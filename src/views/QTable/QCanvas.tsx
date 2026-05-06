import { useEffect, useMemo, useRef, useState } from 'react';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { AgentType } from '../../types';
import { gridAdventurerConfig, gridRoboDogConfig } from '../Observation/gridConfigs';
import StateChunk from './StateChunk';
import CompactHeatmapCanvas from './CompactHeatmapCanvas';
import { ChunkGridConfig, getChunkCanvasSize, getGridChunkPosition, getVisibleChunks } from './chunkUtils';

interface QCanvasProps {
    agent: React.RefObject<QLearningAgent | undefined>;
    type: AgentType;
    disabled?: boolean;
    scrollToState?: string;
}

/**
 * Chunked Q-table canvas renderer
 * Divides Q-table into manageable chunks to avoid rendering 250k states at once
 * Chunks arranged in grid pattern
 *
 * TUNABLE PARAMETERS:
 * - STATES_PER_SIDE: Number of states per side (10 = 10x10 = 100 states/chunk, try 9 or 8)
 * - CHECK_INTERVAL: How often to check for state updates (ms)
 */
export default function QCanvas({ agent, type, disabled, scrollToState }: QCanvasProps) {
    // ===== 🎯 TUNABLE CONFIGURATION =====
    const STATES_PER_SIDE = 4; // 10x10 = 100 states per chunk (tune: 9 for 81, 8 for 64)
    const CHECK_INTERVAL = 100; // How often to check visitTimes (ms)
    // ===== END TUNABLE =====

    const chunkConfig: ChunkGridConfig = useMemo(
        () => ({
            statesPerSide: STATES_PER_SIDE,
            stateSpacing: 40 + (type === 'adventurer' ? 200 : 240),
        }),
        [type]
    );

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
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [updateCount, setUpdateCount] = useState(0);
    const lastVisitTimesRef = useRef<Record<string, number>>({});
    const monitoringRef = useRef(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [visibleChunks, setVisibleChunks] = useState<Set<number>>(new Set());
    const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

    // Monitor visitTimes changes to trigger chunk redraws
    useEffect(() => {
        if (disabled || !agent.current) {
            monitoringRef.current = false;
            return;
        }

        monitoringRef.current = true;
        const interval = setInterval(() => {
            if (!monitoringRef.current || !agent.current) return;

            const currentVisitTimes = agent.current.visitTimes;
            let hasChanges = false;

            for (const [state, visitTime] of Object.entries(currentVisitTimes)) {
                if ((lastVisitTimesRef.current[state] || 0) !== visitTime) {
                    hasChanges = true;
                    break;
                }
            }

            if (hasChanges || Object.keys(currentVisitTimes).length !== Object.keys(lastVisitTimesRef.current).length) {
                lastVisitTimesRef.current = { ...currentVisitTimes };
                setUpdateCount((prev) => prev + 1);
            }
        }, CHECK_INTERVAL);

        return () => {
            clearInterval(interval);
            monitoringRef.current = false;
        };
    }, [disabled, agent]);

    // Calculate number of chunks needed
    const numChunks = useMemo(() => {
        if (!agent.current) return 0;
        const qTable = agent.current.getQTable();
        const statesPerChunk = chunkConfig.statesPerSide * chunkConfig.statesPerSide;
        const count = Math.ceil(Object.keys(qTable).length / statesPerChunk);
        return count;
    }, [agent, chunkConfig]);

    // Calculate visible chunks for viewport virtualization
    useEffect(() => {
        if (!containerRef.current) return;

        const chunkSize = getChunkCanvasSize(chunkConfig);
        const visible = getVisibleChunks(
            containerRef.current.clientWidth,
            containerRef.current.clientHeight,
            panX,
            panY,
            zoomLevel,
            chunkSize,
            numChunks,
            2 // preload margin: 2 chunk sizes around viewport
        );

        setVisibleChunks(visible);
    }, [panX, panY, zoomLevel, numChunks, chunkConfig]);

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        setZoomLevel((prev) => Math.max(0.5, prev * zoomFactor)); // Allow zoom down to 0.5 to see full grid
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            panX,
            panY,
        };
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - dragStartRef.current.x;
        const deltaY = e.clientY - dragStartRef.current.y;

        setPanX(dragStartRef.current.panX + deltaX);
        setPanY(dragStartRef.current.panY + deltaY);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    if (disabled) {
        return <div style={{ padding: '20px', color: '#999' }}>Game is running</div>;
    }

    const chunkCanvasSize = getChunkCanvasSize(chunkConfig);

    // Determine LOD: LOD 1 (detailed, 0.8-2x zoom) vs LOD 2 (compact overview, <0.8x)
    const isDetailedLOD = zoomLevel >= 0.8;

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '800px',
                overflow: 'hidden',
                border: '1px solid black',
                cursor: isDragging ? 'grabbing' : 'grab',
                background: '#f5f5f5',
                position: 'relative',
            }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {isDetailedLOD ? (
                // LOD 1: Detailed chunked view with panning
                <div
                    ref={contentRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: `translate(${panX}px, ${panY}px) scale(${zoomLevel})`,
                        transformOrigin: 'top left',
                        width: 'fit-content',
                        height: 'fit-content',
                        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                    }}
                >
                    {Array.from(visibleChunks).map((chunkIndex) => {
                        const gridPos = getGridChunkPosition(chunkIndex, chunkCanvasSize);
                        return (
                            <div
                                key={chunkIndex}
                                style={{
                                    position: 'absolute',
                                    left: gridPos.x,
                                    top: gridPos.y,
                                    width: chunkCanvasSize,
                                    height: chunkCanvasSize,
                                }}
                            >
                                <StateChunk
                                    agent={agent}
                                    chunkIndex={chunkIndex}
                                    config={gridConfig}
                                    chunkConfig={chunkConfig}
                                    updateTrigger={updateCount}
                                    lastKnownVisitTimes={lastVisitTimesRef.current}
                                    scrollToState={scrollToState}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                // LOD 2: Compact overview showing all states at once
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: `translate(${panX}px, ${panY}px) scale(${zoomLevel})`,
                        transformOrigin: 'top left',
                        transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                    }}
                >
                    <CompactHeatmapCanvas
                        agent={agent}
                        config={gridConfig}
                        scrollToState={scrollToState}
                        updateTrigger={updateCount}
                    />
                </div>
            )}
        </div>
    );
}
