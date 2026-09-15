import { RewardButtons, Target } from '../../types';
import RewardsSelector from '../../views/Story/Selectors/RewardsSelector/RewardsSelector';
import TimeStepReward from '../../views/Story/Selectors/RewardsSelector/TimeStepReward';
import TimeUpReward from '../../views/Story/Selectors/RewardsSelector/TimeUpReward';
import PropRewardsIcon from './ButtonIcons/Rewards/PropRewardsIcon';
import StepRewardIcon from './ButtonIcons/Rewards/StepRewardIcon';
import TimeRewardIcon from './ButtonIcons/Rewards/TimeUp';

type ButtonShape = {
    id: RewardButtons;
    angle: number;
    icon: React.ReactNode;
    content?: React.ReactElement;
    size: { h: number; w: number };
    target: Target;
};

export function getRewardButtons(scale: number, scaleWidth: number): ButtonShape[] {
    return [
        {
            id: 'step',
            angle: -180,
            icon: <StepRewardIcon size={140 * scale} />,
            content: <TimeStepReward />,
            size: {
                h: 180 * scale,
                w: Math.max(250, Math.min(500, 500 * scaleWidth)),
            },
            target: {
                type: 'cluster',
                x: Math.max(-390, Math.min(-150, -500 * scaleWidth)),
                y: 90 * scale,
            },
        },
        {
            id: 'time',
            angle: -130,
            icon: <TimeRewardIcon size={140 * scale} />,
            content: <TimeUpReward />,
            size: {
                h: 180 * scale,
                w: Math.max(250, Math.min(500, 500 * scaleWidth)),
            },
            target: {
                type: 'cluster',
                x: Math.max(-310, Math.min(-120, -350 * scaleWidth)),
                y: 220 * scale,
            },
        },
        {
            id: 'props',
            angle: -80,
            icon: <PropRewardsIcon size={140 * scale} />,
            content: <RewardsSelector />,
            size: {
                h: scale < 0.8 ? 1080 * scale * 0.8 * 0.65 : 1080 * scale * 0.67,
                w: Math.max(200, 400 * scaleWidth),
            },
            target: {
                type: 'cluster',
                x: -180 * scaleWidth,
                y: scale < 0.8 ? 1080 * scale * 0.9 * 0.5 : 1080 * scale * 0.54,
            },
        },
    ];
}
