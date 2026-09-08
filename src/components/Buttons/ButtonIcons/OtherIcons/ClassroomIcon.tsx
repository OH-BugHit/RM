import style from './classroom.module.css';

interface ClassroomIconProps {
    size?: number;
    onClick?: () => void;
}

export default function ClassroomIcon({ size = 64, onClick }: ClassroomIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 256 256"
            onClick={onClick}
            role={onClick ? 'img' : undefined}
        >
            <defs>
                <linearGradient
                    id="classroom"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                >
                    <stop
                        offset="0"
                        stopColor="#d9f5f2"
                    />
                    <stop
                        offset="1"
                        stopColor="#72c9c1"
                    />
                </linearGradient>

                <filter
                    id="classroomGlow"
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

            {/* Teacher */}
            <circle
                className={style.teacher}
                cx="128"
                cy="73"
                r="24"
                fill="url(#classroom)"
                filter="url(#classroomGlow)"
            />

            <path
                className={style.teacher}
                d="
            M89 154
            C91 122 105 108 128 108
            C151 108 165 122 167 154
            Q167 160 161 160
            H95
            Q89 160 89 154
            Z
        "
                fill="url(#classroom)"
            />

            {/* Left student */}
            <circle
                className={style.student}
                cx="77"
                cy="145"
                r="17"
                fill="url(#classroom)"
            />

            <path
                className={style.student}
                d="
            M52 192
            C54 168 63 158 77 158
            C91 158 100 168 102 192
            Q102 197 97 197
            H57
            Q52 197 52 192
            Z
        "
                fill="url(#classroom)"
            />

            {/* Center student */}
            <circle
                className={style.student}
                cx="128"
                cy="151"
                r="19"
                fill="url(#classroom)"
                filter="url(#classroomGlow)"
            />

            <path
                className={style.student}
                d="
            M99 203
            C101 177 112 165 128 165
            C144 165 155 177 157 203
            Q157 208 152 208
            H104
            Q99 208 99 203
            Z
        "
                fill="url(#classroom)"
            />

            {/* Right student */}
            <circle
                className={style.student}
                cx="179"
                cy="145"
                r="17"
                fill="url(#classroom)"
            />

            <path
                className={style.student}
                d="
            M154 192
            C156 168 165 158 179 158
            C193 158 202 168 204 192
            Q204 197 199 197
            H159
            Q154 197 154 192
            Z
        "
                fill="url(#classroom)"
            />

            {/* Classroom indicator */}
            <circle
                className={style.indicator}
                cx="128"
                cy="218"
                r="7"
                fill="#8ee0d7"
                filter="url(#classroomGlow)"
            />
        </svg>
    );
}
