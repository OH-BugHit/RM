import style from './style.module.css';

type FrameVariant = 'left' | 'center' | 'right' | 'vertical';

const frameConfig = {
    left: {
        image: '/images/frames/cable.svg',
    },
    center: {
        image: '/images/frames/cable.svg',
    },
    right: {
        image: '/images/frames/cable.svg',
    },
    vertical: {
        image: '/images/frames/cable.svg',
    },
};

interface FrameProps {
    variant: FrameVariant;
    width?: number | string;
    height?: number | string;
    backgroundColour?: string;
    visible?: boolean;
}

export function Cable({ variant, width = 300, height = 300, backgroundColour, visible = true }: FrameProps) {
    const config = frameConfig[variant];

    return (
        <div
            className={style.cable}
            style={
                {
                    visibility: visible ? 'visible' : 'hidden',
                    flexGrow: variant === 'center' || variant === 'vertical' ? 1 : 0,
                    position: 'relative',
                    background: backgroundColour,
                    height,
                    width,
                    ['--frame-image']: `url(${config.image})`,
                } as React.CSSProperties
            }
        ></div>
    );
}
