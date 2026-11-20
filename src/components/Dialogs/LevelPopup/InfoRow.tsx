import { useGameScale } from '../../../context/GameScale/useGameScale';
import { restoreImage } from '../../../utils/import';
import { CellSave } from '../../../utils/types';
import style from './levelPopup.module.css';

interface InfoRowProps {
    title: string;
    nodes: Map<string, CellSave>;
    backgroundColour: string;
    invert?: boolean;
}
export default function InfoRow({ title, nodes, backgroundColour, invert = false }: InfoRowProps) {
    const { s } = useGameScale();
    if (nodes.size < 1) return;
    return (
        <div className={style.infoRow}>
            <div
                className={style.rowContent}
                style={{ background: backgroundColour }}
            >
                {!invert ? <h3>{title}</h3> : ''} : ''
                <div
                    className={style.images}
                    style={{ justifyContent: invert ? '' : 'right' }}
                >
                    {[...nodes.values()].map((t, i) => (
                        <img
                            key={i}
                            src={restoreImage(t.image, t.emoji)}
                            alt="Agent location background"
                            width={Math.min(s(50), 30)}
                            height={Math.min(s(50), 30)}
                        />
                    ))}
                </div>
                {invert ? <h3>{title}</h3> : ''}
            </div>
        </div>
    );
}
