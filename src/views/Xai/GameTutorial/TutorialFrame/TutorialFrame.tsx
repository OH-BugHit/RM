import { useAtomValue } from 'jotai';
import { MovableFrame } from '../../../Frames/MovableFrame';
import { InspectAtom, TextStepAtom } from '../../../../atoms/uiState';
import InspectText from '../InspectText';
import { WorldStore } from '../../../../components/QTable/utils';
import { FocusOverlay } from '../../../../components/QTable/FocusOverlay/FocusOverlay';
import { QLearningAgent } from '../../../../components/agents/rlAgentQ';
import { LevelConfAtom } from '../../../../atoms/gameState';
import LevelTextBox from '../LevelTextBox';
import { useGameScale } from '../../../../context/GameScale/useGameScale';
import { TutorialLayout } from '../../../../types';

interface TutorialFrameProps {
    visible?: boolean;
    mapRef: React.RefObject<L.Map | null>;
    world: WorldStore;
    layerRef: React.RefObject<L.GridLayer | null>;
    focusFrameRef: React.RefObject<FocusOverlay | undefined>;
    agentRef: React.RefObject<QLearningAgent | undefined>;
}

const defaultSmall: TutorialLayout = {
    position: { top: '30%', left: '50%' },
    centerX: -50,
    centerY: 0,
    variant: 'narrow',
};

export default function TutorialFrame({
    visible = true,
    mapRef,
    world,
    layerRef,
    focusFrameRef,
    agentRef,
}: TutorialFrameProps) {
    const { scale } = useGameScale();
    const step = useAtomValue(TextStepAtom);
    const inspect = useAtomValue(InspectAtom);
    const level = useAtomValue(LevelConfAtom);
    const mode = level?.levelText?.modes?.[step] ?? 'hidden';
    const layouts = level?.levelText?.layouts;

    const isSmallScreen = scale < 1;

    const layout = isSmallScreen
        ? defaultSmall
        : (layouts?.[step] ??
          (layouts ? layouts[Math.max(...Object.keys(layouts).map(Number))] : undefined) ?? {
              position: { top: '50%', left: '50%' },
              centerX: -50,
              centerY: -50,
              variant: 'wide',
          });

    return (
        <MovableFrame
            variant="tutorial"
            visible={visible && (mode !== 'hidden' || inspect.vis)}
            position={layout.position}
            centerX={layout.centerX}
            centerY={layout.centerY}
        >
            {mode !== 'hidden' && !inspect.vis && <LevelTextBox variant={isSmallScreen ? 'narrow' : layout.variant} />}
            {inspect.vis && (
                <InspectText
                    mapRef={mapRef}
                    world={world}
                    layerRef={layerRef}
                    focusFrameRef={focusFrameRef}
                    agentRef={agentRef}
                />
            )}
        </MovableFrame>
    );
}
