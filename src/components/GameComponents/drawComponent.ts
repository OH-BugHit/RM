import { AgentType, Position } from '../../types';

interface SightProps {
    agentPos: Position;
    x: number;
    y: number;
    agentType: AgentType;
}
export const getOnSight = ({ agentPos, x, y, agentType }: SightProps): boolean => {
    switch (agentType) {
        case 'adventurer': {
            const dx = Math.abs(agentPos.x - x);
            const dy = Math.abs(agentPos.y - y);
            return dx + dy <= 3 && dx < 3 && dy < 3;
        }
        case 'robodog': {
            return Math.abs(agentPos.x - x) + Math.abs(agentPos.y - y) === 1; // Returns true if Manhattan distance === 1
        }
        default:
            return false;
    }
};
