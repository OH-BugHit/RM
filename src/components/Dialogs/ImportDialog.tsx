import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import React, { useCallback, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { LargeButton } from '@genai-fi/base';
import { useLocation, useNavigate } from 'react-router';
import { ActiveViewAtom } from '../../atoms/uiState';

interface ImportDialogProps {
    preprocess: (file: File) => Promise<string>;
    onSelect: (image: string) => void;
}

function ImportDialog({ preprocess, onSelect }: ImportDialogProps) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

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
        setSelectedPreview(null);
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

    const handleAccept = async () => {
        try {
            setLoading(true);

            if (selectedFile) {
                const result = await preprocess(selectedFile);
                onSelect(result);
                doClose();
                return;
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
        setSelectedPreview(previewUrl);
    };

    const hasSelection = Boolean(selectedFile);

    return (
        <Dialog
            open={activeView.overlay === 'import'}
            onClose={doClose}
            maxWidth={'sm'}
            fullWidth
        >
            <DialogTitle className={style.title}>{t('import.titles.agent')}</DialogTitle>

            <DialogContent>
                <div className={style.selectModelMessage}>
                    <div className={style.columnItem}>{t('import.messages.selectAgent')}</div>

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
                            title={t('import.actions.openImageFileExplorer')}
                            onClick={openFile}
                            color="secondary"
                            size="large"
                            style={{ border: '1px solid rgb(174, 37, 174)' }}
                            aria-label={t('dashboard.labels.openTip')}
                        >
                            <FolderOpenIcon fontSize="medium" />
                        </IconButton>
                    </div>
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
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(ImportDialog);
