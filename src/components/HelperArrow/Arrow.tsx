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
    position?: 'absolute' | 'fixed';
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
    width = 160,
    right,
    left,
    top,
    bottom,
    showAnchor = false,
    radius = 100,
    angle = 0,
    position = 'absolute',
}: ArrowProps) {
    const rad = (angle * Math.PI) / 180;

    const x = Math.cos(rad) * (radius + 30);
    const y = Math.sin(rad) * (radius + 30);

    return (
        <div style={{ position: position, right: right, top: top, bottom: bottom, left: left, zIndex: 9999 }}>
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
                        src="/images/misc/game_arrow.svg"
                        width={width}
                    />
                </div>
            </div>
        </div>
    );
}
