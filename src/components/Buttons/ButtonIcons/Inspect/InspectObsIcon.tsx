import type { SVGProps } from 'react';
import styles from './inspectObsIcon.module.css';

interface InspectIconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

export default function InspectObsIcon({ size = 140, className, ...props }: InspectIconProps) {
    return (
        <svg
            className={`${styles.icon} ${className ?? ''}`}
            width={size}
            height={size}
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <radialGradient
                    id="inspect-bg"
                    cx="32%"
                    cy="25%"
                >
                    <stop
                        offset="0%"
                        stopColor="#E6D9F0"
                    />
                    <stop
                        offset="22%"
                        stopColor="#A77BCA"
                    />
                    <stop
                        offset="55%"
                        stopColor="#654586"
                    />
                    <stop
                        offset="100%"
                        stopColor="#2E1B3F"
                    />
                </radialGradient>

                <linearGradient
                    id="inspect-rim"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#351544"
                    />
                    <stop
                        offset="45%"
                        stopColor="#713390"
                    />
                    <stop
                        offset="70%"
                        stopColor="#D7A5EA"
                    />
                    <stop
                        offset="100%"
                        stopColor="#633080"
                    />
                </linearGradient>

                <linearGradient
                    id="gridLayoutMetal"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#713390"
                    />
                    <stop
                        offset="45%"
                        stopColor="#B46BD1"
                    />
                    <stop
                        offset="75%"
                        stopColor="#D99BE8"
                    />
                    <stop
                        offset="100%"
                        stopColor="#F0CFFF"
                    />
                </linearGradient>

                <linearGradient
                    id="inspect-glass"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#713390"
                    />
                    <stop
                        offset="45%"
                        stopColor="#E9D0FF"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>

                <linearGradient
                    id="inspect-handle"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#351544"
                    />
                    <stop
                        offset="45%"
                        stopColor="#713390"
                    />
                    <stop
                        offset="100%"
                        stopColor="#D7A5EA"
                    />
                </linearGradient>

                <filter
                    id="inspect-shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur stdDeviation="4" />
                </filter>
            </defs>

            {/* Button shadow */}

            <circle
                className={styles.buttonShadow}
                cx="110"
                cy="110"
                r="94"
                fill="#28102F"
                opacity=".5"
                filter="url(#inspect-shadow)"
            />

            {/* Button */}

            <circle
                className={styles.button}
                cx="110"
                cy="110"
                r="88"
                fill="url(#inspect-bg)"
                stroke="url(#inspect-rim)"
                strokeWidth="12"
            />

            {/* Inner rim */}

            <circle
                className={styles.rim}
                cx="110"
                cy="110"
                r="77"
                fill="none"
                stroke="#F2DFFF"
                strokeOpacity=".34"
                strokeWidth="2"
            />

            {/* Grid */}

            <g
                className={styles.backgroundGrid}
                opacity=".9"
                transform="translate(-10 -20)"
            >
                <g
                    fill="url(#gridLayoutMetal)"
                    stroke="#5A2670"
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

            {/* Magnifying glass shadow */}

            <circle
                className={styles.glassShadow}
                cx="128"
                cy="116"
                r="31"
                fill="#28102f3a"
                opacity=".55"
                filter="url(#inspect-shadow)"
            />

            <path
                className={styles.handleShadow}
                d="M151 139 L174 162"
                fill="none"
                stroke="#28102F"
                strokeOpacity=".55"
                strokeWidth="14"
                strokeLinecap="round"
                filter="url(#inspect-shadow)"
            />

            {/* Magnifying glass */}

            <g className={styles.magnifier}>
                <circle
                    className={styles.glass}
                    cx="125"
                    cy="113"
                    r="27"
                    fill="#51266793"
                    stroke="url(#inspect-glass)"
                    strokeWidth="8"
                />

                <circle
                    className={styles.glassInner}
                    cx="125"
                    cy="113"
                    r="19"
                    fill="#b46bd13a"
                    fillOpacity=".22"
                    stroke="#F2DFFF"
                    strokeOpacity=".42"
                    strokeWidth="2"
                />

                {/* Glass highlight */}

                <path
                    className={styles.glassHighlight}
                    d="M111 103 C115 97 121 94 127 94"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeOpacity=".6"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/* Handle */}

                <path
                    className={styles.handle}
                    d="M144 133 L171 160"
                    fill="none"
                    stroke="url(#inspect-handle)"
                    strokeWidth="13"
                    strokeLinecap="round"
                />

                <path
                    className={styles.handleHighlight}
                    d="M147 135 L168 156"
                    fill="none"
                    stroke="#E9D0FF"
                    strokeOpacity=".4"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
}
