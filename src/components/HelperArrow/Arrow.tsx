import style from './style.module.css';

interface ArrowProps {
    right?: number;
    top?: number;
    left?: number;
    bottom?: number;
    width?: number;
    radius: number; // etäisyys keskipisteestä
    angle: number; // asteina
    showAnchor?: boolean;
}

/**
 *
 * @param width Width of the arrow image
 * @param right Absolute right
 * @param top Absolute top
 * @param showAnchor For developent purposes. Anchor point is visible when true. Tune right, left, top, and bottom parameters to move anhor point.
 * @param radius Distance from anchor
 * @returns
 */
export default function Arrow({
    width = 100,
    right,
    left,
    top,
    bottom,
    showAnchor = false,
    radius = 100,
    angle = 0,
}: ArrowProps) {
    const rad = (angle * Math.PI) / 180;

    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;

    return (
        <div style={{ position: 'absolute', right: right, top: top, bottom: bottom, left: left, zIndex: 9999 }}>
            <div
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                }}
            >
                {showAnchor && (
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            transform: 'translate(-50%, -50%)',
                            color: 'red',
                        }}
                    >
                        x
                    </div>
                )}

                <div
                    className={style.container}
                    style={{
                        position: 'absolute',
                        left: x,
                        top: y,
                        transform: `translate(-50%, -50%) rotate(${angle + 180}deg)`,
                    }}
                >
                    <img
                        src="/images/misc/arrow.png"
                        width={width}
                    />
                    <div className={style.gloss} />
                </div>
            </div>
        </div>
    );
}
