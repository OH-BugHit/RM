import { useAtomValue } from 'jotai';
import styles from './design.module.css';
import { useEffect, useState, type SVGProps } from 'react';
import { TilePropsAtom } from '../../../../atoms/uiState';

interface ToolsIconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

export default function DesignIcon({ size = 140 }: ToolsIconProps) {
    const tileT = useAtomValue(TilePropsAtom);
    const [pop, setPop] = useState(false);

    useEffect(() => {
        setPop(true);

        const timer = setTimeout(() => {
            setPop(false);
        }, 250);

        return () => clearTimeout(timer);
    }, [tileT.length]);

    const Tile = ({ x, y }: { x: number; y: number }) => (
        <g transform={`translate(${x} ${y})`}>
            <path
                d="M0 18 L25 8 L50 18 L25 28 Z"
                fill="url(#tools-tile)"
                stroke="#FFE3DF"
                strokeOpacity=".7"
                strokeWidth="2.5"
                strokeLinejoin="round"
            />

            <path
                d="M0 18 L25 28 L25 38 L0 28 Z"
                fill="url(#tools-tile-side)"
                stroke="#451616"
                strokeWidth="2"
                strokeLinejoin="round"
            />

            <path
                d="M25 28 L50 18 L50 28 L25 38 Z"
                fill="#692727"
                stroke="#451616"
                strokeWidth="2"
                strokeLinejoin="round"
            />

            <path
                d="M7 18 L25 11 L43 18"
                fill="none"
                stroke="#FFFFFF"
                strokeOpacity=".25"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </g>
    );

    return (
        <svg
            className={styles.icon}
            width={size}
            height={size}
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient
                    id="design-panel"
                    cx="32%"
                    cy="25%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFD6D0"
                    />
                    <stop
                        offset="25%"
                        stopColor="#D8756E"
                    />
                    <stop
                        offset="60%"
                        stopColor="#8E3434"
                    />
                    <stop
                        offset="100%"
                        stopColor="#351212"
                    />
                </radialGradient>

                <linearGradient
                    id="design-metal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#542020"
                    />
                    <stop
                        offset="50%"
                        stopColor="#F0C7C3"
                    />
                    <stop
                        offset="100%"
                        stopColor="#934441"
                    />
                </linearGradient>

                <linearGradient
                    id="design-tile"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#632222"
                    />
                    <stop
                        offset="50%"
                        stopColor="#B84D47"
                    />
                    <stop
                        offset="100%"
                        stopColor="#E89A91"
                    />
                </linearGradient>

                <linearGradient
                    id="design-tile-side"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#9D403D"
                    />
                    <stop
                        offset="100%"
                        stopColor="#4A1A1A"
                    />
                </linearGradient>

                <filter
                    id="design-shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur stdDeviation="4" />
                </filter>
            </defs>

            {/* Panel */}

            <circle
                cx="110"
                cy="110"
                r="88"
                fill="url(#design-panel)"
                stroke="url(#design-metal)"
                strokeWidth="12"
            />

            {/* Inner rim */}

            <circle
                className={styles.rim}
                cx="110"
                cy="110"
                r="77"
                fill="none"
                stroke="#FFECEA"
                strokeOpacity=".34"
                strokeWidth="2"
            />

            {/* Grid shadow */}

            <path
                d="
                    M50 111
                    L110 87
                    L170 111
                    L170 145
                    L110 169
                    L50 145
                    Z
                "
                fill="#260B0B"
                opacity=".5"
                filter="url(#design-shadow)"
            />

            {/* Back row (Takarivi) */}
            <g className={styles.tile}>
                <Tile
                    x={70}
                    y={70}
                />
                <Tile
                    x={130}
                    y={96}
                />

                {/* Alarivi – oikealle ja alas */}
                <Tile
                    x={40}
                    y={83}
                />
                <Tile
                    x={70}
                    y={96}
                />
                <Tile
                    x={100}
                    y={109}
                />
            </g>

            {/* Landing tile shadow */}

            <ellipse
                cx="157"
                cy="63"
                rx="27"
                ry="7"
                fill="#260B0B"
                opacity=".35"
                filter="url(#design-shadow)"
                transform="rotate(18 157 63)"
            />

            {/* Landing tile */}

            <g
                className={styles.landingTile}
                transform="translate(136 45) rotate(18 25 19)"
            >
                <Tile
                    x={0}
                    y={0}
                />
            </g>

            {/* Landing highlight */}

            <path
                className={styles.motion}
                d="M143 45 L151 41"
                stroke="#FFECEA"
                strokeOpacity=".35"
                strokeWidth="2"
                strokeLinecap="round"
            />

            <path
                className={styles.motion}
                d="M148 51 L158 46"
                stroke="#FFECEA"
                strokeOpacity=".18"
                strokeWidth="1.5"
                strokeLinecap="round"
            />

            <circle
                cx="40"
                cy="44"
                r="30"
                fill="url(#design-panel)"
                stroke="url(#design-metal)"
                strokeWidth="12"
            />
            <text
                className={`${styles.counter} ${pop ? styles.pop : ''}`}
                x="40"
                y="44"
                text-anchor="middle"
                dominant-baseline="middle"
                font-family="Tektur, sans-serif"
                font-size="25"
                font-weight="700"
                letter-spacing="2"
                fill="#FFF4F2"
                stroke="#431818"
                stroke-width="3"
                paint-order="stroke fill"
            >
                {tileT.length}
            </text>
        </svg>
    );
}
