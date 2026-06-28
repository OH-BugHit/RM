import { useState } from 'react';
import SelectorItem from '../SelectorItem';
import ModifyEnvironment from './ModifyEnvironment';
import ModifyProps from './ModifyProps';
import Separator from '../../../../components/Separator/Separator';
import { useAtomValue } from 'jotai';
import { StoryProgressAtom } from '../../../../atoms/uiState';

type EnvMode = 'props' | 'modify' | undefined;

export default function EnvironmentOptions() {
    const [mode, setMode] = useState<EnvMode>(undefined);
    const storyProgress = useAtomValue(StoryProgressAtom);

    const goHome = () => {
        setMode(undefined);
    };

    const handleSetMode = (mode: EnvMode) => {
        setMode(mode);
    };
    return (
        <>
            <Separator />
            {!mode && (
                <div style={{ width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                    <SelectorItem
                        title={'Props'}
                        onClick={() => handleSetMode('props')}
                    >
                        <b>Design your own world</b>
                    </SelectorItem>
                    <SelectorItem
                        title={'Modify'}
                        onClick={() => handleSetMode('modify')}
                        disabled={!storyProgress.environment.props}
                    >
                        <b>Create your own world</b>
                    </SelectorItem>
                </div>
            )}
            {mode === 'props' && <ModifyProps goHome={goHome} />}
            {mode === 'modify' && <ModifyEnvironment goHome={goHome} />}
        </>
    );
}
