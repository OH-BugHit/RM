import { Button } from '@genai-fi/base';
import style from './style.module.css';

interface SelectorItemProps {
    title: string;
    img?: string;
    onClick: () => void;
    selected?: boolean;
    children?: React.ReactNode;
    columnChilds?: boolean;
    disabled?: boolean;
}
export default function SelectorItem({
    title,
    img,
    onClick,
    selected,
    children,
    columnChilds,
    disabled = false,
}: SelectorItemProps) {
    return (
        <li className={style.itemContent}>
            <h2>{title}</h2>
            <div className={style.selectorItemItems}>
                <Button
                    onClick={onClick}
                    variant="outlined"
                    className={selected ? style.selectedButton : style.notSelectedButton}
                    style={{ flexDirection: `${columnChilds ? 'column' : 'row'}` }}
                    disabled={disabled}
                >
                    <img
                        src={img}
                        height={140}
                    />
                    {children}
                </Button>
            </div>
        </li>
    );
}
