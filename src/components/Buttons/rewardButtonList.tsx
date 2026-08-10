import { RewardButtons } from '../../types';
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
    target: { x: number; y: number };
};

export function getRewardButtons(): ButtonShape[] {
    return [
        {
            id: 'step',
            angle: -180,
            icon: <StepRewardIcon size={140} />,
            content: <TimeStepReward />,
            size: { h: 200, w: 500 },
            target: { x: -440, y: 135 },
        },
        {
            id: 'time',
            angle: -130,
            icon: <TimeRewardIcon size={140} />,
            content: <TimeUpReward />,
            size: { h: 200, w: 500 },
            target: { x: -370, y: 250 },
        },
        {
            id: 'props',
            angle: -80,
            icon: <PropRewardsIcon size={140} />,
            content: <RewardsSelector />,
            size: { h: 730, w: 570 },
            target: { x: -240, y: 590 },
        },
    ];
}

export const rewardButtons = getRewardButtons();
