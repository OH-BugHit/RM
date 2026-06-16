import { QLearningAgent } from '../../components/agents/rlAgentQ';
import AgentVision from './AgentVision/AgentVision';
import { Frame } from '../Frames/Frame';
import FrameContainer from '../Frames/FrameContainer';
import Controls from '../Controls/Controls';
import QTable from './NewQTable/QTable';
import TableControls from './NewQTable/TableControls';
import { useGridRef } from 'react-window';
import { RewardChart } from '../../components/Charts/RewardChart';
import Agent from './Agent/Agent';
import { Cable } from '../Frames/Cable';
import Environment from './Environment/Environment';

interface XaiProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    qvalueRef: React.RefObject<number[]>;
    disabled?: boolean;
}
export default function HUD({ agentRef, qvalueRef, disabled }: XaiProps) {
    const gridRef = useGridRef(null);

    return (
        <>
            <FrameContainer position="top-left">
                <Frame
                    variant="wide"
                    minWidth={600}
                    minHeight={400}
                    backgroundColour="rgba(255, 219, 134, 1)"
                >
                    <RewardChart
                        width={600}
                        height={400}
                    />
                </Frame>
            </FrameContainer>
            <FrameContainer position="top-center">
                <Environment />
            </FrameContainer>
            <FrameContainer position="top-right">
                <Frame
                    variant="square"
                    minWidth={250}
                    minHeight={250}
                    backgroundColour="rgba(255, 219, 134, 0.9)"
                >
                    <AgentVision
                        agentRef={agentRef}
                        qvalueRef={qvalueRef}
                    />
                </Frame>
            </FrameContainer>
            <FrameContainer
                position="bottom-left"
                width="100%"
            >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end', flexGrow: 1 }}>
                    <div>
                        <h3 style={{ margin: 0, paddingTop: '0.1rem' }}>Q-Table</h3>
                        <TableControls gridRef={gridRef} />
                        <Frame
                            variant="square"
                            minWidth={600}
                            minHeight={600}
                            maxHeight={600}
                            maxWidth={600}
                            backgroundColour="rgba(255, 219, 134, 1)"
                        >
                            <QTable
                                agentRef={agentRef}
                                disabled={disabled}
                                gridRef={gridRef}
                            />
                        </Frame>
                    </div>
                    <Cable
                        variant="right"
                        width={100}
                        height={100}
                    />
                    <Cable
                        variant="center"
                        width={100}
                        height={100}
                    />
                    <Cable
                        variant="left"
                        width={100}
                        height={100}
                    />
                    <Agent />
                    <Cable
                        variant="right"
                        width={100}
                        height={100}
                    />
                    <Cable
                        variant="center"
                        width={100}
                        height={100}
                    />
                    <Cable
                        variant="left"
                        width={100}
                        height={100}
                    />
                    <Frame
                        variant="square"
                        minWidth={200}
                        minHeight={200}
                        backgroundColour="rgba(255, 219, 134, 1)"
                    >
                        <Controls />
                    </Frame>
                </div>
            </FrameContainer>
        </>
    );
}
