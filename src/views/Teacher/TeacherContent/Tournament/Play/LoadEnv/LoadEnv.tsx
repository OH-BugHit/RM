import { useTranslation } from 'react-i18next';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GameDialog from '../../../../../../components/ImportDialog/GameImport/GameDialog';
import SelectorItem from '../../../../../Story/Selectors/SelectorItem';
import { readSavedFile } from '../../../../../../utils/import';
import { useViewNavigation } from '../../../../../../hooks/useViewNavigation';
import { useGameScale } from '../../../../../../context/GameScale/useGameScale';
import { useSetAtom } from 'jotai';
import { studentGamesAtom, studentGameZipsAtom } from '../../../../../../atoms/state';
import { StudentGameBlobs, StudentGames } from '../../../../../../types';

export default function LoadEnv() {
    const { s } = useGameScale();
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
            <SelectorItem
                title={t('import.actions.loadGame')}
                onClick={() => {
                    goToView({
                        overlay: 'import',
                    });
                }}
                selected={false}
            >
                <FileUploadIcon
                    fontSize="large"
                    sx={{ width: s(128), height: s(128) }}
                />
            </SelectorItem>
        </div>
    );
}
