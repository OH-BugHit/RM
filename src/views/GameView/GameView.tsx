import { useEffect, useRef, useState } from 'react';
import PotsAndBurglarGame from '../Environments/PotsAndBurglar/PotsAndBurglarGame';
import style from './style.module.css';
import { RLGridEnv } from '../Environments/PotsAndBurglar/environment';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { Actions, CellType, GameEnvironmentInfo, GenericObservation } from '../../types';
import { useAtom, useAtomValue } from 'jotai';
import { ActiveAgentAtom, ActiveEnvironmentAtom } from '../../atoms/state';
import GameTuner from './GameTuner';
import GenericWorld from '../Environments/Generic/GenericWorld';
import { World } from '../../components/GameComponents/EnvironmentComponents/worldGenerator';
import { GenericRLEnv } from '../Environments/Generic/environment';
import { worldToGrid } from '../World/WorldToGrid';
import { AnimatePresence } from 'framer-motion';
import { SidePanel } from '@genai-fi/base';
import { SidePanelOpener } from '../../components/Buttons/SidePanelOpener';
import { UiShowSidePanelAtom } from '../../atoms/uiState';
import { Frame } from '../Frames/Frame';
import { Bridge } from '../../components/Charts/ChartBridge';

// React component
function GameView() {
    const environment = useAtomValue(ActiveEnvironmentAtom);
    const agent = useAtomValue(ActiveAgentAtom);

    const envRef = useRef<RLGridEnv>(undefined);
    const genericEnvRef = useRef<GenericRLEnv>(undefined);
    const agentRef = useRef<QLearningAgent>(undefined);
    const obsRef = useRef<GenericObservation>(undefined);
    const actionRef = useRef<Actions>(undefined);
    const qvalueRef = useRef<number[]>([]);
    const infoRef = useRef<GameEnvironmentInfo>(undefined);

    const [world, setWorld] = useState<World | undefined>(undefined);
    const [worldGrid, setWorldGrid] = useState<CellType[][]>([]);
    const [sidePanelOpen, setSidePanelOpen] = useAtom(UiShowSidePanelAtom);

    const config = { image: '/images/background/pcbBlur.jpg' }; //TODO: Change to get background image from somewher

    useEffect(() => {
        if (!environment.type || environment.type === 'potsAndBurglar') return;

        const newWorld = new World();
        newWorld.generateWorld({
            numberOfEdges: environment.world?.numberOfEdges ?? 3,
            density: environment.world?.density ?? 0.7,
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
    }, [environment]);

    //TODO: Set settings when game is selected now they are here:

    const gameContent = () => {
        switch (environment.type) {
            case 'potsAndBurglar': {
                return (
                    <AnimatePresence mode="wait">
                        <div className={style.game}>
                            <PotsAndBurglarGame
                                envRef={envRef}
                                agentRef={agentRef}
                                obsRef={obsRef}
                                actionRef={actionRef}
                                qvalueRef={qvalueRef}
                                infoRef={infoRef}
                            />
                        </div>
                    </AnimatePresence>
                );
            }
            default: {
                return (
                    <AnimatePresence mode="wait">
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
                        </div>
                    </AnimatePresence>
                );
            }
        }
    };

    return (
        <div
            className={style.gameView}
            style={{ ['--background-image']: `url(${config.image})` } as React.CSSProperties}
        >
            <Bridge />
            <div className={style.containerBox}>{gameContent()}</div>

            <div style={{ zIndex: 1000 }}>
                <SidePanelOpener />
                <SidePanel
                    open={sidePanelOpen}
                    onOpen={() => setSidePanelOpen(true)}
                    position={'right'}
                    onClose={() => {
                        setSidePanelOpen(false);
                    }}
                >
                    <Frame
                        variant="tall"
                        minWidth={'100%'}
                        minHeight={'100%'}
                    >
                        <GameTuner />
                    </Frame>
                </SidePanel>
            </div>
        </div>
    );
}

export default GameView;
