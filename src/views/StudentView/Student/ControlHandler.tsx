import { useAtomValue, useStore } from 'jotai';
import { configAtom } from '../../../atoms/state';
import { useEffect } from 'react';
import { useViewNavigation } from '../../../hooks/useViewNavigation';
import { ActiveViewAtom } from '../../../atoms/uiState';

export default function ControlHandler() {
    const config = useAtomValue(configAtom);
    const { goToView } = useViewNavigation();
    const store = useStore();

    useEffect(() => {
        goToView({
            main: config.phase,
            sub: store.get(ActiveViewAtom).sub,
            overlay: undefined,
        });
    }, [config, goToView, store]);

    return null;
}
