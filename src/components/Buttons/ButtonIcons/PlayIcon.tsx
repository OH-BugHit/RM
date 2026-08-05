import style from './icon.module.css';

interface PlayIconProps {
    size?: number;
    className?: string;
    active?: boolean;
    disabled?: boolean;
}

export default function PlayIcon({ size = 64, className = '', active = false, disabled }: PlayIconProps) {
    return (
        <svg
            className={`${style.icon} ${active ? style.active : ''} ${disabled ? style.disabled : ''} ${className}`}
            width={size}
            height={size}
            viewBox="0 0 256 256"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                {/* Gold material */}
                <linearGradient
                    id="gold"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFF6B0"
                    />
                    <stop
                        offset="22%"
                        stopColor="#FFE56C"
                    />
                    <stop
                        offset="55%"
                        stopColor="#FFC932"
                    />
                    <stop
                        offset="82%"
                        stopColor="#F7A51A"
                    />
                    <stop
                        offset="100%"
                        stopColor="#D97B00"
                    />
                </linearGradient>

                {/* Top highlight */}
                <linearGradient
                    id="highlight"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFFFFF"
                        stopOpacity=".95"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                        stopOpacity="0"
                    />
                </linearGradient>

                {/* Bottom shadow */}
                <linearGradient
                    id="shade"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#000000"
                        stopOpacity="0"
                    />
                    <stop
                        offset="100%"
                        stopColor="#000000"
                        stopOpacity=".18"
                    />
                </linearGradient>

                {/* Shadow */}
                <filter id="shadow">
                    <feDropShadow
                        dx="0"
                        dy="6"
                        stdDeviation="8"
                        floodColor="#000000"
                        floodOpacity=".35"
                    />
                </filter>
            </defs>

            {/* Glow */}
            <g className={style.glowShape}>
                <path
                    d="
            M72 46
            Q56 46 56 63
            V193
            Q56 210 72 210
            Q81 210 89 205
            L192 143
            Q212 131 212 128
            Q212 125 192 113
            L89 51
            Q81 46 72 46
            Z"
                />
            </g>

            {/* Main icon */}
            <g filter="url(#shadow)">
                {/* Main body */}
                <path
                    fill="url(#gold)"
                    stroke="#5C3200"
                    strokeWidth="10"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    d="
        M72 46
        Q56 46 56 63
        V193
        Q56 210 72 210
        Q81 210 89 205
        L192 143
        Q212 131 212 128
        Q212 125 192 113
        L89 51
        Q81 46 72 46
        Z"
                />

                {/* Highlight */}
                <path
                    fill="url(#highlight)"
                    opacity=".65"
                    d="
        M73 57
        L180 121
        Q188 126 188 128
        L83 63
        Q79 60 73 57
        Z"
                />
                {/* Bottom shade */}
                <path
                    fill="url(#shade)"
                    opacity=".55"
                    d="
        M56 128
        L193 143
        L89 205
        Q56 210 56 193
        Z"
                />
                {/* PCB */}
                <g className={style.pcb}>
                    {/* Top */}

                    <path d="M84 82 H116" />
                    <path d="M116 82 V104" />
                    <path d="M116 104 H145" />

                    {/* Center */}

                    <path d="M108 126 H154" />

                    {/* Bottom */}

                    <path d="M90 166 H122" />
                    <path d="M122 166 V148" />
                    <path d="M122 148 H152" />

                    {/* Vias */}

                    <circle
                        cx="116"
                        cy="82"
                        r="4"
                    />
                    <circle
                        cx="116"
                        cy="104"
                        r="4"
                    />

                    <circle
                        cx="122"
                        cy="148"
                        r="4"
                    />
                    <circle
                        cx="122"
                        cy="166"
                        r="4"
                    />

                    <circle
                        cx="154"
                        cy="126"
                        r="4"
                    />
                </g>

                {/* Inner rim */}
                <path
                    fill="none"
                    stroke="#FFF9D8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity=".85"
                    d="
        M72 57
        Q67 57 67 66
        V186
        Q67 194 74 194
        L182 136"
                />
            </g>
        </svg>
    );
}
