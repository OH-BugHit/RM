import style from './trashIcon.module.css';

interface IconProps {
    size?: number;
}

export default function TrashIcon({ size = 256 }: IconProps) {
    return (
        <svg
            className={style.icon}
            width={size}
            height={size}
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient
                    id="trash-panel-metal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#A77D7D"
                    />
                    <stop
                        offset="40%"
                        stopColor="#DDBFBF"
                    />
                    <stop
                        offset="75%"
                        stopColor="#FAEAEA"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>

                <linearGradient
                    id="trash-metal"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#7A0808"
                    />
                    <stop
                        offset="40%"
                        stopColor="#B11919"
                    />
                    <stop
                        offset="75%"
                        stopColor="#EFB7B7"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>

                <radialGradient
                    id="trashPanel"
                    cx="50%"
                    cy="35%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFFFFF"
                    />
                    <stop
                        offset="22%"
                        stopColor="#EFB7B7"
                    />
                    <stop
                        offset="55%"
                        stopColor="#B38E8E"
                    />
                    <stop
                        offset="100%"
                        stopColor="#A35C5C"
                    />
                </radialGradient>

                <linearGradient
                    id="trash-dark"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#4D0606"
                    />
                    <stop
                        offset="100%"
                        stopColor="#770B0B"
                    />
                </linearGradient>

                <filter
                    id="trash-shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur
                        in="SourceAlpha"
                        stdDeviation="4"
                    />
                    <feOffset
                        dx="2"
                        dy="3"
                    />
                    <feComposite
                        in2="offsetblur"
                        operator="in"
                    />
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Outer button */}
            {/*
            <circle
                className={style.outer}
                cx="110"
                cy="110"
                r="88"
                fill="url(#trashPanel)"
                stroke="url(#trash-panel-metal)"
                strokeWidth="12"
            />

            {/* Inner rim */}
            {/* 
            <circle
                className={style.innerRim}
                cx="110"
                cy="110"
                r="77"
                fill="none"
                stroke="#F4FBFD"
                strokeOpacity=".32"
                strokeWidth="2"
            />

            {/*Bin */}

            <g filter="url(#trash-shadow)">
                {/*  Main body */}

                <path
                    d="
                M70 70
                L150 70
                L143 162
                Q142 170 134 172
                L86 172
                Q78 170 77 162
                Z
            "
                    fill="url(#trash-metal)"
                    stroke="#D9FFFC"
                    strokeOpacity=".75"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />

                {/* Dark lower edge */}

                <path
                    d="
                M77 157
                L143 157
                L143 162
                Q142 170 134 172
                L86 172
                Q78 170 77 162
                Z
            "
                    fill="url(#trash-dark)"
                    opacity=".55"
                />

                {/*  Vertical body highlights */}

                <path
                    className={style.trashHighlight}
                    d="M86 82 L91 155"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeOpacity=".32"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                <path
                    className={style.trashHighlight}
                    d="M134 82 L129 155"
                    fill="none"
                    stroke="#064D49"
                    strokeOpacity=".25"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {/*  Lid */}

                <path
                    className={style.trashHighlight}
                    d="
                M64 64
                Q64 58 70 57
                L150 57
                Q156 58 156 64
                L156 71
                L64 71
                Z
            "
                    fill="url(#trash-metal)"
                    stroke="#D9FFFC"
                    strokeOpacity=".8"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                />

                {/*  Lid top */}

                <rect
                    className={style.trashHighlight}
                    x="84"
                    y="48"
                    width="52"
                    height="10"
                    rx="4"
                    fill="url(#trash-metal)"
                    stroke="#D9FFFC"
                    strokeOpacity=".75"
                    strokeWidth="2"
                />

                {/*  Lid highlight */}

                <path
                    className={style.trashHighlight}
                    d="M72 61 L148 61"
                    stroke="#FFFFFF"
                    strokeOpacity=".5"
                    strokeWidth="2"
                    strokeLinecap="round"
                />

                {/*  Trash lines */}

                <path
                    className={style.trashHighlight}
                    d="M91 84 L94 151"
                    fill="none"
                    stroke="#064D49"
                    strokeOpacity=".45"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                <path
                    className={style.trashHighlight}
                    d="M110 84 L110 151"
                    fill="none"
                    stroke="#064D49"
                    strokeOpacity=".45"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                <path
                    className={style.trashHighlight}
                    d="M129 84 L126 151"
                    fill="none"
                    stroke="#064D49"
                    strokeOpacity=".45"
                    strokeWidth="4"
                    strokeLinecap="round"
                />

                {/*  Line highlights */}

                <path
                    d="M92 85 L95 149"
                    fill="none"
                    stroke="#B7EFEC"
                    strokeOpacity=".45"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                <path
                    d="M111 85 L111 149"
                    fill="none"
                    stroke="#B7EFEC"
                    strokeOpacity=".45"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                <path
                    d="M128 85 L125 149"
                    fill="none"
                    stroke="#B7EFEC"
                    strokeOpacity=".45"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
}

/*
old agent colors for thras:
<linearGradient
                    id="trash-panel-metal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#7D98A7"
                    />
                    <stop
                        offset="40%"
                        stopColor="#BFD3DD"
                    />
                    <stop
                        offset="75%"
                        stopColor="#EAF6FA"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>
                <linearGradient
                    id="trash-metal"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#087A74"
                    />
                    <stop
                        offset="40%"
                        stopColor="#19B1A8"
                    />
                    <stop
                        offset="75%"
                        stopColor="#B7EFEC"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FFFFFF"
                    />
                </linearGradient>
                <radialGradient
                    id="trashPanel"
                    cx="50%"
                    cy="35%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFFFFF"
                    />
                    <stop
                        offset="22%"
                        stopColor="#B7EFEC"
                    />
                    <stop
                        offset="55%"
                        stopColor="#8EA7B3"
                    />
                    <stop
                        offset="100%"
                        stopColor="#5ca39fab"
                    />
                </radialGradient>
                <linearGradient
                    id="trash-dark"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#064D49"
                    />
                    <stop
                        offset="100%"
                        stopColor="#0B7771"
                    />
                </linearGradient>

*/
