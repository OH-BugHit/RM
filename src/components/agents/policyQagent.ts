import { Actions, GenericObservation, GenericReward, ObservationShape, Offset, Position } from '../../types';
import { getDefaultObservation, getLargeOffset, smallOffset } from '../GameComponents/agentProps';
import { serializeObservation } from './utils';

const ACTIONS: number[] = [Actions.up, Actions.down, Actions.left, Actions.right, Actions.specialAction, Actions.stay];

export interface QPolicyAgentProps {
    Q: Record<string, number[]>;
    ObservationShape: ObservationShape;
    Rewards: GenericReward;
    studentId: string;
}
export class QPolicyAgent {
    studentId: string;
    Q: Record<string, number[]> = {}; // Q-table String is the state, number[] are the Q-values
    position: Position = { x: 1, y: 1 };
    offsets: Offset[];
    rewards: GenericReward;
    dead: boolean;
    currentObs: GenericObservation;
    facing: 1 | 0 | -1;

    constructor({ Q, ObservationShape, Rewards, studentId }: QPolicyAgentProps) {
        this.Q = Q;
        this.offsets = ObservationShape === 'large' ? getLargeOffset() : smallOffset;
        this.rewards = Rewards;
        this.dead = false;
        this.facing = 1;
        this.studentId = studentId;
        this.currentObs = getDefaultObservation(ObservationShape);
        this.dead = true;
    }

    setDead(state: boolean) {
        this.dead = state;
    }
    setQTable(newQ: Record<string, number[]>) {
        this.Q = newQ;
    }

    getQValues(obs: GenericObservation): number[] {
        const state = this.getStateKey(obs);

        if (!this.Q[state]) {
            // If new state
            this.Q[state] = Array(ACTIONS.length).fill(0);
        }

        return this.Q[state];
    }

    // unique key for each state
    getStateKey(obs: GenericObservation): string {
        return serializeObservation(obs);
    }

    chooseAction(obs: GenericObservation): number {
        // Always choose the action with highest Q-value
        const values = this.getQValues(obs);
        const max = Math.max(...values);

        // Tie-breaking among best actions
        const bestIndices = values.map((v, i) => (v === max ? i : -1)).filter((i) => i !== -1);

        const randomIdx = bestIndices[Math.floor(Math.random() * bestIndices.length)];
        return ACTIONS[randomIdx];
    }
}
