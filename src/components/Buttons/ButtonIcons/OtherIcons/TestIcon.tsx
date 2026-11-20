import { useEffect, useRef, useState } from 'react';
import style from './test.module.css';

interface InvestigateProps {
    size?: number;
    title?: string;
    active?: boolean;
    disabled?: boolean;
    locked?: boolean;
    unlocked?: boolean;
    target: number;
    current: number;
}

export default function TestIcon({
    size = 220,
    title = 'TEST',
    target,
    current,
    active = false,
    disabled = false,
    locked = false,
    unlocked = false,
}: InvestigateProps) {
    const [opening, setOpening] = useState(false);
    const [showLock, setShowLock] = useState(locked && !unlocked);
    const prevUnlockedRef = useRef(unlocked);

    useEffect(() => {
        const wasUnlocked = prevUnlockedRef.current;
        prevUnlockedRef.current = unlocked;

        if (locked && !unlocked) {
            setOpening(false);
            setShowLock(true);
            return;
        }

        if (unlocked && !wasUnlocked && showLock) {
            setOpening(false);
            let raf2 = 0;
            const raf1 = window.requestAnimationFrame(() => {
                raf2 = window.requestAnimationFrame(() => {
                    setOpening(true);
                });
            });

            const timer = window.setTimeout(() => {
                setShowLock(false);
                setOpening(false);
            }, 860);

            return () => {
                window.cancelAnimationFrame(raf1);
                if (raf2) window.cancelAnimationFrame(raf2);
                window.clearTimeout(timer);
            };
        }

        if (!locked && !unlocked && !opening) {
            setShowLock(false);
        }
    }, [locked, unlocked, showLock, opening]);

    const isGrayscale = disabled || (locked && !unlocked);

    return (
        <svg
            className={[
                style.icon,
                active ? style.pressed : '',
                disabled ? style.disabled : '',
                isGrayscale ? style.grayscale : '',
                showLock ? style.lockVisible : style.lockHidden,
                opening ? style.lockOpen : style.lockClosed,
            ]
                .filter(Boolean)
                .join(' ')}
            width={size}
            height={size}
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
            aria-label={title}
            aria-disabled={disabled || undefined}
        >
            <defs>
                {/* MAIN PANEL GRADIENT */}
                <radialGradient
                    id="agent-panel"
                    cx="32%"
                    cy="25%"
                >
                    <stop
                        offset="0%"
                        stopColor="#FFF4E3"
                    />
                    <stop
                        offset="22%"
                        stopColor="#FFD39A"
                    />
                    <stop
                        offset="55%"
                        stopColor="#F9B65F"
                    />
                    <stop
                        offset="100%"
                        stopColor="#FD9D32"
                    />
                </radialGradient>

                {/* METAL BORDER */}
                <linearGradient
                    id="agent-metal"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                >
                    <stop
                        offset="0%"
                        stopColor="#756252"
                    />
                    <stop
                        offset="50%"
                        stopColor="#f9f7f2"
                    />
                    <stop
                        offset="100%"
                        stopColor="#a1967d"
                    />
                </linearGradient>

                {/* BLACK / YELLOW WARNING STRIPES */}
                <pattern
                    id="agent-warning-stripes"
                    patternUnits="userSpaceOnUse"
                    width="20"
                    height="20"
                    patternTransform="rotate(45)"
                >
                    <rect
                        x="0"
                        y="0"
                        width="20"
                        height="20"
                        fill="#F2D21B"
                    />
                    <rect
                        x="0"
                        y="0"
                        width="10"
                        height="20"
                        fill="#080808"
                    />
                </pattern>

                {/* PANEL CLIP */}
                <clipPath id="agent-panel-clip">
                    <circle
                        cx="110"
                        cy="110"
                        r="82"
                    />
                </clipPath>

                {/* LOCK SHACKLE METAL GRADIENT */}
                <linearGradient
                    id="lock-shackle-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#CFC5B4"
                    />
                    <stop
                        offset="38%"
                        stopColor="#8F8473"
                    />
                    <stop
                        offset="72%"
                        stopColor="#5E5548"
                    />
                    <stop
                        offset="100%"
                        stopColor="#9C917F"
                    />
                </linearGradient>

                {/* LOCK BODY GRADIENT */}
                <linearGradient
                    id="lock-body-grad"
                    x1="15%"
                    y1="0%"
                    x2="85%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#8A7E6D"
                    />
                    <stop
                        offset="45%"
                        stopColor="#655C4F"
                    />
                    <stop
                        offset="100%"
                        stopColor="#3F3930"
                    />
                </linearGradient>

                {/* LOCK HIGHLIGHT GRADIENT */}
                <linearGradient
                    id="lock-bevel-grad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        stopColor="#F5EFE4"
                        stopOpacity="0.65"
                    />
                    <stop
                        offset="100%"
                        stopColor="#F5EFE4"
                        stopOpacity="0.08"
                    />
                </linearGradient>

                {/* LOCK DROP SHADOW */}
                <filter
                    id="lock-shadow"
                    x="-25%"
                    y="-25%"
                    width="150%"
                    height="150%"
                >
                    <feDropShadow
                        dx="0"
                        dy="5"
                        stdDeviation="4.5"
                        floodColor="#080A0B"
                        floodOpacity="0.55"
                    />
                </filter>
            </defs>

            {/* BUTTON BASE (GRAYSCALE APPLIES HERE, NOT TO THE LOCK) */}
            <g className={style.buttonBase}>
                <circle
                    className={style.outerRim}
                    cx="110"
                    cy="110"
                    r="88"
                    fill="url(#agent-panel)"
                    stroke="url(#agent-metal)"
                    strokeWidth="12"
                />

                <g clipPath="url(#agent-panel-clip)">
                    {/* TOP */}
                    <rect
                        x="18"
                        y="20"
                        width="184"
                        height="40"
                        fill="url(#agent-warning-stripes)"
                    />

                    {/* BOTTOM */}
                    <rect
                        x="18"
                        y="160"
                        width="184"
                        height="40"
                        fill="url(#agent-warning-stripes)"
                    />
                </g>

                <circle
                    className={style.rim}
                    cx="110"
                    cy="110"
                    r="77"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeOpacity=".35"
                    strokeWidth="2"
                />

                <g className={style.content}>
                    {active ? (
                        <text
                            x="110"
                            y="120"
                            textAnchor="middle"
                            fontFamily="Tektur, sans-serif"
                            fontSize="32"
                            fontWeight="700"
                            letterSpacing="2"
                            fill="#FFFFFF"
                            stroke="#080A0B"
                            strokeWidth="3"
                            paintOrder="stroke fill"
                        >
                            {current}/{target}
                        </text>
                    ) : (
                        <text
                            x="110"
                            y="120"
                            textAnchor="middle"
                            fontFamily="Tektur, sans-serif"
                            fontSize="32"
                            fontWeight="700"
                            letterSpacing="2"
                            fill="#FFFFFF"
                            stroke="#080A0B"
                            strokeWidth="3"
                            paintOrder="stroke fill"
                        >
                            {title}
                        </text>
                    )}
                </g>
            </g>

            {/* INDUSTRIAL PADLOCK OVERLAY (KEEPS FULL COLOR) */}
            {showLock && (
                <g
                    className={style.lockOverlay}
                    filter="url(#lock-shadow)"
                >
                    <g className={style.lockUnit}>
                        {/* ANIMATED SHACKLE */}
                        <g className={style.lockShackle}>
                            <path
                                d="M 89 100 V 84 A 21 21 0 0 1 131 84 V 100"
                                fill="none"
                                stroke="#141311"
                                strokeWidth="12.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M 89 100 V 84 A 21 21 0 0 1 131 84 V 100"
                                fill="none"
                                stroke="url(#lock-shackle-grad)"
                                strokeWidth="8.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M 87 98 V 84 A 23 23 0 0 1 127 64"
                                fill="none"
                                stroke="#FFF7E8"
                                strokeOpacity="0.45"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        </g>

                        {/* LOCK BODY */}
                        <rect
                            x="74"
                            y="97"
                            width="72"
                            height="58"
                            rx="10"
                            ry="10"
                            fill="url(#lock-body-grad)"
                            stroke="#161412"
                            strokeWidth="3"
                        />

                        {/* INNER BEVEL FRAME */}
                        <rect
                            x="77.5"
                            y="100.5"
                            width="65"
                            height="51"
                            rx="7.5"
                            ry="7.5"
                            fill="none"
                            stroke="url(#lock-bevel-grad)"
                            strokeWidth="1.5"
                        />

                        {/* CORNER RIVETS */}
                        <circle
                            cx="83"
                            cy="105.5"
                            r="2"
                            fill="#2A2621"
                            stroke="#D8CEBE"
                            strokeOpacity="0.35"
                            strokeWidth="0.7"
                        />
                        <circle
                            cx="137"
                            cy="105.5"
                            r="2"
                            fill="#2A2621"
                            stroke="#D8CEBE"
                            strokeOpacity="0.35"
                            strokeWidth="0.7"
                        />
                        <circle
                            cx="83"
                            cy="146.5"
                            r="2"
                            fill="#2A2621"
                            stroke="#D8CEBE"
                            strokeOpacity="0.35"
                            strokeWidth="0.7"
                        />
                        <circle
                            cx="137"
                            cy="146.5"
                            r="2"
                            fill="#2A2621"
                            stroke="#D8CEBE"
                            strokeOpacity="0.35"
                            strokeWidth="0.7"
                        />

                        {/* KEYHOLE RECESS & SLOT */}
                        <path
                            d="M 110 113 A 7.5 7.5 0 0 0 106.6 126.2 L 104.4 140.5 A 2 2 0 0 0 106.4 143 H 113.6 A 2 2 0 0 0 115.6 140.5 L 113.4 126.2 A 7.5 7.5 0 0 0 110 113 Z"
                            fill="#12100E"
                            stroke="#CBBFA9"
                            strokeOpacity="0.45"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                        />
                    </g>
                </g>
            )}
        </svg>
    );
}
