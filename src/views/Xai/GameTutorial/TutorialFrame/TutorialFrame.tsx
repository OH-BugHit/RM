import { useAtomValue } from 'jotai';
import { NewFrame } from '../../../Frames/NewFrame';
import TutorialText from '../TutorialText';
import { StoryStepAtom } from '../../../../atoms/uiState';

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
};

interface TutorialFrameProps {
    visible?: boolean;
}

export default function TutorialFrame({ visible = true }: TutorialFrameProps) {
    const step = useAtomValue(StoryStepAtom);
    const layout = layouts[step] ?? layouts[0];

    return (
        <NewFrame
            variant="tutorial"
            visible={visible}
            position={layout.position}
            centerX={layout.centerX}
            centerY={layout.centerY}
        >
            <TutorialText />
        </NewFrame>
    );
}
