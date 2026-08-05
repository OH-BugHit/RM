import style from './icon.module.css';

interface PlayIconProps {
    size?: number;
    className?: string;
    active?: boolean;
    disabled?: boolean;
}

export default function StepIcon({ size = 64, className = '', active = false, disabled }: PlayIconProps) {
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
            M54 46
            Q38 46 38 63
            V193
            Q38 210 54 210
            Q63 210 71 205
            L158 143
            Q176 131 176 128
            Q176 125 158 113
            L71 51
            Q63 46 54 46
            Z"
                />

                <rect
                    x="186"
                    y="46"
                    width="28"
                    height="164"
                    rx="14"
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
        M54 46
        Q38 46 38 63
        V193
        Q38 210 54 210
        Q63 210 71 205
        L158 143
        Q176 131 176 128
        Q176 125 158 113
        L71 51
        Q63 46 54 46
        Z"
                />

                <rect
                    x="186"
                    y="46"
                    width="28"
                    height="164"
                    rx="14"
                    fill="url(#gold)"
                    stroke="#5C3200"
                    strokeWidth="10"
                />

                {/* Highlight */}
                <path
                    fill="url(#highlight)"
                    opacity=".65"
                    d="
        M55 57
        L148 121
        Q156 126 156 128
        L65 63
        Q61 60 55 57
        Z"
                />

                <path
                    fill="url(#highlight)"
                    opacity=".65"
                    d="
        M190 54
        H208
        V110
        Q199 105 190 54
        Z"
                />
                {/* Bottom shade */}
                <path
                    fill="url(#shade)"
                    opacity=".55"
                    d="
        M38 128
        L159 143
        L71 205
        Q38 210 38 193
        Z"
                />

                <path
                    fill="url(#shade)"
                    opacity=".55"
                    d="
        M186 132
        H214
        V196
        Q214 210 200 210
        Q186 210 186 196
        Z"
                />
                {/* PCB */}
                <g className={style.pcb}>
                    {/* Play section */}

                    <path d="M66 82 H98" />
                    <path d="M98 82 V104" />
                    <path d="M98 104 H126" />

                    <path d="M88 126 H138" />

                    <path d="M72 166 H104" />
                    <path d="M104 166 V148" />
                    <path d="M104 148 H136" />

                    {/* Stop bar */}

                    <path d="M190 76 H206" />
                    <path d="M206 76 V102" />

                    <path d="M190 180 H206" />
                    <path d="M206 180 V154" />

                    <path d="M198 116 V140" />

                    {/* Play vias */}

                    <circle
                        cx="98"
                        cy="82"
                        r="4"
                    />
                    <circle
                        cx="98"
                        cy="104"
                        r="4"
                    />

                    <circle
                        cx="104"
                        cy="148"
                        r="4"
                    />
                    <circle
                        cx="104"
                        cy="166"
                        r="4"
                    />

                    <circle
                        cx="138"
                        cy="126"
                        r="4"
                    />

                    {/* Stop vias */}

                    <circle
                        cx="206"
                        cy="76"
                        r="4"
                    />
                    <circle
                        cx="206"
                        cy="102"
                        r="4"
                    />

                    <circle
                        cx="198"
                        cy="116"
                        r="4"
                    />
                    <circle
                        cx="198"
                        cy="140"
                        r="4"
                    />

                    <circle
                        cx="206"
                        cy="154"
                        r="4"
                    />
                    <circle
                        cx="206"
                        cy="180"
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
        M54 57
        Q49 57 49 66
        V186
        Q49 194 56 194
        L148 136"
                />

                <path
                    fill="none"
                    stroke="#FFF9D8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity=".85"
                    d="
        M193 56
        Q190 56 190 62
        V194
"
                />
            </g>
        </svg>
    );
}
