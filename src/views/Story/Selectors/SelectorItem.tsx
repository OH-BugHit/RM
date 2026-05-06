import { Button } from '@genai-fi/base';
import style from '../style.module.css';

interface SelectorItemProps {
    title: string;
    img: string;
    onClick: () => void;
    selected?: boolean;
    children?: React.ReactNode;
    columnChilds?: boolean;
}
export default function SelectorItem({ title, img, onClick, selected, children, columnChilds }: SelectorItemProps) {
    return (
        <li className={style.itemContent}>
            <h2>{title}</h2>
            <div className={style.selectorItemItems}>
                <Button
                    onClick={onClick}
                    variant="outlined"
                    className={selected ? style.selectedButton : style.notSelectedButton}
                    style={{ flexDirection: `${columnChilds ? 'column' : 'row'}` }}
                >
                    <img
                        src={img}
                        width={180}
                    />
                    {children}
                </Button>
            </div>
        </li>
    );
}
