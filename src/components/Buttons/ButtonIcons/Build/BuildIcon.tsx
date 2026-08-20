import { CSSProperties } from '@mui/material';

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
            style={
                {
                    scale: 1.15,
                    display: 'block',
                    overflow: 'visible',
                } as CSSProperties
            }
        >
            <defs>
                <radialGradient
                    id="build-panel"
                    cx="32%"
                    cy="25%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFD6DC"
                    />
                    <stop
                        offset="22%"
                        stopColor="#E04F66"
                    />
                    <stop
                        offset="55%"
                        stopColor="#8A2F40"
                    />
                    <stop
                        offset="100%"
                        stopColor="#3A121C"
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
                        stopColor="#543720"
                    />
                    <stop
                        offset="50%"
                        stopColor="#f0d5c3"
                    />
                    <stop
                        offset="100%"
                        stopColor="#f0d0c3"
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
                        stopColor="#493F42"
                    />
                    <stop
                        offset="35%"
                        stopColor="#B8B2B4"
                    />
                    <stop
                        offset="55%"
                        stopColor="#F3F0F0"
                    />
                    <stop
                        offset="100%"
                        stopColor="#70686B"
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
                        stopColor="#4A2419"
                    />
                    <stop
                        offset="45%"
                        stopColor="#B9683E"
                    />
                    <stop
                        offset="75%"
                        stopColor="#D58B5C"
                    />
                    <stop
                        offset="100%"
                        stopColor="#6A3424"
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
                strokeWidth="12"
            />

            {/* Inner rim */}

            <circle
                cx="110"
                cy="110"
                r="77"
                fill="none"
                stroke="#FFECEA"
                strokeOpacity=".34"
                strokeWidth="2"
            />

            <circle
                cx="110"
                cy="110"
                r="69"
                fill="none"
                stroke="#FFECEA"
                strokeOpacity=".10"
                strokeWidth="1"
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
                    strokeWidth="3"
                />

                <path
                    d="M105 104 V158"
                    stroke="#F0B28D"
                    strokeOpacity=".45"
                    strokeWidth="3"
                    strokeLinecap="round"
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
                    strokeWidth="4"
                    strokeLinejoin="round"
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
                    strokeWidth="3"
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
                    strokeWidth="3"
                />

                {/* Highlight */}

                <path
                    d="M79 74 H137"
                    stroke="#FFFFFF"
                    strokeOpacity=".65"
                    strokeWidth="4"
                    strokeLinecap="round"
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
                    strokeWidth="3"
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
                textAnchor="middle"
                fontFamily="Tektur, sans-serif"
                fontSize="25"
                fontWeight="700"
                letterSpacing="2"
                fill="#FFF4F2"
                stroke="#431818"
                strokeWidth="3"
                paintOrder="stroke fill"
            >
                {title}
            </text>
        </svg>
    );
}
