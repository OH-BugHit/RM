import { Trans } from 'react-i18next';
import style from './style.module.css';

interface ThoughtBubbleProps {
    side: 'left' | 'right';
    text: string;
    ref?: React.Ref<HTMLDivElement>;
    textComponents?: Record<string, React.ReactElement>;
}
export default function ThoughtBubble({ side, text, ref, textComponents }: ThoughtBubbleProps) {
    return (
        <div
            className={side === 'left' ? style.leftContainer : style.rightContainer}
            ref={ref}
            tabIndex={-1}
        >
            <div className={side === 'left' ? style.thought : style.thoughtRight}>
                {
                    <Trans
                        i18nKey={text}
                        components={{ ...textComponents }}
                    />
                }
            </div>
        </div>
    );
}
