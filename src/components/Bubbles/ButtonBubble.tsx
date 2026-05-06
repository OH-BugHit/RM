import { Button } from '@genai-fi/base';
import style from './style.module.css';

interface ThoughtBubbleProps {
    side: 'left' | 'right' | 'center';
    text: string;
    onClick: () => void;
}
export default function ButtonBubble({ side, text, onClick }: ThoughtBubbleProps) {
    return (
        <div
            className={
                side === 'left' ? style.leftContainer : side === 'right' ? style.rightContainer : style.centerContainer
            }
        >
            <div className={style.bubble}>
                <Button
                    sx={{ fontSize: '2rem', fontWeight: 'bold' }}
                    onClick={onClick}
                    variant="contained"
                >
                    {text}
                </Button>
            </div>
        </div>
    );
}
