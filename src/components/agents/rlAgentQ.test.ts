import { describe, expect, it } from 'vitest';
import { buildRenderSpec } from '../../views/Observation/renderTools';
import { gridSmallConfig } from '../../views/Observation/gridConfigs';
import { parseObservationState, serializeObservation } from './rlAgentQ';

describe('observation state serialization', () => {
    it('serializes observation states with negative cell types and parses them back', () => {
        const obs = {
            neighbors: [-1, 0, 2, 8],
            POIdirection: 4,
        };

        const state = serializeObservation(obs);

        expect(state).toBe('-1,0,2,8-4');
        expect(parseObservationState(state)).toEqual({
            neighbors: ['-1', '0', '2', '8'],
            POIdirection: '4',
        });
    });

    it('buildRenderSpec can parse comma-separated states containing spawn cells', () => {
        const spec = buildRenderSpec('-1,0,0,0-4', [0, 0, 0, 0, 0, 0], gridSmallConfig);

        expect(spec.cells.length).toBeGreaterThan(0);
    });
});
