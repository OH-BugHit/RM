import style from './stopWatch.module.css';
import { useAtomValue } from 'jotai';
import { EnvSettingsAtom, StepsLeftAtom } from '../../atoms/gameState';
import { GameControlAtom } from '../../atoms/state';
import FastForwardIcon from '../Buttons/ButtonIcons/ControlIcons/FastForwardIcon';
type StopwatchProps = {
    size?: number;
};

export default function Stopwatch({ size = 180 }: StopwatchProps) {
    const envSettings = useAtomValue(EnvSettingsAtom);
    const stepsLeft = useAtomValue(StepsLeftAtom);
    const gameState = useAtomValue(GameControlAtom);

    const maxTurns = envSettings.generic.env.maxTurns;

    // 1 = täysi, 0 = tyhjä
    const progress = Math.max(0, Math.min(1, stepsLeft / maxTurns));

    const r = 60;
    const stroke = 28;

    const circumference = 2 * Math.PI * r;

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 200 190"
        >
            <defs>
                <linearGradient
                    id="bodyGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#f8f8f8"
                    />
                    <stop
                        offset="45%"
                        stopColor="#d8d8d8"
                    />
                    <stop
                        offset="100%"
                        stopColor="#8b8b8b"
                    />
                </linearGradient>

                <linearGradient
                    id="orangeGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#ffb04d"
                    />
                    <stop
                        offset="100%"
                        stopColor="#e86d00"
                    />
                </linearGradient>

                <linearGradient
                    id="blueGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#79d2ff"
                    />
                    <stop
                        offset="100%"
                        stopColor="#2498ff"
                    />
                </linearGradient>

                <radialGradient id="centerGradient">
                    <stop
                        offset="0%"
                        stopColor="#444"
                    />
                    <stop
                        offset="100%"
                        stopColor="#161616"
                    />
                </radialGradient>

                <filter
                    id="shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feDropShadow
                        dx="0"
                        dy="3"
                        stdDeviation="3"
                        floodOpacity="0.35"
                    />
                </filter>
            </defs>
            {/* Kellon korvat */}
            <g filter="url(#shadow)">
                <circle
                    cx="52"
                    cy="28"
                    r="11"
                    fill="url(#bodyGradient)"
                />

                <circle
                    cx="148"
                    cy="28"
                    r="11"
                    fill="url(#bodyGradient)"
                />

                <rect
                    x="89"
                    y="4"
                    width="22"
                    height="24"
                    rx="6"
                    fill="url(#bodyGradient)"
                />
            </g>

            {/* Kellon runko */}
            <g filter="url(#shadow)">
                <circle
                    cx="100"
                    cy="100"
                    r="82"
                    fill="url(#bodyGradient)"
                />

                <circle
                    cx="100"
                    cy="100"
                    r="82"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="3"
                />

                <circle
                    cx="100"
                    cy="100"
                    r="79"
                    fill="none"
                    stroke="#888"
                    strokeWidth="2"
                />
            </g>

            {/* Orange ring */}
            <circle
                cx="100"
                cy="100"
                r={r}
                fill="none"
                stroke="url(#orangeGradient)"
                strokeWidth={stroke}
                transform="rotate(-90 100 100)"
            />

            {/* Blue ring */}
            <circle
                cx="100"
                cy="100"
                r={r}
                fill="none"
                stroke="url(#blueGradient)"
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                transform="rotate(-90 100 100)"
                style={{
                    transition: 'stroke-dashoffset 250ms linear',
                }}
            />

            {/* Fast forward overlay */}
            {gameState.isFast && (
                <>
                    <circle
                        cx="100"
                        cy="100"
                        r={r}
                        fill="none"
                        stroke="url(#orangeGradient)"
                        strokeWidth={stroke}
                        transform="rotate(-90 100 100)"
                    />
                    <circle
                        className={style.ff}
                        cx="100"
                        cy="100"
                        r={r}
                        fill="none"
                        stroke="url(#blueGradient)"
                        strokeWidth={stroke}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * 0.1}
                        style={{
                            transition: 'stroke-dashoffset 250ms linear',
                        }}
                    />
                </>
            )}

            {/* Center */}
            <circle
                cx="100"
                cy="100"
                r="34"
                fill="url(#centerGradient)"
                stroke="#666"
                strokeWidth="2"
            />

            {gameState.isFast ? (
                <g
                    transform="translate(74 70)"
                    className={style.ffIcon}
                >
                    <FastForwardIcon size={60} />
                </g>
            ) : (
                <text
                    x="100"
                    y="112"
                    textAnchor="middle"
                    fontSize="38"
                    fontWeight="900"
                    fontFamily="Verdana"
                    fill="#ffe600"
                    stroke="#444"
                    strokeWidth="1"
                >
                    {stepsLeft}
                </text>
            )}
        </svg>
    );
}
