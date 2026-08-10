import styles from './Obs.module.css';

interface GridLayoutIconProps {
    size?: number;
}

export default function ObsIcon({ size = 256 }: GridLayoutIconProps) {
    return (
        <svg
            className={styles.icon}
            width={size}
            height={size}
            viewBox="0 0 256 256"
        >
            <defs>
                <linearGradient
                    id="gridLayoutMetal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#7D98A7"
                    />
                    <stop
                        offset="40%"
                        stopColor="#BFD3DD"
                    />
                    <stop
                        offset="75%"
                        stopColor="#EAF6FA"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>

                <radialGradient
                    id="gridLayoutPanel"
                    cx="50%"
                    cy="35%"
                >
                    <stop
                        offset="0%"
                        stopColor="#4E6D79"
                    />
                    <stop
                        offset="100%"
                        stopColor="#273842"
                    />
                </radialGradient>
            </defs>

            {/* Outer button */}

            <circle
                className={styles.outer}
                cx="128"
                cy="128"
                r="88"
                fill="url(#gridLayoutPanel)"
                stroke="url(#gridLayoutMetal)"
                strokeWidth="12"
            />

            {/* Inner rim */}

            <circle
                className={styles.innerRim}
                cx="128"
                cy="128"
                r="77"
                fill="none"
                stroke="#F4FBFD"
                strokeOpacity=".32"
                strokeWidth="2"
            />

            {/* Background grid */}

            <g
                className={styles.backgroundGrid}
                opacity=".45"
                transform="translate(5 1)"
            >
                <g
                    fill={`url(#gridLayoutMetal)`}
                    stroke="#5D7885"
                    strokeWidth="2"
                >
                    {/* Top */}

                    <rect
                        x="88"
                        y="86"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="106"
                        y="86"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="124"
                        y="86"
                        width="18"
                        height="18"
                    />

                    {/* Row 2 */}

                    <rect
                        x="70"
                        y="104"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="88"
                        y="104"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="106"
                        y="104"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="124"
                        y="104"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="142"
                        y="104"
                        width="18"
                        height="18"
                    />

                    {/* Row 3 */}

                    <rect
                        x="70"
                        y="122"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="88"
                        y="122"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="106"
                        y="122"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="124"
                        y="122"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="142"
                        y="122"
                        width="18"
                        height="18"
                    />

                    {/* Row 4 */}

                    <rect
                        x="70"
                        y="140"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="88"
                        y="140"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="106"
                        y="140"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="124"
                        y="140"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="142"
                        y="140"
                        width="18"
                        height="18"
                    />

                    {/* Bottom */}

                    <rect
                        x="88"
                        y="158"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="106"
                        y="158"
                        width="18"
                        height="18"
                    />
                    <rect
                        x="124"
                        y="158"
                        width="18"
                        height="18"
                    />
                </g>
            </g>

            {/* Foreground grid */}

            <g
                className={styles.foregroundGrid}
                transform="translate(18 16)"
            >
                <g
                    fill="url(#gridLayoutMetal)"
                    stroke="#5B7886"
                    strokeWidth="2.5"
                >
                    {/* Top */}

                    <rect
                        x="119"
                        y="109"
                        width="22"
                        height="22"
                    />

                    {/* Left */}

                    <rect
                        x="97"
                        y="131"
                        width="22"
                        height="22"
                    />

                    {/* Center */}

                    <rect
                        x="119"
                        y="131"
                        width="22"
                        height="22"
                    />

                    {/* Right */}

                    <rect
                        x="141"
                        y="131"
                        width="22"
                        height="22"
                    />

                    {/* Bottom */}

                    <rect
                        x="119"
                        y="153"
                        width="22"
                        height="22"
                    />
                </g>
            </g>
        </svg>
    );
}
