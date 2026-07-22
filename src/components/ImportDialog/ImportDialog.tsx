import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import React, { useCallback, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { LargeButton } from '@genai-fi/base';
import { useLocation, useNavigate } from 'react-router';
import { ActiveViewAtom } from '../../atoms/uiState';
import TileLibrary from './TileLibrary/TileLibrary';
import EmojiLibrary from './EmojiLibrary/EmojiLibrary';
import { EmojiItem } from './EmojiLibrary/emojiLibraryData';
import { TileLibraryItem } from '../../types';
import { emojiToDataUrl } from '../../utils/import';
import LibrarySearch from './LibrarySearch';

interface ImportDialogProps {
    preprocess: (file: File) => Promise<string>;
    onSelect: (image: string) => void;
    type?: 'tile' | 'agent';
}

function ImportDialog({ type = 'agent', preprocess, onSelect }: ImportDialogProps) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedLibraryTile, setSelectedLibraryTile] = useState<TileLibraryItem | null>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<EmojiItem | null>(null);
    const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
    const [tab, setTab] = useState<'library' | 'emoji' | 'upload'>('library');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const previewUrlRef = useRef<string | null>(null);

    const [activeView, setActiveView] = useAtom(ActiveViewAtom);
    const navigate = useNavigate();
    const location = useLocation();

    const resetSelection = useCallback(() => {
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }

        setSelectedFile(null);
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

    const openFile = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleLibrarySelect = (tile: TileLibraryItem) => {
        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }

        setSelectedLibraryTile(tile);
        setSelectedFile(null);
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
        setSelectedFile(null);
        setSelectedPreview(image);
    };

    const handleAccept = async () => {
        try {
            setLoading(true);

            if (selectedFile) {
                const result = await preprocess(selectedFile);
                onSelect(result);
                doClose();
                return;
            }

            if (selectedLibraryTile) {
                onSelect(selectedLibraryTile.image);
                doClose();
                return;
            }

            if (selectedEmoji && selectedPreview) {
                onSelect(selectedPreview);
                doClose();
            }
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (previewUrlRef.current) {
            URL.revokeObjectURL(previewUrlRef.current);
            previewUrlRef.current = null;
        }

        const previewUrl = URL.createObjectURL(file);
        previewUrlRef.current = previewUrl;

        setSelectedFile(file);
        setSelectedLibraryTile(null);
        setSelectedEmoji(null);
        setSelectedPreview(previewUrl);
    };

    const hasSelection = Boolean(selectedFile || selectedLibraryTile || selectedEmoji);

    return (
        <Dialog
            open={activeView.overlay === 'import'}
            onClose={doClose}
            maxWidth={type === 'agent' ? 'sm' : 'md'}
            fullWidth
        >
            <DialogTitle className={style.title}>
                {type === 'tile' ? t('import.titles.tile') : t('import.titles.agent')}
            </DialogTitle>

            <DialogContent>
                <div className={style.selectModelMessage}>
                    <div className={style.columnItem}>
                        {type === 'tile' ? t('import.messages.selectTile') : t('import.messages.selectAgent')}
                    </div>

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
                    {type === 'tile' && (
                        <div className={`${style.buttonGroupTile} ${style.buttonGroup}`}>
                            <LargeButton
                                title={t('common.cancel')}
                                variant="contained"
                                color="primary"
                                onClick={doClose}
                                disabled={loading}
                            >
                                {t('common.cancel')}
                            </LargeButton>

                            <LargeButton
                                title={loading ? t('import.actions.loadingImage') : t('import.actions.setImage')}
                                variant="contained"
                                color="secondary"
                                data-testid="teacher-start-button"
                                onClick={handleAccept}
                                disabled={!hasSelection || loading}
                            >
                                {loading ? t('import.actions.loadingImage') : t('import.actions.setImage')}
                            </LargeButton>
                        </div>
                    )}
                </div>

                {type === 'tile' && (
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

                        <button
                            type="button"
                            className={tab === 'upload' ? style.activeTab : style.tab}
                            onClick={() => setTab('upload')}
                        >
                            Upload
                        </button>
                    </div>
                )}
                {type !== 'agent' && tab !== 'upload' && (
                    <LibrarySearch
                        onSelectTile={handleLibrarySelect}
                        onSelectEmoji={handleEmojiSelect}
                    />
                )}
                {(type === 'agent' || tab === 'upload') && (
                    <div className={style.uploadSection}>
                        <input
                            ref={fileInputRef}
                            id="openfile"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />

                        <IconButton
                            title={t('import.actions.openFileExplorer')}
                            onClick={openFile}
                            color="secondary"
                            size="large"
                            style={{ border: '1px solid rgb(174, 37, 174)' }}
                            aria-label={t('dashboard.labels.openTip')}
                        >
                            <FolderOpenIcon fontSize="medium" />
                        </IconButton>
                    </div>
                )}
                {type === 'agent' && (
                    <div className={style.buttonGroup}>
                        <LargeButton
                            title={t('common.cancel')}
                            variant="contained"
                            color="primary"
                            onClick={doClose}
                            disabled={loading}
                        >
                            {t('common.cancel')}
                        </LargeButton>

                        <LargeButton
                            title={loading ? t('import.actions.loadingImage') : t('import.actions.setImage')}
                            variant="contained"
                            color="secondary"
                            data-testid="teacher-start-button"
                            onClick={handleAccept}
                            disabled={!hasSelection || loading}
                        >
                            {loading ? t('import.actions.loadingImage') : t('import.actions.setImage')}
                        </LargeButton>
                    </div>
                )}

                {type === 'tile' && tab === 'library' && (
                    <TileLibrary
                        onSelect={handleLibrarySelect}
                        selectedTileId={selectedLibraryTile?.id}
                    />
                )}

                {type === 'tile' && tab === 'emoji' && (
                    <EmojiLibrary
                        onSelect={handleEmojiSelect}
                        selectedEmoji={selectedEmoji?.emoji}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(ImportDialog);
