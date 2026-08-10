interface InvestigateProps {
    size?: number;
    title?: string;
}

export default function AgentIcon({ size = 220, title = 'AGENT' }: InvestigateProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient
                    id="agent-panel"
                    cx="32%"
                    cy="25%"
                >
                    <stop
                        offset="0%"
                        stop-color="#FFFFFF"
                    />
                    <stop
                        offset="22%"
                        stop-color="#D8E7ED"
                    />
                    <stop
                        offset="55%"
                        stop-color="#8EA7B3"
                    />
                    <stop
                        offset="100%"
                        stop-color="#405762"
                    />
                </radialGradient>

                <linearGradient
                    id="agent-metal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stop-color="#526A75"
                    />
                    <stop
                        offset="50%"
                        stop-color="#F2F7F9"
                    />
                    <stop
                        offset="100%"
                        stop-color="#7D96A1"
                    />
                </linearGradient>

                <linearGradient
                    id="pcb-copper"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stop-color="#6D8D99"
                    />
                    <stop
                        offset="45%"
                        stop-color="#D9F0F5"
                    />
                    <stop
                        offset="100%"
                        stop-color="#FFFFFF"
                    />
                </linearGradient>

                <filter
                    id="pcb-glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur
                        stdDeviation="2"
                        result="blur"
                    />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* MAIN PANEL */}

            <circle
                cx="110"
                cy="110"
                r="88"
                fill="url(#agent-panel)"
                stroke="url(#agent-metal)"
                stroke-width="12"
            />

            {/* INNER RIM */}

            <circle
                cx="110"
                cy="110"
                r="77"
                fill="none"
                stroke="#FFFFFF"
                stroke-opacity=".35"
                stroke-width="2"
            />

            {/* PCB FIELD */}

            <g
                fill="none"
                stroke="url(#pcb-copper)"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                opacity=".82"
            >
                {/* upper left */}

                <path d="M48 82 H66 V69 H83" />
                <path d="M52 94 H72 V84 H91" />
                <path d="M61 61 V75 H73" />
                <path d="M70 51 V63 H91" />

                {/* upper right */}

                <path d="M132 53 H149 V67 H166" />
                <path d="M143 76 H158 V91 H174" />
                <path d="M151 60 V72 H168" />
                <path d="M163 79 V98 H176" />

                {/* middle left */}

                <path d="M45 106 H66 V96 H82" />
                <path d="M47 120 H69 V132 H86" />
                <path d="M54 139 H72 V151 H94" />
                <path d="M66 108 H82 V118 H94" />

                {/* middle right */}

                <path d="M138 105 H155 V95 H173" />
                <path d="M137 118 H155 V131 H175" />
                <path d="M133 134 H150 V150 H168" />
                <path d="M145 112 H162 V121 H177" />

                {/* lower */}

                <path d="M83 153 V168 H98" />
                <path d="M105 154 V174" />
                <path d="M126 154 V168 H143" />
                <path d="M94 163 V176" />
            </g>

            {/* PCB CONTACTS */}

            <g
                fill="#EAF7FA"
                stroke="#58727D"
                stroke-width="2"
            >
                <circle
                    cx="48"
                    cy="82"
                    r="3"
                />
                <circle
                    cx="52"
                    cy="94"
                    r="3"
                />
                <circle
                    cx="61"
                    cy="61"
                    r="3"
                />
                <circle
                    cx="70"
                    cy="51"
                    r="3"
                />

                <circle
                    cx="166"
                    cy="67"
                    r="3"
                />
                <circle
                    cx="174"
                    cy="91"
                    r="3"
                />
                <circle
                    cx="168"
                    cy="60"
                    r="3"
                />
                <circle
                    cx="176"
                    cy="98"
                    r="3"
                />

                <circle
                    cx="45"
                    cy="106"
                    r="3"
                />
                <circle
                    cx="47"
                    cy="120"
                    r="3"
                />
                <circle
                    cx="54"
                    cy="139"
                    r="3"
                />

                <circle
                    cx="173"
                    cy="95"
                    r="3"
                />
                <circle
                    cx="175"
                    cy="131"
                    r="3"
                />
                <circle
                    cx="168"
                    cy="150"
                    r="3"
                />
                <circle
                    cx="177"
                    cy="121"
                    r="3"
                />

                <circle
                    cx="98"
                    cy="174"
                    r="3"
                />
                <circle
                    cx="126"
                    cy="174"
                    r="3"
                />
            </g>

            {/* CENTRAL CIRCUIT */}

            <g filter="url(#pcb-glow)">
                <rect
                    x="84"
                    y="83"
                    width="52"
                    height="52"
                    rx="7"
                    fill="#405762"
                    fill-opacity=".72"
                    stroke="#EAF7FA"
                    stroke-opacity=".75"
                    stroke-width="3"
                />

                <rect
                    x="94"
                    y="93"
                    width="32"
                    height="32"
                    rx="3"
                    fill="none"
                    stroke="url(#pcb-copper)"
                    stroke-width="3"
                />

                <path
                    d="M94 101 H86
               M94 110 H84
               M94 119 H87
               M126 101 H134
               M126 110 H136
               M126 119 H133"
                    stroke="#EAF7FA"
                    stroke-width="2.5"
                    stroke-linecap="round"
                />

                <path
                    d="M101 93 V85
               M110 93 V82
               M119 93 V85
               M101 125 V133
               M110 125 V136
               M119 125 V133"
                    stroke="#EAF7FA"
                    stroke-width="2.5"
                    stroke-linecap="round"
                />

                <circle
                    cx="110"
                    cy="109"
                    r="8"
                    fill="none"
                    stroke="#F7FFFF"
                    stroke-width="3"
                />

                <circle
                    cx="110"
                    cy="109"
                    r="2.5"
                    fill="#FFFFFF"
                />
            </g>

            {/* ADDITIONAL SMALL COMPONENTS */}

            <g
                fill="#526D78"
                stroke="#EAF7FA"
                stroke-width="2"
            >
                <rect
                    x="68"
                    y="87"
                    width="8"
                    height="14"
                    rx="2"
                />
                <rect
                    x="145"
                    y="89"
                    width="8"
                    height="14"
                    rx="2"
                />
                <rect
                    x="74"
                    y="137"
                    width="10"
                    height="7"
                    rx="2"
                />
                <rect
                    x="143"
                    y="137"
                    width="10"
                    height="7"
                    rx="2"
                />
            </g>

            {/* TITLE */}

            <text
                x="110"
                y="78" //178
                text-anchor="middle"
                font-family="Tektur, sans-serif"
                font-size="32"
                font-weight="700"
                letter-spacing="2"
                fill="#ffffff"
                stroke="#080a0b"
                stroke-width="3"
                paint-order="stroke fill"
            >
                {title}
            </text>
        </svg>
    );
}
