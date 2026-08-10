import { QLearningAgent } from '../../components/agents/rlAgentQ';
import FrameContainer from '../Frames/FrameContainer';
import Controls from '../Controls/Controls';
import QTable from './NewQTable/QTable';
import TableControls from './NewQTable/TableControls';
import { Cable } from '../Frames/CableFrame/Cable';
import { useAtomValue } from 'jotai';
import { HideHudAtom, HUDvisAtom, InspectCAtom } from '../../atoms/uiState';
import { NewFrame } from '../Frames/NewFrame';
import { WorldStore } from '../../components/QTable/utils';
import { CustomGridLayer } from './NewQTable/TileTable/TileTable';
import { StateData } from '../../types';
import Progress from './GameTutorial/Progress';
import { useTranslation } from 'react-i18next';
import { FocusOverlay } from '../../components/QTable/FocusOverlay/FocusOverlay';
import { useRef } from 'react';
import TutorialFrame from './GameTutorial/TutorialFrame/TutorialFrame';
import TopBar from './TopBar/Topbar';
import ClusterContainer from '../Frames/ClusterContainer';
import Agent from './Agent/Agent';
import Reward from './Reward/Reward';
import InspectIcon from '../../components/Buttons/ButtonIcons/Inspect/Inspect';
import BuildIcon from '../../components/Buttons/ButtonIcons/Build/BuildIcon';

interface XaiProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    lWorld: WorldStore;
    mapRef: React.RefObject<L.Map | null>;
    currentStateRef: React.RefObject<StateData>;
    layerRef: React.RefObject<CustomGridLayer | null>;
}
export default function HUD({ lWorld, agentRef, mapRef, currentStateRef, layerRef }: XaiProps) {
    const { t } = useTranslation();
    const hideHud = useAtomValue(HideHudAtom);
    const hudVis = useAtomValue(HUDvisAtom);
    const inspectC = useAtomValue(InspectCAtom);
    const focusFrameRef = useRef<FocusOverlay | undefined>(undefined);

    return (
        <div style={{ zIndex: 0 }}>
            <TutorialFrame
                textVis={hudVis.text}
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
                <Agent />
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
                <Reward title={t('reward.title')} />
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
                <InspectIcon
                    size={220}
                    title="INSPECT"
                />
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
                <BuildIcon
                    size={220}
                    title="BUILD"
                />
            </ClusterContainer>

            <FrameContainer position="left">
                {hudVis.progress && (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                        <Cable variant="vertical" />
                        <NewFrame variant="tutorial">
                            <Progress />
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
            <FrameContainer position="top-left">
                <NewFrame
                    visible={inspectC.qMap && !hideHud}
                    variant="blob"
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
            </FrameContainer>
            <FrameContainer position="bottom-center">
                <NewFrame visible={hudVis.controls && !hideHud}>
                    <Controls />
                </NewFrame>
            </FrameContainer>
        </div>
    );
}
