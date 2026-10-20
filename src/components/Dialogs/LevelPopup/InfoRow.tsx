import { restoreImage } from '../../../utils/import';
import { CellSave } from '../../../utils/types';
import style from './levelPopup.module.css';

interface InfoRowProps {
    title: string;
    nodes: Map<string, CellSave>;
    backgroundColour: string;
}
export default function InfoRow({ title, nodes, backgroundColour }: InfoRowProps) {
    if (nodes.size < 1) return;
    console.log(nodes);
    return (
        <div className={style.infoRow}>
            <div
                className={style.rowContent}
                style={{ background: backgroundColour }}
            >
                <h3>{title}</h3>
                <div className={style.images}>
                    {[...nodes.values()].map((t) => (
                        <img
                            src={restoreImage(t.image, t.emoji)}
                            alt="Agent location background"
                            width={40}
                            height={40}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
