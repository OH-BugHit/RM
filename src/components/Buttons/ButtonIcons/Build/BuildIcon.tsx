interface InvestigateProps {
    size?: number;
    title?: string;
}

export default function BuildIcon({ size = 220, title = 'BUILD' }: InvestigateProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient
                    id="build-panel"
                    cx="32%"
                    cy="25%"
                >
                    <stop
                        offset="0%"
                        stop-color="#FFD6D0"
                    />
                    <stop
                        offset="22%"
                        stop-color="#D94A4A"
                    />
                    <stop
                        offset="55%"
                        stop-color="#7A2929"
                    />
                    <stop
                        offset="100%"
                        stop-color="#351212"
                    />
                </radialGradient>

                <linearGradient
                    id="build-metal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stop-color="#543720"
                    />
                    <stop
                        offset="50%"
                        stop-color="#f0d5c3"
                    />
                    <stop
                        offset="100%"
                        stop-color="#f0d0c3"
                    />
                </linearGradient>

                <linearGradient
                    id="hammer-metal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stop-color="#493F42"
                    />
                    <stop
                        offset="35%"
                        stop-color="#B8B2B4"
                    />
                    <stop
                        offset="55%"
                        stop-color="#F3F0F0"
                    />
                    <stop
                        offset="100%"
                        stop-color="#70686B"
                    />
                </linearGradient>

                <linearGradient
                    id="hammer-handle"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stop-color="#4A2419"
                    />
                    <stop
                        offset="45%"
                        stop-color="#B9683E"
                    />
                    <stop
                        offset="75%"
                        stop-color="#D58B5C"
                    />
                    <stop
                        offset="100%"
                        stop-color="#6A3424"
                    />
                </linearGradient>
            </defs>

            {/* Main panel */}

            <circle
                cx="110"
                cy="110"
                r="88"
                fill="url(#build-panel)"
                stroke="url(#build-metal)"
                stroke-width="12"
            />

            {/* Inner rim */}

            <circle
                cx="110"
                cy="110"
                r="77"
                fill="none"
                stroke="#FFECEA"
                stroke-opacity=".34"
                stroke-width="2"
            />

            <circle
                cx="110"
                cy="110"
                r="69"
                fill="none"
                stroke="#FFECEA"
                stroke-opacity=".10"
                stroke-width="1"
            />

            {/* Hammer shadow */}

            <g
                transform="rotate(-35 110 112)"
                fill="#351212"
                opacity=".55"
            >
                <rect
                    x="101"
                    y="102"
                    width="16"
                    height="63"
                    rx="7"
                />

                <path
                    d="
                M73 72
                H145
                Q151 72 151 78
                V96
                Q151 102 145 102
                H73
                Q67 102 67 96
                V78
                Q67 72 73 72
                Z
            "
                />
            </g>

            {/* Hammer */}

            <g transform="rotate(-35 110 110)">
                {/* Handle */}

                <rect
                    x="101"
                    y="98"
                    width="16"
                    height="68"
                    rx="7"
                    fill="url(#hammer-handle)"
                    stroke="#3A1A14"
                    stroke-width="3"
                />

                <path
                    d="M105 104 V158"
                    stroke="#F0B28D"
                    stroke-opacity=".45"
                    stroke-width="3"
                    stroke-linecap="round"
                />

                {/* Hammer head */}

                <path
                    d="
                M72 68
                H148
                Q154 68 154 74
                V94
                Q154 101 147 101
                H73
                Q66 101 66 94
                V75
                Q66 68 72 68
                Z
            "
                    fill="url(#hammer-metal)"
                    stroke="#3E3739"
                    stroke-width="4"
                    stroke-linejoin="round"
                />

                {/* Hammer face */}

                <path
                    d="
                M66 76
                H78
                V94
                H66
                Q62 94 62 90
                V80
                Q62 76 66 76
                Z
            "
                    fill="#777174"
                    stroke="#403A3C"
                    stroke-width="3"
                />

                <path
                    d="
                M142 76
                H154
                Q158 76 158 80
                V90
                Q158 94 154 94
                H142
                Z
            "
                    fill="#AAA4A6"
                    stroke="#403A3C"
                    stroke-width="3"
                />

                {/* Highlight */}

                <path
                    d="M79 74 H137"
                    stroke="#FFFFFF"
                    stroke-opacity=".65"
                    stroke-width="4"
                    stroke-linecap="round"
                />

                {/* Neck */}

                <rect
                    x="98"
                    y="91"
                    width="22"
                    height="18"
                    rx="3"
                    fill="#777174"
                    stroke="#403A3C"
                    stroke-width="3"
                />
            </g>

            {/* Small construction accents */}

            <g
                fill="#FFECEA"
                opacity=".75"
            >
                <circle
                    cx="57"
                    cy="116"
                    r="2.5"
                />
                <circle
                    cx="163"
                    cy="103"
                    r="2.5"
                />
                <circle
                    cx="71"
                    cy="151"
                    r="2"
                />
                <circle
                    cx="151"
                    cy="147"
                    r="2"
                />
            </g>

            {/* Title */}

            <text
                x="110"
                y="154"
                text-anchor="middle"
                font-family="Tektur, sans-serif"
                font-size="25"
                font-weight="700"
                letter-spacing="2"
                fill="#FFF4F2"
                stroke="#431818"
                stroke-width="3"
                paint-order="stroke fill"
            >
                {title}
            </text>
        </svg>
    );
}
