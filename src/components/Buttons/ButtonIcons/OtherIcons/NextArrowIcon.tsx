import style from './nextArrowIcon.module.css';

interface TutorialArrowProps {
    size?: number;
    ready?: boolean;
}

export default function NextArrowIcon({ size = 64, ready }: TutorialArrowProps) {
    return (
        <svg
            className={`${style.icon} ${!ready ? style.ready : ''} `}
            width={size}
            height={size}
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient
                    id="tutorialArrowTealGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >
                    <stop
                        offset="0%"
                        stopColor="#18AFC0"
                    />
                    <stop
                        offset="45%"
                        stopColor="#008297"
                    />
                    <stop
                        offset="100%"
                        stopColor="#006575"
                    />
                </linearGradient>

                <linearGradient
                    id="tutorialArrowHighlightGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFFFFF"
                        stopOpacity=".45"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                        stopOpacity="0"
                    />
                </linearGradient>

                <filter
                    id="tutorialArrowShadow"
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="170%"
                >
                    <feDropShadow
                        dx="0"
                        dy="5"
                        stdDeviation="4"
                        floodColor="#00343D"
                        floodOpacity=".45"
                    />
                </filter>
            </defs>

            <g filter="url(#tutorialArrowShadow)">
                {/* Main arrow */}
                <path
                    d="
                        M18 47
                        H68
                        V31
                        Q68 26 72 23
                        Q76 20 80 24
                        L110 57
                        Q116 64 110 71
                        L80 104
                        Q76 108 72 105
                        Q68 102 68 97
                        V81
                        H18
                        Q13 81 13 76
                        V52
                        Q13 47 18 47
                        Z
                    "
                    fill="url(#tutorialArrowTealGradient)"
                    stroke="#004C59"
                    strokeWidth="5"
                    strokeLinejoin="round"
                />

                {/* Top shine */}
                <path
                    d="
                        M20 50
                        H69
                        Q73 50 73 46
                        V32
                        L105 64
                        L73 97
                        V82
                        Q73 78 69 78
                        H20
                        Z
                    "
                    fill="url(#tutorialArrowHighlightGradient)"
                    opacity=".65"
                />

                {/* Inner edge */}
                <path
                    d="
                        M20 51
                        H67
                        Q72 51 72 46
                        V33
                        M78 31
                        L106 61
                        Q109 64 106 67
                        L78 97
                    "
                    fill="none"
                    stroke="#7DE3E8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity=".7"
                />
            </g>
        </svg>
    );
}
