import type { SVGProps } from 'react';
import styles from './style.module.css';

interface DownloadIconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

export default function DownloadIcon({ size = 140, className, ...props }: DownloadIconProps) {
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
                    id="download-bg"
                    cx="32%"
                    cy="25%"
                >
                    <stop
                        offset="0%"
                        stopColor="#D8FAFA"
                    />
                    <stop
                        offset="25%"
                        stopColor="#71C5CE"
                    />
                    <stop
                        offset="60%"
                        stopColor="#287D8C"
                    />
                    <stop
                        offset="100%"
                        stopColor="#09252D"
                    />
                </radialGradient>

                <linearGradient
                    id="download-rim"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#09252D"
                    />
                    <stop
                        offset="45%"
                        stopColor="#1C6370"
                    />
                    <stop
                        offset="70%"
                        stopColor="#BDE9EA"
                    />
                    <stop
                        offset="100%"
                        stopColor="#236A76"
                    />
                </linearGradient>

                <linearGradient
                    id="download-icon"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#8FDADF"
                    />
                    <stop
                        offset="45%"
                        stopColor="#D8FAFA"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>

                <filter
                    id="download-shadow"
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
                cx="70"
                cy="70"
                r="61"
                fill="#061B20"
                opacity=".5"
                filter="url(#download-shadow)"
            />

            {/* Button */}

            <circle
                className={styles.button}
                cx="70"
                cy="70"
                r="57"
                fill="url(#download-bg)"
                stroke="url(#download-rim)"
                strokeWidth="7"
            />

            {/* Inner rim */}

            <circle
                className={styles.rim}
                cx="70"
                cy="70"
                r="48"
                fill="none"
                stroke="#D9FFFF"
                strokeOpacity=".32"
                strokeWidth="2"
            />

            {/* Symbol shadow */}

            <path
                className={styles.symbolShadow}
                d="
                    M70 38
                    V73
                    M53 57
                    L70 74
                    L87 57
                    M47 91
                    H93
                "
                fill="none"
                stroke="#061B20"
                strokeOpacity=".5"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(2 3)"
                filter="url(#download-shadow)"
            />

            {/* Download arrow */}

            <path
                className={styles.arrow}
                d="
                    M70 37
                    V72
                    M53 57
                    L70 74
                    L87 57
                "
                fill="none"
                stroke="url(#download-icon)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Download base */}

            <path
                className={styles.base}
                d="M47 91 H93"
                fill="none"
                stroke="url(#download-icon)"
                strokeWidth="10"
                strokeLinecap="round"
            />

            {/* Base highlight */}

            <path
                className={styles.baseHighlight}
                d="M50 88.5 H90"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity=".3"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Arrow highlight */}

            <path
                className={styles.arrowHighlight}
                d="M70 39 V67"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity=".35"
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Top shine */}

            <path
                className={styles.topShine}
                d="M48 38 H59"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity=".4"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
