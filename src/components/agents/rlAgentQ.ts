import { Actions, GenericObservation } from '../../types';
import { defaultSprites } from '../../utils/defaults';
import { getNumberSpriteId } from '../../utils/spriteStoreUtils';
import { InspectMarkerManager } from '../QTable/InspectMarkerManager/InspectMarkerManager';
import { MarkerManager } from '../QTable/MarkerManager/MargerManager';
import { SpriteStore, WorldStore } from '../QTable/utils';
import { serializeObservation } from './utils';

const ACTIONS: number[] = [Actions.up, Actions.down, Actions.left, Actions.right, Actions.specialAction, Actions.stay];

export interface QLearningAgentOptions {
    alpha?: number;
    gamma?: number;
    epsilon?: number;
    lWorld: WorldStore;
}
export class QLearningAgent {
    Q: Record<string, number[]> = {}; // Q-table String is the state, number[] are the Q-values
    visitTimes: Record<string, number> = {}; // For invalidation on Q-map, K=state V=update time

    spriteStore: SpriteStore<number>; // For Q-map and Observation rendering, contains sprites for rendering purposes of observation. Don't look if you don't like typed stuff
    lWorld: WorldStore; // For Q-map. Keeps
    alpha = 0.1;
    gamma = 0.9;
    epsilon = 0.1;
    tableSize = 0;
    learning = true;
    private currentState?: string;
    private markerManager?: MarkerManager;
    private inspectManager?: InspectMarkerManager;

    setMarkerManagers(markerManager?: MarkerManager, inspectManager?: InspectMarkerManager) {
        this.markerManager = markerManager;
        this.inspectManager = inspectManager;
    }

    constructor({ lWorld, alpha, gamma, epsilon }: QLearningAgentOptions) {
        if (alpha !== undefined) this.alpha = alpha;
        if (gamma !== undefined) this.gamma = gamma;
        if (epsilon !== undefined) this.epsilon = epsilon;
        this.lWorld = lWorld;
        this.spriteStore = new SpriteStore<number>(defaultSprites);
        this.spriteStore.populateNumberSprites(getNumberSpriteId);
    }

    getTableSize() {
        return this.tableSize;
    }

    getQTable() {
        return this.Q;
    }

    getQValues(obs: GenericObservation): number[] {
        const state = this.getStateKey(obs);

        if (!this.Q[state]) {
            // If new state
            this.lWorld.addState(state);
            this.Q[state] = Array(ACTIONS.length).fill(0);
            this.tableSize++;
            this.visitTimes[state] = 0;
        }

        return this.Q[state];
    }

    // unique key for each state
    getStateKey(obs: GenericObservation): string {
        return serializeObservation(obs);
    }

    chooseAction(obs: GenericObservation): number {
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
        obs: GenericObservation,
        action: number,
        reward: number,
        nextObs: GenericObservation,
        isTerminal: boolean = false,
        move: boolean = true
    ) {
        if (!this.learning) return; // Does not update visited count also!
        const state = this.getStateKey(obs);
        const values = this.getQValues(obs);
        const nextValues = this.getQValues(nextObs);
        this.currentState = this.getStateKey(nextObs);

        const aIdx = ACTIONS.indexOf(action);

        const maxNext = isTerminal ? 0 : Math.max(...nextValues); // Maximum reward if following best policy in state reached by step
        const adjustment = Number((this.alpha * (reward + this.gamma * maxNext - values[aIdx])).toFixed(6)); // TODO: Check if this accuracy is sufficient?
        values[aIdx] += adjustment; // Update rule

        this.visitTimes[state] = (this.visitTimes[state] || 0) + 1; // Update visited count (version count)

        if (adjustment !== 0) this.markerManager?.showReward(state, aIdx, adjustment / this.alpha, move);
    }

    getCurrentState() {
        return this.currentState ?? '';
    }
    inspect() {
        if (this.currentState)
            this.inspectManager?.show({
                stateId: this.currentState,
                qValues: this.Q[this.currentState],
            });
    }

    clearInspect() {
        this.inspectManager?.clear();
    }
}
