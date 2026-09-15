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
    children,
}: ContentContainerProps) {
    const circleSize = size * 0.9;

    const originX = origin.x - circleSize / 2;
    const originY = origin.y - circleSize / 2;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const halfContentWidth = contentWidth / 2;
    const halfContentHeight = contentHeight / 2;
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
    const clampViewportPoint = (x: number, y: number) => ({
        x: clamp(x, halfContentWidth, viewportWidth - halfContentWidth),
        y: clamp(y, halfContentHeight, viewportHeight - halfContentHeight),
    });

    const viewportTarget =
        target.type === 'viewport'
            ? 'position' in target
                ? target.position === 'center'
                    ? { x: 50, y: 50 }
                    : { x: 0, y: 0 }
                : target
            : undefined;

    const originTarget =
        target.type === 'origin'
            ? {
                  x:
                      target.x >= 0
                          ? clusterPosition.x +
                            origin.x +
                            (viewportWidth - clusterPosition.x - origin.x) * (target.x / 100)
                          : clusterPosition.x + origin.x + (-clusterPosition.x - origin.x) * (-target.x / 100),
                  y:
                      target.y >= 0
                          ? clusterPosition.y +
                            origin.y +
                            (viewportHeight - clusterPosition.y - origin.y) * (target.y / 100)
                          : clusterPosition.y + origin.y + (-clusterPosition.y - origin.y) * (-target.y / 100),
              }
            : undefined;

    const targetPoint =
        target.type === 'cluster'
            ? { x: target.x, y: target.y }
            : target.type === 'origin'
              ? (() => {
                    const point = clampViewportPoint(originTarget?.x ?? 0, originTarget?.y ?? 0);

                    return {
                        x: point.x - clusterPosition.x,
                        y: point.y - clusterPosition.y,
                    };
                })()
              : (() => {
                    const point = clampViewportPoint(
                        (viewportTarget?.x ?? 0) * (viewportWidth / 100),
                        (viewportTarget?.y ?? 0) * (viewportHeight / 100)
                    );

                    return {
                        x: point.x - clusterPosition.x,
                        y: point.y - clusterPosition.y,
                    };
                })();

    const targetX = targetPoint.x - contentWidth / 2;
    const targetY = targetPoint.y - contentHeight / 2;

    const style = {
        '--origin-x': `${originX}px`,
        '--origin-y': `${originY}px`,

        '--target-x': `${targetX}px`,
        '--target-y': `${targetY}px`,

        '--circle-size': `${circleSize}px`,
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
                    data-dismissible-exclude
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
