import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { studentDataAtom } from '../../atoms/state';
import { useHostProtocol } from '../../services/HostProtocol';

export default function ScoreSender() {
    const { doSendLeaderboard } = useHostProtocol();
    const studentData = useAtomValue(studentDataAtom);

    useEffect(() => {
        if (doSendLeaderboard) {
            doSendLeaderboard(studentData);
        }
    }, [doSendLeaderboard, studentData]);

    return null;
}
