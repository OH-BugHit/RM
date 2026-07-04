import { describe, expect, it } from 'vitest';
import { parseObservationState, serializeObservation } from './utils';

describe('observation state serialization', () => {
    it('serializes observation states with negative cell types and parses them back', () => {
        const obs = {
            neighbours: [-1, 0, 2, 8],
            POIdirection: 4,
        };

        const state = serializeObservation(obs);

        expect(state).toBe('-1,0,2,8-4');
        expect(parseObservationState(state)).toEqual({
            neighbours: ['-1', '0', '2', '8'],
            POIdirection: '4',
        });
    });
});
