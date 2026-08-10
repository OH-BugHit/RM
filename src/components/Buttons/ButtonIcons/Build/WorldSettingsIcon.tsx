import type { SVGProps } from 'react';
import styles from './worldSettingsIcon.module.css';

interface WorldSettingsIconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

export default function WorldSettingsIcon({ size = 140, className, ...props }: WorldSettingsIconProps) {
    return (
        <svg
            className={`${styles.icon} ${className ?? ''}`}
            width={size}
            height={size}
            viewBox="0 0 140 140"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <radialGradient
                    id="button-bg"
                    cx="32%"
                    cy="25%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFD6D0"
                    />
                    <stop
                        offset="25%"
                        stopColor="#D8756E"
                    />
                    <stop
                        offset="60%"
                        stopColor="#8E3434"
                    />
                    <stop
                        offset="100%"
                        stopColor="#351212"
                    />
                </radialGradient>

                <linearGradient
                    id="button-rim"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#451616"
                    />
                    <stop
                        offset="45%"
                        stopColor="#9D403D"
                    />
                    <stop
                        offset="70%"
                        stopColor="#F0C7C3"
                    />
                    <stop
                        offset="100%"
                        stopColor="#7A2929"
                    />
                </linearGradient>

                <linearGradient
                    id="world-globe"
                    x1="20%"
                    y1="10%"
                    x2="80%"
                    y2="90%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFD6D0"
                    />
                    <stop
                        offset="35%"
                        stopColor="#D8756E"
                    />
                    <stop
                        offset="70%"
                        stopColor="#8E3434"
                    />
                    <stop
                        offset="100%"
                        stopColor="#481818"
                    />
                </linearGradient>

                <linearGradient
                    id="gear-metal"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#4A1818"
                    />
                    <stop
                        offset="45%"
                        stopColor="#A83F3F"
                    />
                    <stop
                        offset="75%"
                        stopColor="#F0C7C3"
                    />
                    <stop
                        offset="100%"
                        stopColor="#8B3634"
                    />
                </linearGradient>

                <filter
                    id="button-shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur stdDeviation="4" />
                </filter>

                <filter
                    id="world-shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur stdDeviation="3" />
                </filter>
            </defs>

            {/* Button */}

            <circle
                className={styles.buttonShadow}
                cx="70"
                cy="70"
                r="61"
                fill="#260B0B"
                opacity=".5"
                filter="url(#button-shadow)"
            />

            <circle
                className={styles.button}
                cx="70"
                cy="70"
                r="57"
                fill="url(#button-bg)"
                stroke="url(#button-rim)"
                strokeWidth="7"
            />

            {/* Inner rim */}

            <circle
                className={styles.rim}
                cx="70"
                cy="70"
                r="48"
                fill="none"
                stroke="#FFECEA"
                strokeOpacity=".3"
                strokeWidth="2"
            />

            {/* Globe */}

            <circle
                cx="53"
                cy="55"
                r="30"
                fill="#260B0B"
                opacity=".4"
                filter="url(#world-shadow)"
            />

            <circle
                className={styles.globe}
                cx="53"
                cy="55"
                r="30"
                fill="url(#world-globe)"
                stroke="#FFE3DF"
                strokeOpacity=".65"
                strokeWidth="2"
            />

            {/* Longitude */}

            <ellipse
                className={styles.globeLine}
                cx="53"
                cy="55"
                rx="12"
                ry="30"
                fill="none"
                stroke="#FFECEA"
                strokeOpacity=".32"
                strokeWidth="1.4"
            />

            <ellipse
                className={styles.globeLine}
                cx="53"
                cy="55"
                rx="21"
                ry="30"
                fill="none"
                stroke="#FFECEA"
                strokeOpacity=".17"
                strokeWidth="1"
            />

            {/* Latitude */}

            <ellipse
                className={styles.globeLine}
                cx="53"
                cy="55"
                rx="30"
                ry="11"
                fill="none"
                stroke="#FFECEA"
                strokeOpacity=".3"
                strokeWidth="1.4"
            />

            <ellipse
                className={styles.globeLine}
                cx="53"
                cy="55"
                rx="30"
                ry="20"
                fill="none"
                stroke="#FFECEA"
                strokeOpacity=".16"
                strokeWidth="1"
            />

            {/* Land */}

            <path
                className={styles.land}
                d="M34 43 C39 39 44 40 47 44 L45 49 L39 50 L36 47 Z"
                fill="#6D2929"
                opacity=".8"
            />

            <path
                className={styles.land}
                d="M61 38 L68 42 L70 48 L65 51 L60 46 Z"
                fill="#6D2929"
                opacity=".75"
            />

            <path
                className={styles.land}
                d="M48 61 L55 58 L61 63 L58 70 L52 73 L48 68 Z"
                fill="#6D2929"
                opacity=".75"
            />

            {/* Gear shadow */}

            <circle
                cx="91"
                cy="87"
                r="24"
                fill="#260B0B"
                opacity=".45"
                filter="url(#world-shadow)"
            />

            {/* Gear */}

            <path
                className={styles.gear}
                d="
                    M88 63
                    L94 63
                    L95.5 68.5
                    L100 70
                    L104 66
                    L108 70
                    L105 74.5
                    L107 79
                    L112.5 80.5
                    L112.5 86.5
                    L107 88
                    L105 92.5
                    L109 96.5
                    L105 100.5
                    L100.5 97.5
                    L96 99.5
                    L94.5 105
                    L88.5 105
                    L87 99.5
                    L82.5 97.5
                    L78.5 101.5
                    L74.5 97.5
                    L77.5 93
                    L75.5 88.5
                    L70 87
                    L70 81
                    L75.5 79.5
                    L77.5 75
                    L73.5 71
                    L77.5 67
                    L82 70
                    L86.5 68
                    Z
                "
                fill="url(#gear-metal)"
                stroke="#FFE3DF"
                strokeOpacity=".72"
                strokeWidth="1.8"
                strokeLinejoin="round"
            />

            {/* Gear inner bevel */}

            <circle
                className={styles.gearInner}
                cx="91"
                cy="84"
                r="13"
                fill="#5A2020"
                stroke="#F0C7C3"
                strokeOpacity=".55"
                strokeWidth="2"
            />

            {/* Gear hole */}

            <circle
                cx="91"
                cy="84"
                r="5.5"
                fill="#351212"
                stroke="#FFE3DF"
                strokeOpacity=".4"
                strokeWidth="1.5"
            />

            {/* Gear highlight */}

            <path
                className={styles.gearHighlight}
                d="M82 73 C86 69 91 68 96 70"
                fill="none"
                stroke="#FFF3F1"
                strokeOpacity=".3"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}
