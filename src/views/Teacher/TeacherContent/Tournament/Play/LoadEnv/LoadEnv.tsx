import { useTranslation } from 'react-i18next';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GameDialog from '../../../../../../components/Dialogs/GameImport/GameDialog';
import { readSavedFile } from '../../../../../../utils/import';
import { useViewNavigation } from '../../../../../../hooks/useViewNavigation';
import { useSetAtom } from 'jotai';
import { studentGamesAtom, studentGameZipsAtom } from '../../../../../../atoms/state';
import { StudentGameBlobs, StudentGames } from '../../../../../../types';
import { IconButton } from '@mui/material';

export default function LoadEnv() {
    const { t } = useTranslation();
    const { goToView } = useViewNavigation();
    const setStudentGames = useSetAtom(studentGamesAtom);
    const setStudentGameBlobs = useSetAtom(studentGameZipsAtom);

    const handleImport = async (file: File) => {
        const loaded = await readSavedFile(file);
        const id = 'teacher' + Math.random();
        setStudentGames((prev: StudentGames) => {
            const newMap = new Map(prev.students);
            newMap.set(id, loaded);
            return { students: newMap };
        });

        setStudentGameBlobs((prev: StudentGameBlobs) => {
            const newMap = new Map(prev.students);
            newMap.set(id, file);
            return { students: newMap };
        });
    };

    return (
        <div>
            <GameDialog onImport={handleImport} />
            <IconButton
                title={t('import.actions.loadGame')}
                onClick={() => {
                    goToView({
                        overlay: 'import',
                    });
                }}
            >
                <FileUploadIcon
                    fontSize="large"
                    color="primary"
                />
            </IconButton>
        </div>
    );
}
