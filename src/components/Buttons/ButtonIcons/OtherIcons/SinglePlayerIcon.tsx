import style from './single.module.css';

interface SinglePlayerIconProps {
    size?: number;
    onClick?: () => void;
}

export default function SinglePlayerIcon({ size = 64, onClick }: SinglePlayerIconProps) {
    return (
        <svg
            className={style.icon}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 256 256"
            onClick={onClick}
            role={onClick ? 'img' : undefined}
        >
            <defs>
                <linearGradient
                    id="singlePlayer"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                >
                    <stop
                        offset="0"
                        stopColor="#ffe49a"
                    />
                    <stop
                        offset="1"
                        stopColor="#ffca6e"
                    />
                </linearGradient>

                <filter
                    id="singlePlayerGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur
                        stdDeviation="5"
                        result="blur"
                    />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Outer circle */}
            <circle
                className={style.circle}
                cx="128"
                cy="128"
                r="104"
                fill="#172541"
                stroke="#ffb66e"
                strokeWidth="6"
            />

            {/* Inner ring */}
            <circle
                className={style.innerRing}
                cx="128"
                cy="128"
                r="88"
                fill="none"
                stroke="#747f38"
                strokeWidth="3"
            />

            {/* Head */}
            <circle
                className={style.player}
                cx="128"
                cy="82"
                r="25"
                fill="url(#singlePlayer)"
                filter="url(#singlePlayerGlow)"
            />

            {/* Body */}
            <path
                className={style.player}
                d="
                    M88 184
                    C90 151 105 125 128 125
                    C151 125 166 151 168 184
                    Q168 190 162 190
                    H94
                    Q88 190 88 184
                    Z
                "
                fill="url(#singlePlayer)"
            />

            {/* Single player indicator */}
            <circle
                className={style.indicator}
                cx="128"
                cy="218"
                r="7"
                fill="#ffd29a"
                filter="url(#singlePlayerGlow)"
            />
        </svg>
    );
}
