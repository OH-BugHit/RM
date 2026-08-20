import style from './test.module.css';

interface InvestigateProps {
    size?: number;
    title?: string;
    active?: boolean;
    disabled?: boolean;
    target: number;
    current: number;
}

export default function TestIcon({
    size = 220,
    title = 'TEST',
    target,
    current,
    active = false,
    disabled,
}: InvestigateProps) {
    return (
        <svg
            className={`${style.icon} ${active ? style.pressed : ''} ${disabled ? style.disabled : ''} `}
            width={size}
            height={size}
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                {/* MAIN PANEL GRADIENT */}

                <radialGradient
                    id="agent-panel"
                    cx="32%"
                    cy="25%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFF4E3"
                    />
                    <stop
                        offset="22%"
                        stopColor="#FFD39A"
                    />
                    <stop
                        offset="55%"
                        stopColor="#F9B65F"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FD9D32"
                    />
                </radialGradient>

                {/* METAL BORDER */}

                <linearGradient
                    id="agent-metal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#756252"
                    />
                    <stop
                        offset="50%"
                        stopColor="#f9f7f2"
                    />
                    <stop
                        offset="100%"
                        stopColor="#a1967d"
                    />
                </linearGradient>

                {/* BLACK / YELLOW WARNING STRIPES */}

                <pattern
                    id="agent-warning-stripes"
                    patternUnits="userSpaceOnUse"
                    width="20"
                    height="20"
                    patternTransform="rotate(45)"
                >
                    <rect
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        fill="#F2D21B"
                    />

                    <rect
                        x="0"
                        y="0"
                        width="10"
                        height="20"
                        fill="#080808"
                    />
                </pattern>

                {/* PANEL CLIP */}

                <clipPath id="agent-panel-clip">
                    <circle
                        cx="110"
                        cy="110"
                        r="82"
                    />
                </clipPath>
            </defs>

            <circle
                className={style.outerRim}
                cx="110"
                cy="110"
                r="88"
                fill="url(#agent-panel)"
                stroke="url(#agent-metal)"
                strokeWidth="12"
            />

            <g clipPath="url(#agent-panel-clip)">
                {/* TOP */}

                <rect
                    x="18"
                    y="20"
                    width="184"
                    height="40"
                    fill="url(#agent-warning-stripes)"
                />

                {/* BOTTOM */}

                <rect
                    x="18"
                    y="160"
                    width="184"
                    height="40"
                    fill="url(#agent-warning-stripes)"
                />
            </g>

            <circle
                className={style.rim}
                cx="110"
                cy="110"
                r="77"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity=".35"
                strokeWidth="2"
            />

            {active ? (
                <text
                    x="110"
                    y="120"
                    textAnchor="middle"
                    fontFamily="Tektur, sans-serif"
                    fontSize="32"
                    fontWeight="700"
                    letterSpacing="2"
                    fill="#FFFFFF"
                    stroke="#080A0B"
                    strokeWidth="3"
                    paintOrder="stroke fill"
                >
                    {current}/{target}
                </text>
            ) : (
                <text
                    x="110"
                    y="120"
                    textAnchor="middle"
                    fontFamily="Tektur, sans-serif"
                    fontSize="32"
                    fontWeight="700"
                    letterSpacing="2"
                    fill="#FFFFFF"
                    stroke="#080A0B"
                    strokeWidth="3"
                    paintOrder="stroke fill"
                >
                    {title}
                </text>
            )}
        </svg>
    );
}
