import style from './style.module.css';

interface ForesightProps {
    value: number; // 0...1
    size?: number;
}

export default function Foresight({ value, size = 256 }: ForesightProps) {
    const clamped = Math.max(0, Math.min(1, value));

    // Eye
    const eyeX = 32;
    const eyeY = 32;

    const groundY = 124;

    // Triangle width on ground
    const baseWidth = value * 62 + 18;

    // Distance controlled by value
    const minDistance = 8;
    const maxDistance = 180;

    const distance = minDistance + (maxDistance - minDistance) * clamped;

    const leftGroundX = eyeX + distance;
    const rightGroundX = leftGroundX + baseWidth;

    const points = `
        ${eyeX},${eyeY}
        ${leftGroundX},${groundY}
        ${rightGroundX},${groundY}
    `;

    return (
        <svg
            className={style.icon}
            width={size}
            height={size / 2}
            viewBox="0 0 256 128"
        >
            {/* defs */}
            <defs>
                <linearGradient
                    id="vision"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#A8F5FF"
                        stopOpacity=".10"
                    />

                    <stop
                        offset="100%"
                        stopColor="#39AFFF"
                        stopOpacity=".85"
                    />
                </linearGradient>
            </defs>

            {/* Eye */}

            <circle
                cx={eyeX}
                cy={eyeY}
                r="6"
                fill="#D5FAFF"
            />

            {/* Ground */}

            <line
                x1="20"
                y1={groundY}
                x2="236"
                y2={groundY}
                stroke="#325C7A"
                strokeWidth="3"
                opacity=".35"
            />

            {/* Vision cone */}

            <polygon
                points={points}
                fill="url(#vision)"
                stroke="#5EDBFF"
                strokeWidth="5"
                strokeLinejoin="round"
            />
        </svg>
    );
}
