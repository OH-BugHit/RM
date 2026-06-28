import {
    Actions,
    SixthSenseDirection,
    GenericObservation,
    Position,
    Offset,
    CellType,
    Cell,
    GenericReward,
} from '../../../types';
import { manhattanDirecitons } from '../../../utils/defaults';

type StepResult = {
    obs: GenericObservation;
    reward: number;
    terminated: boolean;
    truncated: boolean;
    info: Info;
};

export interface EnvironmentOptions {
    world: Cell[][];
    maxTurns?: number;
    delay1?: number | 'unlimited';
    rewardStep?: number; // Reward for timestep
    reward1?: number; // Reward for moving over Celltype 6 (treasure)
    reward2?: number; // Reward for moving over Celltype 7 (big treasure)
    rPickObject?: number; // Reward for moving over Celltype 3 (key/ usable object)
    rTrap?: number; // Reward for moving over Celltype 9 (trap)
    rUseObject?: number; // Reward for moving over Celltype 5 (requires key/ usable object), TODO: Logic for locked-> door
    abilitySuccessReward?: number; // Reward for using ability and succeed TODO: IS THIS NEEDED?
    abilityFailureReward?: number; // Reward for using ability and fail (unneccessary)
    endByTrigger?: number; // Reward for episode end on trigger
    rLoseByTimeEnds?: number; // Reward received if counter reaches zero
    winByCount?: number; // Reward for episode end on enough items collected
    killed?: number;
    trap1?: number;
    triggerIsWin?: boolean;
    agentObsOffset: Offset[];
}

function getSpawnCells(world: Cell[][]): Position[] {
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

function getStartingPosition(spawnCells: Position[]): Position {
    const index = Math.floor(Math.random() * spawnCells.length);
    return spawnCells[index];
}

type Info = {
    timeLeft: number;
    reachedEndStateProp: boolean;
    result: 'win' | 'lose' | 'ongoing';
    message: string;
    trigger: boolean;
};
const SIDES: SixthSenseDirection[] = [
    SixthSenseDirection.North,
    SixthSenseDirection.South,
    SixthSenseDirection.East,
    SixthSenseDirection.West,
];

export class GenericRLEnv {
    position: Position = { x: 0, y: 0 };
    spawnCells: Position[] = [];
    world: Cell[][];
    maxTurns: number; // -1 = unlimited
    delay1: number | 'unlimited';
    rewardStep: number; // Reward for timestep
    reward1: number; // Reward for moving over Celltype 6 (treasure)
    reward2: number; // Reward for moving over Celltype 7 (big treasure)
    rPickObject: number; // Reward for moving over Celltype 3 (key/ usable object)
    rTrap: number; // Reward for moving over Celltype 9 (trap)
    rUseObject: number; // Reward for moving over Celltype 5 (requires key/ usable object), TODO: Logic for locked-> door
    abilitySuccessReward: number; // Reward for using ability and succeed TODO: IS THIS NEEDED?
    abilityFailureReward: number; // Reward for using ability and fail (unneccessary)
    endByTrigger: number; // Reward for episode end on trigger
    rLoseByTimeEnds: number; // Reward for losing episode
    winByCount: number; // Reward for episode end on enough items collected
    POI = { side: SixthSenseDirection.Away };
    stepsTaken: number = 0;
    triggerIsWin: boolean;
    agentObsOffset: Offset[];
    keys: number;

    constructor({
        world,
        maxTurns,
        agentObsOffset,
        delay1,
        rewardStep,
        reward1,
        reward2,
        rPickObject,
        rTrap,
        rUseObject,
        abilitySuccessReward,
        abilityFailureReward,
        endByTrigger,
        rLoseByTimeEnds,
        winByCount,
        triggerIsWin,
    }: EnvironmentOptions) {
        this.world = world;
        this.maxTurns = maxTurns ?? 0;
        this.delay1 = delay1 ?? 0;
        this.rewardStep = rewardStep ?? 0;
        this.reward1 = reward1 ?? 0;
        this.reward2 = reward2 ?? 0;
        this.rPickObject = rPickObject ?? 0;
        this.rTrap = rTrap ?? 0;
        this.rUseObject = rUseObject ?? 0;
        this.abilitySuccessReward = abilitySuccessReward ?? 0;
        this.abilityFailureReward = abilityFailureReward ?? 0;
        this.endByTrigger = endByTrigger ?? 0;
        this.rLoseByTimeEnds = rLoseByTimeEnds ?? 0;
        this.winByCount = winByCount ?? 0;
        this.agentObsOffset = agentObsOffset;
        this.spawnCells = getSpawnCells(world);
        this.triggerIsWin = triggerIsWin ?? false;
        this.position = getStartingPosition(this.spawnCells);
        this.keys = 0;
        this.reset();
    }

    setRewards(rewards: GenericReward) {
        this.rewardStep = rewards.rewardStep;
        this.reward1 = rewards.reward1;
        this.reward2 = rewards.reward2;
        this.rPickObject = rewards.rPickObject;
        this.rTrap = rewards.rTrap;
        this.rUseObject = rewards.rUseObject;
        this.abilityFailureReward = rewards.abilityFailureReward;
        this.abilitySuccessReward = rewards.abilitySuccessReward;
        this.endByTrigger = rewards.endByTrigger;
        this.rLoseByTimeEnds = rewards.rLoseByTimeEnds;
        this.winByCount = rewards.winByCount;
    }

    setWorld(world: Cell[][]) {
        this.world = world;
        this.spawnCells = getSpawnCells(this.world);
    }

    reset(): { obs: GenericObservation; info: Info } {
        this.position = getStartingPosition(this.spawnCells);
        this.stepsTaken = 0;
        this.keys = 1; //SET TO 0 WHEN PICKING IMPLEMENTED!
        this.resetTimer();

        return {
            obs: this.getObservation(),
            info: {
                timeLeft: this.maxTurns,
                reachedEndStateProp: false,
                result: 'ongoing',
                message: 'Game reset',
                trigger: false,
            },
        };
    }

    // Resets timer to reload time
    private resetTimer() {
        for (let column = 0; column < this.world.length; column++) {
            for (let row = 0; row < this.world[0].length; row++) {
                this.world[column][row].timer = Math.max(this.world[column][row].reloadTime, 0); // -1 reloadTime is used for One episode delay length
            }
        }
    }

    getCell(x: number, y: number): number {
        if (x < 0 || y < 0 || y >= this.world.length || x >= this.world[y]?.length) {
            return CellType.Solid;
        }
        if (this.world[y][x].timer !== 0) {
            return CellType.Empty; // If object is unpickable, return empty
        }
        return this.world[y][x].type;
    }

    getObservation(offsets: Offset[] = this.agentObsOffset): GenericObservation {
        return {
            neighbors: offsets.map((o) => this.getCell(this.position.x + o.dx, this.position.y + o.dy)),
            POIdirection: SIDES.indexOf(this.POI.side),
        };
    }

    private moveAgent(action: number): CellType {
        let { x, y } = this.position;

        // All rooms are bouded by walls, should work.
        if (action === Actions.up && this.world[y - 1][x].type !== CellType.Solid) y--;
        if (action === Actions.down && this.world[y + 1][x].type !== CellType.Solid) y++;
        if (action === Actions.left && this.world[y][x - 1].type !== CellType.Solid) x--;
        if (action === Actions.right && this.world[y][x + 1].type !== CellType.Solid) x++;

        this.position = { x, y };

        return this.world[y][x].type;
    }

    private POIstep(): { terminated: boolean } {
        if (this.POI.side === SixthSenseDirection.Away) {
            this.POI.side = SIDES[Math.floor(Math.random() * SIDES.length)];
        }
        this.stepsTaken++;
        if (this.maxTurns === -1) return { terminated: false };
        return { terminated: this.stepsTaken >= this.maxTurns };
    }

    private checkUseSpecialActionSuccess(): boolean {
        if (!this.position) return false;

        const { x, y } = this.position;

        for (const direction of manhattanDirecitons) {
            const nx = x + direction.x;
            const ny = y + direction.y;

            if (this.world?.[ny]?.[nx].type === CellType.LockedDoor) {
                if (this.keys > 0) {
                    this.keys--;
                    return true;
                }
            }
        }

        return false;
    }

    step(action: number): StepResult {
        let reward = this.rewardStep;
        let terminated = false;
        let trigger = false;

        const POIstepResult = this.POIstep();
        if (POIstepResult.terminated) {
            // if time runs out
            reward += this.rLoseByTimeEnds;
            terminated = true;
            return {
                obs: this.getObservation(),
                reward,
                terminated,
                truncated: false,
                info: {
                    timeLeft: this.maxTurns - this.stepsTaken,
                    reachedEndStateProp: false,
                    result: 'lose',
                    message: 'Game step completed. Step limit reached',
                    trigger: trigger,
                },
            };
        }

        // If there is time still left:
        const newLocationValue: CellType = this.moveAgent(action);

        if (action === Actions.specialAction) {
            if (this.checkUseSpecialActionSuccess()) {
                reward += this.abilitySuccessReward;
                terminated = false;
                return {
                    obs: this.getObservation(),
                    reward,
                    terminated,
                    truncated: false,
                    info: {
                        timeLeft: this.maxTurns - this.stepsTaken,
                        reachedEndStateProp: false,
                        result: 'ongoing',
                        message: 'Game step completed. Special ability used successfully',
                        trigger: trigger,
                    },
                };
            } else {
                reward += this.abilityFailureReward;
            }
        } else {
            switch (newLocationValue) {
                case CellType.Trigger: {
                    reward += this.endByTrigger;
                    trigger = true;
                    terminated = true;
                    return {
                        obs: this.getObservation(),
                        reward,
                        terminated,
                        truncated: false,
                        info: {
                            timeLeft: this.maxTurns - this.stepsTaken,
                            reachedEndStateProp: newLocationValue === CellType.Trigger,
                            result: this.triggerIsWin ? 'win' : 'lose',
                            message: 'Game step completed',
                            trigger: trigger,
                        },
                    };
                }
                case CellType.Treasure: {
                    if (this.world[this.position.y][this.position.x].timer === 0) {
                        // if treasure is not already picked, set also reload time
                        this.world[this.position.y][this.position.x].timer =
                            this.world[this.position.y][this.position.x].reloadTime;
                        reward += this.reward1;

                        this.world[this.position.y][this.position.x].timer--;
                        return {
                            obs: this.getObservation(),
                            reward,
                            terminated,
                            truncated: false,
                            info: {
                                timeLeft: this.maxTurns - this.stepsTaken,
                                reachedEndStateProp: false,
                                result: 'ongoing',
                                message: 'Game step completed, treasure reward received',
                                trigger: trigger,
                            },
                        };
                    }
                    break;
                }
                case CellType.TreasureBig: {
                    if (this.world[this.position.y][this.position.x].timer === 0) {
                        // if treasure is not already picked
                        this.world[this.position.y][this.position.x].timer =
                            this.world[this.position.y][this.position.x].reloadTime;
                        reward += this.reward2;
                        this.world[this.position.y][this.position.x].timer--;
                        return {
                            obs: this.getObservation(),
                            reward,
                            terminated,
                            truncated: false,
                            info: {
                                timeLeft: this.maxTurns - this.stepsTaken,
                                reachedEndStateProp: false,
                                result: 'ongoing',
                                message: 'Game step completed, large treasure reward received',
                                trigger: trigger,
                            },
                        };
                    }
                    break;
                }
                case CellType.Trap: {
                    if (this.world[this.position.y][this.position.x].timer === 0) {
                        // if trap is not already set
                        this.world[this.position.y][this.position.x].timer =
                            this.world[this.position.y][this.position.x].reloadTime;
                        reward += this.rTrap;
                        this.world[this.position.y][this.position.x].timer--;
                        return {
                            obs: this.getObservation(),
                            reward,
                            terminated,
                            truncated: false,
                            info: {
                                timeLeft: this.maxTurns - this.stepsTaken,
                                reachedEndStateProp: false,
                                result: 'ongoing',
                                message: 'Game step completed, trap reward received',
                                trigger: trigger,
                            },
                        };
                    }
                    break;
                }
                case CellType.Key: {
                    if (this.world[this.position.y][this.position.x].timer === 0) {
                        // if object is not already picked
                        this.world[this.position.y][this.position.x].timer =
                            this.world[this.position.y][this.position.x].reloadTime;
                        reward += this.rPickObject;
                        this.world[this.position.y][this.position.x].timer--;
                        this.keys++;
                        return {
                            obs: this.getObservation(),
                            reward,
                            terminated,
                            truncated: false,
                            info: {
                                timeLeft: this.maxTurns - this.stepsTaken,
                                reachedEndStateProp: false,
                                result: 'ongoing',
                                message: 'Game step completed, Pickable object picked',
                                trigger: trigger,
                            },
                        };
                    }
                    break;
                }
            }
        }

        return {
            obs: this.getObservation(),
            reward,
            terminated,
            truncated: false,
            info: {
                timeLeft: this.maxTurns - this.stepsTaken,
                reachedEndStateProp: false,
                result: 'ongoing',
                message: 'Game step completed. Episode continues',
                trigger: trigger,
            },
        };
    }
}
