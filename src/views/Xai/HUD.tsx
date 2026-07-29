import { QLearningAgent } from '../../components/agents/rlAgentQ';
import AgentVision from './AgentVision/AgentVision';
import FrameContainer from '../Frames/FrameContainer';
import Controls from '../Controls/Controls';
import QTable from './NewQTable/QTable';
import TableControls from './NewQTable/TableControls';
import { Cable } from '../Frames/CableFrame/Cable';
import Environment from './Environment/Environment';
import { useAtomValue } from 'jotai';
import { HideHudAtom, HUDvisAtom, MinimizeAtom } from '../../atoms/uiState';
import { NewFrame } from '../Frames/NewFrame';
import { WorldStore } from '../../components/QTable/utils';
import { CustomGridLayer } from './NewQTable/TileTable/TileTable';
import { StateData } from '../../types';
import Epsilon from './Agent/Epsilon/Epsilon';
import Alpha from './Agent/Alpha/Alpha';
import Gamma from './Agent/Gamma/Gamma';
import Progress from './GameTutorial/Progress';
import { useTranslation } from 'react-i18next';
import { Help } from '@genai-fi/base';
import { RewardChart } from '../../components/Charts/RewardChart';
import StateViewTypeButton from '../../components/Buttons/StateViewTypeButton/StateViewTypeButton';
import { FocusOverlay } from '../../components/QTable/FocusOverlay/FocusOverlay';
import { useRef } from 'react';
import TutorialFrame from './GameTutorial/TutorialFrame/TutorialFrame';
import Hide from '../../components/Buttons/Hide/Hide';

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
    const focusFrameRef = useRef<FocusOverlay | undefined>(undefined);
    const minimize = useAtomValue(MinimizeAtom);

    return (
        <div style={{ zIndex: 0 }}>
            <TutorialFrame visible={!hudVis.charts} />
            <FrameContainer position="left">
                {!hudVis.agentVision && (
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
                <Environment />
                <Cable
                    variant="center"
                    width={100}
                    height={80}
                    visible={hudVis.cableLeft && !hideHud}
                />
            </FrameContainer>
            <FrameContainer position="top-left">
                <NewFrame
                    visible={hudVis.qTable && !hideHud}
                    overlayRight={
                        <TableControls
                            world={lWorld}
                            mapRef={mapRef}
                            layerRef={layerRef}
                            currentStateRef={currentStateRef}
                            focusFrameRef={focusFrameRef}
                        />
                    }
                    minimize={minimize.qTable}
                    overlayRightTop={
                        <>
                            <Hide
                                component={'qTable'}
                                state={minimize.qTable}
                            />
                            <span>
                                <Help
                                    inplace
                                    keepOpen
                                    message={t('help.hud.qTable')}
                                />
                            </span>
                        </>
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
            <FrameContainer position="top-right">
                <NewFrame
                    visible={hudVis.agentVision && !hideHud}
                    overlayLeft={<StateViewTypeButton screen={'observation'} />}
                    minimize={minimize.agentVision}
                    overlayRightTop={
                        <>
                            <Hide
                                component={'agentVision'}
                                state={minimize.agentVision}
                            />
                            <span>
                                <Help
                                    inplace
                                    keepOpen
                                    message={t('help.hud.agentVis')}
                                />
                            </span>
                        </>
                    }
                >
                    <AgentVision agentRef={agentRef} />
                </NewFrame>
            </FrameContainer>
            <FrameContainer
                position="bottom-left"
                width="100%"
            >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'end', flexGrow: 1 }}>
                    {!hudVis.agentVision && (
                        <Cable
                            variant="center"
                            width={100}
                            height={80}
                            visible={false}
                        />
                    )}
                    <NewFrame
                        minimize={minimize.charts}
                        overlayRightTop={
                            <>
                                <Hide
                                    component={'charts'}
                                    state={minimize.charts}
                                />
                                <span>
                                    <Help
                                        inplace
                                        keepOpen
                                        message={t('help.hud.chart')}
                                    />
                                </span>
                            </>
                        }
                        visible={hudVis.charts && !hideHud}
                    >
                        <RewardChart
                            width={600}
                            height={400}
                        />
                    </NewFrame>
                    {hudVis.cableRight && !hideHud && (
                        <Cable
                            variant="center"
                            width={100}
                            height={80}
                            visible={hudVis.cableRight}
                        />
                    )}
                    <NewFrame
                        visible={hudVis.agentVision && !hideHud}
                        minimize={minimize.alpha}
                        overlayRightTop={
                            <>
                                <Hide
                                    component={'alpha'}
                                    state={minimize.alpha}
                                />
                                <span>
                                    <Help
                                        inplace
                                        keepOpen
                                        message={t('help.hud.alpha')}
                                    />
                                </span>
                            </>
                        }
                    >
                        <Alpha />
                    </NewFrame>
                    <NewFrame
                        visible={hudVis.agentVision && !hideHud}
                        minimize={minimize.gamma}
                        overlayRightTop={
                            <>
                                <Hide
                                    component={'gamma'}
                                    state={minimize.gamma}
                                />
                                <span>
                                    <Help
                                        inplace
                                        keepOpen
                                        message={t('help.hud.gamma')}
                                    />
                                </span>
                            </>
                        }
                    >
                        <Gamma />
                    </NewFrame>
                    <NewFrame
                        visible={hudVis.agentVision && !hideHud}
                        minimize={minimize.epsilon}
                        overlayRightTop={
                            <>
                                <Hide
                                    component={'epsilon'}
                                    state={minimize.epsilon}
                                />
                                <span>
                                    <Help
                                        inplace
                                        keepOpen
                                        message={t('help.hud.epsilon')}
                                    />
                                </span>
                            </>
                        }
                    >
                        <Epsilon />
                    </NewFrame>
                    <Cable
                        variant="center"
                        width={100}
                        height={80}
                        visible={hudVis.cableRight && !hideHud}
                    />
                    <NewFrame visible={hudVis.controls && !hideHud}>
                        <Controls />
                    </NewFrame>
                </div>
            </FrameContainer>
        </div>
    );
}
