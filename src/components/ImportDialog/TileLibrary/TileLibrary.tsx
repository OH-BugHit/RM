import style from './style.module.css';
import { useRef } from 'react';
import { TILE_LIBRARY } from './tileLibraryData';
import { TileLibraryItem } from '../../../types';

interface TileLibraryProps {
    onSelect: (tile: TileLibraryItem) => void;
    selectedTileId?: string;
}

export default function TileLibrary({ onSelect, selectedTileId }: TileLibraryProps) {
    const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const scrollToCategory = (categoryId: string) => {
        sectionRefs.current[categoryId]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <div className={style.wrapper}>
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
            </div>

            <div className={style.libraryScrollArea}>
                {TILE_LIBRARY.map((section) => (
                    <div
                        key={section.id}
                        ref={(el) => {
                            sectionRefs.current[section.id] = el;
                        }}
                        className={style.section}
                    >
                        <h3 className={style.sectionTitle}>{section.label}</h3>

                        <div className={style.grid}>
                            {section.items.map((tile) => (
                                <button
                                    key={tile.id}
                                    type="button"
                                    className={`${style.tileButton} ${
                                        selectedTileId === tile.id ? style.selected : ''
                                    }`}
                                    onClick={() => onSelect(tile)}
                                    title={tile.label}
                                >
                                    <img
                                        src={tile.image}
                                        alt={tile.label}
                                        className={style.tileImage}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
