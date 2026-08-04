import * as L from 'leaflet';
import style from './style.module.css';
import { WorldStore } from '../utils';
import { getActionPosition } from '../MarkerManager/markerUtils';
import { ObservationShape } from '../../../types';

export class InspectMarkerManager {
    private markers: L.Marker[] = [];

    constructor(
        private readonly map: L.Map,
        private readonly world: WorldStore,
        private readonly observationShape: ObservationShape
    ) {}

    show({ stateId, qValues }: { stateId: string; qValues?: number[] }) {
        this.clear();

        for (let action = 0; action < 6; action++) {
            if (action === 4) continue;
            const latLng = getActionPosition(this.map, this.world, stateId, this.observationShape, action);

            if (!latLng) continue;

            const marker = L.marker(latLng, {
                icon: L.divIcon({
                    className: '',
                    html: `<div class="${style.marker}"></div>`,
                    iconSize: [24, 36],
                    iconAnchor: [0, 0],
                }),
            });

            marker.bindPopup(`
            <b>Action ${action}</b><br>
            State: ${stateId}
            Q-value: ${qValues ? qValues[action] : ''}
        `);

            marker.addTo(this.map);
            this.markers.push(marker);
        }
    }

    clear() {
        for (const marker of this.markers) {
            marker.remove();
        }

        this.markers.length = 0;
    }

    destroy() {
        this.clear();
    }
}
