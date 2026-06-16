import style from './style.module.css';
import { useTranslation } from 'react-i18next';
import { useAtomValue, useSetAtom } from 'jotai';
import React, { useCallback, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { LargeButton } from '@genai-fi/base';
import { useLocation, useNavigate } from 'react-router';
import { ActiveAgentAtom, ImportedAgentImgAtom } from '../../atoms/state';
import { ActiveViewAtom } from '../../atoms/uiState';
import { preprocessImageWScale } from '../../utils/import';

function ModelDialog() {
    const { t } = useTranslation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const setActiveAgent = useSetAtom(ActiveAgentAtom);
    const setImportedImg = useSetAtom(ImportedAgentImgAtom);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const activeView = useAtomValue(ActiveViewAtom);
    const navigate = useNavigate();
    const location = useLocation();

    const doClose = useCallback(() => {
        const params = new URLSearchParams(location.search);
        params.delete('overlay');
        const search = params.toString();
        navigate(search ? `${location.pathname}?${search}` : location.pathname, { replace: false });
    }, [location, navigate]);

    const openFile = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleAccept = async () => {
        if (!selectedFile) return;

        try {
            setLoading(true);

            const image = await preprocessImageWScale(selectedFile);

            setActiveAgent((old) => ({
                ...old,
                type: 'created',
                img: image,
            }));
            setImportedImg(image);

            doClose();
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setSelectedFile(file);
        }
    };

    return (
        <Dialog
            open={activeView.overlay === 'agentImgImport'}
            onClose={doClose}
            maxWidth="md"
        >
            <DialogTitle className={style.title}>{t('teacher.titles.changeModel')}</DialogTitle>
            <DialogContent>
                <div className={style.selectModelMessage}>
                    <div className={style.columnItem}>{t('teacher.messages.selectModelGenAI')}</div>
                    <div className={style.column}>
                        <>
                            {selectedFile && (
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="preview"
                                    width={64}
                                    height={64}
                                />
                            )}
                            <input
                                ref={fileInputRef}
                                id="openfile"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <IconButton
                                title={t('teacher.actions.openFileExplorer')}
                                onClick={openFile}
                                color="secondary"
                                size="large"
                                style={{ border: '1px solid rgb(174, 37, 174)' }}
                                aria-label={t('dashboard.labels.openTip')}
                            >
                                <FolderOpenIcon fontSize="medium" />
                            </IconButton>
                        </>
                    </div>
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
                        title={loading ? t('teacher.actions.loadingModel') : t('teacher.actions.setModel')}
                        variant="contained"
                        color="secondary"
                        data-testid="teacher-start-button"
                        onClick={handleAccept}
                        disabled={!selectedFile || loading}
                    >
                        {loading ? t('teacher.actions.loadingModel') : t('teacher.actions.setModel')}
                    </LargeButton>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default React.memo(ModelDialog);
