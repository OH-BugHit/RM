import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import styles from './style.module.css';
import { Target } from '../../../types';

interface Point {
    x: number;
    y: number;
}

interface ContentContainerProps {
    open: boolean;
    origin: Point;
    target: Target;

    size?: number;
    delay?: number;

    contentWidth?: number;
    contentHeight?: number;
    unmountOnClose: boolean;
    scaleWidth: number;
    scale: number;
    clusterPosition: {
        x: number;
        y: number;
    };

    background: 'agent' | 'reward' | 'inspect' | 'build';

    children: ReactNode;
}

/**
 *
 * @param param0 Is content open @param param7 If content is heavy to mount, set false
 * @returns
 */
export default function ContentContainer({
    open,
    origin,
    target,
    size = 140,
    delay,
    clusterPosition,
    contentWidth = 500,
    contentHeight = 360,
    background,
    unmountOnClose,
    scaleWidth = 1,
    scale = 1,
    children,
}: ContentContainerProps) {
    const circleSize = size * 0.9;

    const originX = origin.x - circleSize / 2;
    const originY = origin.y - circleSize / 2;

    const targetPoint =
        target.type === 'cluster'
            ? {
                  x: target.x,
                  y: target.y,
              }
            : target.position === 'center'
              ? {
                    x: (1940 * scaleWidth) / 2 - clusterPosition.x,
                    y: (1080 * scale + 200) / 2 - clusterPosition.y,
                }
              : {
                    x: contentWidth / 2 - clusterPosition.x - 80,
                    y: contentHeight / 2 - clusterPosition.y,
                };

    const targetX = targetPoint.x - contentWidth / 2;
    const targetY = targetPoint.y - contentHeight / 2;

    const style = {
        '--origin-x': `${originX}px`,
        '--origin-y': `${originY}px`,

        '--target-x': `${targetX}px`,
        '--target-y': `${targetY}px`,

        '--circle-size': `${size * 0.9}px`,
        '--content-width': `${contentWidth}px`,
        '--content-height': `${contentHeight}px`,
    } as CSSProperties;

    return (
        <>
            <svg
                className={styles.filterSvg}
                aria-hidden="true"
            >
                <defs>
                    <filter
                        id="gooey"
                        x="-100%"
                        y="-100%"
                        width="300%"
                        height="300%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur
                            in="SourceGraphic"
                            stdDeviation="22"
                            result="blur"
                        />

                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="
                                1 0 0 0 0
                                0 1 0 0 0
                                0 0 1 0 0
                                0 0 0 30 -15
                            "
                            result="goo"
                        />
                    </filter>
                </defs>
            </svg>

            <div
                className={[styles.wrapper, styles[background]].join(' ')}
                style={style}
            >
                <div className={styles.gooey}>
                    <div className={styles.circleOrigin} />
                    <motion.div
                        className={styles.circleMoving}
                        initial={{
                            opacity: 0,
                            x: 0,
                            y: 0,
                            width: size * 0.9,
                            height: size * 0.9,
                            borderRadius: '50%',
                        }}
                        animate={
                            open
                                ? {
                                      opacity: [1, 1, 1, 1],
                                      x: [0, 0, targetX * 0.8 - originX, targetX - originX],
                                      y: [0, 0, targetY * 0.8 - originY, targetY - originY],
                                      width: [size * 0.9, size * 0.9 * 1.2, size * 0.9, contentWidth],
                                      height: [size * 0.9, size * 0.9 * 1.2, size * 0.9, contentHeight],
                                      borderRadius: ['50%', '50%', '50%', '28px'],
                                  }
                                : {
                                      opacity: 1,
                                  }
                        }
                        transition={{
                            duration: open ? 0.4 : 0.2,
                            delay: delay ? delay / 1000 : 0,
                            ease: 'linear',
                            times: open ? [0, 0.25, 0.65, 1] : undefined,
                        }}
                    />
                </div>
                <motion.div
                    className={styles.content}
                    animate={{
                        opacity: open ? 1 : 0,
                        display: open ? 'flex' : 'none',
                    }}
                    transition={{
                        duration: 0.3,
                        delay: open ? (delay ?? 0) / 1000 + 0.5 : 0,
                    }}
                >
                    {unmountOnClose ? open && children : children}
                </motion.div>
            </div>
        </>
    );
}
