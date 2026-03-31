import { Actions, BanditPosition, Entity } from '../../types';

const ACTIONS: number[] = [Actions.up, Actions.down, Actions.left, Actions.right, Actions.bark, Actions.stay];

export interface Observation {
    neighbors: Entity[];
    bandit: BanditPosition;
}

export interface QLearningAgentOptions {
    alpha?: number;
    gamma?: number;
    epsilon?: number;
}

export class QLearningAgent {
    Q: Record<string, number[]> = {};

    alpha = 0.1;
    gamma = 0.9;
    epsilon = 0.1;

    constructor(options: QLearningAgentOptions = {}) {
        if (options.alpha !== undefined) this.alpha = options.alpha;
        if (options.gamma !== undefined) this.gamma = options.gamma;
        if (options.epsilon !== undefined) this.epsilon = options.epsilon;
    }

    getQValues(obs: Observation): number[] {
        const state = this.getStateKey(obs);

        if (!this.Q[state]) {
            this.Q[state] = Array(ACTIONS.length).fill(0);
        }

        return this.Q[state];
    }

    // unique key for each state
    getStateKey(obs: Observation): string {
        return `${obs.neighbors.join('')}-${obs.bandit}`;
    }

    chooseAction(obs: Observation): number {
        const state = this.getStateKey(obs);

        if (!this.Q[state]) {
            this.Q[state] = Array(ACTIONS.length).fill(0);
        }

        // Epsilon-greedy
        if (Math.random() < this.epsilon) {
            return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
        }

        const values = this.Q[state];
        const max = Math.max(...values);

        // Tie-breaking among best actions
        const bestIndices = values.map((v, i) => (v === max ? i : -1)).filter((i) => i !== -1);

        const randomIdx = bestIndices[Math.floor(Math.random() * bestIndices.length)];
        return ACTIONS[randomIdx];
    }

    update(obs: Observation, action: number, reward: number, nextObs: Observation, isTerminal: boolean = false) {
        const state = this.getStateKey(obs);
        const nextState = this.getStateKey(nextObs);

        if (!this.Q[state]) this.Q[state] = Array(ACTIONS.length).fill(0);
        if (!this.Q[nextState]) this.Q[nextState] = Array(ACTIONS.length).fill(0);

        const aIdx = ACTIONS.indexOf(action);

        // Jos peli päättyi (ansa/rosvo), tulevaisuuden arvo on 0
        const maxNext = isTerminal ? 0 : Math.max(...this.Q[nextState]);

        // Q-learning päivityssääntö
        this.Q[state][aIdx] += this.alpha * (reward + this.gamma * maxNext - this.Q[state][aIdx]);
    }
}
