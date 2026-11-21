import style from './blackBox.module.css';

interface CubeIconProps {
    size?: number;
    active?: boolean;
    disabled?: boolean;
}

export default function BlackBoxIcon({ size = 64, active = false, disabled = false }: CubeIconProps) {
    return (
        <svg
            className={[style.icon, active ? style.active : '', disabled ? style.disabled : '']
                .filter(Boolean)
                .join(' ')}
            width={size}
            height={size}
            viewBox="0 0 240 240"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                {/* GLASS TOP SHINE */}
                <linearGradient
                    id="glass-shine-top"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFFFFF"
                        stopOpacity="0.34"
                    />
                    <stop
                        offset="55%"
                        stopColor="#E0F2FE"
                        stopOpacity="0.09"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                        stopOpacity="0.02"
                    />
                </linearGradient>

                {/* GLASS LEFT SHINE */}
                <linearGradient
                    id="glass-shine-left"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFFFFF"
                        stopOpacity="0.22"
                    />
                    <stop
                        offset="100%"
                        stopColor="#38BDF8"
                        stopOpacity="0.03"
                    />
                </linearGradient>

                {/* GLASS RIGHT SHINE */}
                <linearGradient
                    id="glass-shine-right"
                    x1="100%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#E0F2FE"
                        stopOpacity="0.18"
                    />
                    <stop
                        offset="100%"
                        stopColor="#0284C7"
                        stopOpacity="0.04"
                    />
                </linearGradient>

                {/* MEMORY CORE GLOW */}
                <filter
                    id="memory-glow"
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="160%"
                >
                    <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="4"
                        floodColor="#7DD3FC"
                        floodOpacity="0.8"
                    />
                </filter>
            </defs>

            {/* INNER BACK EDGES (VISIBLE WHEN GLASSY) */}
            <g
                className={style.backEdges}
                stroke="#FFFFFF"
                strokeWidth="1.4"
                strokeDasharray="3.5 3.5"
                strokeLinecap="round"
            >
                <line
                    x1="120"
                    y1="20"
                    x2="120"
                    y2="120"
                />
                <line
                    x1="120"
                    y1="120"
                    x2="33.3974596216"
                    y2="170"
                />
                <line
                    x1="120"
                    y1="120"
                    x2="206.6025403784"
                    y2="170"
                />
            </g>

            {/* CUBE FACES (BLACK -> TRANSLUCENT GLASS) */}
            <g>
                <polygon
                    className={style.faceTop}
                    points="120,20 206.6025403784,70 120,120 33.3974596216,70"
                />
                <polygon
                    className={style.faceLeft}
                    points="33.3974596216,70 120,120 120,220 33.3974596216,170"
                />
                <polygon
                    className={style.faceRight}
                    points="120,120 206.6025403784,70 206.6025403784,170 120,220"
                />
            </g>

            {/* INNER MUI MEMORY ICON (VISIBLE ONLY WHEN ACTIVE) */}
            <g
                className={style.memoryCore}
                filter="url(#memory-glow)"
            >
                <g transform="translate(120, 119) skewY(-11) scale(4.2) translate(-12, -12)">
                    <rect
                        x="5"
                        y="5"
                        width="14"
                        height="14"
                        rx="1.6"
                        fill="#ffffff"
                        fillOpacity="0.64"
                    />
                    <path
                        fill="#000c75"
                        d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z"
                    />
                </g>
            </g>

            {/* GLASS REFLECTION LAYER */}
            <g
                className={style.glassOverlay}
                pointerEvents="none"
            >
                <polygon
                    fill="url(#glass-shine-top)"
                    points="120,20 206.6025403784,70 120,120 33.3974596216,70"
                />
                <polygon
                    fill="url(#glass-shine-left)"
                    points="33.3974596216,70 120,120 120,220 33.3974596216,170"
                />
                <polygon
                    fill="url(#glass-shine-right)"
                    points="120,120 206.6025403784,70 206.6025403784,170 120,220"
                />
                <polygon
                    fill="#FFFFFF"
                    fillOpacity="0.13"
                    points="116,75 154,65 132,196 109,204"
                />
            </g>

            {/* CRISP WHITE EDGES */}
            <g
                className={style.frontEdges}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
            >
                <polygon points="120,20 206.6025403784,70 206.6025403784,170 120,220 33.3974596216,170 33.3974596216,70" />
                <polyline points="33.3974596216,70 120,120 206.6025403784,70" />
                <line
                    x1="120"
                    y1="120"
                    x2="120"
                    y2="220"
                />
            </g>
        </svg>
    );
}
