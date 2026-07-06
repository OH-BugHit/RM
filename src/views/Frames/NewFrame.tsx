import style from './style.module.css';

interface FrameProps {
    children: React.ReactNode;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    backgroundColour?: string;
    visible?: boolean;
    overlayRight?: React.ReactNode;
}

export function NewFrame({
    children,
    visible = true,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    backgroundColour,
    overlayRight,
}: FrameProps) {
    if (!visible) return null;

    const styleProps = {
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
    };

    return (
        <div
            className={style.frame}
            style={styleProps}
        >
            {overlayRight && <div className={style.overlayRight}>{overlayRight}</div>}

            <div
                className={style.content}
                style={backgroundColour ? { backgroundColor: backgroundColour, backgroundImage: 'none' } : undefined}
            >
                {children}
            </div>
        </div>
    );
}
