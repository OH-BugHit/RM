import style from './icon.module.css';

interface PlayIconProps {
    size?: number;
    className?: string;
    active?: boolean;
    disabled?: boolean;
}

export default function FastForwardIcon({ size = 64, className = '', active = false, disabled }: PlayIconProps) {
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
            M32 54
            Q20 54 20 68
            V188
            Q20 202 32 202
            Q39 202 45 198
            L102 143
            Q114 132 114 128
            Q114 124 102 113
            L45 58
            Q39 54 32 54
            Z"
                />

                <path
                    d="
            M94 42
            Q78 42 78 60
            V196
            Q78 214 94 214
            Q104 214 112 208
            L214 145
            Q236 132 236 128
            Q236 124 214 111
            L112 48
            Q104 42 94 42
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
        M32 54
        Q20 54 20 68
        V188
        Q20 202 32 202
        Q39 202 45 198
        L102 143
        Q114 132 114 128
        Q114 124 102 113
        L45 58
        Q39 54 32 54
        Z"
                />

                <path
                    fill="url(#gold)"
                    stroke="#5C3200"
                    strokeWidth="10"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    d="
        M94 42
        Q78 42 78 60
        V196
        Q78 214 94 214
        Q104 214 112 208
        L214 145
        Q236 132 236 128
        Q236 124 214 111
        L112 48
        Q104 42 94 42
        Z"
                />

                {/* Highlight */}
                <path
                    fill="url(#highlight)"
                    opacity=".65"
                    d="
        M34 64
        L94 120
        Q100 125 100 128
        L44 68
        Q40 65 34 64
        Z"
                />

                <path
                    fill="url(#highlight)"
                    opacity=".65"
                    d="
        M96 52
        L190 120
        Q200 126 200 128
        L112 58
        Q106 54 96 52
        Z"
                />
                {/* Bottom shade */}
                <path
                    fill="url(#shade)"
                    opacity=".55"
                    d="
        M20 128
        L102 143
        L45 198
        Q20 202 20 188
        Z"
                />

                <path
                    fill="url(#shade)"
                    opacity=".55"
                    d="
        M78 128
        L214 145
        L112 208
        Q78 214 78 196
        Z"
                />
                {/* PCB */}
                <g className={style.pcb}>
                    {/* Left triangle */}

                    <path d="M46 84 H70" />
                    <path d="M70 84 V104" />
                    <path d="M70 104 H90" />

                    <path d="M56 128 H94" />

                    <path d="M48 166 H74" />
                    <path d="M74 166 V148" />
                    <path d="M74 148 H96" />

                    {/* Right triangle */}

                    <path d="M108 76 H144" />
                    <path d="M144 76 V102" />
                    <path d="M144 102 H176" />

                    <path d="M122 128 H182" />

                    <path d="M114 176 H150" />
                    <path d="M150 176 V150" />
                    <path d="M150 150 H184" />

                    {/* Left vias */}

                    <circle
                        cx="70"
                        cy="84"
                        r="4"
                    />
                    <circle
                        cx="70"
                        cy="104"
                        r="4"
                    />

                    <circle
                        cx="74"
                        cy="148"
                        r="4"
                    />
                    <circle
                        cx="74"
                        cy="166"
                        r="4"
                    />

                    <circle
                        cx="94"
                        cy="128"
                        r="4"
                    />

                    {/* Right vias */}

                    <circle
                        cx="144"
                        cy="76"
                        r="4"
                    />
                    <circle
                        cx="144"
                        cy="102"
                        r="4"
                    />

                    <circle
                        cx="150"
                        cy="150"
                        r="4"
                    />
                    <circle
                        cx="150"
                        cy="176"
                        r="4"
                    />

                    <circle
                        cx="182"
                        cy="128"
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
        M33 64
        Q29 64 29 70
        V184
        Q29 192 34 192
        L98 136"
                />

                <path
                    fill="none"
                    stroke="#FFF9D8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity=".85"
                    d="
        M96 54
        Q90 54 90 64
        V194
        Q90 202 98 202
        L205 139"
                />
            </g>
        </svg>
    );
}
