import styles from './close.module.css';
import { useId } from 'react';
import type { SVGProps } from 'react';

type CloseIconType = 'red' | 'light' | 'dark';

interface CloseIconProps extends SVGProps<SVGSVGElement> {
    size?: number;
    type?: CloseIconType;
}

export default function CloseIcon({ size = 70, type = 'red', ...props }: CloseIconProps) {
    const id = useId();

    const gradientId = `${id}-metal`;
    const shadowId = `${id}-shadow`;

    const colors = {
        red: {
            dark: '#4A1518',
            mid: '#9E3438',
            light: '#E57C7E',
            highlight: '#FFE1E1',
            stroke: '#FFE3E3',
        },

        light: {
            dark: '#5A6268',
            mid: '#AAB5BA',
            light: '#E5ECEF',
            highlight: '#FFFFFF',
            stroke: '#FFFFFF',
        },

        dark: {
            dark: '#171B1D',
            mid: '#3B464B',
            light: '#718087',
            highlight: '#B9C5CA',
            stroke: '#DCE4E7',
        },
    }[type];

    return (
        <svg
            className={styles.icon}
            width={size}
            height={size}
            viewBox="0 0 70 70"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <linearGradient
                    id={gradientId}
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor={colors.dark}
                    />
                    <stop
                        offset="35%"
                        stopColor={colors.mid}
                    />
                    <stop
                        offset="65%"
                        stopColor={colors.light}
                    />
                    <stop
                        offset="100%"
                        stopColor={colors.highlight}
                    />
                </linearGradient>

                <filter
                    id={shadowId}
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                >
                    <feGaussianBlur
                        in="SourceAlpha"
                        stdDeviation="2.5"
                    />

                    <feOffset
                        dx="1"
                        dy="2"
                        result="offsetblur"
                    />

                    <feFlood
                        floodColor="#1B0506"
                        floodOpacity=".75"
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

            <g
                className={styles.cross}
                filter={`url(#${shadowId})`}
            >
                {/* Dark outer stroke */}

                <path
                    d="
                        M20 17
                        L35 32
                        L50 17
                        L54 21
                        L39 36
                        L54 51
                        L50 55
                        L35 40
                        L20 55
                        L16 51
                        L31 36
                        L16 21
                        Z
                    "
                    fill="#2A0809"
                    stroke="#260708"
                    strokeWidth="3"
                    strokeLinejoin="round"
                />

                {/* Main X */}

                <path
                    d="
                        M20 17
                        L35 32
                        L50 17
                        L54 21
                        L39 36
                        L54 51
                        L50 55
                        L35 40
                        L20 55
                        L16 51
                        L31 36
                        L16 21
                        Z
                    "
                    fill={`url(#${gradientId})`}
                    stroke={colors.stroke}
                    strokeOpacity=".7"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />

                {/* Highlight */}

                <path
                    d="
                        M20 19
                        L35 34
                        L50 19
                    "
                    fill="none"
                    stroke="#FFFFFF"
                    strokeOpacity=".5"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
}
