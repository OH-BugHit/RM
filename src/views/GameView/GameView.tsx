import { useEffect, useRef, useState } from 'react';
import PotsAndBurglarGame from '../Environments/PotsAndBurglar/PotsAndBurglarGame';
import style from './style.module.css';
import { RLGridEnv } from '../Environments/PotsAndBurglar/environment';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { Actions, CellType, GameEnvironmentInfo, GenericObservation } from '../../types';
import { useStore } from 'jotai';
import { ActiveAgentAtom, ActiveEnvironmentAtom } from '../../atoms/state';
import GameTuner from './GameTuner';
import Controls from '../Controls/Controls';
import GenericWorld from '../Environments/Generic/GenericWorld';
import { World } from '../../components/GameComponents/EnvironmentComponents/worldGenerator';
import { GenericRLEnv } from '../Environments/TreasureHunter/environment';
import { worldToGrid } from '../World/WorldToGrid';

// React component
function GameView() {
    const store = useStore();
    const environment = store.get(ActiveEnvironmentAtom);
    const agent = store.get(ActiveAgentAtom);

    const envRef = useRef<RLGridEnv>(undefined);
    const genericEnvRef = useRef<GenericRLEnv>(undefined);
    const agentRef = useRef<QLearningAgent>(undefined);
    const obsRef = useRef<GenericObservation>(undefined);
    const actionRef = useRef<Actions>(undefined);
    const qvalueRef = useRef<number[]>([]);
    const infoRef = useRef<GameEnvironmentInfo>(undefined);

    const [world, setWorld] = useState<World | undefined>(undefined);
    const [worldGrid, setWorldGrid] = useState<CellType[][]>([]);

    useEffect(() => {
        if (!environment.type || environment.type === 'potsAndBurglar') return;

        const newWorld = new World();
        newWorld.generateWorld({
            numberOfEdges: environment.world?.numberOfEdges ?? 5,
            density: environment.world?.density ?? 0.2,
            roomShape: environment.world?.roomShape ?? 'rectangle',
            roomSizeX: environment.world?.roomSizeX ?? 10,
            roomSizeY: environment.world?.roomSizeY ?? 10,
        });
        console.log('Generated world nodes: ', newWorld.allNodes, 'edges: ', newWorld.allEdges);
        const grid = worldToGrid({
            world: newWorld,
            roomSizeX: environment.world.roomSizeX,
            roomSizeY: environment.world.roomSizeY,
        });
        setWorldGrid(grid);
        setWorld(newWorld);
    }, [environment, store]);

    //TODO: Set settings when game is selected now they are here:

    switch (environment.type) {
        case 'potsAndBurglar': {
            return (
                <div className={style.container}>
                    <div className={style.containerBox}>
                        <div className={style.game}>
                            <PotsAndBurglarGame
                                envRef={envRef}
                                agentRef={agentRef}
                                obsRef={obsRef}
                                actionRef={actionRef}
                                qvalueRef={qvalueRef}
                                infoRef={infoRef}
                                agent={agent}
                            />
                            <Controls />
                        </div>
                    </div>
                    <div className={style.containerBox}>
                        <GameTuner />
                    </div>
                </div>
            );
        }
        default: {
            return (
                <div className={style.container}>
                    <div className={style.containerBox}>
                        <div className={style.game}>
                            {world && (
                                <GenericWorld
                                    envRef={genericEnvRef}
                                    agentRef={agentRef}
                                    obsRef={obsRef}
                                    actionRef={actionRef}
                                    qvalueRef={qvalueRef}
                                    infoRef={infoRef}
                                    agent={agent}
                                    worldGrid={worldGrid}
                                />
                            )}
                            <Controls />
                        </div>
                    </div>
                    <div className={style.containerBox}>
                        <GameTuner />
                    </div>
                </div>
            );
        }
    }
}

export default GameView;
