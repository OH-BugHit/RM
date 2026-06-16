import { describe, expect, it } from 'vitest';
import { Actions, CellType } from '../../../types';
import createRoom from '../../../components/GameComponents/EnvironmentComponents/createRoom';
import { RoomNode } from '../../../components/GameComponents/EnvironmentComponents/worldGenerator';
import { GenericRLEnv } from './environment';

const makeRoomNode = (type: 'openRoom' | 'spawnArea' | 'lockedRoom' = 'openRoom') =>
    new RoomNode({
        id: 0,
        type,
        location: { x: 0, y: 0 },
        numberOfKeys: 0,
        edges: new Set(),
        neighbours: new Set(),
    });

describe('TreasureHunter coordinate handling', () => {
    it('reads observation cells using x as horizontal and y as vertical coordinates', () => {
        const env = new GenericRLEnv({
            world: [
                [CellType.Spawn, CellType.Wall],
                [CellType.Trap, CellType.Empty],
            ],
            agentObsOffset: [{ dx: 1, dy: 0 }],
        });

        env.position = { x: 0, y: 0 };

        expect(env.getObservation().neighbors).toEqual([CellType.Wall]);
    });

    it('applies trap rewards based on the cell the agent actually moves onto', () => {
        const env = new GenericRLEnv({
            world: [
                [CellType.Spawn, CellType.Trap],
                [CellType.Empty, CellType.Empty],
            ],
            maxTurns: 10,
            agentObsOffset: [{ dx: 1, dy: 0 }],
            trap1: 4,
            trapLethal: false,
        });

        env.position = { x: 0, y: 0 };

        const result = env.step(Actions.right);

        expect(result.reward).toBe(4);
        expect(result.terminated).toBe(false);
        expect(env.position).toEqual({ x: 1, y: 0 });
    });

    it('creates room buffers with height as the first dimension', () => {
        const room = createRoom({
            roomNode: makeRoomNode(),
            roomSizeX: 5,
            roomSizeY: 7,
        });

        expect(room).toHaveLength(7);
        expect(room[0]).toHaveLength(5);
    });
});
