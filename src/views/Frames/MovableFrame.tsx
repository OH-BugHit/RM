import { useRef, useState } from 'react';
import { NewFrame, type NewFrameProps } from './NewFrame';
import style from './movableFrame.module.css';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

type MovableFrameProps = Omit<NewFrameProps, 'frameRef' | 'positionOffset'>;

export function MovableFrame({ children, ...frameProps }: MovableFrameProps) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const offsetRef = useRef(offset);
    const frameRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{
        pointerId: number;
        startX: number;
        startY: number;
        startOffsetX: number;
        startOffsetY: number;
        frameLeft: number;
        frameTop: number;
        frameWidth: number;
        frameHeight: number;
    } | null>(null);

    const updateOffset = (x: number, y: number) => {
        const nextOffset = { x, y };
        offsetRef.current = nextOffset;
        setOffset(nextOffset);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
        if (event.button !== 0 || !frameRef.current) return;

        const rect = frameRef.current.getBoundingClientRect();
        const currentOffset = offsetRef.current;
        dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            startOffsetX: currentOffset.x,
            startOffsetY: currentOffset.y,
            frameLeft: rect.left - currentOffset.x,
            frameTop: rect.top - currentOffset.y,
            frameWidth: rect.width,
            frameHeight: rect.height,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
        event.preventDefault();
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;

        const maxX = window.innerWidth - drag.frameLeft - drag.frameWidth;
        const maxY = window.innerHeight - drag.frameTop - drag.frameHeight;
        updateOffset(
            Math.min(maxX, Math.max(-drag.frameLeft, drag.startOffsetX + event.clientX - drag.startX)),
            Math.min(maxY, Math.max(-drag.frameTop, drag.startOffsetY + event.clientY - drag.startY))
        );
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
        if (dragRef.current?.pointerId === event.pointerId) {
            dragRef.current = null;
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (!frameRef.current) return;

        const step = event.shiftKey ? 50 : 10;
        const movements: Record<string, [number, number]> = {
            ArrowLeft: [-step, 0],
            ArrowRight: [step, 0],
            ArrowUp: [0, -step],
            ArrowDown: [0, step],
        };
        const movement = movements[event.key];
        if (!movement) return;

        event.preventDefault();
        const rect = frameRef.current.getBoundingClientRect();
        const currentOffset = offsetRef.current;
        updateOffset(
            Math.min(
                currentOffset.x + window.innerWidth - rect.right,
                Math.max(currentOffset.x - rect.left, currentOffset.x + movement[0])
            ),
            Math.min(
                currentOffset.y + window.innerHeight - rect.bottom,
                Math.max(currentOffset.y - rect.top, currentOffset.y + movement[1])
            )
        );
    };

    return (
        <NewFrame
            {...frameProps}
            frameRef={frameRef}
            positionOffset={offset}
        >
            <button
                type="button"
                className={style.moveHandle}
                aria-label="Move frame. Drag to reposition, or use the arrow keys; hold Shift to move farther."
                aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight Shift+ArrowUp Shift+ArrowDown Shift+ArrowLeft Shift+ArrowRight"
                title="Drag to move, or use the arrow keys. Hold Shift to move farther."
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onLostPointerCapture={handlePointerUp}
                onKeyDown={handleKeyDown}
            >
                <DragIndicatorIcon fontSize="large" />
            </button>
            {children}
        </NewFrame>
    );
}
