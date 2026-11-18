import { LevelMapNode } from './levelMapTypes';

interface RoutePathProps {
    nodes: LevelMapNode[];
    mapHeight: number;
}

const mapY = (percentage: number, mapHeight: number) => (percentage / 100) * mapHeight;

export const createRoutePathX = ({ nodes, mapHeight }: RoutePathProps): string => {
    return nodes
        .map((node, index) => {
            if (index === 0) {
                return `M ${node.x} ${mapY(node.y, mapHeight)}`;
            }

            const prev = nodes[index - 1];
            const midX = (prev.x + node.x) / 2;

            return `L ${midX} ${mapY(prev.y, mapHeight)} L ${midX} ${mapY(node.y, mapHeight)} L ${node.x} ${mapY(node.y, mapHeight)}`;
        })
        .join(' ');
};

interface BonusRouteProps {
    bonusNodes: LevelMapNode[];
    nodes: LevelMapNode[];
    mapHeight: number;
}

export const createBonusPathsY = ({ bonusNodes, nodes, mapHeight }: BonusRouteProps) =>
    bonusNodes.flatMap((bonusNode) => {
        const sourceNode = nodes.find((node) => node.groupType === bonusNode.groupType);

        if (!sourceNode) {
            return [];
        }

        const midY = (sourceNode.y + bonusNode.y) / 2;

        return [
            {
                id: bonusNode.id,
                d: `M ${sourceNode.x} ${mapY(sourceNode.y, mapHeight)} L ${sourceNode.x} ${mapY(midY, mapHeight)} L ${bonusNode.x} ${mapY(midY, mapHeight)} L ${bonusNode.x} ${mapY(bonusNode.y, mapHeight)}`,
            },
        ];
    });
