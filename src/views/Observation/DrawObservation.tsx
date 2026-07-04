import { useMemo } from 'react';
import { parseObservationState } from '../../components/agents/utils';
import { EnvironmentTypes, GridConfig, ObservationShape } from '../../types';
import { getQColor } from '../../utils/common';
import { gridSmallConfig, gridLargeCongig } from '../../components/QTable/gridConfigs';
import { defaultImages } from '../../utils/defaults';

interface QTableProps {
    state: string;
    disabled: boolean;
    actionValues: number[];
    type: ObservationShape;
    drawActions?: boolean;
    envType?: EnvironmentTypes;
    tileSize?: number;
}

export default function DrawObservation({
    state,
    disabled,
    actionValues,
    type,
    drawActions = true,
    envType = 'potsAndBurglar',
    tileSize = 40,
}: QTableProps) {
    const { neighbours: neighbours, POIdirection } = parseObservationState(state);
    const burglar = String(POIdirection);
    const qValues = actionValues;
    const maxQ = Math.max(...qValues);
    const minQ = Math.min(...qValues);

    const images = useMemo(() => {
        return defaultImages[envType];
    }, [envType]);

    const config = useMemo(() => {
        switch (type) {
            case 'large':
                return gridLargeCongig;
            case 'small':
                return gridSmallConfig;
            default:
                return gridSmallConfig;
        }
    }, [type]);

    const itemizer = (key: string, i: number) => {
        switch (key) {
            case '-1': {
                return (
                    <img
                        src={images.n1}
                        width={tileSize}
                        height={tileSize}
                        style={{
                            overflow: 'visible',
                            display: 'block',
                            width: tileSize,
                            height: tileSize,
                            border: '1px solid black',
                            background: drawActions ? getQColor(i, minQ, maxQ) : 'none',
                        }}
                    />
                );
            }
            case '0': {
                if (images.p0 === 'none') {
                    return (
                        <div
                            style={{
                                width: tileSize,
                                height: tileSize,
                                border: '1px solid black',
                                background: drawActions ? getQColor(i, minQ, maxQ) : 'none',
                            }}
                        />
                    );
                } else {
                    return (
                        <img
                            src={images.p0}
                            width={tileSize}
                            height={tileSize}
                            style={{
                                overflow: 'visible',
                                display: 'block',
                                width: tileSize,
                                height: tileSize,
                                border: '1px solid black',
                                background: drawActions ? getQColor(i, minQ, maxQ) : 'none',
                            }}
                        />
                    );
                }
            }
            case '1': {
                return (
                    <img
                        src={images.p1}
                        width={tileSize}
                        height={tileSize}
                        style={{
                            overflow: 'visible',
                            display: 'block',
                            width: tileSize,
                            height: tileSize,
                            border: '1px solid black',
                            background: drawActions ? getQColor(i, minQ, maxQ) : 'none',
                        }}
                    />
                );
            }
            case '2': {
                return (
                    <img
                        src={images.p2}
                        width={tileSize}
                        height={tileSize}
                        style={{
                            overflow: 'visible',
                            display: 'block',
                            width: tileSize,
                            height: tileSize,
                            border: '1px solid black',
                            background: drawActions ? getQColor(i, minQ, maxQ) : 'none',
                        }}
                    />
                );
            }
            case '3': {
                return (
                    <img
                        src={images.p3}
                        width={tileSize}
                        height={tileSize}
                        style={{
                            overflow: 'visible',
                            display: 'block',
                            width: tileSize,
                            height: tileSize,
                            border: '1px solid black',
                            background: drawActions ? getQColor(i, minQ, maxQ) : 'none',
                        }}
                    />
                );
            }
            case '4': {
                return (
                    <img
                        src={images.p4}
                        width={tileSize}
                        height={tileSize}
                        style={{
                            overflow: 'visible',
                            display: 'block',
                            width: tileSize,
                            height: tileSize,
                            border: '1px solid black',
                            background: drawActions ? getQColor(i, minQ, maxQ) : 'none',
                        }}
                    />
                );
            }
            case '5': {
                return (
                    <img
                        src={images.p5}
                        width={tileSize}
                        height={tileSize}
                        style={{
                            overflow: 'visible',
                            display: 'block',
                            width: tileSize,
                            height: tileSize,
                            border: '1px solid black',
                            background: drawActions ? getQColor(i, minQ, maxQ) : 'none',
                        }}
                    />
                );
            }
            case '6': {
                return (
                    <img
                        src={images.p6}
                        width={tileSize}
                        height={tileSize}
                        style={{
                            overflow: 'visible',
                            display: 'block',
                            width: tileSize,
                            height: tileSize,
                            border: '1px solid black',
                            background: drawActions ? getQColor(i, minQ, maxQ) : 'none',
                        }}
                    />
                );
            }
            case '7': {
                return (
                    <img
                        src={images.p7}
                        width={tileSize}
                        height={tileSize}
                        style={{
                            overflow: 'visible',
                            display: 'block',
                            width: tileSize,
                            height: tileSize,
                            border: '1px solid black',
                            background: drawActions ? getQColor(i, minQ, maxQ) : 'none',
                        }}
                    />
                );
            }
            case '8': {
                return (
                    <img
                        src={images.p8}
                        width={tileSize}
                        height={tileSize}
                        style={{
                            overflow: 'visible',
                            display: 'block',
                            width: tileSize,
                            height: tileSize,
                            border: '1px solid black',
                            background: drawActions ? getQColor(i, minQ, maxQ) : 'none',
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
                        style={{ width: tileSize, height: tileSize }}
                    />
                );
                continue;
            }

            // special (esim. agent image)
            if (config.special?.[i] === 'bark') {
                if (drawActions) {
                    cells.push(
                        <div
                            key={i}
                            style={{ position: 'relative', width: tileSize, height: tileSize }}
                        >
                            <img
                                src={images.specialAction1}
                                width={tileSize}
                                height={tileSize}
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
                } else {
                    cells.push(
                        <div
                            key={i}
                            style={{ width: tileSize, height: tileSize }}
                        />
                    );
                }
                continue;
            }

            // center
            if (i === config.center) {
                cells.push(
                    <div
                        key={i}
                        style={{
                            width: tileSize,
                            height: tileSize,
                            border: '1px solid black',
                            background: drawActions ? getQColor(actionValues[config.qMap[i]], minQ, maxQ) : 'none',
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
        <div
            style={
                envType === 'potsAndBurglar'
                    ? {
                          display: 'grid',
                          gridTemplateColumns: '20px auto 20px',
                          gridTemplateRows: '20px auto 20px',
                          alignItems: 'center',
                          justifyItems: 'center',
                          overflow: 'visible',
                      }
                    : {
                          alignItems: 'center',
                          justifyItems: 'center',
                          overflow: 'visible',
                      }
            }
        >
            {envType === 'potsAndBurglar' && (
                <>
                    {/* TOP */}
                    <div />
                    <div>
                        <img
                            src={images.burglar2}
                            width={Math.ceil(tileSize / 2)}
                            style={{ opacity: burglar === '0' ? 1 : 0 }}
                        />
                    </div>
                    <div />

                    {/* MIDDLE */}
                    <div>
                        <img
                            src={images.burglar2}
                            width={Math.ceil(tileSize / 2)}
                            style={{ opacity: burglar === '3' ? 1 : 0 }}
                        />
                    </div>
                </>
            )}

            {/* GRID */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${config.size}, 40px)`,
                }}
            >
                {drawGrid(config)}
            </div>
            {envType === 'potsAndBurglar' && (
                <>
                    <div>
                        <img
                            src={images.burglar1}
                            width={Math.ceil(tileSize / 2)}
                            style={{ opacity: burglar === '2' ? 1 : 0 }}
                        />
                    </div>

                    {/* BOTTOM */}
                    <div />
                    <div>
                        <img
                            src={images.burglar1}
                            width={Math.ceil(tileSize / 2)}
                            style={{ opacity: burglar === '1' ? 1 : 0 }}
                        />
                    </div>
                    <div />
                </>
            )}
        </div>
    );
}
