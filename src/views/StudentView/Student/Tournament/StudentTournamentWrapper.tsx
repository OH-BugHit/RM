import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { TournamentFileAtom } from '../../../../atoms/state';
import { useEffect, useRef, useState } from 'react';
import { applyLoadedGame, readSavedFile } from '../../../../utils/import';
import GameView from '../../../GameView/GameView';
import { ControlEnablerAtom, HUDvisAtom, TileVisibilityAtom } from '../../../../atoms/uiState';
import { playHudVis, visibleTilesTrue } from '../../../../utils/defaults';
import { QLearningAgent } from '../../../../components/agents/rlAgentQ';
import AgentSendBridge from '../AgentSendBridge';
import { Spinner } from '@genai-fi/base';

export default function StudentTournamentWrapper() {
    const agentRef = useRef<QLearningAgent>(undefined);
    const tournamentFile = useAtomValue(TournamentFileAtom);
    const setHudVis = useSetAtom(HUDvisAtom);
    const setTileVis = useSetAtom(TileVisibilityAtom);
    const setControls = useSetAtom(ControlEnablerAtom);
    const store = useStore();
    const [loaded, setLoaded] = useState(false);
    const nameRef = useRef<string>('');

    useEffect(() => {
        setHudVis(playHudVis);
        setTileVis(visibleTilesTrue);
        setControls({ play: true, step: true, ff: true, inspect: true });
    }, [setHudVis, setTileVis, setControls]);

    useEffect(() => {
        if (!tournamentFile) {
            setLoaded(false);
            return;
        }

        let cancelled = false;

        setLoaded(false);

        const handleImport = async () => {
            try {
                const file = new File([tournamentFile], 'environment.genai', { type: 'application/zip' });

                const loadedGame = await readSavedFile(file);
                if (cancelled) return;
                nameRef.current = loadedGame.manifest.gameName;
                applyLoadedGame(store, loadedGame);
                setLoaded(true);
            } catch (error) {
                if (cancelled) return;

                console.error('Failed to load tournament:', error);
            }
        };
        handleImport();
        return () => {
            cancelled = true;
        };
    }, [tournamentFile, store]);

    if (!tournamentFile) {
        return (
            <div>
                <Spinner />
                <br />
                Turnausta ei ole ladattu.
            </div>
        );
    }

    if (!loaded) {
        return <div>Ladataan turnausta...</div>;
    }

    return (
        <>
            <AgentSendBridge agentRef={agentRef} />
            <GameView
                nameRef={nameRef}
                agentRef={agentRef}
            />
        </>
    );
}
