import styles from './propRewardsIcon.module.css';

interface OtherRewardsIconProps {
    size?: number;
}

export default function PropRewardsIcon({ size = 256 }: OtherRewardsIconProps) {
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
                    id="propMetal"
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

                {/* Card */}

                <linearGradient
                    id="card"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#B8CAD4"
                    />
                    <stop
                        offset="45%"
                        stopColor="#DFEDF3"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>

                <linearGradient
                    id="cardHover"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#D2E4ED"
                    />
                    <stop
                        offset="45%"
                        stopColor="#F2FAFD"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>

                {/* Question mark */}

                <linearGradient
                    id="question"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#5A6E79"
                    />
                    <stop
                        offset="100%"
                        stopColor="#8EA4AF"
                    />
                </linearGradient>

                <linearGradient
                    id="questionHover"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#8AA5B4"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>
            </defs>

            {/* Button */}

            <circle
                className={styles.outer}
                cx="128"
                cy="128"
                r="88"
                fill="url(#panel)"
                stroke="url(#propMetal)"
                strokeWidth="12"
            />

            <circle
                className={styles.innerRing}
                cx="128"
                cy="128"
                r="77"
                fill="none"
                stroke="#FFF6E4"
                strokeOpacity=".30"
                strokeWidth="2"
            />

            {/* Back left */}

            <rect
                className={styles.cardBack}
                x="74"
                y="84"
                width="64"
                height="64"
                rx="9"
            />

            <text
                className={styles.questionBack}
                x="104"
                y="116"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                ?
            </text>

            {/* Back right */}

            <rect
                className={styles.cardBack}
                x="118"
                y="75"
                width="64"
                height="64"
                rx="9"
            />

            <text
                className={styles.questionBack}
                x="152"
                y="112"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                ?
            </text>

            {/* Front left */}

            <rect
                className={styles.card}
                x="84"
                y="118"
                width="64"
                height="64"
                rx="9"
            />

            <text
                className={styles.question}
                x="119"
                y="153"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                ?
            </text>

            {/* Front right */}

            <rect
                className={styles.card}
                x="128"
                y="110"
                width="64"
                height="64"
                rx="9"
            />

            <text
                className={styles.question}
                x="162"
                y="145"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                ?
            </text>
        </svg>
    );
}
