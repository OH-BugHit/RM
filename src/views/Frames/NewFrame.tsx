import style from './style.module.css';

interface FrameProps {
    children: React.ReactNode;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    backgroundColour?: string; // Korvaa vihreän taustan tarvittaessa
    visible?: boolean;
}

export function NewFrame({
    children,
    visible = true,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    backgroundColour,
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
            <div
                className={style.content}
                style={backgroundColour ? { backgroundColor: backgroundColour, backgroundImage: 'none' } : undefined}
            >
                {children}
            </div>
        </div>
    );
}
