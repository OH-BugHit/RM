import styles from './timeUp.module.css';

interface TimeRewardIconProps {
    size?: number;
}

export default function TimeRewardIcon({ size = 256 }: TimeRewardIconProps) {
    return (
        <svg
            className={styles.icon}
            width={size}
            height={size}
            viewBox="0 0 256 256"
        >
            <defs>
                {/* Metal */}

                <linearGradient
                    id="timeMetal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stop-color="#873f35"
                    />
                    <stop
                        offset="40%"
                        stop-color="#df9575"
                    />
                    <stop
                        offset="75%"
                        stop-color="#d4a855"
                    />
                    <stop
                        offset="100%"
                        stop-color="#fce1a5"
                    />
                </linearGradient>

                {/* Background */}

                <radialGradient
                    id="panel"
                    cx="50%"
                    cy="35%"
                >
                    <stop
                        offset="0%"
                        stopColor="#ce8443"
                    />
                    <stop
                        offset="100%"
                        stopColor="#382d08"
                    />
                </radialGradient>

                {/* Glass */}

                <linearGradient
                    id="glass"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#B8CED8"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>

                {/* Sand */}

                <linearGradient
                    id="sand"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#D79222"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFE4A3"
                    />
                </linearGradient>

                {/* Hover sand */}

                <linearGradient
                    id="sandHover"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#F1B23A"
                    />
                    <stop
                        offset="55%"
                        stopColor="#FFD97A"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFF6CF"
                    />
                </linearGradient>
                {/*Glass hover*/}
                <linearGradient
                    id="glassHover"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#D8EDF7"
                    />
                    <stop
                        offset="55%"
                        stopColor="#F2FBFF"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>
            </defs>

            {/* Background */}

            <circle
                className={styles.outer}
                cx="128"
                cy="128"
                r="88"
                fill="url(#panel)"
                stroke="url(#timeMetal)"
                strokeWidth="12"
            />

            <circle
                cx="128"
                cy="128"
                r="77"
                fill="none"
                stroke="#FFF6E4"
                strokeOpacity=".30"
                strokeWidth="2"
            />

            {/* Top cap */}

            <rect
                x="92"
                y="70"
                width="72"
                height="10"
                rx="5"
                fill="url(#timeMetal)"
                stroke="#617B88"
                strokeWidth="2"
            />

            {/* Bottom cap */}

            <rect
                x="92"
                y="176"
                width="72"
                height="10"
                rx="5"
                fill="url(#timeMetal)"
                stroke="#617B88"
                strokeWidth="2"
            />

            {/* Glass */}

            <path
                className={styles.glass}
                d="
        M98 80
        L118 120
        L118 136
        L98 176

        M158 80
        L138 120
        L138 136
        L158 176
    "
                fill="none"
                stroke="url(#glass)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Sand */}

            <g className={styles.sand}>
                <circle
                    cx="128"
                    cy="124"
                    r="2.6"
                />

                <circle
                    cx="128"
                    cy="132"
                    r="2.6"
                />

                <circle
                    cx="128"
                    cy="140"
                    r="2.6"
                />

                <polygon
                    points="
            109,173
            147,173
            135,143
            120,143
        "
                />
            </g>
        </svg>
    );
}
