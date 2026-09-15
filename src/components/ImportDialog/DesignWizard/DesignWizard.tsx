import { LargeButton } from '@genai-fi/base';
import style from './wizard.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useSetAtom, useAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import SlideShow from '../../SlideShow/SlideShow';
import Stepper from '../../SlideShow/Stepper';
import TypeOptions from './TypeOptions';
import TileOptions from './TileOptions';
import { BASIC_CELL_TYPE_OPTIONS, Cell, CellType, TileDefinition, TileLibraryItem } from '../../../types';
import { CurrentTileToolAtom, StoryProgressAtom, TilePropsAtom } from '../../../atoms/uiState';
import { InnerFillCellAtom, WorldGridRenderAtom } from '../../../atoms/gameState';
import { EmojiItem } from '../TileLibrary/emojiLibraryData';
import { emojiToDataUrl } from '../../../utils/import';
import { useGameScale } from '../../../context/GameScale/useGameScale';

interface Props {
    active?: boolean;
    variant?: 'plain' | 'styled';
}

export default function DesignWizard({ active, variant = 'styled' }: Props) {
    const { t } = useTranslation();
    const { s, scaleWidth, scale } = useGameScale();
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const [selectedTile, setSelectedTool] = useAtom(CurrentTileToolAtom);
    const [selectedType, setSelectedType] = useState<CellType | 'background' | null>(selectedTile?.type ?? null);
    const [selectedLibraryTile, setSelectedLibraryTile] = useState<TileLibraryItem | null>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<EmojiItem | null>(null);
    const [selectedPreview, setSelectedPreview] = useState<string | null>(selectedTile?.image ?? null);

    const [tiles, setTiles] = useAtom<TileDefinition[]>(TilePropsAtom);
    const [storyProgress, setStoryProgress] = useAtom(StoryProgressAtom);
    const setWorldGrid = useSetAtom(WorldGridRenderAtom);
    const setInnerFill = useSetAtom(InnerFillCellAtom);

    useEffect(() => {
        return () => {
            setSelectedTool(undefined);
        };
    }, [setSelectedTool]);
    useEffect(() => {
        setSelectedType(selectedTile?.type ?? null);
    }, [selectedTile]);

    useEffect(() => {
        setSelectedPreview(selectedTile?.image ?? null);
    }, [selectedTile]);

    const previewUrlRef = useRef<string | null>(null);

    const resetSelection = useCallback(() => {
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }
        setSelectedType(selectedTile?.type ?? null);
        setSelectedLibraryTile(null);
        setSelectedEmoji(null);
        setSelectedPreview(selectedTile?.image ?? null);
        setPage(0);
    }, [selectedTile]);

    const handleLibrarySelect = useCallback((tile: TileLibraryItem) => {
        setSelectedLibraryTile(tile);
        setSelectedEmoji(null);
        setSelectedPreview(tile.image);
    }, []);

    const handleEmojiSelect = useCallback((emojiItem: EmojiItem) => {
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }

        const image = emojiToDataUrl(emojiItem.emoji, 96);

        setSelectedEmoji(emojiItem);
        setSelectedLibraryTile(null);
        setSelectedPreview(image);
    }, []);

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

    const onSelect = useCallback(
        (tile: TileDefinition, newTile: boolean) => {
            if (!tile) return;

            if (tiles.length < 3) tile.isCoreTile = true;

            if (tile.isCoreTile) {
                switch (tile.type) {
                    case CellType.Trigger: {
                        if (tile.image) {
                            setStoryProgress((old) => ({
                                ...old,
                                design: {
                                    ...old.design,
                                    goal: true,
                                    props: true,
                                },
                            }));
                        }
                        break;
                    }
                    case CellType.Solid: {
                        if (tile.image) {
                            setStoryProgress((old) => ({
                                ...old,
                                design: {
                                    ...old.design,
                                    solid: true,
                                },
                            }));
                            setWorldGrid((old) => {
                                if (!old) return old;
                                return old.map((row) =>
                                    row.map((cell) =>
                                        cell.type === CellType.Solid ? { ...cell, image: tile.image } : cell
                                    )
                                );
                            });
                        }
                        break;
                    }
                    case CellType.Spawn: {
                        if (tile.image) {
                            setStoryProgress((old) => ({
                                ...old,
                                design: {
                                    ...old.design,
                                    spawn: true,
                                },
                            }));

                            setWorldGrid((old) => {
                                if (!old) return old;
                                return old.map((row) =>
                                    row.map((cell) =>
                                        cell.type === CellType.Spawn ? { ...cell, image: tile.image } : cell
                                    )
                                );
                            });
                        }
                        break;
                    }
                }
            }

            if (!newTile) {
                setTiles((prev) => prev.map((oldTile) => (oldTile.id === tile.id ? { ...tile } : oldTile)));
                return;
            }
            setTiles((old) => [...old, tile]);
        },
        [setStoryProgress, setTiles, setWorldGrid, tiles.length]
    );

    const handleAccept = useCallback(async () => {
        try {
            setLoading(true);
            if (selectedTile) {
                if (selectedLibraryTile) {
                    selectedTile.image = selectedLibraryTile.image;
                }

                if (selectedEmoji && selectedPreview) {
                    selectedTile.image = selectedPreview;
                    selectedTile.emoji = selectedEmoji.emoji;
                }
                if (selectedType === null) return;
                if (selectedType === 'background') {
                    console.error('Error on handle accept');
                    return;
                }
                selectedTile.type = selectedType;
                onSelect(selectedTile, false);
            } else {
                if (selectedType === null) return;
                if (selectedType === 'background') {
                    const innerFill: Cell = { type: CellType.Spawn, reloadTime: 0, timer: 0, image: '', emoji: '' };
                    if (selectedLibraryTile) {
                        innerFill.image = selectedLibraryTile.image;
                    }

                    if (selectedEmoji && selectedPreview) {
                        innerFill.image = selectedPreview;
                        innerFill.emoji = selectedEmoji.emoji;
                    }
                    setInnerFill(innerFill);
                } else {
                    const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
                    const newTile: TileDefinition = {
                        id: id,
                        type: selectedType,
                        image: '',
                        emoji: '',
                        isCoreTile: false,
                        reloadTime: -1,
                        timer: 0,
                    };
                    resetSelection();

                    if (selectedLibraryTile) {
                        newTile.image = selectedLibraryTile.image;
                    }

                    if (selectedEmoji && selectedPreview) {
                        newTile.image = selectedPreview;
                        newTile.emoji = selectedEmoji.emoji;
                    }
                    onSelect(newTile, true);
                }
            }
            resetSelection();
        } finally {
            setLoading(false);
        }
    }, [
        onSelect,
        resetSelection,
        setInnerFill,
        selectedEmoji,
        selectedLibraryTile,
        selectedPreview,
        selectedTile,
        selectedType,
    ]);

    const handleDelete = useCallback(() => {
        if (!selectedTile || selectedTile.isCoreTile) return;
        setTiles((old) => old.filter((t) => t.id !== selectedTile.id));
        resetSelection();
    }, [resetSelection, selectedTile, setTiles]);

    const hasSelection = Boolean(selectedLibraryTile || selectedEmoji || selectedTile);

    const controls = (
        <div
            className={style.wizardControls}
            style={{ gap: `${s(0.5)}rem`, padding: `0 ${s(1)}rem ${s(1)}rem` }}
        >
            <div className={style.wizardControlsLeft}>
                {page === 1 ? (
                    <LargeButton
                        variant="outlined"
                        color="inherit"
                        className={style.actionButton}
                        onClick={() => setPage(0)}
                        style={{ height: `${Math.max(30, s(48))}px` }}
                        startIcon={<ArrowBackIosNewIcon />}
                    >
                        {t('wizard.actions.back')}
                    </LargeButton>
                ) : (
                    <div style={{ width: Math.min(96, s(96)) }} />
                )}
            </div>
            <div className={style.wizardControlsCenter}>
                <Stepper
                    steps={[[0], [1]]}
                    page={page}
                />
            </div>
            <div className={style.wizardControlsRight}>
                <LargeButton
                    variant="outlined"
                    color="info"
                    className={style.actionButton}
                >
                    Close
                </LargeButton>
                {page === 0 ? (
                    <LargeButton
                        color="primary"
                        className={style.actionButton}
                        variant="contained"
                        onClick={() => setPage(1)}
                        disabled={selectedType === null}
                        style={{ height: `${Math.max(30, s(48))}px` }}
                        aria-live="off"
                    >
                        {t('wizard.actions.continue')}
                    </LargeButton>
                ) : (
                    <>
                        <LargeButton
                            title={loading ? t('import.actions.loadingImage') : t('import.actions.setImage')}
                            className={style.actionButton}
                            variant="contained"
                            color="secondary"
                            onClick={handleAccept}
                            style={{ height: `${Math.max(30, s(48))}px` }}
                            disabled={!hasSelection || selectedType === null || selectedTile === null || loading}
                        >
                            {loading ? t('import.actions.loadingImage') : t('import.actions.setImage')}
                        </LargeButton>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <section
            className={
                variant === 'styled'
                    ? !active
                        ? style.wizardClosed
                        : style.wizard
                    : !active
                      ? style.plainwizardClosed
                      : style.plainwizard
            }
            style={{
                width: `${Math.max(Math.min(800, scaleWidth * 800), 500)}px`,
                height: `${Math.min(1000, s(1000))}px`,
                padding: `${scale < 0.7 ? 40 : 24}px`,
            }}
            data-testid="recom-wizard"
        >
            <div
                className={style.wizardInner}
                style={{ width: `calc(100% - ${scaleWidth * 24}px)`, height: `calc(100% - ${scale * 24}px)` }}
            >
                <SlideShow
                    page={page}
                    controls={controls}
                >
                    <TypeOptions
                        selectedType={selectedType}
                        onSelectType={setSelectedType}
                        allowedTypes={allowedTypes}
                        hint={hint}
                    />
                    <TileOptions
                        selectedTile={selectedTile}
                        selectedType={selectedType}
                        selectedPreview={selectedPreview}
                        selectedLibraryTile={selectedLibraryTile}
                        selectedEmoji={selectedEmoji}
                        hasSelection={hasSelection}
                        onSelectTile={handleLibrarySelect}
                        onSelectEmoji={handleEmojiSelect}
                        onDelete={handleDelete}
                    />
                </SlideShow>
            </div>
        </section>
    );
}
