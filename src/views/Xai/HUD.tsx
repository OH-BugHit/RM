import { QLearningAgent } from '../../components/agents/rlAgentQ';
import AgentVision from './AgentVision/AgentVision';
import FrameContainer from '../Frames/FrameContainer';
import Controls from '../Controls/Controls';
import QTable from './NewQTable/QTable';
import TableControls from './NewQTable/TableControls';
import Agent from './Agent/Agent';
import { Cable } from '../Frames/CableFrame/Cable';
import Environment from './Environment/Environment';
import { useAtomValue } from 'jotai';
import { HUDvisAtom } from '../../atoms/uiState';
import { NewFrame } from '../Frames/NewFrame';
import { WorldStore } from '../../components/QTable/utils';
import { CustomGridLayer } from './NewQTable/TileTable/TileTable';
import { StateData } from '../../types';
import Epsilon from './Agent/Epsilon/Epsilon';
import Alpha from './Agent/Alpha/Alpha';
import Gamma from './Agent/Gamma/Gamma';
import Progress from './Stats/Progress';
import { useTranslation } from 'react-i18next';
import { Help } from '@genai-fi/base';

interface XaiProps {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    lWorld: WorldStore;
    mapRef: React.RefObject<L.Map | null>;
    currentStateRef: React.RefObject<StateData>;
    layerRef: React.RefObject<CustomGridLayer | null>;
}
export default function HUD({ lWorld, agentRef, mapRef, currentStateRef, layerRef }: XaiProps) {
    const { t } = useTranslation();
    const hudVis = useAtomValue(HUDvisAtom);

    return (
        <div style={{ zIndex: 0 }}>
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
            <FrameContainer position="top-left">
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
                    overlayRightTop={
                        <span>
                            <Help
                                inplace
                                message={t('help.hud.qTable')}
                            />
                        </span>
                    }
                >
                    <QTable
                        agentRef={agentRef}
                        lWorld={lWorld}
                        mapRef={mapRef}
                        layerRef={layerRef}
                    />
                </NewFrame>
            </FrameContainer>
            <FrameContainer position="top-right">
                <NewFrame
                    visible={hudVis.agentVision}
                    overlayRightTop={
                        <span>
                            <Help
                                inplace
                                message={t('help.hud.agentVis')}
                            />
                        </span>
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
                    {!hudVis.agentVision && (
                        <NewFrame>
                            <Progress />
                        </NewFrame>
                    )}
                    <Agent />
                    {hudVis.cableRight && (
                        <Cable
                            variant="center"
                            width={100}
                            height={80}
                            visible={hudVis.cableRight}
                        />
                    )}
                    <NewFrame
                        visible={hudVis.agentVision}
                        overlayRightTop={
                            <span>
                                <Help
                                    inplace
                                    message={t('help.hud.alpha')}
                                />
                            </span>
                        }
                    >
                        <Alpha />
                    </NewFrame>
                    <NewFrame
                        visible={hudVis.agentVision}
                        overlayRightTop={
                            <span>
                                <Help
                                    inplace
                                    message={t('help.hud.gamma')}
                                />
                            </span>
                        }
                    >
                        <Gamma />
                    </NewFrame>
                    <NewFrame
                        visible={hudVis.agentVision}
                        overlayRightTop={
                            <span>
                                <Help
                                    inplace
                                    message={t('help.hud.epsilon')}
                                />
                            </span>
                        }
                    >
                        <Epsilon />
                    </NewFrame>
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
