import React from 'react';

interface FrameContainerProps {
    position: 'top-right' | 'top-left' | 'bottom-left' | 'bottom-right' | 'top-center';
    width?: string;
    children: React.ReactNode;
}

const positions: Record<FrameContainerProps['position'], React.CSSProperties> = {
    'top-left': { top: 0, left: 0 },
    'top-right': { top: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
    'bottom-right': { bottom: 0, right: 0 },
    'top-center': {
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
    },
};

export default function FrameContainer({ position, width = '', children }: FrameContainerProps) {
    return (
        <div
            style={{
                position: 'absolute',
                width: width,
                ...positions[position],
            }}
        >
            {children}
        </div>
    );
}
