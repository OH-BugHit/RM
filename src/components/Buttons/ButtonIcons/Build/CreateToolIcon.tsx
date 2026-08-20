import styles from './createToolIcon.module.css';

interface CreateToolIconProps {
    size?: number;
}

export default function CreateToolIcon({ size = 220 }: CreateToolIconProps) {
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
                    id="create-panel"
                    cx="32%"
                    cy="25%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFD6DC"
                    />
                    <stop
                        offset="22%"
                        stopColor="#E04F66"
                    />
                    <stop
                        offset="55%"
                        stopColor="#8A2F40"
                    />
                    <stop
                        offset="100%"
                        stopColor="#3A121C"
                    />
                </radialGradient>

                <linearGradient
                    id="create-metal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#543720"
                    />
                    <stop
                        offset="50%"
                        stopColor="#f0d5c3"
                    />
                    <stop
                        offset="100%"
                        stopColor="#f0d0c3"
                    />
                </linearGradient>

                <linearGradient
                    id="tile-surface"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#692727"
                    />
                    <stop
                        offset="50%"
                        stopColor="#B94F4A"
                    />
                    <stop
                        offset="100%"
                        stopColor="#E89A91"
                    />
                </linearGradient>

                <linearGradient
                    id="tile-side"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#9D403D"
                    />
                    <stop
                        offset="100%"
                        stopColor="#4A1A1A"
                    />
                </linearGradient>
            </defs>

            {/* Main panel */}

            <circle
                className={styles.outerRim}
                cx="110"
                cy="110"
                r="88"
                fill="url(#create-panel)"
                stroke="url(#create-metal)"
                strokeWidth="12"
            />

            {/* Inner rim */}

            <circle
                className={styles.innerRim}
                cx="110"
                cy="110"
                r="77"
                fill="none"
                stroke="#FFECEA"
                strokeOpacity=".34"
                strokeWidth="2"
            />

            {/* Tile shadow */}

            <path
                d="
                    M57 124
                    L163 124
                    L163 140
                    L110 160
                    L57 140
                    Z
                "
                fill="#260B0B"
                opacity=".55"
            />

            {/* Tile side */}

            <path
                className={styles.tileSide}
                d="
                    M57 118
                    L163 118
                    L163 135
                    L110 155
                    L57 135
                    Z
                "
                fill="url(#tile-side)"
                stroke="#451616"
                strokeWidth="3"
                strokeLinejoin="round"
            />

            {/* Tile top */}

            <path
                className={styles.tile}
                d="
                    M57 118
                    L110 99
                    L163 118
                    L110 138
                    Z
                "
                fill="url(#tile-surface)"
                stroke="#FFE3DF"
                strokeOpacity=".72"
                strokeWidth="3"
                strokeLinejoin="round"
            />

            {/* Tile inner border */}

            <path
                className={styles.tileDetail}
                d="
                    M69 118
                    L110 104
                    L151 118
                    L110 133
                    Z
                "
                fill="none"
                stroke="#FFD6D0"
                strokeOpacity=".25"
                strokeWidth="2"
            />

            {/* Tile detail */}

            <path
                className={styles.tileDetail}
                d="M110 104 V133"
                stroke="#FFECEA"
                strokeOpacity=".16"
                strokeWidth="2"
            />

            <path
                className={styles.tileDetail}
                d="
                    M69 118
                    L110 133
                    L151 118
                "
                fill="none"
                stroke="#FFECEA"
                strokeOpacity=".12"
                strokeWidth="2"
            />

            {/* Plus */}

            <g
                className={styles.plus}
                fill="none"
                stroke="#FFF5F3"
                strokeWidth="8"
                strokeLinecap="round"
            >
                <path d="M110 57 V87" />
                <path d="M95 72 H125" />
            </g>

            {/* Plus highlight */}

            <g
                className={styles.plusHighlight}
                fill="none"
                stroke="#FFD6D0"
                strokeOpacity=".55"
                strokeWidth="2.5"
                strokeLinecap="round"
            >
                <path d="M110 57 V87" />
                <path d="M95 72 H125" />
            </g>

            {/* Tile highlight */}

            <path
                className={styles.tileHighlight}
                d="M72 116 L110 102 L148 116"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity=".28"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
