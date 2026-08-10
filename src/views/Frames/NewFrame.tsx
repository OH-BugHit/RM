import style from './style.module.css';
import { AnimatePresence, motion, Variants } from 'framer-motion';

interface FrameProps {
    children: React.ReactNode;
    title?: string;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    backgroundColour?: string;
    visible?: boolean;
    overlayLeft?: React.ReactNode;
    overlayRight?: React.ReactNode;
    overlayRightTop?: React.ReactNode;
    variant?: 'game' | 'tutorial' | 'blob';
    position?: Pick<React.CSSProperties, 'top' | 'right' | 'bottom' | 'left'>;
    centerX?: number;
    centerY?: number;
    minimize?: boolean;
}

const minimizeVariants: Variants = {
    closed: {
        height: 0,
        opacity: 0,
        transition: {
            type: 'spring',
            stiffness: 220,
            damping: 22,
            delay: 0.05,
        },
    },
    open: {
        height: '',
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 220,
            damping: 22,
            delay: 0.05,
        },
    },
};

export function NewFrame({
    children,
    title,
    visible = true,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    backgroundColour,
    overlayLeft,
    overlayRight,
    overlayRightTop,
    variant = 'game',
    position,
    centerX,
    centerY,
    minimize = false,
}: FrameProps) {
    const styleProps: React.CSSProperties = {
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        background: 'rgb(245, 255, 253)',
        ...(position && {
            position: 'absolute',
            ...position,
        }),
    };

    return (
        <AnimatePresence mode="popLayout">
            {visible && (
                <motion.div
                    className={`${style.frame} ${variant === 'tutorial' ? style.tutorial : variant === 'blob' ? style.blob : ''}`}
                    style={
                        variant !== 'blob'
                            ? {
                                  ...styleProps,
                                  ...position,
                              }
                            : { ...position }
                    }
                    initial={{
                        scale: 0.95,
                        opacity: 0,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,

                        top: position?.top,
                        right: position?.right,
                        bottom: position?.bottom,
                        left: position?.left,

                        x: centerX ? `${centerX}%` : '0%',
                        y: centerY ? `${centerY}%` : '0%',
                    }}
                    exit={{
                        overflow: 'hidden',
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.45,
                        ease: 'easeInOut',
                    }}
                >
                    {overlayRight && !minimize && (
                        <div className={`${style.overlayRight} ${variant === 'blob' ? style.blobOverlayRight : ''}`}>
                            {overlayRight}
                        </div>
                    )}
                    {overlayLeft && !minimize && (
                        <div className={`${style.overlayLeft} ${variant === 'blob' ? style.blobOverlayLeft : ''}`}>
                            {overlayLeft}
                        </div>
                    )}
                    {overlayRightTop && (
                        <div className={`${style.overlayRightTop} ${minimize ? style.minRT : ''}`}>
                            {overlayRightTop}
                        </div>
                    )}
                    {minimize && <h4 className={style.minTitle}>{title}</h4>}
                    <motion.div
                        className={style.content}
                        variants={minimizeVariants}
                        animate={minimize ? 'closed' : 'open'}
                        style={{
                            ...(backgroundColour && {
                                backgroundColor: backgroundColour,
                                backgroundImage: 'none',
                            }),
                        }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
