import { Button } from '@genai-fi/base';
import style from './main.module.css';

interface MenuItemProps {
    title: string;
    onSelect: () => void;
}
export default function MenuItem({ title, onSelect }: MenuItemProps) {
    return (
        <Button
            className={style.menuItem}
            onClick={onSelect}
        >
            <h2>{title}</h2>
        </Button>
    );
}
