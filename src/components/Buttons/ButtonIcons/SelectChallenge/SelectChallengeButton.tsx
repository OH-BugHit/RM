import style from './challengeButton.module.css';

interface ChallengeButtonProps {
    text?: string;
    isOpen?: boolean;
}

export default function ChallengeButton({ text = 'Select Challenge', isOpen = false }: ChallengeButtonProps) {
    return (
        <svg
            className={style.button}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 420 112"
        >
            <defs>
                <linearGradient
                    id="challengeButtonBg"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                >
                    <stop
                        offset="0"
                        stopColor="#c3855c"
                    />
                    <stop
                        offset="1"
                        stopColor="#412f17"
                    />
                </linearGradient>

                <filter
                    id="challengeGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur
                        stdDeviation="4"
                        result="blur"
                    />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Button */}
            <rect
                className={style.background}
                x="5"
                y="5"
                width="410"
                height="102"
                rx="22"
                fill="url(#challengeButtonBg)"
                stroke="#ffd86e"
                strokeWidth="4"
            />

            {/* Inner highlight */}
            <rect
                className={style.innerHighlight}
                x="11"
                y="11"
                width="398"
                height="90"
                rx="17"
                fill="none"
                stroke="#7f6638"
                strokeWidth="2"
            />

            {/* Grid world */}
            <g
                className={style.gridWorld}
                transform="translate(58 56)"
            >
                <circle
                    className={style.gridCircle}
                    r="29"
                    fill="#692204"
                    stroke="#ffdd6e"
                    strokeWidth="3"
                />

                <rect
                    x="-18"
                    y="-18"
                    width="36"
                    height="36"
                    rx="3"
                    fill="none"
                    stroke="#ffe79a"
                    strokeWidth="3"
                />

                <path
                    d="
                        M-6 -18 V18
                        M6 -18 V18
                        M-18 -6 H18
                        M-18 6 H18
                    "
                    fill="none"
                    stroke="#f0ff9a"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />

                <rect
                    className={style.selectedTile}
                    x="-5"
                    y="-5"
                    width="10"
                    height="10"
                    rx="2"
                    fill="#ffe96e"
                />
            </g>

            {/* Text */}
            <text
                className={`${style.text} ${isOpen ? style.textOpen : ''}`}
                x="235"
                y="65"
                textAnchor="middle"
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="27"
                fontWeight="700"
                letterSpacing="0.5"
                fill="#fffc9a"
            >
                {text}
            </text>

            {/* Arrow - initially pointing up */}
            <path
                className={`${style.arrow} ${isOpen ? style.arrowOpen : ''}`}
                d="M370 64 L382 52 L394 64"
                fill="none"
                stroke="#ffe06e"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
