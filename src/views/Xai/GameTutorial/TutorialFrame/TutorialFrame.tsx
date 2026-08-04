import { useAtomValue } from 'jotai';
import { NewFrame } from '../../../Frames/NewFrame';
import TutorialText from '../TutorialText';
import { InspectAtom, StoryStepAtom } from '../../../../atoms/uiState';
import InspectText from '../InspectText';
import { WorldStore } from '../../../../components/QTable/utils';
import { FocusOverlay } from '../../../../components/QTable/FocusOverlay/FocusOverlay';
import { QLearningAgent } from '../../../../components/agents/rlAgentQ';

type TutorialLayout = {
    position: Pick<React.CSSProperties, 'top' | 'right' | 'bottom' | 'left'>;
    centerX?: number;
    centerY?: number;
};

const layouts: Record<number, TutorialLayout> = {
    0: {
        position: { top: '50%', left: '50%' },
        centerX: -50,
        centerY: -50,
    },
    1: {
        position: { top: '50%', left: '50%' },
        centerX: -50,
        centerY: -50,
    },
    2: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    3: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    4: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    5: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    6: {
        position: { top: '100%', left: '100%' },
        centerX: -120,
        centerY: -100,
    },
    7: {
        position: { top: '100%', left: '100%' },
        centerX: -120,
        centerY: -100,
    },
    8: {
        position: { top: '100%', left: '100%' },
        centerX: -120,
        centerY: -100,
    },
    9: {
        position: { top: '100%', left: '100%' },
        centerX: -120,
        centerY: -100,
    },
    10: {
        position: { top: '100%', left: '0%' },
        centerX: 0,
        centerY: -100,
    },
    11: {
        position: { top: '100%', left: '0%' },
        centerX: 0,
        centerY: -100,
    },
    12: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    13: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    14: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    15: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    16: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    17: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    18: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    19: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    20: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    21: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    22: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    23: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    24: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    25: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    26: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    27: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    28: {
        position: { top: '100%', left: '50%' },
        centerX: -50,
        centerY: -100,
    },
    29: {
        position: { top: '50%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    30: {
        position: { top: '50%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    31: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    32: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    33: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    34: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    35: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    36: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    37: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
    38: {
        position: { top: '0%', left: '50%' },
        centerX: -50,
        centerY: 0,
    },
};

interface TutorialFrameProps {
    textVis?: boolean;
    mapRef: React.RefObject<L.Map | null>;
    world: WorldStore;
    layerRef: React.RefObject<L.GridLayer | null>;
    focusFrameRef: React.RefObject<FocusOverlay | undefined>;
    agentRef: React.RefObject<QLearningAgent | undefined>;
}

export default function TutorialFrame({
    textVis = true,
    mapRef,
    world,
    layerRef,
    focusFrameRef,
    agentRef,
}: TutorialFrameProps) {
    const step = useAtomValue(StoryStepAtom);
    const inspect = useAtomValue(InspectAtom);
    const layout = layouts[step] ?? layouts[0];

    return (
        <NewFrame
            variant="tutorial"
            visible={textVis || inspect.vis}
            position={layout.position}
            centerX={layout.centerX}
            centerY={layout.centerY}
        >
            {textVis && !inspect.vis && <TutorialText />}
            {inspect.vis && (
                <InspectText
                    mapRef={mapRef}
                    world={world}
                    layerRef={layerRef}
                    focusFrameRef={focusFrameRef}
                    agentRef={agentRef}
                />
            )}
        </NewFrame>
    );
}
