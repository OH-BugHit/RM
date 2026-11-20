import style from './style.module.css';
import { useEffect, useRef } from 'react';
import TournamentEnvironment from './TournamentEnvironment';
import { QPolicyAgent } from '../../../../../../components/agents/policyQagent';
import { useAtomValue, useSetAtom } from 'jotai';
import { TournamentGameAtom } from '../../../../../../atoms/state';
import AgentBridge from './AgentBridge';
import Controls from '../../../../../Controls/Controls';
import { ControlEnablerAtom, HUDvisAtom, TileVisibilityAtom } from '../../../../../../atoms/uiState';
import { visibleTilesTrue } from '../../../../../../utils/defaults';

export default function TournamentEnvironmentWrapper() {
    const agentsRef = useRef<QPolicyAgent[]>([]);
    const game = useAtomValue(TournamentGameAtom);
    const setControls = useSetAtom(ControlEnablerAtom);
    const setHudVis = useSetAtom(HUDvisAtom);
    const setTileVisibility = useSetAtom(TileVisibilityAtom);

    useEffect(() => {
        setControls({ test: true, play: true, ff: false, step: true, inspect: false });
        setHudVis((old) => {
            return {
                ...old,
                controls: {
                    test: true,
                    ff: false,
                    play: true,
                    inspect: false,
                    step: true,
                },
            };
        });
        setTileVisibility(visibleTilesTrue);
    }, [setControls, setTileVisibility, setHudVis]);

    if (!game?.game.world) {
        return <p>select game</p>;
    }

    return (
        <div className={style.environmentWrap}>
            <h1>{game.manifest.gameName}</h1>
            <AgentBridge agentsRef={agentsRef} />
            <div className={style.env}>
                <TournamentEnvironment
                    agentsRef={agentsRef}
                    grid={game.game.world}
                />
            </div>
            <Controls />
        </div>
    );
}
