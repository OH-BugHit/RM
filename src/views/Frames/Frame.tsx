import style from './style.module.css';

type FrameVariant = 'square' | 'wide' | 'tall' | 'title';

const frameConfig = {
    square: {
        image: 'images/frames/frame_square.png',
        mask: 'images/frames/frame_square_mask.png',
    },
    wide: {
        image: 'images/frames/frame_wide.png',
        mask: 'images/frames/frame_wide_mask.png',
    },
    tall: {
        image: 'images/frames/frame_tall.png',
        mask: 'images/frames/frame_tall_mask.png',
    },
    title: {
        image: 'images/frames/frame_title.png',
        mask: 'images/frames/frame_title_mask.png',
    },
};

interface FrameProps {
    variant: FrameVariant;
    children: React.ReactNode;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    backgroundColour?: string;
}

export function Frame({ variant, backgroundColour, minWidth, minHeight, maxHeight, maxWidth, children }: FrameProps) {
    const config = frameConfig[variant];

    return (
        <div
            className={style.frame}
            style={
                {
                    minWidth: minWidth,
                    minHeight: minHeight,
                    maxHeight: maxHeight,
                    maxWidth: maxWidth,
                    '--frame-image': `url(${config.image})`,
                    '--frame-mask': `url(${config.mask})`,
                    '--background-colour': backgroundColour,
                } as React.CSSProperties
            }
        >
            {backgroundColour && <div className={style.background} />}

            <div className={style.content}>{children}</div>
        </div>
    );
}
