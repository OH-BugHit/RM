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
    const w = windowSize?.width ?? (typeof window !== 'undefined' ? window.innerWidth : 920);
    const h = windowSize?.height ?? (typeof window !== 'undefined' ? window.innerHeight : 768);

    return [
        {
            id: 'qMap',
            angle: 0,
            icon: <MapIcon size={140} />,
            content: <></>,
            size: { h: h * 0.32 + 150, w: w * 0.05 + 534 },
            target: { x: 205, y: -h + h * 0.18 + 8 + 150 },
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
            target: { x: 190, y: -356 },
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
