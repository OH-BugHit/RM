import { InspectButtons, Target } from '../../types';
import AgentVision from '../../views/Xai/AgentVision/AgentVision';
import { RewardChart } from '../Charts/RewardChart';
import StatsIcon from './ButtonIcons/Inspect/StatsIcon';
import { WorldStore } from '../../components/QTable/utils';
import { FocusOverlay } from '../../components/QTable/FocusOverlay/FocusOverlay';
import { QLearningAgent } from '../../components/agents/rlAgentQ';
import { CustomGridLayer } from '../../views/Xai/NewQTable/TileTable/TileTable';
import { NewFrame } from '../../views/Frames/NewFrame';
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
    content?: React.ReactElement;
    size: { h: number; w: number };
    target: Target;
};

export default function getInspectButtons(props: InspectButtonProps, scale: number = 1): ButtonShape[] {
    return [
        {
            id: 'qMap',
            angle: 0,
            icon: <MapIcon size={140 * scale} />,
            content: <></>,
            size: {
                h: 460,
                w: 490,
            },
            target: { type: 'viewport', position: 'topLeft' },
        },
        {
            id: 'agentVision',
            angle: 50,
            icon: <InspectObsIcon size={140 * scale} />,
            content: (
                <NewFrame variant="blob">
                    <AgentVision {...props} />
                </NewFrame>
            ),
            size: {
                h: 360 * scale,
                w: 360 * scale,
            },
            target: {
                type: 'cluster',
                x: 190 * scale,
                y: -356 * scale,
            },
        },
        {
            id: 'charts',
            angle: 100,
            icon: <StatsIcon size={140 * scale} />,
            content: (
                <RewardChart
                    width={580 * scale}
                    height={360 * scale}
                />
            ),
            size: {
                h: 540 * scale,
                w: 550 * scale,
            },
            target: {
                type: 'cluster',
                x: 210 * scale,
                y: -490 * scale,
            },
        },
    ];
}
