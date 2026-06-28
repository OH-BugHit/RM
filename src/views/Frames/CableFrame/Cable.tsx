import style from './style.module.css';

type FrameVariant = 'left' | 'center' | 'right';

const frameConfig = {
    left: {
        image: '/images/frames/connectorLeft.png',
    },
    center: {
        image: '/images/frames/cable.png',
    },
    right: {
        image: '/images/frames/connector.png',
    },
};

interface FrameProps {
    variant: FrameVariant;
    width: number | string;
    height: number | string;
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
                    flexGrow: variant === 'center' ? 1 : 0,
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
