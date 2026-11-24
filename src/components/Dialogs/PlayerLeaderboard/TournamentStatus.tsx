import { Alert, Button, Stack } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { sentTournamentWorldAtom } from '../../../atoms/state';
import { useViewNavigation } from '../../../hooks/useViewNavigation';

export default function TournamentStatus() {
    const { t } = useTranslation();
    const sentWorld = useAtomValue(sentTournamentWorldAtom);
    const { goToView } = useViewNavigation();

    return (
        <Stack spacing={2}>
            <Button
                variant="contained"
                startIcon={<FileUploadIcon />}
                onClick={() => goToView({ overlay: 'import' })}
            >
                {t('import.actions.sendWorld')}
            </Button>
            {sentWorld && <Alert severity="success">{t('import.messages.worldSent')}</Alert>}
        </Stack>
    );
}
