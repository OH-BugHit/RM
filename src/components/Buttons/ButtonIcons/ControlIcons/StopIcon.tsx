import style from './playicon.module.css';

interface StopIconProps {
    size?: number;
    testing?: boolean;
    active?: boolean;
    disabled?: boolean;
}

export default function StopIcon({ size = 64, testing = false, active = false, disabled }: StopIconProps) {
    return (
        <svg
            className={`${style.icon} ${active ? style.active : ''} ${disabled ? style.disabled : ''}`}
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

                {/* Green material */}
                <linearGradient
                    id="testingGreen"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#C8FFC8"
                    />
                    <stop
                        offset="22%"
                        stopColor="#80F080"
                    />
                    <stop
                        offset="55%"
                        stopColor="#39CC39"
                    />
                    <stop
                        offset="82%"
                        stopColor="#20A820"
                    />
                    <stop
                        offset="100%"
                        stopColor="#087008"
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
                <rect
                    x="56"
                    y="56"
                    width="144"
                    height="144"
                    rx="22"
                    ry="22"
                />
            </g>

            {/* Main icon */}
            <g filter="url(#shadow)">
                {/* Main body */}
                <rect
                    x="56"
                    y="56"
                    width="144"
                    height="144"
                    rx="22"
                    ry="22"
                    fill={testing ? 'url(#testingGreen)' : 'url(#gold)'}
                    stroke="#5C3200"
                    strokeWidth="10"
                    strokeLinejoin="round"
                />

                {/* Highlight */}
                <path
                    fill="url(#highlight)"
                    opacity=".65"
                    d="
                        M 66 64
                        H 190
                        Q 192 64 192 66
                        V 118
                        Q 128 102 64 126
                        V 66
                        Q 64 64 66 64
                        Z"
                />

                {/* Bottom shade */}
                <path
                    fill="url(#shade)"
                    opacity=".55"
                    d="
                        M 64 138
                        Q 128 154 192 128
                        V 190
                        Q 192 192 190 192
                        H 66
                        Q 64 192 64 190
                        Z"
                />

                {/* PCB */}
                {!testing && (
                    <g className={style.pcb}>
                        {/* Top */}
                        <path d="M 80 86 H 114" />
                        <path d="M 114 86 V 108" />
                        <path d="M 114 108 H 146" />

                        {/* Center */}
                        <path d="M 96 128 H 160" />

                        {/* Bottom */}
                        <path d="M 86 170 H 120" />
                        <path d="M 120 170 V 150" />
                        <path d="M 120 150 H 154" />

                        {/* Vias */}
                        <circle
                            cx="114"
                            cy="86"
                            r="4"
                        />
                        <circle
                            cx="114"
                            cy="108"
                            r="4"
                        />
                        <circle
                            cx="160"
                            cy="128"
                            r="4"
                        />
                        <circle
                            cx="120"
                            cy="150"
                            r="4"
                        />
                        <circle
                            cx="120"
                            cy="170"
                            r="4"
                        />
                    </g>
                )}

                {/* Inner rim */}
                <path
                    fill="none"
                    stroke="#FFF9D8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity=".85"
                    d="
                        M 68 182
                        V 74
                        Q 68 68 74 68
                        H 182"
                />
            </g>
        </svg>
    );
}
