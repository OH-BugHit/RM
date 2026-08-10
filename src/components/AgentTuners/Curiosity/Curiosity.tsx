import styles from './style.module.css';

interface CuriosityIconProps {
    value: number; // 0...1
    size?: number;
}

export default function CuriosityIcon({ value, size = 256 }: CuriosityIconProps) {
    const clamped = Math.max(0, Math.min(1, value));

    // Hub

    const centerX = 128;
    const centerY = 118;

    // Distance from hub to the START of each arrow
    const arrowOffset = 60;

    // Spread

    const maxAngle = 80;

    const angles = [-maxAngle / 1.5, 0, maxAngle / 1.5];

    const arrows = angles.map((angle, index) => {
        const radians = (angle * Math.PI) / 180;

        const startX = centerX + arrowOffset * Math.sin(radians);

        const startY = centerY - arrowOffset * Math.cos(radians);

        return {
            angle,

            startX,
            startY,

            opacity: index === 1 ? 1 : clamped,
        };
    });

    return (
        <svg
            className={styles.icon}
            width={size}
            viewBox="0 0 256 128"
            preserveAspectRatio="xMidYMid meet"
        >
            {/* defs */}
            <defs>
                <linearGradient
                    id="arrowGradient"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#1E63D4"
                    />
                    <stop
                        offset="42%"
                        stopColor="#39AFFF"
                    />
                    <stop
                        offset="72%"
                        stopColor="#7AE4FF"
                    />
                    <stop
                        offset="100%"
                        stopColor="#DDFBFF"
                    />
                </linearGradient>

                <filter
                    id="glow"
                    x="-40%"
                    y="-40%"
                    width="180%"
                    height="180%"
                >
                    <feGaussianBlur stdDeviation="4" />
                </filter>
            </defs>

            {/* Glow */}

            <g
                fill="#69D8FF"
                opacity={0.18}
                filter="url(#glow)"
            >
                {arrows.map((arrow, index) => (
                    <g
                        key={`glow-${index}`}
                        opacity={arrow.opacity}
                        transform={`
                translate(${arrow.startX} ${arrow.startY})
                rotate(${arrow.angle})
            `}
                    >
                        <path
                            d="
                    M-5 0
                    H-11
                    L0 -22
                    L11 0
                    H5
                    V40
                    H-5
                    Z
                "
                        />
                    </g>
                ))}
            </g>

            {/* Arrows */}

            {arrows.map((arrow, index) => (
                <g
                    key={index}
                    opacity={arrow.opacity}
                    transform={`
            translate(${arrow.startX} ${arrow.startY})
            rotate(${arrow.angle})
        `}
                >
                    <path
                        d="
                M-5 0
                H-11
                L0 -22
                L11 0
                H5
                V40
                H-5
                Z
            "
                        fill="url(#arrowGradient)"
                        stroke="#143D72"
                        strokeWidth="3"
                        strokeLinejoin="round"
                    />
                </g>
            ))}

            {/* hub */}

            <circle
                cx={centerX}
                cy={centerY}
                r="7"
                fill="#2EAFFF"
                stroke="#143D72"
                strokeWidth="3"
            />
        </svg>
    );
}
