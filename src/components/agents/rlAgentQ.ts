import { Actions, BurglarGameObservation } from '../../types';

const ACTIONS: number[] = [Actions.up, Actions.down, Actions.left, Actions.right, Actions.bark, Actions.stay];

export interface QLearningAgentOptions {
    alpha?: number;
    gamma?: number;
    epsilon?: number;
}

export class QLearningAgent {
    Q: Record<string, number[]> = {}; // Q-"table"
    visitTimes: Record<string, number> = {}; // For rendering memoizing. Memo checks if this is updated for record and renders based on that.

    alpha = 0.1;
    gamma = 0.9;
    epsilon = 0.1;
    tableSize = 0;
    learning = true;

    constructor(options: QLearningAgentOptions = {}) {
        if (options.alpha !== undefined) this.alpha = options.alpha;
        if (options.gamma !== undefined) this.gamma = options.gamma;
        if (options.epsilon !== undefined) this.epsilon = options.epsilon;
    }

    getTableSize() {
        return this.tableSize;
    }

    getQTable() {
        return this.Q;
    }

    getQValues(obs: BurglarGameObservation): number[] {
        const state = this.getStateKey(obs);

        if (!this.Q[state]) {
            this.Q[state] = Array(ACTIONS.length).fill(0);
            this.tableSize++;
            this.visitTimes[state] = 0;
        }

        return this.Q[state];
    }

    // unique key for each state
    getStateKey(obs: BurglarGameObservation): string {
        return `${obs.neighbors.join('')}-${obs.burglar}`;
    }

    chooseAction(obs: BurglarGameObservation): number {
        // Epsilon-greedy
        if (Math.random() < this.epsilon) {
            return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
        }

        const values = this.getQValues(obs);
        const max = Math.max(...values);

        // Tie-breaking among best actions
        const bestIndices = values.map((v, i) => (v === max ? i : -1)).filter((i) => i !== -1);

        const randomIdx = bestIndices[Math.floor(Math.random() * bestIndices.length)];
        return ACTIONS[randomIdx];
    }

    update(
        obs: BurglarGameObservation,
        action: number,
        reward: number,
        nextObs: BurglarGameObservation,
        isTerminal: boolean = false
    ) {
        if (!this.learning) return; // Does not update visited count also!
        const state = this.getStateKey(obs);
        const values = this.getQValues(obs);
        const nextValues = this.getQValues(nextObs);

        const aIdx = ACTIONS.indexOf(action);

        const maxNext = isTerminal ? 0 : Math.max(...nextValues);

        values[aIdx] += this.alpha * (reward + this.gamma * maxNext - values[aIdx]);

        this.visitTimes[state] = (this.visitTimes[state] || 0) + 1; // Update visited count (version count)
    }
}
