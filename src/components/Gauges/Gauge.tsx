import { GaugeContainer, useGaugeState } from '@mui/x-charts/Gauge';

type ExplGaugeProps = {
    value: number;
    min?: number;
    max?: number;
    width?: number;
    height?: number;
    green: { from: number; to: number };
    yellow: { from: number; to: number };
    red: { from: number; to: number };
};

export default function ExplGauge({
    green,
    yellow,
    red,
    min = 0,
    value,
    max = 1,
    width = 220,
    height = 120,
}: ExplGaugeProps) {
    const segments = [
        { from: red.from, to: red.to, color: '#d32f2f' },
        { from: yellow.from, to: yellow.to * max, color: '#ffc354' },
        { from: green.from, to: green.to * max, color: '#2e7d32' },
    ];

    return (
        <div style={{ height: '100%' }}>
            <GaugeContainer
                margin={{
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
                width={width}
                height={height}
                value={value}
                valueMin={min}
                valueMax={max}
                startAngle={-90}
                endAngle={90}
            >
                {segments.map((segment) => (
                    <GaugeSegment
                        key={`${segment.from}-${segment.to}`}
                        {...segment}
                    />
                ))}

                <GaugePointer />

                <GaugeLabel />
            </GaugeContainer>
        </div>
    );
}

type SegmentProps = {
    from: number;
    to: number;
    color: string;
    strokeWidth?: number;
};

function GaugeSegment({ from, to, color, strokeWidth = 16 }: SegmentProps) {
    const { cx, cy, outerRadius, valueMin, valueMax } = useGaugeState();

    const radius = outerRadius - strokeWidth / 2;

    const toRad = (value: number) => {
        const t = (value - valueMin) / (valueMax - valueMin);

        // -90° ... +90°
        const deg = -90 + t * 180;

        return (deg * Math.PI) / 180;
    };

    const start = toRad(from);
    const end = toRad(to);

    const p1 = {
        x: cx + radius * Math.sin(start),
        y: cy - radius * Math.cos(start),
    };

    const p2 = {
        x: cx + radius * Math.sin(end),
        y: cy - radius * Math.cos(end),
    };

    const largeArc = end - start > Math.PI ? 1 : 0;

    return (
        <path
            d={`
                M ${p1.x} ${p1.y}
                A ${radius} ${radius}
                0 ${largeArc} 1
                ${p2.x} ${p2.y}
            `}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
        />
    );
}

function GaugeLabel() {
    const { cx, cy, value } = useGaugeState();

    const label = value?.toFixed(2) ?? '';

    const width = 64;
    const height = 28;

    return (
        <g>
            <rect
                x={cx - width / 2}
                y={cy - 16}
                width={width}
                height={height}
                rx={8}
                fill="white"
                stroke="#d0d0d0"
                filter="url(#label-shadow)"
            />

            <text
                x={cx}
                y={cy - 16 + height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={14}
                fontWeight={600}
                fill="#222"
                style={{
                    userSelect: 'none',
                }}
            >
                {label}
            </text>
        </g>
    );
}

function GaugePointer() {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();

    if (valueAngle === null) {
        // No value to display
        return null;
    }

    const length = outerRadius * 0.95;

    const target = {
        x: cx + length * Math.sin(valueAngle),
        y: cy - length * Math.cos(valueAngle),
    };
    return (
        <g>
            <circle
                cx={cx}
                cy={cy}
                r={5}
                fill="red"
            />
            <path
                d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
                stroke="red"
                strokeWidth={3}
            />
        </g>
    );
}
