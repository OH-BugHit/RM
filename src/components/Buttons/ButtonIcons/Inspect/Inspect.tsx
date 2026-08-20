import type { CSSProperties } from 'react';

interface InvestigateProps {
    size?: number;
    title?: string;
}

export default function InspectClusterIcon({ size = 220, title = 'INSPECT' }: InvestigateProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
            style={
                {
                    display: 'block',
                    overflow: 'visible',
                } as CSSProperties
            }
        >
            <defs>
                <radialGradient
                    id="investigate-panel"
                    cx="50%"
                    cy="35%"
                >
                    <stop
                        offset="0%"
                        stopColor="#E6D9F0"
                    />
                    <stop
                        offset="22%"
                        stopColor="#A77BCA"
                    />
                    <stop
                        offset="55%"
                        stopColor="#654586"
                    />
                    <stop
                        offset="100%"
                        stopColor="#2E1B3F"
                    />
                </radialGradient>

                <linearGradient
                    id="investigate-metal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#66516F"
                    />
                    <stop
                        offset="50%"
                        stopColor="#E3D8E8"
                    />
                    <stop
                        offset="100%"
                        stopColor="#8A7195"
                    />
                </linearGradient>

                <linearGradient
                    id="investigate-purple"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#B56AD0"
                    />
                    <stop
                        offset="100%"
                        stopColor="#F0DFFF"
                    />
                </linearGradient>
            </defs>

            <circle
                cx="110"
                cy="110"
                r="88"
                fill="url(#investigate-panel)"
                stroke="url(#investigate-metal)"
                strokeWidth="12"
            />

            <circle
                cx="110"
                cy="110"
                r="77"
                fill="none"
                stroke="#F8EEFF"
                strokeOpacity=".30"
                strokeWidth="2"
            />

            {/* Stars */}

            <g fill="#FFF3FF">
                <path d="M110 55 L113 64 L122 67 L113 70 L110 79 L107 70 L98 67 L107 64Z" />

                <path
                    d="M76 77 L78 84 L85 86 L78 88 L76 95 L74 88 L67 86 L74 84Z"
                    opacity=".75"
                />

                <path
                    d="M148 76 L150 82 L156 84 L150 86 L148 92 L146 86 L140 84 L146 82Z"
                    opacity=".70"
                />

                <path
                    d="M89 108 L91 114 L97 116 L91 118 L89 124 L87 118 L81 116 L87 114Z"
                    opacity=".65"
                />

                <path
                    d="M133 106 L135 112 L141 114 L135 116 L133 122 L131 116 L125 114 L131 112Z"
                    opacity=".65"
                />

                <path
                    d="M63 126 L65 132 L71 134 L65 136 L63 142 L61 136 L55 134 L61 132Z"
                    opacity=".65"
                />

                <path
                    d="M160 126 L162 132 L168 134 L162 136 L160 142 L158 136 L152 134 L158 132Z"
                    opacity=".65"
                />

                <path
                    d="M87 151 L88 155 L92 157 L88 159 L87 163 L86 159 L82 157 L86 155Z"
                    opacity=".55"
                />

                <path
                    d="M137 150 L138 154 L142 156 L138 158 L137 162 L136 158 L132 156 L136 154Z"
                    opacity=".55"
                />
            </g>

            {/* Title */}

            <text
                x="110"
                y="98"
                textAnchor="middle"
                fontFamily="Tektur, sans-serif"
                fontSize="30"
                fontWeight="700"
                letterSpacing="1"
                fill="url(#investigate-purple)"
                stroke="#28112F"
                strokeWidth="3"
                paintOrder="stroke fill"
            >
                {title}
            </text>

            {/* Magnifying glass */}

            <circle
                cx="109"
                cy="126"
                r="21"
                fill="#291334"
                fillOpacity=".55"
                stroke="url(#investigate-purple)"
                strokeWidth="6"
            />

            <circle
                cx="109"
                cy="126"
                r="13"
                fill="none"
                stroke="#F0DFFF"
                strokeOpacity=".55"
                strokeWidth="2"
            />

            <path
                d="M124 141 L143 160"
                fill="none"
                stroke="url(#investigate-purple)"
                strokeWidth="8"
                strokeLinecap="round"
            />

            <path
                d="M126 143 L143 160"
                fill="none"
                stroke="#F0DFFF"
                strokeOpacity=".55"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}
