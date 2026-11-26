import { useAtomValue, useSetAtom, useStore } from 'jotai';
import { TournamentFileAtom } from '../../../../atoms/state';
import { useEffect, useRef, useState } from 'react';
import { applyLoadedGame, readSavedFile } from '../../../../utils/import';
import GameView from '../../../GameView/GameView';
import { ControlEnablerAtom, HUDvisAtom, TileVisibilityAtom, TopbarAtom } from '../../../../atoms/uiState';
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
    const setTopBar = useSetAtom(TopbarAtom);
    const store = useStore();
    const [loaded, setLoaded] = useState(false);
    const levelIDref = useRef<string>('');

    useEffect(() => {
        setHudVis({ ...playHudVis, controls: { ...playHudVis.controls, inspect: false } });
        setTileVis(visibleTilesTrue);
        setControls({ trash: true, test: true, play: true, step: true, ff: true, inspect: true });
    }, [setHudVis, setTileVis, setControls]);

    useEffect(() => {
        if (!tournamentFile) {
            setLoaded(false);
            return;
        }
        setTopBar({ score: 0, topScore: 0, traps: 0, treasures: 0, toBeat: 0, bigTreasures: 0 });
        let cancelled = false;

        setLoaded(false);

        const handleImport = async () => {
            try {
                const file = new File([tournamentFile], 'environment.genai', { type: 'application/zip' });

                const loadedGame = await readSavedFile(file);
                if (cancelled) return;
                levelIDref.current = loadedGame.manifest.levelID;
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
    }, [tournamentFile, store, setTopBar]);

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
                levelIDref={levelIDref}
                agentRef={agentRef}
            />
        </>
    );
}
