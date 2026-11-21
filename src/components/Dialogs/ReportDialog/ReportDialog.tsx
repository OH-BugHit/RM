import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Alert,
} from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import { Button } from '@genai-fi/base';
import { useTranslation } from 'react-i18next';
import { ActiveViewAtom } from '../../../atoms/uiState';
import { useAtom } from 'jotai';
import { useLocation, useNavigate } from 'react-router-dom';

interface ReportDialogProps {
    onClose?: () => void;
}

export default function ReportDialog({ onClose = () => {} }: ReportDialogProps) {
    const { t } = useTranslation();
    const [activeView, setActiveView] = useAtom(ActiveViewAtom);
    const textRef = useRef<HTMLInputElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const [hadError, setHadError] = useState(false);
    const [hasSent, setHasSent] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const doClose = useCallback(() => {
        onClose();
        const params = new URLSearchParams(location.search);
        params.delete('overlay');
        const search = params.toString();

        navigate(search ? `${location.pathname}?${search}` : location.pathname, { replace: false });
        setActiveView((old) => ({ ...old, overlay: undefined }));
    }, [location, navigate, setActiveView, onClose]);

    return (
        <Dialog
            open={activeView.overlay === 'report'}
            onClose={doClose}
            maxWidth="sm"
        >
            <DialogTitle>{t('app.report.title')}</DialogTitle>
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    paddingTop: '1rem !important',
                    width: '300px',
                }}
            >
                {hadError && <Alert severity="error">{t('app.report.error')}</Alert>}
                <FormControl fullWidth>
                    <InputLabel htmlFor="report-reason-label">{t('app.report.reason')}</InputLabel>
                    <Select
                        inputRef={selectRef}
                        labelId="report-reason-label"
                        defaultValue="bug"
                        label={t('app.report.reason')}
                    >
                        <MenuItem value="bug">{t('app.report.bug')}</MenuItem>
                        <MenuItem value="feedback">{t('app.report.feedback')}</MenuItem>
                        <MenuItem value="other">{t('app.report.other')}</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    inputRef={textRef}
                    label={t('app.report.message')}
                    fullWidth
                    multiline
                    rows={4}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={doClose}
                >
                    {t('app.cancel')}
                </Button>
                <Button
                    variant="contained"
                    disabled={hasSent}
                    onClick={() => {
                        const reportText = textRef.current?.value;
                        const reportReason = selectRef.current?.value;
                        if (reportText && reportReason && reportText.trim() !== '') {
                            setHasSent(true);
                            const severity = reportReason === 'bug' ? 'error' : 'info';
                            const truncatedReportText =
                                reportText.length > 4000 ? reportText.slice(0, 4000) : reportText;
                            fetch(`${import.meta.env.VITE_APP_API}/report`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ message: truncatedReportText, application: 'reward', severity }),
                            })
                                .catch((error) => {
                                    console.error('Failed to send report:', error);
                                    setHadError(true);
                                })
                                .then((response) => {
                                    if (response && response.ok) {
                                        setHadError(false);
                                        doClose();
                                    } else {
                                        setHadError(true);
                                    }
                                });
                        }
                    }}
                >
                    {t('app.report.send')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
