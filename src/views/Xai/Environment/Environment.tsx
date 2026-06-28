import { useAtomValue } from 'jotai';
import { ActiveEnvironmentAtom } from '../../../atoms/state';
import { HUDvisAtom } from '../../../atoms/uiState';
import { NewFrame } from '../../Frames/NewFrame';

export default function Environment() {
    const environment = useAtomValue(ActiveEnvironmentAtom);
    const hudVis = useAtomValue(HUDvisAtom);
    return (
        <>
            <NewFrame visible={hudVis.envTitle}>
                <h3 style={{ minHeight: '70px', alignContent: 'center', margin: 0, justifySelf: 'center' }}>
                    {environment.name}
                </h3>
            </NewFrame>
        </>
    );
}
