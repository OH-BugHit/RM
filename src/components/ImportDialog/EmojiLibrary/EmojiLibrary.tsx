import { EMOJI_LIBRARY, EmojiItem } from './emojiLibraryData';
import style from './style.module.css';
import { useRef, useState } from 'react';

interface EmojiLibraryProps {
    onSelect: (emoji: EmojiItem) => void;
    selectedEmoji?: string;
}

export default function EmojiLibrary({ onSelect, selectedEmoji }: EmojiLibraryProps) {
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [atBottom, setAtBottom] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        return;
        const el = e.currentTarget;

        setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 2);
    };

    const scrollToCategory = (categoryId: string) => {
        sectionRefs.current[categoryId]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <div className={style.wrapper}>
            <div className={style.categoryBar}>
                {EMOJI_LIBRARY.map((section) => (
                    <button
                        key={section.id}
                        type="button"
                        className={style.categoryButton}
                        onClick={() => scrollToCategory(section.id)}
                    >
                        {section.label}
                    </button>
                ))}
            </div>

            <div
                className={`${style.libraryScrollArea} ${atBottom ? style.atBottom : ''}`}
                onScroll={handleScroll}
            >
                {EMOJI_LIBRARY.map((section) => (
                    <div
                        key={section.id}
                        ref={(el) => {
                            sectionRefs.current[section.id] = el;
                        }}
                        className={style.section}
                    >
                        <h3 className={style.sectionTitle}>{section.label}</h3>

                        <div className={style.grid}>
                            {section.items.map((item) => (
                                <button
                                    key={`${section.id}-${item.emoji}`}
                                    type="button"
                                    className={`${style.emojiButton} ${
                                        selectedEmoji === item.emoji ? style.selected : ''
                                    }`}
                                    onClick={() => onSelect(item)}
                                    title={item.label}
                                >
                                    <span className={style.emoji}>{item.emoji}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
