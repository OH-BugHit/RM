import style from './style.module.css';
import { useRef } from 'react';
import { TILE_LIBRARY } from './tileLibraryData';
import { TileLibraryItem } from '../../../types';
import { useGameScale } from '../../../context/GameScale/useGameScale';
import { EMOJI_LIBRARY, EmojiItem } from './emojiLibraryData';
interface TileLibraryProps {
    onTileSelect: (tile: TileLibraryItem) => void;
    onEmojiSelect: (emoji: EmojiItem) => void;
    selectedEmoji?: string;
    selectedTileId?: string;
}

export default function TileLibrary({ onTileSelect, selectedTileId, onEmojiSelect, selectedEmoji }: TileLibraryProps) {
    const { s } = useGameScale();
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const scrollAreaRef = useRef<HTMLDivElement | null>(null);

    const scrollToCategory = (categoryId: string) => {
        const element = sectionRefs.current[categoryId];
        const scrollArea = scrollAreaRef.current;

        if (!element || !scrollArea) return;

        const top = element.getBoundingClientRect().top - scrollArea.getBoundingClientRect().top + scrollArea.scrollTop;

        scrollArea.scrollTo({
            top,
            behavior: 'smooth',
        });
    };

    return (
        <div className={style.wrapper}>
            <div className={style.quickButtons}>
                <div className={style.categoryBar}>
                    {TILE_LIBRARY.map((section) => (
                        <button
                            key={section.id}
                            type="button"
                            className={style.categoryButton}
                            onClick={() => scrollToCategory(section.id)}
                        >
                            {section.label}
                        </button>
                    ))}
                    {EMOJI_LIBRARY.map((section) => (
                        <button
                            key={section.id}
                            type="button"
                            className={style.categoryButton}
                            onClick={() => scrollToCategory(section.id)}
                        >
                            <p style={{ fontSize: '0.9em', whiteSpace: 'nowrap' }}>{section.label}</p>
                        </button>
                    ))}
                </div>
            </div>
            <div
                ref={scrollAreaRef}
                className={style.libraryScrollArea}
            >
                {TILE_LIBRARY.map((section) => (
                    <div
                        key={section.id}
                        ref={(el) => {
                            sectionRefs.current[section.id] = el;
                        }}
                        className={style.section}
                        style={{ padding: `${s(8)}px 0 ${s(16)}px` }}
                    >
                        <h3
                            className={style.sectionTitle}
                            style={{ margin: `0 0 ${s(12)}px`, fontSize: `${Math.max(12, Math.round(s(15)))}px` }}
                        >
                            {section.label}
                        </h3>

                        <div
                            className={style.grid}
                            style={{
                                gap: `${s(10)}px`,
                                gridTemplateColumns: `repeat(auto-fill, minmax(${Math.max(42, s(64))}px, 1fr))`,
                            }}
                        >
                            {section.items.map((tile) => (
                                <button
                                    key={tile.id}
                                    type="button"
                                    className={`${style.tileButton} ${
                                        selectedTileId === tile.id ? style.selected : ''
                                    }`}
                                    onClick={() => onTileSelect(tile)}
                                    title={tile.label}
                                    style={{ padding: `${8}px` }}
                                >
                                    <img
                                        src={tile.image}
                                        alt={tile.label}
                                        className={style.tileImage}
                                        width={Math.min(48, s(64))}
                                        height={Math.min(48, s(64))}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                {EMOJI_LIBRARY.map((section) => (
                    <div
                        key={section.id}
                        ref={(el) => {
                            sectionRefs.current[section.id] = el;
                        }}
                        className={style.section}
                    >
                        <h3 className={style.sectionTitle}>{section.label}</h3>

                        <div
                            className={style.grid}
                            style={{
                                gap: `${s(10)}px`,
                                gridTemplateColumns: `repeat(auto-fill, minmax(${Math.max(42, s(64))}px, 1fr))`,
                            }}
                        >
                            {section.items.map((item) => (
                                <button
                                    key={`${section.id}-${item.emoji}`}
                                    type="button"
                                    className={`${style.emojiButton} ${
                                        selectedEmoji === item.emoji ? style.selected : ''
                                    }`}
                                    style={{ fontSize: `${Math.max(22, s(48))}px` }}
                                    onClick={() => onEmojiSelect(item)}
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
