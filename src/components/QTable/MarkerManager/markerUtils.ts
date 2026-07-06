import * as L from 'leaflet';
import { ObservationShape } from '../../../types';
import { WorldStore } from '../utils';

const ACTION_POSITIONS_5: Array<[number, number]> = [
    [1, 2], // up
    [3, 2], // down
    [2, 1], // left
    [2, 3], // right
    [0, 4], // special
    [2, 2], // stay
];

const ACTION_POSITIONS_7: Array<[number, number]> = [
    [2, 3], // up
    [4, 3], // down
    [3, 2], // left
    [3, 4], // right
    [1, 6], // special
    [3, 3], // stay
];

export function getActionPosition(
    map: L.Map,
    world: WorldStore,
    stateId: string,
    observationShape: ObservationShape,
    action: number
): L.LatLng | null {
    const state = world.statePos.get(stateId);
    if (!state) return null;

    const gridSize = observationShape === 'large' ? 7 : 5;
    const positions = observationShape === 'large' ? ACTION_POSITIONS_7 : ACTION_POSITIONS_5;

    const pos = positions[action];
    if (!pos) return null;

    const [row, col] = pos;

    const worldX = state.x + (col + 0.5) / gridSize;
    const worldY = state.y + (row + 0.5) / gridSize;

    const point = L.point(worldX * 256, worldY * 256); // Cell pixelsize here.

    if (action === 4) {
        point.x -= 24;
        point.y -= 4;
    }

    return map.unproject(point, 14);
}
