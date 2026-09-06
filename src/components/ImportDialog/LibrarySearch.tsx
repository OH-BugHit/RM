import style from './EmojiLibrary/style.module.css';
import { useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import { TileLibraryItem } from '../../types';
import { EMOJI_LIBRARY, EmojiItem } from './EmojiLibrary/emojiLibraryData';
import { TILE_LIBRARY } from './TileLibrary/tileLibraryData';
import { useGameScale } from '../../context/GameScale/useGameScale';
import { t } from 'i18next';

interface LibrarySearchProps {
    onSelectTile: (tile: TileLibraryItem) => void;
    onSelectEmoji: (emoji: EmojiItem) => void;
}

type SearchResult =
    | {
          type: 'tile';
          id: string;
          label: string;
          image: string;
          item: TileLibraryItem;
      }
    | {
          type: 'emoji';
          id: string;
          label: string;
          emoji: string;
          item: EmojiItem;
      };

export default function LibrarySearch({ onSelectTile, onSelectEmoji }: LibrarySearchProps) {
    const [search, setSearch] = useState('');
    const { s } = useGameScale();

    const results = useMemo<SearchResult[]>(() => {
        const q = search.trim().toLowerCase();

        if (!q) {
            return [];
        }

        const tiles: SearchResult[] = TILE_LIBRARY.flatMap((section) =>
            section.items
                .filter((item) => item.label.toLowerCase().includes(q))
                .map((item) => ({
                    type: 'tile',
                    id: item.id,
                    label: item.label,
                    image: item.image,
                    item,
                }))
        );

        const emojis: SearchResult[] = EMOJI_LIBRARY.flatMap((section) =>
            section.items
                .filter((item) => item.label.toLowerCase().includes(q))
                .map((item) => ({
                    type: 'emoji',
                    id: item.emoji,
                    label: item.label,
                    emoji: item.emoji,
                    item,
                }))
        );

        return [...tiles, ...emojis].sort((a, b) => a.label.localeCompare(b.label));
    }, [search]);

    return (
        <div
            className={style.wrapper}
            style={{ gap: `${s(12)}px` }}
        >
            <TextField
                className={style.searchInput}
                fullWidth
                autoFocus
                size="small"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
                <div className={style.searchResults}>
                    {results.length === 0 ? (
                        <div
                            className={style.noResults}
                            style={{ padding: `${s(16)}px` }}
                        >
                            {t('wizard.noResults')}
                        </div>
                    ) : (
                        <div
                            className={style.resultGrid}
                            style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${s(64)}px,1fr))` }}
                        >
                            {results.map((result) => (
                                <button
                                    key={`${result.type}-${result.id}`}
                                    type="button"
                                    className={style.emojiButton}
                                    title={result.label}
                                    onClick={() => {
                                        if (result.type === 'tile') {
                                            onSelectTile(result.item);
                                        } else {
                                            onSelectEmoji(result.item);
                                        }
                                    }}
                                >
                                    {result.type === 'emoji' ? (
                                        <span
                                            className={style.emoji}
                                            style={{ fontSize: `${Math.max(22, s(32))}px` }}
                                        >
                                            {result.emoji}
                                        </span>
                                    ) : (
                                        <img
                                            src={result.image}
                                            alt={result.label}
                                            width={`${s(40)}px`}
                                            height={`${s(40)}px`}
                                            className={style.tileImage}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
