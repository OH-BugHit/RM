import { useSetAtom } from 'jotai';
import { sessionCodeAtom } from '../../atoms/state';
import { useID } from '@genai-fi/base';
import Teacher from './Teacher';

export default function TeacherWrapper() {
    const setSessionCode = useSetAtom(sessionCodeAtom);

    const ID = useID(5);
    setSessionCode(ID);

    return <Teacher ID={ID} />;
}
