import { useAtomValue } from 'jotai';
import { ActiveEnvironmentAtom } from '../../../atoms/state';
import { Frame } from '../../Frames/Frame';

export default function Environment() {
    const environment = useAtomValue(ActiveEnvironmentAtom);
    return (
        <>
            <Frame
                variant="title"
                minWidth={200}
                minHeight={40}
                backgroundColour="rgba(255, 219, 134, 0.9)"
            >
                <h3 style={{ margin: 0, justifySelf: 'center' }}>{environment.name}</h3>
            </Frame>
        </>
    );
}
