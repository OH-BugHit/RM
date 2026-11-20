import style from './icon.module.css';

interface PlayIconProps {
    size?: number;
    testing?: boolean;
    active?: boolean;
    disabled?: boolean;
}

export default function PauseIcon({ size = 64, testing = false, active = false, disabled }: PlayIconProps) {
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
                    y="40"
                    width="54"
                    height="176"
                    rx="26"
                />

                <rect
                    x="146"
                    y="40"
                    width="54"
                    height="176"
                    rx="26"
                />
            </g>

            {/* Main icon */}
            <g filter="url(#shadow)">
                {/* Main body */}
                <rect
                    x="56"
                    y="40"
                    width="54"
                    height="176"
                    rx="26"
                    fill={testing ? 'url(#testingGreen)' : 'url(#gold)'}
                    stroke="#5C3200"
                    strokeWidth="10"
                />

                <rect
                    x="146"
                    y="40"
                    width="54"
                    height="176"
                    rx="26"
                    fill={testing ? 'url(#testingGreen)' : 'url(#gold)'}
                    stroke="#5C3200"
                    strokeWidth="10"
                />

                {/* Highlight */}
                <path
                    fill="url(#highlight)"
                    opacity=".65"
                    d="
        M63 50
        H103
        V116
        Q83 108 63 50
        Z"
                />

                <path
                    fill="url(#highlight)"
                    opacity=".65"
                    d="
        M153 50
        H193
        V116
        Q173 108 153 50
        Z"
                />
                {/* Bottom shade */}
                <path
                    fill="url(#shade)"
                    opacity=".55"
                    d="
        M56 132
        H110
        V190
        Q110 216 83 216
        Q56 216 56 190
        Z"
                />

                <path
                    fill="url(#shade)"
                    opacity=".55"
                    d="
        M146 132
        H200
        V190
        Q200 216 173 216
        Q146 216 146 190
        Z"
                />

                {/* PCB */}
                {!testing && (
                    <g className={style.pcb}>
                        {/* Left bar */}

                        <path d="M66 72 H92" />
                        <path d="M92 72 V94" />
                        <path d="M92 94 H102" />

                        <path d="M66 184 H92" />
                        <path d="M92 184 V162" />
                        <path d="M92 162 H102" />

                        <path d="M76 128 H102" />

                        {/* Right bar */}

                        <path d="M154 72 H180" />
                        <path d="M180 72 V94" />
                        <path d="M180 94 H190" />

                        <path d="M154 184 H180" />
                        <path d="M180 184 V162" />
                        <path d="M180 162 H190" />

                        <path d="M164 128 H190" />

                        {/* Left vias */}

                        <circle
                            cx="92"
                            cy="72"
                            r="4"
                        />
                        <circle
                            cx="92"
                            cy="94"
                            r="4"
                        />
                        <circle
                            cx="92"
                            cy="162"
                            r="4"
                        />
                        <circle
                            cx="92"
                            cy="184"
                            r="4"
                        />
                        <circle
                            cx="102"
                            cy="128"
                            r="4"
                        />

                        {/* Right vias */}

                        <circle
                            cx="180"
                            cy="72"
                            r="4"
                        />
                        <circle
                            cx="180"
                            cy="94"
                            r="4"
                        />
                        <circle
                            cx="180"
                            cy="162"
                            r="4"
                        />
                        <circle
                            cx="180"
                            cy="184"
                            r="4"
                        />
                        <circle
                            cx="190"
                            cy="128"
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
        M68 52
        Q63 52 63 60
        V190
"
                />

                <path
                    fill="none"
                    stroke="#FFF9D8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity=".85"
                    d="
        M158 52
        Q153 52 153 60
        V190
"
                />
            </g>
        </svg>
    );
}
