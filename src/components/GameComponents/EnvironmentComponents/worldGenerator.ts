import { EdgeType, Position, RoomShape, RoomType } from '../../../types';
import { manhattanDirecitons } from '../../../utils/defaults';
import createRoom from './createRoom';

interface RoomNodeType {
    id: number;
    type: RoomType;
    location: Position;
    numberOfKeys: number;
    edges: Set<RoomEdge>;
    neighbours: Set<RoomNode>;
}
interface TreasureWorldProps {
    numberOfEdges: number;
    density: number;
    roomSizeX: number;
    roomSizeY: number;
    roomShape: RoomShape;
}

export class RoomEdge {
    from: number | undefined = undefined;
    to: number | undefined = undefined;
    type: EdgeType = 'newEdge';

    constructor() {}
    setFrom(node: RoomNode): boolean {
        const newNode = this.from === undefined;
        this.from = node.id;
        return newNode;
    }
    setTo(node: RoomNode): boolean {
        const newNode = this.to === undefined;
        this.to = node.id;
        return newNode;
    }
    setType(type: EdgeType) {
        this.type = type;
    }
}

export class RoomNode {
    id: number;
    type: RoomType;
    location: Position;
    numberOfKeys: number;
    neighbours: Set<RoomNode>;
    edges: Set<RoomEdge>;
    room: number[][];

    constructor(options: RoomNodeType) {
        this.id = options.id;
        this.type = options.type;
        this.location = options.location;
        this.numberOfKeys = 0;
        this.edges = options.edges;
        this.neighbours = options.neighbours;
        this.room = [];
    }

    getEdges(): Set<RoomEdge> {
        return this.edges;
    }
}

const createEdge = () => {
    return new RoomEdge();
};

const connect = (a: RoomNode, b: RoomNode, c: RoomEdge, type: EdgeType) => {
    c.setType(type);
    a.neighbours.add(b);
    b.neighbours.add(a);
    a.edges.add(c);
    b.edges.add(c);
};

export const pickWeighted = <T>(items: { value: T; weight: number }[]): T => {
    const total = items.reduce((sum, i) => sum + i.weight, 0);
    let r = Math.random() * total;

    for (const item of items) {
        if (r < item.weight) return item.value;
        r -= item.weight;
    }

    return items[items.length - 1].value;
};

function defineNodeType(node: RoomNode): RoomType {
    if (node.type === 'spawnArea') {
        return pickWeighted([
            { value: 'spawnArea', weight: 0.4 },
            { value: 'openRoom', weight: 0.4 },
            { value: 'lockedRoom', weight: 0.2 },
        ]);
    } else {
        return pickWeighted([
            { value: 'openRoom', weight: 0.5 }, // Likelyhood of new room to be locked or open. add different rooms here
            { value: 'lockedRoom', weight: 0.5 },
        ]);
    }
}

//const connectedComponent: Set<RoomNode> = new Set();

type PositionResult = {
    position: Position;
    foundNode: RoomNode | undefined;
};

const key = (p: Position) => `${p.x},${p.y}`;

//const unresolvedEdges: Set<Edge> = new Set();

export class World {
    allNodes: RoomNode[];
    allEdges: RoomEdge[];
    takenLocations: Map<string, RoomNode>;
    firstNode: RoomNode; // Starting node is needed purely for easier implementation of key generation

    constructor() {
        this.allNodes = [];
        this.allEdges = [];
        this.takenLocations = new Map();
        this.firstNode = new RoomNode({
            id: 0,
            location: { x: 0, y: 0 },
            edges: new Set<RoomEdge>(),
            neighbours: new Set<RoomNode>(),
            numberOfKeys: 0,
            type: 'spawnArea',
        });
    }

    selectNode = (): RoomNode => {
        const availableNodes = this.allNodes.filter((n) => n.getEdges().size < 4);
        if (availableNodes.length === 0) {
            throw new Error('No available nodes to connect to - all nodes are full');
        }
        return availableNodes[Math.floor(Math.random() * availableNodes.length)];
    };

    pickNextPosition = (node: RoomNode, density: number): PositionResult | null => {
        const freeNeighbour = hasFreeNeighbour(node, this.takenLocations);
        let connectNeigbour = false;
        if (freeNeighbour && Math.random() < density) {
            // There is additional chance to connect to adjancet new neighbour, if there is one. This increases the chance.
            connectNeigbour = true;
        }
        const shuffled = [...manhattanDirecitons].sort(() => Math.random() - 0.5);
        for (const dir of shuffled) {
            const next = {
                x: node.location.x + dir.x,
                y: node.location.y + dir.y,
            };

            const k = key(next);
            const other = this.takenLocations.get(k);

            if (!connectNeigbour && other === undefined) {
                return { position: next, foundNode: undefined };
            } else {
                if (other !== undefined && !node.neighbours.has(other) && other !== node) {
                    return { position: next, foundNode: other };
                }
            }
        }
        return null;
    };

    generateWorld = ({ roomSizeX, roomSizeY, roomShape, numberOfEdges, density }: TreasureWorldProps) => {
        let id = 1;
        let attempts = 0;
        const maxAttempts = numberOfEdges * 10; // Prevent infinite loops

        this.allNodes.push(this.firstNode);
        this.takenLocations.set(key(this.firstNode.location), this.firstNode);
        let node;

        while (numberOfEdges > 0 && attempts < maxAttempts) {
            attempts++;
            const edge = createEdge();
            node = this.selectNode(); // self balances as old nodes are in nodes list longer.
            edge.setFrom(node);
            const positionResult: PositionResult | null = this.pickNextPosition(node, density);
            if (!positionResult) continue;
            if (!positionResult.foundNode) {
                const newType: RoomType = defineNodeType(node);
                const newNode = new RoomNode({
                    id: id++,
                    location: positionResult.position,
                    edges: new Set<RoomEdge>(),
                    neighbours: new Set<RoomNode>(),
                    numberOfKeys: 0,
                    type: newType,
                });
                this.allNodes.push(newNode);
                edge.setTo(newNode);
                connect(node, newNode, edge, newType);
                this.takenLocations.set(key(positionResult.position), newNode);
            } else {
                edge.setTo(positionResult.foundNode);
                connect(node, positionResult.foundNode, edge, positionResult.foundNode.type);
                this.takenLocations.set(key(positionResult.position), positionResult.foundNode);
            }
            this.allEdges.push(edge);
            numberOfEdges--;
        }

        if (numberOfEdges > 0) {
            console.warn(
                `World generation stopped early. Created ${this.allNodes.length} nodes instead of requested edges`
            );
        }

        this.calculateAndAssignKeys();

        for (const node of this.allNodes) {
            node.room = createRoom({
                roomNode: node,
                roomSizeX: roomSizeX,
                roomSizeY: roomSizeY,
                roomShape: roomShape,
            });
        }
    };

    calculateAndAssignKeys = () => {
        const readyNodes: Set<RoomNode> = new Set();
        let visited: Set<RoomNode> = new Set();
        let node: RoomNode | undefined = this.firstNode;
        let neededKeys = 0;

        const dfs = (node: RoomNode) => {
            visited.add(node);
            for (const edge of node.edges) {
                if (edge.type === 'lockedRoom') {
                    neededKeys++;
                    edge.type = 'lockedDoor';
                } else {
                    const otherNode = this.allNodes.find(
                        (n) => n.id === (edge.from === node?.id ? edge.to : edge.from)
                    );
                    if (otherNode && !visited.has(otherNode)) {
                        dfs(otherNode);
                    }
                }
            }
        };
        const setKeys = (visited: Set<RoomNode>) => {
            for (; neededKeys > 0; neededKeys--) {
                // Add keys to random visited but not ready nodes.
                const candidates = Array.from(visited).filter((n) => !readyNodes.has(n));
                if (candidates.length === 0) break; // No more candidates to assign keys to
                const randomNode = candidates[Math.floor(Math.random() * candidates.length)];
                randomNode.numberOfKeys++;
            }
        };

        while (readyNodes.size < this.allNodes.length) {
            node = this.firstNode;
            neededKeys = 0;
            dfs(node);
            setKeys(visited);
            visited.forEach((n) => {
                readyNodes.add(n);
            });
            visited = new Set();
        }
    };
}

/**
 * @param node Node which neighbourhood is checked
 * @param takenLocations Reserved locations
 * @returns A boolean indicating whether the node has a adjancent un-connected neighbour.
 */
function hasFreeNeighbour(node: RoomNode, takenLocations: Map<string, RoomNode>): boolean {
    let hasFreeNeighbour = false;
    for (let i = 0; i < manhattanDirecitons.length; i++) {
        const next = {
            x: node.location.x + manhattanDirecitons[i].x,
            y: node.location.y + manhattanDirecitons[i].y,
        };
        const k = key(next);
        const other = takenLocations.get(k);
        if (other !== undefined && !node.neighbours.has(other)) {
            hasFreeNeighbour = true;
        }
    }
    return hasFreeNeighbour;
}
