import { Button } from '@genai-fi/base';
import style from './main.module.css';

interface MenuItemProps {
    title: string;
    onSelect: () => void;
    icon?: React.ReactNode;
}
export default function MenuItem({ title, onSelect, icon }: MenuItemProps) {
    return (
        <Button
            className={style.menuItem}
            onClick={onSelect}
        >
            {icon ? icon : <h2>{title}</h2>}
        </Button>
    );
}
