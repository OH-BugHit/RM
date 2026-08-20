import styles from './mapIcon.module.css';
import type { SVGProps } from 'react';

interface MapIconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

export default function MapIcon({ size = 140, ...props }: MapIconProps) {
    return (
        <svg
            className={styles.icon}
            width={size}
            height={size}
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <radialGradient
                    id="map-bg"
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
                    id="map-rim"
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
                    id="map-left"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#542567"
                    />
                    <stop
                        offset="55%"
                        stopColor="#8F4BA8"
                    />
                    <stop
                        offset="100%"
                        stopColor="#C987DC"
                    />
                </linearGradient>

                <linearGradient
                    id="map-center"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#69307C"
                    />
                    <stop
                        offset="50%"
                        stopColor="#A85DC0"
                    />
                    <stop
                        offset="100%"
                        stopColor="#DDA5EA"
                    />
                </linearGradient>

                <linearGradient
                    id="map-right"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#542567"
                    />
                    <stop
                        offset="50%"
                        stopColor="#8F4BA8"
                    />
                    <stop
                        offset="100%"
                        stopColor="#C987DC"
                    />
                </linearGradient>

                <linearGradient
                    id="map-grid"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#9B55B5"
                    />
                    <stop
                        offset="100%"
                        stopColor="#F0D5F8"
                    />
                </linearGradient>

                <linearGradient
                    id="chip"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#492052"
                    />
                    <stop
                        offset="45%"
                        stopColor="#B46BD1"
                    />
                    <stop
                        offset="100%"
                        stopColor="#F0D5F8"
                    />
                </linearGradient>

                <filter
                    id="map-shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur stdDeviation="4" />
                </filter>

                <g id="pcb-chip">
                    <rect
                        x="0"
                        y="0"
                        width="10"
                        height="8"
                        rx="1.5"
                        fill="url(#chip)"
                        stroke="#F2DFFF"
                        strokeWidth="1.2"
                    />

                    <path
                        d="
                            M2.5 -3 V0
                            M7.5 -3 V0
                            M2.5 8 V11
                            M7.5 8 V11
                        "
                        stroke="#E9D0FF"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />

                    <rect
                        x="2.5"
                        y="2"
                        width="5"
                        height="4"
                        rx=".5"
                        fill="#713390"
                    />
                </g>
            </defs>

            {/* Button shadow */}

            <circle
                cx="110"
                cy="110"
                r="94"
                fill="#28102F"
                opacity=".5"
                filter="url(#map-shadow)"
            />

            {/* Button */}

            <circle
                className={styles.panel}
                cx="110"
                cy="110"
                r="88"
                fill="url(#map-bg)"
                stroke="url(#map-rim)"
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

            {/* Map shadow */}

            <path
                d="
                    M39 67
                    L85 55
                    L131 67
                    L177 55
                    L181 138
                    L131 150
                    L85 138
                    L39 150
                    Z
                "
                fill="#28102F"
                opacity=".55"
                filter="url(#map-shadow)"
            />

            {/* Left panel */}

            <path
                className={styles.mapPanel}
                d="
                    M39 60
                    L85 48
                    L85 131
                    L39 143
                    Z
                "
                fill="url(#map-left)"
                stroke="#E9D0FF"
                strokeOpacity=".7"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />

            {/* Center panel */}

            <path
                className={styles.mapPanel}
                d="
                    M85 48
                    L131 60
                    L131 143
                    L85 131
                    Z
                "
                fill="url(#map-center)"
                stroke="#E9D0FF"
                strokeOpacity=".65"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />

            {/* Right panel */}

            <path
                className={styles.mapPanel}
                d="
                    M131 60
                    L177 48
                    L177 131
                    L131 143
                    Z
                "
                fill="url(#map-right)"
                stroke="#E9D0FF"
                strokeOpacity=".7"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />

            {/* Left grid */}

            <g
                fill="none"
                stroke="url(#map-grid)"
                strokeOpacity=".48"
                strokeWidth="1.8"
            >
                <path d="M39 81 L85 69" />
                <path d="M39 102 L85 90" />
                <path d="M39 123 L85 111" />

                <path d="M50 57 L50 140" />
                <path d="M62 54 L62 137" />
                <path d="M73 51 L73 134" />
            </g>

            {/* Center grid */}

            <g
                fill="none"
                stroke="url(#map-grid)"
                strokeOpacity=".48"
                strokeWidth="1.8"
            >
                <path d="M85 69 L131 81" />
                <path d="M85 90 L131 102" />
                <path d="M85 111 L131 123" />

                <path d="M96 51 L96 134" />
                <path d="M108 54 L108 137" />
                <path d="M120 57 L120 140" />
            </g>

            {/* Right grid */}

            <g
                fill="none"
                stroke="url(#map-grid)"
                strokeOpacity=".48"
                strokeWidth="1.8"
            >
                <path d="M131 81 L177 69" />
                <path d="M131 102 L177 90" />
                <path d="M131 123 L177 111" />

                <path d="M142 57 L142 140" />
                <path d="M154 54 L154 137" />
                <path d="M165 51 L165 134" />
            </g>

            {/* First fold */}

            <path
                d="M85 48 L85 131"
                stroke="#F2DFFF"
                strokeOpacity=".6"
                strokeWidth="3"
            />

            <path
                d="M87 49 L87 132"
                stroke="#351544"
                strokeOpacity=".25"
                strokeWidth="2"
            />

            {/* Second fold */}

            <path
                d="M131 60 L131 143"
                stroke="#351544"
                strokeOpacity=".4"
                strokeWidth="3"
            />

            <path
                d="M133 60 L133 143"
                stroke="#F2DFFF"
                strokeOpacity=".25"
                strokeWidth="2"
            />

            {/* PCB chips */}

            <g transform="translate(50 78) rotate(-14)">
                <use href="#pcb-chip" />
            </g>

            <g transform="translate(67 115) rotate(-12) scale(.8)">
                <use href="#pcb-chip" />
            </g>

            <g transform="translate(59 128) rotate(-15) scale(.7)">
                <use href="#pcb-chip" />
            </g>

            <g transform="translate(72 65) rotate(-14) scale(.75)">
                <use href="#pcb-chip" />
            </g>

            <g transform="translate(94 80) rotate(14) scale(.8)">
                <use href="#pcb-chip" />
            </g>

            <g transform="translate(100 120) rotate(12) scale(.72)">
                <use href="#pcb-chip" />
            </g>

            <g transform="translate(118 76) rotate(15) scale(.8)">
                <use href="#pcb-chip" />
            </g>

            <g transform="translate(122 105) rotate(12)">
                <use href="#pcb-chip" />
            </g>

            <g transform="translate(141 85) rotate(-14) scale(.75)">
                <use href="#pcb-chip" />
            </g>

            <g transform="translate(148 118) rotate(-12) scale(.8)">
                <use href="#pcb-chip" />
            </g>

            <g transform="translate(162 76) rotate(-15) scale(.7)">
                <use href="#pcb-chip" />
            </g>

            <g transform="translate(160 106) rotate(-13) scale(.72)">
                <use href="#pcb-chip" />
            </g>

            {/* Small data points */}

            <g
                className={styles.dataPoints}
                fill="#F2DFFF"
                opacity=".7"
            >
                <circle
                    cx="55"
                    cy="95"
                    r="1.7"
                />
                <circle
                    cx="73"
                    cy="98"
                    r="1.5"
                />
                <circle
                    cx="96"
                    cy="68"
                    r="1.5"
                />
                <circle
                    cx="103"
                    cy="112"
                    r="1.7"
                />
                <circle
                    cx="131"
                    cy="90"
                    r="1.6"
                />
                <circle
                    cx="145"
                    cy="66"
                    r="1.5"
                />
                <circle
                    cx="160"
                    cy="97"
                    r="1.7"
                />
                <circle
                    cx="170"
                    cy="118"
                    r="1.5"
                />
            </g>
        </svg>
    );
}
