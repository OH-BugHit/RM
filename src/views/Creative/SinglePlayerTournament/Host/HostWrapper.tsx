import { useSetAtom } from 'jotai';

import { useID } from '@genai-fi/base';
import { sessionCodeAtom } from '../../../../atoms/state';
import HostPeerWrapper from './HostPeerWrapper';

export default function HostWrapper() {
    const setSessionCode = useSetAtom(sessionCodeAtom);

    const ID = useID(5);
    setSessionCode(ID);

    return <HostPeerWrapper ID={ID} />;
}
