import { useMemo } from 'react';
import { AgentType, GridConfig } from '../../types';
import { getQColor } from '../../utils/common';
import { gridRoboDogConfig, gridAdventurerConfig } from './gridConfigs';

interface QTableProps {
    state: string;
    disabled: boolean;
    actionValues: number[];
    type: AgentType;
}

export default function DrawObservation({ state, disabled, actionValues, type }: QTableProps) {
    const [neighbours, burglar] = state.split('-');
    const qValues = actionValues;
    const maxQ = Math.max(...qValues);
    const minQ = Math.min(...qValues);

    const config = useMemo(() => {
        switch (type) {
            case 'adventurer':
                return gridAdventurerConfig;
            case 'hoover':
                return gridRoboDogConfig;
            default:
                return gridRoboDogConfig;
        }
    }, [type]);

    const itemizer = (key: string, i: number) => {
        switch (key) {
            case '0': {
                return (
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            border: '1px solid black',
                            background: getQColor(i, minQ, maxQ),
                        }}
                    />
                );
            }
            case '1': {
                return (
                    <img
                        src="pot_intact.png"
                        width={40}
                        height={40}
                        style={{
                            overflow: 'visible',
                            display: 'block',
                            width: 40,
                            height: 40,
                            border: '1px solid black',
                            background: getQColor(i, minQ, maxQ),
                        }}
                    />
                );
            }
            case '2': {
                return (
                    <img
                        src="wall_opacue.png"
                        width={40}
                        height={40}
                        style={{
                            overflow: 'visible',
                            display: 'block',
                            width: 40,
                            height: 40,
                            border: '1px solid black',
                            background: getQColor(i, minQ, maxQ),
                        }}
                    />
                );
            }
            default:
                return null;
        }
    };

    const drawGrid = (config: GridConfig) => {
        const total = config.size * config.size;
        const cells = [];

        for (let i = 0; i < total; i++) {
            if (config.hidden?.includes(i)) {
                cells.push(
                    <div
                        key={i}
                        style={{ width: 40, height: 40 }}
                    />
                );
                continue;
            }

            // special (esim. agent image)
            if (config.special?.[i] === 'bark') {
                cells.push(
                    <div
                        key={i}
                        style={{ position: 'relative', width: 40, height: 40 }}
                    >
                        <img
                            src="hau.png"
                            width={40}
                            height={40}
                            style={{
                                position: 'absolute',
                                right: '-10px',
                                top: '-10px',
                                border: '1px solid black',
                                background: getQColor(actionValues[config.qMap[i]], minQ, maxQ),
                            }}
                        />
                    </div>
                );
                continue;
            }

            // center
            if (i === config.center) {
                cells.push(
                    <div
                        key={i}
                        style={{
                            width: 40,
                            height: 40,
                            border: '1px solid black',
                            background: getQColor(actionValues[config.qMap[i]], minQ, maxQ),
                        }}
                    />
                );
                continue;
            }

            // neighbours
            const nIndex = config.neighborMap[i];
            const qIndex = config.qMap[i];
            const value = neighbours[nIndex];

            cells.push(<div key={i}>{value ? itemizer(value, actionValues[qIndex]) : null}</div>);
        }

        return cells;
    };

    if (disabled) return null;

    return (
        <div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '20px auto 20px',
                    gridTemplateRows: '20px auto 20px',
                    alignItems: 'center',
                    justifyItems: 'center',
                    overflow: 'visible',
                }}
            >
                {/* TOP */}
                <div />
                <div>
                    <img
                        src="/burglar2.png"
                        width={20}
                        style={{ opacity: burglar === '0' ? 1 : 0 }}
                    />
                </div>
                <div />

                {/* MIDDLE */}
                <div>
                    <img
                        src="/burglar2.png"
                        width={20}
                        style={{ opacity: burglar === '3' ? 1 : 0 }}
                    />
                </div>

                {/* GRID */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${config.size}, 40px)`,
                    }}
                >
                    {drawGrid(config)}
                </div>

                <div>
                    <img
                        src="/burglar.png"
                        width={20}
                        style={{ opacity: burglar === '2' ? 1 : 0 }}
                    />
                </div>

                {/* BOTTOM */}
                <div />
                <div>
                    <img
                        src="/burglar.png"
                        width={20}
                        style={{ opacity: burglar === '1' ? 1 : 0 }}
                    />
                </div>
                <div />
            </div>
        </div>
    );
}
