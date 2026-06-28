import { ObservationShape, Position } from '../../types';

interface SightProps {
    agentPos: Position;
    x: number;
    y: number;
    obsShape: ObservationShape;
}
export const getOnSight = ({ agentPos, x, y, obsShape }: SightProps): boolean => {
    switch (obsShape) {
        case 'large': {
            const dx = Math.abs(agentPos.x - x);
            const dy = Math.abs(agentPos.y - y);
            return dx + dy <= 3 && dx < 3 && dy < 3;
        }
        case 'small': {
            return Math.abs(agentPos.x - x) + Math.abs(agentPos.y - y) === 1; // Returns true if Manhattan distance === 1
        }
        default:
            return false;
    }
};

export const getOnSightOrOnSpot = ({ agentPos, x, y, obsShape: obsShape }: SightProps): boolean => {
    switch (obsShape) {
        case 'large': {
            const dx = Math.abs(agentPos.x - x);
            const dy = Math.abs(agentPos.y - y);
            return dx + dy <= 3 && dx < 3 && dy < 3;
        }
        case 'small': {
            return Math.abs(agentPos.x - x) + Math.abs(agentPos.y - y) < 2; // Returns true if Manhattan distance === 1
        }
        default:
            return false;
    }
};
