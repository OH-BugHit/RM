import { LevelMapNode } from './levelMapTypes';

interface RoutePathProps {
    nodes: LevelMapNode[];
    s: (value: number) => number;
}
export const createRoutePathX = ({ nodes, s }: RoutePathProps): string => {
    return nodes
        .map((node, index) => {
            if (index === 0) {
                return `M ${node.x} ${s(node.y)}`;
            }

            const prev = nodes[index - 1];
            const midX = (prev.x + node.x) / 2;

            return `L ${midX} ${s(prev.y)} L ${midX} ${s(node.y)} L ${node.x} ${s(node.y)}`;
        })
        .join(' ');
};

interface BonusRouteProps {
    bonusNodes: LevelMapNode[];
    nodes: LevelMapNode[];
    s: (value: number) => number;
}

export const createBonusPathsY = ({ bonusNodes, nodes, s }: BonusRouteProps) =>
    bonusNodes.flatMap((bonusNode) => {
        const sourceNode = nodes.find((node) => node.groupType === bonusNode.groupType);

        if (!sourceNode) {
            return [];
        }

        const midY = (sourceNode.y + bonusNode.y) / 2;

        return [
            {
                id: bonusNode.id,
                d: `M ${sourceNode.x} ${s(sourceNode.y)} L ${sourceNode.x} ${s(midY)} L ${bonusNode.x} ${s(midY)} L ${bonusNode.x} ${s(bonusNode.y)}`,
            },
        ];
    });
