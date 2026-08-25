import style from '../style.module.css';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import React, { useCallback, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { LargeButton } from '@genai-fi/base';
import { useLocation, useNavigate } from 'react-router-dom';
import { ActiveViewAtom } from '../../../atoms/uiState';
import { renderWorldPreview } from '../../EnvironmentRender/renderWorldPreview';
import { loadSavePreview } from '../../../utils/import';
import LevelPreview from '../LevelPreview/LevelPreview';

interface ImportDialogProps {
    onImport: (file: File) => Promise<void>;
}

function GameDialog({ onImport }: ImportDialogProps) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
    const [selectedGameName, setSelectedGameName] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [activeView, setActiveView] = useAtom(ActiveViewAtom);
    const navigate = useNavigate();
    const location = useLocation();

    const resetSelection = useCallback(() => {
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
                await onImport(selectedFile);
                doClose();
                return;
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const preview = await loadSavePreview(file);

            const canvas = await renderWorldPreview(preview.world);

            const previewUrl = canvas.toDataURL();

            setSelectedGameName(preview.manifest.gameName);
            setSelectedFile(file);
            setSelectedPreview(previewUrl);
        } catch (err) {
            console.error(err);
            setSelectedFile(null);
            setSelectedPreview(null);
        }
    };

    const hasSelection = Boolean(selectedFile);

    return (
        <Dialog
            open={activeView.overlay === 'import'}
            onClose={doClose}
            maxWidth={'sm'}
            fullWidth
        >
            <DialogTitle className={style.title}>{t('import.titles.game')}</DialogTitle>

            <DialogContent>
                <div className={style.selectModelMessage}>
                    <div className={style.columnItem}>{t('import.messages.selectGame')}</div>
                    <LevelPreview
                        gameName={selectedGameName}
                        preview={selectedPreview}
                    />

                    <div className={style.uploadSection}>
                        <input
                            ref={fileInputRef}
                            id="openfile"
                            type="file"
                            accept=".genai"
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

export default React.memo(GameDialog);
