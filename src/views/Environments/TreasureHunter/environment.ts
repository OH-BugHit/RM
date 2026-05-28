import { Actions, SixthSenseDirection, GenericObservation, Position, Offset, CellType } from '../../../types';
import { manhattanDirecitons } from '../../../utils/defaults';

type StepResult = {
    obs: GenericObservation;
    reward: number;
    terminated: boolean;
    truncated: boolean;
    info: Info;
};

export interface EnvironmentOptions {
    world: CellType[][];
    maxTurns?: number;
    delay1?: number;
    rewardStep?: number;
    reward1?: number;
    reward2?: number;
    reward3?: number;
    reward4?: number;
    reward5?: number;
    reward6?: number;
    abilitySuccessReward?: number;
    abilityFailureReward?: number;
    win?: number;
    lose?: number;
    killed?: number;
    trap1?: number;
    trapLethal?: boolean;
    agentObsOffset: Offset[];
}

function getSpawnCells(world: CellType[][]): Position[] {
    const spawnCells: Position[] = [];
    world.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === CellType.Spawn) {
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

type Info = { timeLeft: number; stepToTrap: boolean; result: 'win' | 'lose' | 'ongoing'; message: string };
const SIDES: SixthSenseDirection[] = [
    SixthSenseDirection.North,
    SixthSenseDirection.South,
    SixthSenseDirection.East,
    SixthSenseDirection.West,
];

export class GenericRLEnv {
    position: Position = { x: 0, y: 0 };
    spawnCells: Position[] = [];
    world: CellType[][];
    maxTurns: number;
    delay1: number;
    rewardStep: number;
    reward1: number;
    reward2: number;
    reward3: number;
    reward4: number;
    reward5: number;
    reward6: number;
    abilitySuccessReward: number;
    abilityFailureReward: number;
    trap1: number;
    POI = { side: SixthSenseDirection.Away };
    stepsTaken: number = 0;
    win: number;
    killed: number;
    lose: number;
    trapLethal: boolean;
    agentObsOffset: Offset[];

    constructor({
        world,
        maxTurns,
        agentObsOffset,
        delay1,
        win,
        lose,
        rewardStep,
        reward1,
        reward2,
        reward3,
        reward4,
        reward5,
        reward6,
        abilitySuccessReward,
        abilityFailureReward,
        trap1,
        killed,
        trapLethal,
    }: EnvironmentOptions) {
        this.world = world;
        this.maxTurns = maxTurns ?? 0;
        this.delay1 = delay1 ?? 0;
        this.rewardStep = rewardStep ?? 0;
        this.reward1 = reward1 ?? 0;
        this.reward2 = reward2 ?? 0;
        this.reward3 = reward3 ?? 0;
        this.reward4 = reward4 ?? 0;
        this.reward5 = reward5 ?? 0;
        this.reward6 = reward6 ?? 0;
        this.abilitySuccessReward = abilitySuccessReward ?? 0;
        this.abilityFailureReward = abilityFailureReward ?? 0;
        this.win = win ?? 0;
        this.lose = lose ?? 0;
        this.agentObsOffset = agentObsOffset;
        this.spawnCells = getSpawnCells(world);
        this.trap1 = trap1 ?? 0;
        this.killed = killed ?? 0;
        this.trapLethal = trapLethal ?? false;
        this.position = getStartingPosition(this.spawnCells);
        this.reset();
    }

    reset(): { obs: GenericObservation; info: Info } {
        this.position = getStartingPosition(this.spawnCells);
        this.stepsTaken = 0;

        return {
            obs: this.getObservation(),
            info: { timeLeft: this.maxTurns, stepToTrap: false, result: 'ongoing', message: 'Game reset' },
        };
    }

    getCell(x: number, y: number): number {
        if (x < 0 || y < 0 || y >= this.world.length || x >= this.world[y]?.length) {
            return CellType.Wall;
        }
        return this.world[y][x];
    }

    getObservation(offsets: Offset[] = this.agentObsOffset): GenericObservation {
        return {
            neighbors: offsets.map((o) => this.getCell(this.position.x + o.dx, this.position.y + o.dy)),
            POIdirection: SIDES.indexOf(this.POI.side),
        };
    }

    // Returns true if broke a trap. (Possibly killing the agent and terminating episode)
    private moveAgent(action: number): CellType {
        let { x, y } = this.position;

        // All rooms are bouded by walls, should work.
        if (action === Actions.up && this.world[y - 1][x] !== CellType.Wall) y--;
        if (action === Actions.down && this.world[y + 1][x] !== CellType.Wall) y++;
        if (action === Actions.left && this.world[y][x - 1] !== CellType.Wall) x--;
        if (action === Actions.right && this.world[y][x + 1] !== CellType.Wall) x++;

        this.position = { x, y };

        return this.world[y][x];
    }

    private POIstep(): { terminated: boolean } {
        if (this.POI.side === SixthSenseDirection.Away) {
            this.POI.side = SIDES[Math.floor(Math.random() * SIDES.length)];
        }
        this.stepsTaken++;
        return { terminated: this.stepsTaken >= this.maxTurns };
    }

    private checkUseSpecialActionSuccess(): boolean {
        if (!this.position) return false;

        const { x, y } = this.position;

        for (const direction of manhattanDirecitons) {
            const nx = x + direction.x;
            const ny = y + direction.y;

            if (this.world?.[ny]?.[nx] === CellType.LockedDoor) {
                return true;
            }
        }

        return false;
    }

    step(action: number): StepResult {
        let reward = this.rewardStep;
        let terminated = false;

        const newLocationValue: CellType = this.moveAgent(action);
        if (newLocationValue === CellType.Trap) {
            reward += this.trap1;
            if (this.trapLethal) {
                reward += this.lose;
                terminated = true;
                return {
                    obs: this.getObservation(),
                    reward,
                    terminated,
                    truncated: false,
                    info: {
                        timeLeft: this.maxTurns - this.stepsTaken,
                        stepToTrap: newLocationValue === CellType.Trap,
                        result: 'lose',
                        message: 'Game step completed',
                    },
                };
            }
        }

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
                        stepToTrap: newLocationValue === CellType.Trap,
                        result: 'ongoing',
                        message: 'Game step completed. Special ability used successfully',
                    },
                };
            } else {
                reward += this.abilityFailureReward;
            }
        }

        const POIstepResult = this.POIstep();
        if (POIstepResult.terminated) {
            reward += this.lose;
            terminated = true;
            return {
                obs: this.getObservation(),
                reward,
                terminated,
                truncated: false,
                info: {
                    timeLeft: this.maxTurns - this.stepsTaken,
                    stepToTrap: newLocationValue === CellType.Trap,
                    result: 'lose',
                    message: 'Game step completed. POI-step limit reached',
                },
            };
        }
        return {
            obs: this.getObservation(),
            reward,
            terminated,
            truncated: false,
            info: {
                timeLeft: this.maxTurns - this.stepsTaken,
                stepToTrap: newLocationValue === CellType.Trap,
                result: 'ongoing',
                message: 'Game step completed. Episode continues',
            },
        };
    }
}
