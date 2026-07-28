import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { LargeButton } from '@genai-fi/base';
import { useLocation, useNavigate } from 'react-router';
import { ActiveViewAtom, CurrentTileToolAtom, StoryProgressAtom, TilePropsAtom } from '../../atoms/uiState';
import TileLibrary from './TileLibrary/TileLibrary';
import EmojiLibrary from './EmojiLibrary/EmojiLibrary';
import { EmojiItem } from './EmojiLibrary/emojiLibraryData';
import { BASIC_CELL_TYPE_OPTIONS, CellType, TileDefinition, TileLibraryItem } from '../../types';
import { emojiToDataUrl } from '../../utils/import';
import TypeOption from './TypeOption';
import DeleteIcon from '@mui/icons-material/Delete';

interface ImportDialogProps {
    onSelect: (tile: TileDefinition, newTile: boolean) => void;
}

function TileDialog({ onSelect }: ImportDialogProps) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const selectedTile = useAtomValue(CurrentTileToolAtom);
    const [selectedType, setSelectedType] = useState<CellType | null>(selectedTile?.type ?? null);
    const [selectedLibraryTile, setSelectedLibraryTile] = useState<TileLibraryItem | null>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<EmojiItem | null>(null);
    const [selectedPreview, setSelectedPreview] = useState<string | null>(selectedTile?.image ?? null);
    const setTiles = useSetAtom(TilePropsAtom);
    const [tab, setTab] = useState<'library' | 'emoji' | 'upload'>('library');
    const storyProgress = useAtomValue(StoryProgressAtom);

    useEffect(() => {
        setSelectedType(selectedTile?.type ?? null);
    }, [selectedTile]);

    useEffect(() => {
        setSelectedPreview(selectedTile?.image ?? null);
    }, [selectedTile]);

    const previewUrlRef = useRef<string | null>(null);

    const [activeView, setActiveView] = useAtom(ActiveViewAtom);
    const navigate = useNavigate();
    const location = useLocation();

    const resetSelection = useCallback(() => {
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }
        setSelectedType(null);
        setSelectedLibraryTile(null);
        setSelectedEmoji(null);
        setSelectedPreview(null);
        setTab('library');
    }, []);

    const doClose = useCallback(() => {
        const params = new URLSearchParams(location.search);
        params.delete('overlay');
        const search = params.toString();

        navigate(search ? `${location.pathname}?${search}` : location.pathname, { replace: false });
        setActiveView((old) => ({ ...old, overlay: undefined }));

        resetSelection();
    }, [location, navigate, resetSelection, setActiveView]);

    const handleLibrarySelect = (tile: TileLibraryItem) => {
        setSelectedLibraryTile(tile);
        setSelectedEmoji(null);
        setSelectedPreview(tile.image);
    };

    const handleEmojiSelect = (emojiItem: EmojiItem) => {
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }

        const image = emojiToDataUrl(emojiItem.emoji, 96);

        setSelectedEmoji(emojiItem);
        setSelectedLibraryTile(null);
        setSelectedPreview(image);
    };

    const allowedTypes = new Set<CellType>();
    const hint = new Set<CellType>();

    if (!storyProgress.design.solid) {
        allowedTypes.add(CellType.Solid);
        hint.add(CellType.Solid);
    } else if (!storyProgress.design.spawn) {
        allowedTypes.add(CellType.Spawn);
        hint.add(CellType.Spawn);
    } else if (!storyProgress.design.goal) {
        allowedTypes.add(CellType.Trigger);
        hint.add(CellType.Trigger);
    } else {
        BASIC_CELL_TYPE_OPTIONS.forEach((t) => allowedTypes.add(t));
    }
    if (selectedTile?.isCoreTile) {
        allowedTypes.clear();
    }

    const handleAccept = async () => {
        try {
            setLoading(true);
            if (selectedTile) {
                if (selectedLibraryTile) {
                    selectedTile.image = selectedLibraryTile.image;
                }

                if (selectedEmoji && selectedPreview) {
                    selectedTile.image = selectedPreview;
                }
                if (selectedType === null) return;
                selectedTile.type = selectedType;
                onSelect(selectedTile, false);
            } else {
                if (selectedType === null) return;
                const newTile = {
                    id: crypto.randomUUID(),
                    type: selectedType,
                    image: '',
                    isCoreTile: false,
                    reloadTime: -1,
                    timer: 0,
                    reward: 0,
                };

                if (selectedLibraryTile) {
                    newTile.image = selectedLibraryTile.image;
                }

                if (selectedEmoji && selectedPreview) {
                    newTile.image = selectedPreview;
                }
                onSelect(newTile, true);
            }
            doClose();
        } finally {
            setLoading(false);
        }
    };

    const hasSelection = Boolean(selectedLibraryTile || selectedEmoji || selectedTile);

    return (
        <Dialog
            open={activeView.overlay === 'import'}
            onClose={doClose}
            maxWidth={'md'} //Small is okay, TODO: for smaller screens use sm
            fullWidth
        >
            <DialogTitle className={style.title}>{t('import.titles.tile')}</DialogTitle>

            <DialogContent>
                <div className={style.selectModelMessage}>
                    <div className={style.columnItem}>{t('import.messages.selectType')}</div>
                </div>
                <div className={style.optionContainer}>
                    {BASIC_CELL_TYPE_OPTIONS.map((type) => (
                        <TypeOption
                            key={type}
                            type={type}
                            selected={selectedType}
                            disabled={!allowedTypes.has(type)}
                            onSelect={(type: CellType) => setSelectedType(type)}
                            hint={hint.has(type)}
                        />
                    ))}
                </div>
                <div className={style.selectModelMessage}>
                    <div className={style.columnItem}>{t('import.messages.selectTile')}</div>
                    <div className={style.previewSection}>
                        {selectedPreview ? (
                            <img
                                src={selectedPreview}
                                alt="preview"
                                width={96}
                                height={96}
                            />
                        ) : (
                            <div className={style.emptyPreview}>No selection</div>
                        )}
                    </div>
                </div>

                <div className={style.tabBar}>
                    <button
                        type="button"
                        className={tab === 'library' ? style.activeTab : style.tab}
                        onClick={() => setTab('library')}
                    >
                        Library
                    </button>

                    <button
                        type="button"
                        className={tab === 'emoji' ? style.activeTab : style.tab}
                        onClick={() => setTab('emoji')}
                    >
                        Emojis
                    </button>
                </div>
                {tab === 'library' && (
                    <TileLibrary
                        onSelect={handleLibrarySelect}
                        selectedTileId={selectedLibraryTile?.id}
                    />
                )}

                {tab === 'emoji' && (
                    <EmojiLibrary
                        onSelect={handleEmojiSelect}
                        selectedEmoji={selectedEmoji?.emoji}
                    />
                )}
            </DialogContent>
            <div className={`${style.buttonGroupTile} ${style.buttonGroup}`}>
                {!selectedTile?.isCoreTile && selectedTile && (
                    <IconButton
                        onClick={() => {
                            setTiles((old) => old.filter((t) => t.id !== selectedTile?.id));
                            doClose();
                        }}
                        size="large"
                        color="error"
                    >
                        <DeleteIcon fontSize="large" />
                    </IconButton>
                )}
                <LargeButton
                    title={t('common.cancel')}
                    className={style.actionButton}
                    variant="contained"
                    color="primary"
                    onClick={doClose}
                    disabled={loading}
                >
                    {t('common.cancel')}
                </LargeButton>

                <LargeButton
                    title={loading ? t('import.actions.loadingImage') : t('import.actions.setImage')}
                    className={style.actionButton}
                    variant="contained"
                    color="secondary"
                    data-testid="teacher-start-button"
                    onClick={handleAccept}
                    disabled={!hasSelection || selectedType === null || selectedTile === null || loading}
                >
                    {loading ? t('import.actions.loadingImage') : t('import.actions.setImage')}
                </LargeButton>
            </div>
        </Dialog>
    );
}

export default React.memo(TileDialog);
