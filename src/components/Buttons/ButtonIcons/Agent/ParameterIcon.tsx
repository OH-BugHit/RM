import styles from './Parameter.module.css';

interface ParameterIconProps {
    size?: number;
}

export default function ParameterIcon({ size = 256 }: ParameterIconProps) {
    return (
        <svg
            className={styles.icon}
            width={size}
            height={size}
            viewBox="0 0 256 256"
        >
            <defs>
                <linearGradient
                    id="parameterMetal"
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
                    id="parameterPanel"
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
                fill="url(#parameterPanel)"
                stroke="url(#parameterMetal)"
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

            {/* Slider tracks */}

            <line
                className={styles.track}
                x1="92"
                y1="74"
                x2="92"
                y2="182"
                stroke="#D8EEF6"
                strokeWidth="5"
                strokeLinecap="round"
            />

            <line
                className={styles.track}
                x1="128"
                y1="74"
                x2="128"
                y2="182"
                stroke="#D8EEF6"
                strokeWidth="5"
                strokeLinecap="round"
            />

            <line
                className={styles.track}
                x1="164"
                y1="74"
                x2="164"
                y2="182"
                stroke="#D8EEF6"
                strokeWidth="5"
                strokeLinecap="round"
            />

            {/* Knobs */}

            <polygon
                className={styles.knob}
                points="
        92,104
        104,111
        104,125
        92,132
        80,125
        80,111
    "
                fill="url(#parameterMetal)"
                stroke="#5A7886"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />

            <polygon
                className={styles.knob}
                points="
        128,134
        140,141
        140,155
        128,162
        116,155
        116,141
    "
                fill="url(#parameterMetal)"
                stroke="#5A7886"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />

            <polygon
                className={styles.knob}
                points="
        164,82
        176,89
        176,103
        164,110
        152,103
        152,89
    "
                fill="url(#parameterMetal)"
                stroke="#5A7886"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}
