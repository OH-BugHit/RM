import styles from './statsIcon.module.css';

interface StatsIconProps {
    size?: number;
}

export default function StatsIcon({ size = 220 }: StatsIconProps) {
    return (
        <svg
            className={styles.icon}
            width={size}
            height={size}
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient
                    id="stats-panel"
                    cx="50%"
                    cy="35%"
                >
                    <stop
                        offset="0%"
                        stopColor="#9B59B6"
                    />
                    <stop
                        offset="55%"
                        stopColor="#5B2875"
                    />
                    <stop
                        offset="100%"
                        stopColor="#291334"
                    />
                </radialGradient>

                <linearGradient
                    id="stats-metal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#66516F"
                    />
                    <stop
                        offset="50%"
                        stopColor="#E3D8E8"
                    />
                    <stop
                        offset="100%"
                        stopColor="#8A7195"
                    />
                </linearGradient>

                <linearGradient
                    id="stats-line"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#B56AD0"
                    />
                    <stop
                        offset="100%"
                        stopColor="#F0DFFF"
                    />
                </linearGradient>
            </defs>

            {/* Outer panel */}

            <circle
                className={styles.outerRim}
                cx="110"
                cy="110"
                r="88"
                fill="url(#stats-panel)"
                stroke="url(#stats-metal)"
                strokeWidth="12"
            />

            {/* Inner rim */}

            <circle
                className={styles.innerRim}
                cx="110"
                cy="110"
                r="77"
                fill="none"
                stroke="#F8EEFF"
                strokeOpacity=".30"
                strokeWidth="2"
            />

            {/* Chart */}

            <rect
                x="56"
                y="58"
                width="108"
                height="104"
                rx="11"
                fill="#291334"
                fillOpacity=".42"
                stroke="#F0DFFF"
                strokeOpacity=".20"
                strokeWidth="2"
            />

            {/* Grid */}

            <g className={styles.grid}>
                <path d="M69 84 H151" />
                <path d="M69 106 H151" />
                <path d="M69 128 H151" />

                <path d="M90 71 V149" />
                <path d="M110 71 V149" />
                <path d="M130 71 V149" />
            </g>

            {/* Axes */}

            <g className={styles.axes}>
                <path d="M69 149 V71" />
                <path d="M69 149 H151" />
            </g>

            {/* Graph shadow */}

            <path
                className={styles.graphShadow}
                d="
                    M71 137
                    L87 128
                    L104 133
                    L121 103
                    L137 113
                    L149 81
                "
            />

            {/* Graph */}

            <path
                className={styles.graph}
                d="
                    M71 137
                    L87 128
                    L104 133
                    L121 103
                    L137 113
                    L149 81
                "
            />

            {/* Data points */}

            <g className={styles.points}>
                <circle
                    cx="71"
                    cy="137"
                    r="5"
                />
                <circle
                    cx="87"
                    cy="128"
                    r="5"
                />
                <circle
                    cx="104"
                    cy="133"
                    r="5"
                />
                <circle
                    cx="121"
                    cy="103"
                    r="5"
                />
                <circle
                    cx="137"
                    cy="113"
                    r="5"
                />
                <circle
                    cx="149"
                    cy="81"
                    r="5"
                />
            </g>
        </svg>
    );
}
