import { Button } from '@genai-fi/base';
import style from './main.module.css';

interface MenuItemProps {
    title: string;
    onSelect: () => void;
    icon?: React.ReactNode;
    height: number;
    width: number;
}
export default function MenuItem({ title, onSelect, icon, width, height }: MenuItemProps) {
    return (
        <Button
            className={style.menuItem}
            onClick={onSelect}
            style={{ height: height, width: width }}
        >
            {icon ? icon : <h2>{title}</h2>}
        </Button>
    );
}
