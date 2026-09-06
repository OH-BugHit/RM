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
    content?: React.ReactNode;
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
                h: 200 * scale,
                w: 500 * scaleWidth,
            },
            target: {
                type: 'cluster',
                x: -440 * scaleWidth,
                y: 135 * scale,
            },
        },
        {
            id: 'time',
            angle: -130,
            icon: <TimeRewardIcon size={140 * scale} />,
            content: <TimeUpReward />,
            size: {
                h: 200 * scale,
                w: 500 * scaleWidth,
            },
            target: {
                type: 'cluster',
                x: -370 * scaleWidth,
                y: 250 * scale,
            },
        },
        {
            id: 'props',
            angle: -80,
            icon: <PropRewardsIcon size={140 * scale} />,
            content: <RewardsSelector />,
            size: {
                h: 670 * scale,
                w: 550 * scaleWidth,
            },
            target: {
                type: 'cluster',
                x: -240 * scaleWidth,
                y: 520 * scale,
            },
        },
    ];
}
