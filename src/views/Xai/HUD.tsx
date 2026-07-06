import { QLearningAgent } from '../../components/agents/rlAgentQ';
import AgentVision from './AgentVision/AgentVision';
import FrameContainer from '../Frames/FrameContainer';
import Controls from '../Controls/Controls';
import QTable from './NewQTable/QTable';
import TableControls from './NewQTable/TableControls';
import { RewardChart } from '../../components/Charts/RewardChart';
import Agent from './Agent/Agent';
import { Cable } from '../Frames/CableFrame/Cable';
import Environment from './Environment/Environment';
import { useAtomValue } from 'jotai';
import { HUDvisAtom } from '../../atoms/uiState';
import { NewFrame } from '../Frames/NewFrame';
import { WorldStore } from '../../components/QTable/utils';
import { CustomGridLayer } from './NewQTable/TileTable/TileTable';
import { StateData } from '../../types';

interface XaiProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    lWorld: WorldStore;
    mapRef: React.RefObject<L.Map | null>;
    currentStateRef: React.RefObject<StateData>;
    layerRef: React.RefObject<CustomGridLayer | null>;
}
export default function HUD({ lWorld, agentRef, mapRef, currentStateRef, layerRef }: XaiProps) {
    //const gridRef = useGridRef(null);
    const hudVis = useAtomValue(HUDvisAtom);

    return (
        <div style={{ zIndex: 0 }}>
            <FrameContainer position="top-left">
                <NewFrame visible={hudVis.charts}>
                    <RewardChart
                        width={600}
                        height={400}
                    />
                </NewFrame>
            </FrameContainer>

            <FrameContainer position="top-center">
                <Cable
                    variant="center"
                    width={100}
                    height={80}
                    visible={hudVis.cableLeft}
                />
                <Environment />
                <Cable
                    variant="center"
                    width={100}
                    height={80}
                    visible={hudVis.cableLeft}
                />
            </FrameContainer>
            <FrameContainer position="top-right">
                <NewFrame visible={hudVis.agentVision}>
                    <AgentVision agentRef={agentRef} />
                </NewFrame>
            </FrameContainer>
            <FrameContainer
                position="bottom-left"
                width="100%"
            >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end', flexGrow: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <NewFrame
                            visible={hudVis.qTable}
                            overlayRight={
                                <TableControls
                                    world={lWorld}
                                    mapRef={mapRef}
                                    layerRef={layerRef}
                                    currentStateRef={currentStateRef}
                                />
                            }
                        >
                            <QTable
                                agentRef={agentRef}
                                disabled={false} // No disable currently
                                lWorld={lWorld}
                                mapRef={mapRef}
                                layerRef={layerRef}
                            />
                        </NewFrame>
                    </div>
                    <Cable
                        variant="center"
                        width={100}
                        height={80}
                        visible={hudVis.cableLeft}
                    />
                    <Agent />
                    <Cable
                        variant="center"
                        width={100}
                        height={80}
                        visible={hudVis.cableRight}
                    />
                    <NewFrame visible={hudVis.controls}>
                        <Controls />
                    </NewFrame>
                </div>
            </FrameContainer>
        </div>
    );
}
