import { Position } from '../../../types';

type EdgeType = 'openDoor' | 'lockedDoor' | 'openArea' | 'lockedEdge' | 'newEdge';
type RoomType = 'spawnArea' | 'lockedRoom' | 'openRoom';

/*type Edge = {
    from: RoomNode;
    to: RoomNode;
    type: EdgeType;
};*/

interface RoomNodeType {
    id: number;
    type: RoomType;
    location: Position;
    numberOfKeys: number;
    edges: Set<RoomEdge>;
    neighbours: Set<RoomNode>;
}

const allNodes: RoomNode[] = [];

const takenLocations: Map<string, RoomNode> = new Map();

//const connectedComponent: Set<RoomNode> = new Set();

//const unresolvedEdges: Set<Edge> = new Set();

export class RoomEdge {
    from: RoomNode | undefined = undefined;
    to: RoomNode | undefined = undefined;
    type: EdgeType = 'newEdge';

    constructor() {}
    setFrom(node: RoomNode): boolean {
        const newNode = this.from === undefined;
        this.from = node;
        return newNode;
    }
    setTo(node: RoomNode): boolean {
        const newNode = this.to === undefined;
        this.to = node;
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

    constructor(options: RoomNodeType) {
        this.id = options.id;
        this.type = options.type;
        this.location = options.location;
        this.numberOfKeys = 0;
        this.edges = options.edges;
        this.neighbours = options.neighbours;
    }

    getEdges(): Set<RoomEdge> {
        return this.edges;
    }
}

interface TreasureWorldProps {
    numberOfEdges: number;
}

// TODO: Check this works and continue on test print!
export const generateWorld = ({ numberOfEdges }: TreasureWorldProps) => {
    let id = 0;
    const firstNode = new RoomNode({
        id: id++,
        location: { x: 0, y: 0 },
        edges: new Set<RoomEdge>(),
        neighbours: new Set<RoomNode>(),
        numberOfKeys: 0,
        type: 'spawnArea',
    });
    allNodes.push(firstNode);
    let node;
    while (numberOfEdges > 0) {
        const edge = createEdge();
        numberOfEdges--;
        node = selectNode(); // self balances as old nodes are in nodes list longed.
        edge.setFrom(node);
        const positionResult: PositionResult | null = pickNextPosition(node);
        if (!positionResult) break;
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
            connect(node, newNode, edge);

            edge.setTo(newNode);
        } else {
            edge.setTo(positionResult.foundNode);
        }
    }
};

const createEdge = () => {
    return new RoomEdge();
};

const selectNode = (): RoomNode => {
    let node;
    while (true) {
        node = allNodes[Math.floor(Math.random() * allNodes.length)];
        if (node.getEdges().size < 4) {
            return node;
        }
    }
};

const connect = (a: RoomNode, b: RoomNode, c: RoomEdge) => {
    a.neighbours.add(b);
    b.neighbours.add(a);
    a.edges.add(c);
    b.edges.add(c);
};

const key = (p: Position) => `${p.x},${p.y}`;

type PositionResult = {
    position: Position;
    foundNode: RoomNode | undefined;
};

const pickNextPosition = (node: RoomNode): PositionResult | null => {
    const shuffled = [...directions].sort(() => Math.random() - 0.5);
    for (const dir of shuffled) {
        const next = {
            x: node.location.x + dir.x,
            y: node.location.y + dir.y,
        };

        const k = key(next);
        const other = takenLocations.get(k);

        if (other === undefined) {
            return { position: next, foundNode: undefined };
        } else {
            if (!node.neighbours.has(other)) {
                return { position: next, foundNode: other };
            }
        }
    }
    return null;
};

const directions = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
];

const pickWeighted = <T>(items: { value: T; weight: number }[]): T => {
    const total = items.reduce((sum, i) => sum + i.weight, 0);
    let r = Math.random() * total;

    for (const item of items) {
        if (r < item.weight) return item.value;
        r -= item.weight;
    }

    return items[items.length - 1].value;
};

function defineNodeType(node: RoomNode): RoomType {
    if (node.type === 'openRoom') {
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
