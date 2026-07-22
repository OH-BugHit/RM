import style from './style.module.css';
import { motion } from 'framer-motion';

interface FrameProps {
    children: React.ReactNode;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    backgroundColour?: string;
    visible?: boolean;
    overlayRight?: React.ReactNode;
    overlayRightTop?: React.ReactNode;
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
    overlayRightTop,
}: FrameProps) {
    if (!visible) return null;

    const styleProps = {
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
    };

    return (
        <motion.div
            className={style.frame}
            style={styleProps}
            initial={{
                scaleY: 0,
                opacity: 0,
            }}
            animate={{
                scaleY: 1,
                opacity: 1,
            }}
            transition={{
                duration: 0.35,
                ease: 'easeOut',
            }}
        >
            {overlayRight && <div className={style.overlayRight}>{overlayRight}</div>}
            {overlayRightTop && <div className={style.overlayRightTop}>{overlayRightTop}</div>}
            <div
                className={style.content}
                style={backgroundColour ? { backgroundColor: backgroundColour, backgroundImage: 'none' } : undefined}
            >
                {children}
            </div>
        </motion.div>
    );
}
