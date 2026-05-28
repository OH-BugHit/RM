import { World } from '../../components/GameComponents/EnvironmentComponents/worldGenerator';
import { nodesToWorld } from '../../components/GameComponents/EnvironmentComponents/nodesToWorld';

interface worldComponentProps {
    world: World;
    tileSize?: number;
    roomSizeX?: number;
    roomSizeY?: number;
}

export const worldToGrid = ({ world, roomSizeX = 10, roomSizeY = 10 }: worldComponentProps) => {
    return nodesToWorld({
        nodes: world.allNodes,
        bounds: {
            minX: Math.min(...world.allNodes.map((n) => n.location.x)),
            maxX: Math.max(...world.allNodes.map((n) => n.location.x)),
            minY: Math.min(...world.allNodes.map((n) => n.location.y)),
            maxY: Math.max(...world.allNodes.map((n) => n.location.y)),
        },
        roomSizeX: roomSizeX,
        roomSizeY: roomSizeY,
    });
};
