import style from './style.module.css';
import { AnimatePresence, motion } from 'framer-motion';

interface FrameProps {
    children: React.ReactNode;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    backgroundColour?: string;
    visible?: boolean;
    overlayLeft?: React.ReactNode;
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
    overlayLeft,
    overlayRight,
    overlayRightTop,
}: FrameProps) {
    const styleProps = {
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
    };

    return (
        <AnimatePresence mode="popLayout">
            {visible && (
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
                    exit={{
                        overflow: 'hidden',
                        scaleY: 0,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.35,
                        ease: 'easeOut',
                    }}
                >
                    {overlayRight && <div className={style.overlayRight}>{overlayRight}</div>}
                    {overlayLeft && <div className={style.overlayLeft}>{overlayLeft}</div>}
                    {overlayRightTop && <div className={style.overlayRightTop}>{overlayRightTop}</div>}
                    <div
                        className={style.content}
                        style={
                            backgroundColour
                                ? { backgroundColor: backgroundColour, backgroundImage: 'none' }
                                : undefined
                        }
                    >
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
