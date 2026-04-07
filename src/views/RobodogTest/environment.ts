import { Actions, BanditPosition, Observation } from '../../types';

type Position = { x: number; y: number };

type StepResult = {
    obs: Observation;
    reward: number;
    terminated: boolean;
    truncated: boolean;
    info: Info;
};

export interface EnvironmentOptions {
    gridSize?: number;
    maxTurns?: number;
    numberOfPots?: number;
    potReloadDelay?: number;
    breakPotSpooksBurglar?: boolean;
    rewards?: {
        spooked?: number;
        brokePot?: number;
        barkSuccess?: number;
        barkFail?: number;
        burglarWon?: number;
    };
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

// Rewards
const SPOOKED_BURGLAR_REWARD = -1;
const BROKE_POT_REWARD = -1;
const BARK_SUCCESS_REWARD = 1;
const BARK_FAIL_REWARD = 0;
const BURGLAR_WON_REWARD = -1;
const POT_RELOAD_DELAY = 25;

type Info = { timeLeft: number; brokePot: boolean; result: 'win' | 'lose' | 'ongoing'; message: string };
const SIDES: BanditPosition[] = [BanditPosition.North, BanditPosition.South, BanditPosition.East, BanditPosition.West];

export class RLGridEnv {
    dog: Position = { x: 0, y: 0 };
    flower_pots: { x: number; y: number; intact: boolean; reload: number }[] = []; // x and y coords, intact or not, and steps to replace when broken
    burglar = { side: BanditPosition.Away, turns: 0 };
    gridSize: number;
    maxTurns: number;
    potReloadDelay: number;
    breakPotSpooksBurglar: boolean;
    spookedBurglarReward: number;
    brokePotReward: number;
    barkSuccessReward: number;
    barkFailReward: number;
    burglarWonReward: number;

    constructor({
        gridSize = 6,
        maxTurns = 12,
        numberOfPots = 4,
        potReloadDelay = POT_RELOAD_DELAY,
        breakPotSpooksBurglar = true,
        rewards = {},
    }: EnvironmentOptions = {}) {
        this.gridSize = gridSize;
        this.maxTurns = maxTurns;
        this.potReloadDelay = potReloadDelay;
        this.breakPotSpooksBurglar = breakPotSpooksBurglar;
        this.spookedBurglarReward = rewards.spooked ?? SPOOKED_BURGLAR_REWARD;
        this.brokePotReward = rewards.brokePot ?? BROKE_POT_REWARD;
        this.barkSuccessReward = rewards.barkSuccess ?? BARK_SUCCESS_REWARD;
        this.barkFailReward = rewards.barkFail ?? BARK_FAIL_REWARD;
        this.burglarWonReward = rewards.burglarWon ?? BURGLAR_WON_REWARD;

        const occupied = new Set<string>();
        const key = (x: number, y: number) => `${x},${y}`;
        const x = getRandomInt(gridSize);
        const y = getRandomInt(gridSize);

        this.dog = { x, y };
        occupied.add(key(x, y));

        this.flower_pots = [];

        while (this.flower_pots.length < numberOfPots) {
            const x = getRandomInt(gridSize);
            const y = getRandomInt(gridSize);

            if (!occupied.has(key(x, y))) {
                occupied.add(key(x, y));

                this.flower_pots.push({
                    x,
                    y,
                    intact: true,
                    reload: 0,
                });
            }
        }
        this.reset();
    }

    reset(): { obs: Observation; info: Info } {
        while (true) {
            const x = getRandomInt(this.gridSize);
            const y = getRandomInt(this.gridSize);
            if (!this.flower_pots.some((r) => r.x === x && r.y === y)) {
                this.dog = { x, y };
                break;
            }
        }
        this.burglar = { side: BanditPosition.Away, turns: 0 };
        return {
            obs: this.getObservation(),
            info: { timeLeft: this.maxTurns, brokePot: false, result: 'ongoing', message: 'Game reset' },
        };
    }

    // 2 = wall, 1 = pot, 0 = empty
    getCell(x: number, y: number): number {
        if (x < 0 || x >= this.gridSize || y < 0 || y >= this.gridSize) return 2;
        const r = this.flower_pots.find((r) => r.intact && r.x === x && r.y === y);
        return r ? 1 : 0;
    }

    getObservation(): Observation {
        return {
            neighbors: [
                this.getCell(this.dog.x, this.dog.y - 1),
                this.getCell(this.dog.x, this.dog.y + 1),
                this.getCell(this.dog.x - 1, this.dog.y),
                this.getCell(this.dog.x + 1, this.dog.y),
            ],
            bandit: SIDES.indexOf(this.burglar.side),
        };
    }

    // Returns true if broke a pot. (Makes noice and terminates episode if burglar is there)
    private moveDog(action: number): boolean {
        let broke = false;
        let { x, y } = this.dog;

        if (action === Actions.up && y > 0) y--;
        if (action === Actions.down && y < this.gridSize - 1) y++;
        if (action === Actions.left && x > 0) x--;
        if (action === Actions.right && x < this.gridSize - 1) x++;

        this.dog = { x, y };

        this.flower_pots = this.flower_pots.map((r) => {
            if (r.intact && r.x === x && r.y === y) {
                broke = true;
                this.burglar.turns = 0;
                return { ...r, intact: false, reload: this.potReloadDelay };
            }
            return r;
        });

        return broke;
    }

    private burglarStep(): { terminated: boolean } {
        if (this.burglar.side === BanditPosition.Away) {
            this.burglar.side = SIDES[Math.floor(Math.random() * SIDES.length)];
        }
        this.burglar.turns++;
        return { terminated: this.burglar.turns >= this.maxTurns };
    }

    private tickPots() {
        this.flower_pots = this.flower_pots.map((r) => {
            if (!r.intact) {
                const nextReload = Math.max(0, r.reload - 1);
                if (nextReload === 0) {
                    return { ...r, intact: true, reload: 0 };
                }
                return { ...r, reload: nextReload };
            }
            return r;
        });
    }

    private checkBarkSuccess(): boolean {
        const side = this.burglar.side;
        if (side === BanditPosition.Away) return false;
        if (side === BanditPosition.West && this.dog.x === 0) return true;
        if (side === BanditPosition.East && this.dog.x === this.gridSize - 1) return true;
        if (side === BanditPosition.North && this.dog.y === 0) return true;
        if (side === BanditPosition.South && this.dog.y === this.gridSize - 1) return true;
        return false;
    }

    step(action: number): StepResult {
        this.tickPots();

        let reward = 0;
        let terminated = false;

        const broke = this.moveDog(action);
        if (broke) {
            reward += this.brokePotReward;
            if (this.burglar.side !== BanditPosition.Away && this.breakPotSpooksBurglar) {
                reward += this.spookedBurglarReward;
                terminated = true;
                return {
                    obs: this.getObservation(),
                    reward,
                    terminated,
                    truncated: false,
                    info: {
                        timeLeft: this.burglar.turns,
                        brokePot: broke,
                        result: 'win',
                        message: 'Game step completed',
                    },
                };
            }
        }

        if (action === Actions.bark) {
            if (this.checkBarkSuccess()) {
                reward += this.barkSuccessReward;
                terminated = true;
                return {
                    obs: this.getObservation(),
                    reward,
                    terminated,
                    truncated: false,
                    info: {
                        timeLeft: this.burglar.turns,
                        brokePot: broke,
                        result: 'win',
                        message: 'Game step completed',
                    },
                };
            } else {
                reward += this.barkFailReward;
            }
        }

        const burglarResult = this.burglarStep();
        if (burglarResult.terminated) {
            reward += this.burglarWonReward;
            terminated = true;
            return {
                obs: this.getObservation(),
                reward,
                terminated,
                truncated: false,
                info: { timeLeft: this.burglar.turns, brokePot: broke, result: 'lose', message: 'Game step completed' },
            };
        }
        return {
            obs: this.getObservation(),
            reward,
            terminated,
            truncated: false,
            info: { timeLeft: this.burglar.turns, brokePot: broke, result: 'ongoing', message: 'Game step completed' },
        };
    }
}
