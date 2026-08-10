import { useAtomValue } from 'jotai';
import { HUDvisAtom } from '../../../atoms/uiState';

interface RewardProps {
    title: string;
}
export default function Reward({ title }: RewardProps) {
    const vis = useAtomValue(HUDvisAtom);
    const fontSize = title.length <= 3 ? 52 : title.length <= 5 ? 44 : title.length <= 7 ? 30 : 24;

    return (
        <>
            {vis.reward && (
                <svg
                    width={220}
                    height={220}
                    viewBox="0 0 256 256"
                >
                    <defs>
                        <linearGradient
                            id="rewardMetal"
                            x1="0%"
                            y1="100%"
                            x2="0%"
                            y2="0%"
                        >
                            <stop
                                offset="0%"
                                stop-color="#873f35"
                            />
                            <stop
                                offset="40%"
                                stop-color="#df9575"
                            />
                            <stop
                                offset="75%"
                                stop-color="#d4a855"
                            />
                            <stop
                                offset="100%"
                                stop-color="#fce1a5"
                            />
                        </linearGradient>

                        <radialGradient
                            id="panel"
                            cx="50%"
                            cy="35%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#ce8443"
                            />
                            <stop
                                offset="100%"
                                stopColor="#382d08"
                            />
                        </radialGradient>

                        <linearGradient
                            id="gold"
                            x1="0%"
                            y1="100%"
                            x2="0%"
                            y2="0%"
                        >
                            <stop
                                offset="0%"
                                stop-color="#E6B327"
                            />
                            <stop
                                offset="100%"
                                stop-color="#FFF4BE"
                            />
                        </linearGradient>
                    </defs>

                    <circle
                        cx="128"
                        cy="128"
                        r="88"
                        fill="url(#panel)"
                        stroke="url(#rewardMetal)"
                        stroke-width="12"
                    />

                    <circle
                        cx="128"
                        cy="128"
                        r="77"
                        fill="none"
                        stroke="#F4FBFD"
                        stroke-opacity=".30"
                        stroke-width="2"
                    />

                    <g fill="#FFF7CF">
                        <path d="M128 64 L131 73 L140 76 L131 79 L128 88 L125 79 L116 76 L125 73Z" />

                        <path
                            d="M92 92 L94 98 L100 100 L94 102 L92 108 L90 102 L84 100 L90 98Z"
                            opacity=".75"
                        />

                        <path
                            d="M168 90 L170 96 L176 98 L170 100 L168 106 L166 100 L160 98 L166 96Z"
                            opacity=".75"
                        />

                        <path
                            d="M112 112 L114 117 L119 119 L114 121 L112 126 L110 121 L105 119 L110 117Z"
                            opacity=".70"
                        />

                        <path
                            d="M146 112 L148 117 L153 119 L148 121 L146 126 L144 121 L139 119 L144 117Z"
                            opacity=".70"
                        />

                        <path
                            d="M128 126 L130 131 L135 133 L130 135 L128 140 L126 135 L121 133 L126 131Z"
                            opacity=".60"
                        />

                        <path
                            d="M72 142 L74 147 L79 149 L74 151 L72 156 L70 151 L65 149 L70 147Z"
                            opacity=".65"
                        />

                        <path
                            d="M184 140 L186 145 L191 147 L186 149 L184 154 L182 149 L177 147 L182 145Z"
                            opacity=".65"
                        />

                        <path
                            d="M108 176 L109 180 L113 181 L109 182 L108 186 L107 182 L103 181 L107 180Z"
                            opacity=".55"
                        />

                        <path
                            d="M148 178 L149 182 L153 183 L149 184 L148 188 L147 184 L143 183 L147 182Z"
                            opacity=".55"
                        />
                    </g>

                    <text
                        x="128"
                        y="126"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontFamily="Tektur, sans-serif"
                        fontSize={fontSize}
                        fontWeight="700"
                        fill="url(#gold)"
                        stroke="#2B1A00"
                        strokeWidth="3"
                        paintOrder="stroke fill"
                    >
                        {title}
                    </text>
                </svg>
            )}
        </>
    );
}
