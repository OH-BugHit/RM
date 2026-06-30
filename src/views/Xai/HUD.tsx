import { QLearningAgent } from '../../components/agents/rlAgentQ';
import AgentVision from './AgentVision/AgentVision';
import FrameContainer from '../Frames/FrameContainer';
import Controls from '../Controls/Controls';
import QTable from './NewQTable/QTable';
import TableControls from './NewQTable/TableControls';
import { useGridRef } from 'react-window';
import { RewardChart } from '../../components/Charts/RewardChart';
import Agent from './Agent/Agent';
import { Cable } from '../Frames/CableFrame/Cable';
import Environment from './Environment/Environment';
import { useAtomValue } from 'jotai';
import { HUDvisAtom } from '../../atoms/uiState';
import { NewFrame } from '../Frames/NewFrame';

interface XaiProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    qvalueRef: React.RefObject<number[]>;
    disabled?: boolean;
}
export default function HUD({ agentRef, qvalueRef, disabled }: XaiProps) {
    const gridRef = useGridRef(null);
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
                <Environment />
            </FrameContainer>
            <FrameContainer position="top-right">
                <NewFrame visible={hudVis.agentVision}>
                    <AgentVision
                        agentRef={agentRef}
                        qvalueRef={qvalueRef}
                    />
                </NewFrame>
            </FrameContainer>
            <FrameContainer
                position="bottom-left"
                width="100%"
            >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end', flexGrow: 1 }}>
                    <NewFrame visible={hudVis.qTable}>
                        <TableControls gridRef={gridRef} />
                        <QTable
                            agentRef={agentRef}
                            disabled={disabled}
                            gridRef={gridRef}
                        />
                    </NewFrame>
                    <Cable
                        variant="center"
                        width={100}
                        height={100}
                        visible={hudVis.cableLeft}
                    />
                    <Agent />
                    <Cable
                        variant="center"
                        width={100}
                        height={100}
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
