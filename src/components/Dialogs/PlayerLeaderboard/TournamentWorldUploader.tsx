import { useAtomValue, useSetAtom } from 'jotai';
import { sentTournamentWorldAtom, usernameAtom } from '../../../atoms/state';
import GameDialog from '../GameImport/GameDialog';
import { usePlayerProtocol } from '../../../services/PlayerProtocol';

export default function TournamentWorldUploader() {
    const { doSendEnvironment } = usePlayerProtocol();
    const username = useAtomValue(usernameAtom);
    const setSentWorld = useSetAtom(sentTournamentWorldAtom);

    const handleImport = async (file: File) => {
        if (!doSendEnvironment) {
            throw new Error('Environment upload is unavailable.');
        }

        doSendEnvironment({ file, studentId: username });
        setSentWorld(true);
    };

    return (
        <GameDialog
            onImport={handleImport}
            returnOverlay="tournamentMenu"
        />
    );
}
