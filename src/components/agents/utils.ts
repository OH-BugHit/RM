import { GenericObservation } from '../../types';

export function serializeObservation(obs: GenericObservation): string {
    return `${obs.neighbours.map((n) => String(n)).join(',')}-${obs.POIdirection}`;
}

export function parseObservationState(state: string): { neighbours: string[]; POIdirection: string } {
    const separator = state.lastIndexOf('-');

    if (separator === -1) {
        return {
            neighbours: state.split(''),
            POIdirection: '4',
        };
    }

    const neighborsPart = state.slice(0, separator);
    const POIdirection = state.slice(separator + 1);

    return {
        neighbours: neighborsPart.includes(',') ? neighborsPart.split(',') : neighborsPart.split(''),
        POIdirection,
    };
}
