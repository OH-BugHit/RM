import { QPolicyAgent } from '../../../components/agents/policyQagent';
import { Actions, GenericObservation, Position, Offset, CellType, ObjectType, GenericReward } from '../../../types';
import { CellSave } from '../../../utils/types';

type StepResult = {
    obs: GenericObservation;
    reward: number;
    terminated: boolean;
    truncated: boolean;
    info: Info;
};

export interface EnvironmentOptions {
    world: CellSave[][];
    maxTurns: number;
}

export function getSpawnCells(world: CellSave[][]): Position[] {
    const spawnCells: Position[] = [];
    world.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell.type === CellType.Spawn) {
                spawnCells.push({ x, y });
            }
        });
    });
    return spawnCells;
}

export function getStartingPosition(spawnCells: Position[]): Position {
    const index = Math.floor(Math.random() * spawnCells.length);
    return spawnCells[index];
}

type Info = {
    timeLeft: number;
    reachedEndStateProp: boolean;
    result: 'win' | 'lose' | 'ongoing';
    message: string;
    object: ObjectType;
    trigger: boolean;
};

const positionKey = (position: Position) => `${position.y},${position.x}`;

export class TournamentEnv {
    spawnCells: Position[] = [];
    world: CellSave[][];
    maxTurns: number; // -1 = unlimited
    stepsTaken: number = 0;
    timer: Map<string, Set<QPolicyAgent>> = new Map();

    constructor({ world, maxTurns }: EnvironmentOptions) {
        this.world = world;
        this.maxTurns = maxTurns ?? 0;
        this.spawnCells = getSpawnCells(world);
    }

    setWorld(world: CellSave[][]) {
        this.world = world;
        this.spawnCells = getSpawnCells(this.world);
    }

    resetEnv(agents: QPolicyAgent[]) {
        for (const agent of agents) {
            agent.dead = false;
        }
        this.stepsTaken = 0;
        this.resetTimer();
    }

    resetAgent(agent: QPolicyAgent) {
        agent.dead = false;
        agent.position = getStartingPosition(this.spawnCells);
        agent.currentObs = this.getObservation(agent, agent.offsets, agent.position);
    }

    // Resets timer to reload time
    private resetTimer() {
        this.timer = new Map();
    }

    getCell(agent: QPolicyAgent, x: number, y: number): number {
        if (x < 0 || y < 0 || y >= this.world.length || x >= this.world[y]?.length) {
            return CellType.Solid;
        }
        if (this.timer.get(positionKey({ y, x }))?.has(agent)) {
            return CellType.Empty; // If object is unpickable, return empty
        }
        return this.world[y][x].type;
    }

    // TODO: Agent has this
    getObservation(agent: QPolicyAgent, offsets: Offset[], position: Position): GenericObservation {
        return {
            neighbours: offsets.map((o) => this.getCell(agent, position.x + o.dx, position.y + o.dy)),
        };
    }

    private moveAgent(action: number, position: Position): { type: CellType; position: Position } {
        let { x, y } = position;

        // All rooms are bouded by walls, should work.
        if (action === Actions.up && this.world[y - 1][x].type !== CellType.Solid) y--;
        if (action === Actions.down && this.world[y + 1][x].type !== CellType.Solid) y++;
        if (action === Actions.left && this.world[y][x - 1].type !== CellType.Solid) x--;
        if (action === Actions.right && this.world[y][x + 1].type !== CellType.Solid) x++;

        return { type: this.world[y][x].type, position: { x, y } };
    }

    step(
        agent: QPolicyAgent,
        action: number,
        oldPosition: Position,
        rewards: GenericReward,
        offsets: Offset[]
    ): StepResult {
        let reward = rewards.rewardStep;
        let terminated = false;
        let trigger = false;

        // If there is time still left:
        const { type, position } = this.moveAgent(action, oldPosition);

        agent.position = position;

        if (action === Actions.specialAction) {
            reward += rewards.abilityFailureReward;
        } else {
            switch (type) {
                case CellType.Trigger: {
                    reward += rewards.endByTrigger;
                    trigger = true;
                    terminated = true;
                    return {
                        obs: this.getObservation(agent, offsets, position),
                        reward,
                        terminated,
                        truncated: false,
                        info: {
                            timeLeft: this.maxTurns - this.stepsTaken,
                            reachedEndStateProp: type === CellType.Trigger,
                            result: 'win',
                            message: 'Game step completed',
                            trigger: trigger,
                            object: null,
                        },
                    };
                }
                case CellType.Treasure: {
                    if (!this.timer.get(positionKey({ y: position.y, x: position.x }))?.has(agent)) {
                        // if treasure is not already picked, set also reload time
                        // TODO: implement personal records for agents for reads! this.world[position.y][position.x].timer = this.world[position.y][position.x].reloadTime;
                        //this.world[position.y][position.x].timer--;
                        reward += rewards.reward1;
                        const key = positionKey({ x: position.x, y: position.y });

                        const prev = this.timer.get(key) ?? new Set<QPolicyAgent>();
                        const updated = new Set(prev).add(agent);

                        this.timer.set(key, updated);

                        return {
                            obs: this.getObservation(agent, offsets, position),
                            reward,
                            terminated,
                            truncated: false,
                            info: {
                                timeLeft: this.maxTurns - this.stepsTaken,
                                reachedEndStateProp: false,
                                result: 'ongoing',
                                message: 'Game step completed, treasure reward received',
                                trigger: trigger,
                                object: 'treasure',
                            },
                        };
                    }
                    break;
                }
                case CellType.TreasureBig: {
                    if (!this.timer.get(positionKey({ y: position.y, x: position.x }))?.has(agent)) {
                        reward += rewards.reward2;
                        const key = positionKey({ x: position.x, y: position.y });

                        const prev = this.timer.get(key) ?? new Set<QPolicyAgent>();
                        const updated = new Set(prev).add(agent);

                        this.timer.set(key, updated);

                        return {
                            obs: this.getObservation(agent, offsets, position),
                            reward,
                            terminated,
                            truncated: false,
                            info: {
                                timeLeft: this.maxTurns - this.stepsTaken,
                                reachedEndStateProp: false,
                                result: 'ongoing',
                                message: 'Game step completed, large treasure reward received',
                                trigger: trigger,
                                object: 'bigTreasure',
                            },
                        };
                    }
                    break;
                }
                case CellType.Trap: {
                    if (!this.timer.get(positionKey({ y: position.y, x: position.x }))?.has(agent)) {
                        reward += rewards.rTrap;
                        const key = positionKey({ x: position.x, y: position.y });

                        const prev = this.timer.get(key) ?? new Set<QPolicyAgent>();
                        const updated = new Set(prev).add(agent);

                        this.timer.set(key, updated);

                        return {
                            obs: this.getObservation(agent, offsets, position),
                            reward,
                            terminated,
                            truncated: false,
                            info: {
                                timeLeft: this.maxTurns - this.stepsTaken,
                                reachedEndStateProp: false,
                                result: 'ongoing',
                                message: 'Game step completed, trap reward received',
                                trigger: trigger,
                                object: 'trap',
                            },
                        };
                    }
                    break;
                }
                case CellType.Key: {
                    if (!this.timer.get(positionKey({ y: position.y, x: position.x }))?.has(agent)) {
                        // if object is not already picked
                        reward += rewards.rPickObject;
                        const key = positionKey({ x: position.x, y: position.y });

                        const prev = this.timer.get(key) ?? new Set<QPolicyAgent>();
                        const updated = new Set(prev).add(agent);

                        this.timer.set(key, updated);

                        return {
                            obs: this.getObservation(agent, offsets, position),
                            reward,
                            terminated,
                            truncated: false,
                            info: {
                                timeLeft: this.maxTurns - this.stepsTaken,
                                reachedEndStateProp: false,
                                result: 'ongoing',
                                message: 'Game step completed, Pickable object picked',
                                trigger: trigger,
                                object: null,
                            },
                        };
                    }
                    break;
                }
            }
        }

        return {
            obs: this.getObservation(agent, offsets, position),
            reward,
            terminated,
            truncated: false,
            info: {
                timeLeft: this.maxTurns - this.stepsTaken,
                reachedEndStateProp: false,
                result: 'ongoing',
                message: 'Game step completed. Episode continues',
                trigger: trigger,
                object: null,
            },
        };
    }
}
