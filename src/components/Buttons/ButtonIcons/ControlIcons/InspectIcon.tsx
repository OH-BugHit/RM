import style from './icon.module.css';

interface PlayIconProps {
    size?: number;
    className?: string;
    active?: boolean;
    disabled?: boolean;
}

export default function InspectIcon({ size = 64, className = '', active = false, disabled = false }: PlayIconProps) {
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
            M128 28
            C84 28 54 62 54 105
            C54 132 66 152 84 170
            C93 179 98 190 98 202
            H158
            C158 190 163 179 172 170
            C190 152 202 132 202 105
            C202 62 172 28 128 28
            Z"
                />

                <rect
                    x="96"
                    y="198"
                    width="64"
                    height="38"
                    rx="12"
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
                    d="
        M128 28
        C84 28 54 62 54 105
        C54 132 66 152 84 170
        C93 179 98 190 98 202
        H158
        C158 190 163 179 172 170
        C190 152 202 132 202 105
        C202 62 172 28 128 28
        Z"
                />

                <rect
                    x="96"
                    y="198"
                    width="64"
                    height="38"
                    rx="12"
                    fill="url(#gold)"
                    stroke="#5C3200"
                    strokeWidth="10"
                />

                {/* Highlight */}
                <path
                    fill="url(#highlight)"
                    opacity=".65"
                    d="
        M128 40
        C92 40 68 66 68 102
        C68 108 69 113 71 118
        C82 88 102 66 128 66
        C154 66 174 88 185 118
        C187 113 188 108 188 102
        C188 66 164 40 128 40
        Z"
                />

                {/* Bottom shade */}
                <path
                    fill="url(#shade)"
                    opacity=".55"
                    d="
        M70 126
        C78 154 94 170 108 184
        C116 192 120 198 120 202
        H158
        C158 192 164 182 176 170
        C188 158 198 142 202 124
        V104
        C202 132 190 152 172 170
        C163 179 158 190 158 202
        H98
        C98 190 93 179 84 170
        C66 152 54 132 54 105
        Z"
                />

                {/* PCB */}
                <g className={style.pcb}>
                    {/* Left upper */}

                    <path d="M92 82 H114" />
                    <path d="M114 82 V102" />

                    {/* Right upper */}

                    <path d="M164 82 H142" />
                    <path d="M142 82 V102" />

                    {/* Filament */}

                    <path d="M114 102 L122 116" />
                    <path d="M142 102 L134 116" />

                    <path d="M122 116 H134" />

                    {/* Down to base */}

                    <path d="M128 116 V146" />
                    <path d="M128 146 V176" />

                    {/* Base connection */}

                    <path d="M112 214 H144" />

                    {/* Decorative base lines */}

                    <path d="M106 206 H150" />
                    <path d="M104 222 H152" />

                    {/* Vias */}

                    <circle
                        cx="114"
                        cy="82"
                        r="4"
                    />
                    <circle
                        cx="114"
                        cy="102"
                        r="4"
                    />

                    <circle
                        cx="142"
                        cy="82"
                        r="4"
                    />
                    <circle
                        cx="142"
                        cy="102"
                        r="4"
                    />

                    <circle
                        cx="122"
                        cy="116"
                        r="4"
                    />
                    <circle
                        cx="134"
                        cy="116"
                        r="4"
                    />

                    <circle
                        cx="128"
                        cy="146"
                        r="4"
                    />
                    <circle
                        cx="128"
                        cy="176"
                        r="4"
                    />

                    <circle
                        cx="128"
                        cy="214"
                        r="4"
                    />
                </g>

                {/* Inner rim, dome*/}
                <path
                    fill="none"
                    stroke="#FFF9D8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity=".85"
                    d="
        M128 42
        C95 42 72 66 72 100
        C72 126 84 145 100 162
        C108 171 112 180 112 192
"
                />

                <path
                    fill="none"
                    stroke="#FFF9D8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity=".85"
                    d="
        M144 192
        C144 180 148 171 156 162
        C172 145 184 126 184 100
        C184 66 161 42 128 42
"
                />

                {/*Inner rim, base*/}
                <path
                    fill="none"
                    stroke="#FFF9D8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity=".85"
                    d="
        M102 204
        H154
"
                />
            </g>
        </svg>
    );
}
