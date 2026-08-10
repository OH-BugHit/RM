import React from 'react';

interface FrameContainerProps {
    position:
        | 'top-right'
        | 'top-left'
        | 'bottom-left'
        | 'bottom-right'
        | 'bottom-center'
        | 'top-center'
        | 'left'
        | 'free';
    free?: Pick<React.CSSProperties, 'top' | 'right' | 'bottom' | 'left'> | undefined;
    direction?: 'column' | 'row';
    width?: string;
    children: React.ReactNode;
}

const positions: Record<FrameContainerProps['position'], React.CSSProperties> = {
    'top-left': { top: 0, left: 0, zIndex: 999 },
    'top-right': { top: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
    'bottom-right': { bottom: 0, right: 0 },
    'top-center': {
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'fit-content',
        display: 'flex',
        justifyContent: 'center',
        zIndex: '0',
    },
    left: { top: 0, left: 0 },
    'bottom-center': {
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'fit-content',
        display: 'flex',
        justifyContent: 'center',
        zIndex: '0',
    },
    free: { zIndex: '9', borderRadius: '3rem' },
};

export default function FrameContainer({
    position,
    width = '',
    direction,
    free = undefined,
    children,
}: FrameContainerProps) {
    return (
        <div
            style={{
                position: 'absolute',
                width: width,
                zIndex: 0,
                display: 'flex',
                flexDirection: direction,
                ...(free && {
                    position: 'absolute',
                    ...free,
                }),
                ...positions[position],
            }}
        >
            {children}
        </div>
    );
}
