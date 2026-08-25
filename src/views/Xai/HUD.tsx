import { QLearningAgent } from '../../components/agents/rlAgentQ';
import FrameContainer from '../Frames/FrameContainer';
import Controls from '../Controls/Controls';
import QTable from './NewQTable/QTable';
import TableControls from './NewQTable/TableControls';
import { Cable } from '../Frames/CableFrame/Cable';
import { useAtomValue } from 'jotai';
import { HideHudAtom, HUDvisAtom, InspectCAtom, TaskAtom } from '../../atoms/uiState';
import { NewFrame } from '../Frames/NewFrame';
import { WorldStore } from '../../components/QTable/utils';
import { CustomGridLayer } from './NewQTable/TileTable/TileTable';
import { StateData } from '../../types';
import Progress from './GameTutorial/Progress';
import { FocusOverlay } from '../../components/QTable/FocusOverlay/FocusOverlay';
import { useRef } from 'react';
import TutorialFrame from './GameTutorial/TutorialFrame/TutorialFrame';
import TopBar from './TopBar/Topbar';
import ClusterContainer from '../Frames/ClusterContainer';
import AgentClusterParent from '../Frames/ClusterParents/Agent';
import BuildClusteParent from '../Frames/ClusterParents/Build';
import RewardClusteParent from '../Frames/ClusterParents/Reward';
import InspectClusteParent from '../Frames/ClusterParents/Inspect';
import { FireworksEffect } from '../../components/Fireworks/FireworksEffect';
import WinScreen from '../StudentView/WinScreen/WinScreen';
import TestProgress from '../../components/AgentTest/TestProgress';

interface XaiProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    lWorld: WorldStore;
    mapRef: React.RefObject<L.Map | null>;
    currentStateRef: React.RefObject<StateData>;
    layerRef: React.RefObject<CustomGridLayer | null>;
}
export default function HUD({ lWorld, agentRef, mapRef, currentStateRef, layerRef }: XaiProps) {
    const hideHud = useAtomValue(HideHudAtom);
    const hudVis = useAtomValue(HUDvisAtom);
    const inspectC = useAtomValue(InspectCAtom);

    const tasks = useAtomValue(TaskAtom);
    const focusFrameRef = useRef<FocusOverlay | undefined>(undefined);

    return (
        <div style={{ zIndex: 0 }}>
            <FireworksEffect />
            <WinScreen />
            <TutorialFrame
                visible={hudVis.text}
                world={lWorld}
                mapRef={mapRef}
                layerRef={layerRef}
                focusFrameRef={focusFrameRef}
                agentRef={agentRef}
            />
            <ClusterContainer
                vis={hudVis.agentCluster}
                position={{ top: '1%', left: '0.8%' }}
                type="agent"
                inspectButtonProps={{
                    agentRef,
                    lWorld,
                    mapRef,
                    layerRef,
                    focusFrameRef,
                }}
            >
                <AgentClusterParent />
            </ClusterContainer>
            <ClusterContainer
                vis={hudVis.rewardCluster}
                position={{ top: '1%', right: '0.8%' }}
                type="reward"
                inspectButtonProps={{
                    agentRef,
                    lWorld,
                    mapRef,
                    layerRef,
                    focusFrameRef,
                }}
            >
                <RewardClusteParent />
            </ClusterContainer>
            <ClusterContainer
                vis={hudVis.inspectCluster}
                position={{ bottom: '0%', left: '0.8%' }}
                type="inspect"
                inspectButtonProps={{
                    agentRef,
                    lWorld,
                    mapRef,
                    layerRef,
                    focusFrameRef,
                }}
            >
                <InspectClusteParent />
            </ClusterContainer>
            <ClusterContainer
                vis={hudVis.buildCluster}
                position={{ bottom: '0%', right: '0.8%' }}
                type="build"
                inspectButtonProps={{
                    agentRef,
                    lWorld,
                    mapRef,
                    layerRef,
                    focusFrameRef,
                }}
            >
                <BuildClusteParent />
            </ClusterContainer>

            <FrameContainer position="left">
                {hudVis.progress && tasks.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <Cable variant="vertical" />
                        <NewFrame
                            variant="tutorial"
                            contentUnder={<TestProgress target={3} />}
                        >
                            <Progress tasks={tasks} />
                        </NewFrame>

                        <Cable variant="vertical" />
                    </div>
                )}
            </FrameContainer>

            <FrameContainer position="top-center">
                <Cable
                    variant="center"
                    width={100}
                    height={80}
                    visible={hudVis.cableLeft && !hideHud}
                />
                <TopBar hideStuff={hideHud} />
                <Cable
                    variant="center"
                    width={100}
                    height={80}
                    visible={hudVis.cableLeft && !hideHud}
                />
            </FrameContainer>
            <div style={{ position: 'absolute', top: '0px', left: '0px', zIndex: 1000 }}>
                <NewFrame
                    visible={inspectC.qMap && !hideHud}
                    variant="blob"
                    position={{ top: '0px', left: '0px' }}
                    overlayRight={
                        <TableControls
                            lWorld={lWorld}
                            mapRef={mapRef}
                            layerRef={layerRef}
                            currentStateRef={currentStateRef}
                            focusFrameRef={focusFrameRef}
                        />
                    }
                >
                    <QTable
                        agentRef={agentRef}
                        lWorld={lWorld}
                        mapRef={mapRef}
                        layerRef={layerRef}
                        focusFrameRef={focusFrameRef}
                    />
                </NewFrame>
            </div>
            <FrameContainer position="bottom-center">
                <NewFrame visible={hudVis.controlBar && !hideHud}>
                    <Controls />
                </NewFrame>
            </FrameContainer>
        </div>
    );
}
