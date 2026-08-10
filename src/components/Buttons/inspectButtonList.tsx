import { InspectButtons } from '../../types';
import AgentVision from '../../views/Xai/AgentVision/AgentVision';
import { RewardChart } from '../Charts/RewardChart';
import StatsIcon from './ButtonIcons/Inspect/StatsIcon';
import { WorldStore } from '../../components/QTable/utils';
import { FocusOverlay } from '../../components/QTable/FocusOverlay/FocusOverlay';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { CustomGridLayer } from '../../views/Xai/NewQTable/TileTable/TileTable';
import { NewFrame } from '../../views/Frames/NewFrame';
import StateViewTypeButton from './StateViewTypeButton/StateViewTypeButton';
import InspectObsIcon from './ButtonIcons/Inspect/InspectObsIcon';
import MapIcon from './ButtonIcons/Inspect/MapIcon';

export type InspectButtonProps = {
    agentRef: React.RefObject<QLearningAgent | undefined>;
    lWorld: WorldStore;
    mapRef: React.RefObject<L.Map | null>;
    layerRef: React.RefObject<CustomGridLayer | null>;
    focusFrameRef: React.RefObject<FocusOverlay | undefined>;
};

type ButtonShape = {
    id: InspectButtons;
    angle: number;
    icon: React.ReactNode;
    content?: React.ReactNode;
    size: { h: number; w: number };
    target: { x: number; y: number };
};

export default function getInspectButtons(
    props: InspectButtonProps,
    windowSize?: { width: number; height: number }
): ButtonShape[] {
    const h = windowSize?.height ?? (typeof window !== 'undefined' ? window.innerHeight : 768);

    return [
        {
            id: 'qMap',
            angle: 0,
            icon: <MapIcon size={140} />,
            content: <></>,
            size: { h: 570, w: 650 },
            target: { x: 210, y: -h + h * 0.08 + 8 + 285 },
        },
        {
            id: 'agentVision',
            angle: 50,
            icon: <InspectObsIcon size={140} />,
            content: (
                <NewFrame
                    centerX={-4}
                    variant="blob"
                    overlayLeft={<StateViewTypeButton screen={'observation'} />}
                >
                    <AgentVision {...props} />
                </NewFrame>
            ),
            size: { h: 360, w: 320 },
            target: { x: 450, y: -h + h * 0.24 },
        },
        {
            id: 'charts',
            angle: 100,
            icon: <StatsIcon size={140} />,
            content: (
                <RewardChart
                    width={580}
                    height={360}
                />
            ),
            size: { h: 540, w: 550 },
            target: { x: 210, y: -490 },
        },
    ];
}
