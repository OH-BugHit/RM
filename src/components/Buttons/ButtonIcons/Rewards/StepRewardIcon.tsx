import styles from './stepReward.module.css';

interface StepRewardIconProps {
    size?: number;
}

export default function StepRewardIcon({ size = 256 }: StepRewardIconProps) {
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
                    id="rewardStepMetal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#873f35"
                    />
                    <stop
                        offset="40%"
                        stopColor="#df9575"
                    />
                    <stop
                        offset="75%"
                        stopColor="#d4a855"
                    />
                    <stop
                        offset="100%"
                        stopColor="#fce1a5"
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

                {/* Silver */}

                <linearGradient
                    id="silver"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#AFC5D1"
                    />
                    <stop
                        offset="45%"
                        stopColor="#DDECF2"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>

                <linearGradient
                    id="silverHover"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#D2E5EE"
                    />
                    <stop
                        offset="45%"
                        stopColor="#F4FBFF"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>

                {/* Gold */}

                <linearGradient
                    id="gold"
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
                        offset="55%"
                        stopColor="#F7C75A"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFF1C3"
                    />
                </linearGradient>

                <linearGradient
                    id="goldHover"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#F0B43C"
                    />
                    <stop
                        offset="55%"
                        stopColor="#FFD978"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFF8D8"
                    />
                </linearGradient>
            </defs>
            {/* Button */}

            <circle
                className={styles.innerRing}
                cx="128"
                cy="128"
                r="88"
                fill="url(#panel)"
                stroke="url(#rewardStepMetal)"
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

            {/* Play */}

            <path
                className={styles.play}
                d="
        M86 95
        Q86 91 90 91
        L146 123
        Q150 125 150 128
        Q150 131 146 133
        L90 165
        Q86 165 86 161
        Z"
            />

            {/* Play highlight */}

            <path
                className={styles.playHighlight}
                d="
        M96 103
        L136 126"
            />

            {/* Stop bar */}

            <rect
                className={styles.bar}
                x="158"
                y="89"
                width="16"
                height="78"
                rx="6"
            />

            {/* Bar shine */}

            <rect
                x="162"
                y="95"
                width="4"
                height="66"
                rx="2"
                fill="#FFFFFF"
                opacity=".45"
            />
        </svg>
    );
}
