import { useAtomValue } from 'jotai';
import { QLearningAgent } from '../../../../components/agents/rlAgentQ';
import { gridLargeCongig, gridSmallConfig } from '../../../../components/QTable/gridConfigs';
import CompactHeatmapCanvas from '../CompactHeatmapCanvas';
import style from './style.module.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ActiveAgentAtom } from '../../../../atoms/state';

interface QCanvasProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    scrollToState?: string;
}

const START_SIZE = 120;
export default function LodFar({ agentRef, scrollToState }: QCanvasProps) {
    const agent = useAtomValue(ActiveAgentAtom);
    const containerRef = useRef<HTMLDivElement>(null);
    const [stateSize, setStateSize] = useState(START_SIZE);
    const [updateCount, setUpdateCount] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !agentRef.current) return;

        const calculateStateSize = () => {
            const qTable = agentRef.current?.getQTable();
            if (!qTable) return;

            const stateCount = Object.keys(qTable).length;

            if (stateCount < 2) {
                setStateSize(START_SIZE);
                return;
            }

            const cols = Math.ceil(Math.sqrt(stateCount));
            const rows = Math.ceil(stateCount / cols);

            const width = container.clientWidth;
            const height = container.clientHeight;

            let size = START_SIZE;
            const gap = 4;

            while (cols * (size + gap) > width || rows * (size + gap) > height) {
                size = Math.floor(size * 0.9);

                if (size <= 4) {
                    size = 4;
                    break;
                }
            }

            setStateSize(size);
        };

        calculateStateSize();

        const observer = new ResizeObserver(calculateStateSize);

        observer.observe(container);

        return () => observer.disconnect();
    }, [agentRef, updateCount]);

    const lastVisitTimesRef = useRef<Record<string, number>>({});
    const monitoringRef = useRef(false);

    const CHECK_INTERVAL = 100;

    const gridConfig = useMemo(() => {
        switch (agent.observationShape) {
            case 'large':
                return gridLargeCongig;
            case 'small':
                return gridSmallConfig;
            default:
                return gridSmallConfig;
        }
    }, [agent.observationShape]);

    // Monitor Q-table changes (only trigger redraw when needed) Redraw whole thing every update currently as it is not actually that bad
    useEffect(() => {
        if (!agentRef.current) {
            monitoringRef.current = false;
            return;
        }

        monitoringRef.current = true;

        const interval = setInterval(() => {
            if (!monitoringRef.current || !agentRef.current) return;

            const currentVisitTimes = agentRef.current.visitTimes;
            const prev = lastVisitTimesRef.current;

            let hasChanges = false;

            for (const [state, time] of Object.entries(currentVisitTimes)) {
                if ((prev[state] || 0) !== time) {
                    hasChanges = true;
                    break;
                }
            }

            if (hasChanges || Object.keys(currentVisitTimes).length !== Object.keys(prev).length) {
                lastVisitTimesRef.current = { ...currentVisitTimes };
                setUpdateCount((c) => c + 1);
            }
        }, CHECK_INTERVAL);

        return () => {
            clearInterval(interval);
            monitoringRef.current = false;
        };
    }, [agentRef]);

    return (
        <div
            ref={containerRef}
            className={style.qCanvasContainer}
            data-dismissible-exclude
        >
            <CompactHeatmapCanvas
                agent={agentRef}
                config={gridConfig}
                scrollToState={scrollToState}
                updateTrigger={updateCount}
                stateSize={stateSize}
            />
        </div>
    );
}
