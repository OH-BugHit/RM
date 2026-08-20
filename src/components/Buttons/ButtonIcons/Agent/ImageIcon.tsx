import styles from './ImageIcon.module.css';

interface ImageIconProps {
    size?: number;
}

export default function ImageIcon({ size = 256 }: ImageIconProps) {
    return (
        <svg
            className={styles.icon}
            width={size}
            height={size}
            viewBox="0 0 256 256"
        >
            <defs>
                <linearGradient
                    id="imageMetal"
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
                    id="imagePanel"
                    cx="50%"
                    cy="35%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFFFFF"
                    />
                    <stop
                        offset="22%"
                        stopColor="#B7EFEC"
                    />
                    <stop
                        offset="55%"
                        stopColor="#8EA7B3"
                    />
                    <stop
                        offset="100%"
                        stopColor="#0B7771"
                    />
                </radialGradient>
            </defs>

            {/* Outer button */}

            <circle
                className={styles.outer}
                cx="128"
                cy="128"
                r="88"
                fill="url(#imagePanel)"
                stroke="url(#imageMetal)"
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

            {/* Image frame */}

            <polygon
                className={styles.frame}
                points="
         128,72
        176,98
        176,158
        128,186
        80,158
        80,98
          "
                fill="#587783"
                stroke="url(#imageMetal)"
                strokeWidth="5"
                strokeLinejoin="round"
            />

            {/* Sun */}

            <circle
                className={styles.sun}
                cx="150"
                cy="108"
                r="9"
                fill="#F3FDFF"
            />

            {/* Mountains */}

            <path
                className={styles.mountains}
                d="
                    M90 154
                    L112 128
                    L128 144
                    L148 118
                    L166 154
                    Z"
                fill="url(#imageMetal)"
                stroke="#5C7886"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />

            {/* Horizon */}

            <path
                className={styles.horizon}
                d="M92 156 H164"
                stroke="#CDE5ED"
                strokeWidth="2"
                opacity=".45"
            />

            {/* PCB corners */}

            <path
                className={styles.corner}
                d="M96 92 H86 V102"
                fill="none"
                stroke="#D8F6FF"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            <path
                className={styles.corner}
                d="M160 92 H170 V102"
                fill="none"
                stroke="#D8F6FF"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            <path
                className={styles.corner}
                d="M96 166 H86 V156"
                fill="none"
                stroke="#D8F6FF"
                strokeWidth="2.5"
                strokeLinecap="round"
            />

            <path
                className={styles.corner}
                d="M160 166 H170 V156"
                fill="none"
                stroke="#D8F6FF"
                strokeWidth="2.5"
                strokeLinecap="round"
            />
        </svg>
    );
}
