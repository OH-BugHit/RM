import { getQColor } from '../../utils/common';

interface QTableProps {
    state: string;
    disabled: boolean;
    actionValues: number[];
}

export default function DrawObservation({ state, disabled, actionValues }: QTableProps) {
    const [neighbours, burglar] = state.split('-');
    const gridSize = neighbours.length - 1;
    const qValues = actionValues;
    const maxQ = Math.max(...qValues);
    const minQ = Math.min(...qValues);

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
                            width: 40,
                            height: 40,
                            border: '1px solid black',
                            background: getQColor(i, minQ, maxQ),
                        }}
                    />
                );
            }
        }
    };

    const drawGrid = () => {
        if (neighbours.length !== 4) return null; // TODO: Other observation spaces

        const cells = [];

        for (let i = 0; i < 9; i++) {
            // corners off
            const isCorner = [0, 6, 8].includes(i);

            if (isCorner) {
                cells.push(
                    <div
                        key={i}
                        style={{
                            width: 40,
                            height: 40,
                            background: 'none',
                        }}
                    />
                );
                continue;
            }

            if (i === 2) {
                cells.push(
                    <div style={{ position: 'relative', width: 40, height: 40 }}>
                        <img
                            src="hau.png"
                            width={40}
                            height={40}
                            style={{
                                position: 'absolute',
                                right: '-10px',
                                top: '-10px',
                                overflow: 'visible',
                                border: '1px solid black',
                                background: getQColor(actionValues[4], minQ, maxQ),
                            }}
                        />
                    </div>
                );
                continue;
            }

            // center
            if (i === 4) {
                cells.push(
                    <div
                        key={i}
                        style={{
                            width: 40,
                            height: 40,
                            border: '1px solid black',
                            background: getQColor(actionValues[5], minQ, maxQ),
                        }}
                    />
                );
                continue;
            }

            // reunat mapataan neighboursiin
            const mapping = {
                1: neighbours[0], // top
                5: neighbours[3], // right
                7: neighbours[1], // bottom
                3: neighbours[2], // left
            };

            const qMapping = {
                1: 0, // top
                3: 2, // right
                5: 3, // bottom
                7: 1, // left
            };

            const qMap = qMapping[i as keyof typeof qMapping];

            const value = mapping[i as keyof typeof mapping];

            cells.push(
                <div
                    style={{ maxHeight: '20px' }}
                    key={i}
                >
                    {value ? itemizer(value, actionValues[qMap]) : null}
                </div>
            );
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
                        gridTemplateColumns: `repeat(${gridSize}, 40px)`,
                    }}
                >
                    {drawGrid()}
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
