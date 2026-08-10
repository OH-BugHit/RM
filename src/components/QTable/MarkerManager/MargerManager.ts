import * as L from 'leaflet';
import { ObservationShape } from '../../../types';
import { WorldStore } from '../utils';
import { getActionPosition } from './markerUtils';
import style from './style.module.css';

export type MarkerType = 'positive' | 'negative';

export class MarkerManager {
    private readonly lifetimeMs = 2000;
    private readonly maxMarkers = 20;

    private markers: L.Marker[] = [];

    constructor(
        private map: L.Map,
        private world: WorldStore,
        private observationShape: ObservationShape
    ) {}

    showReward(stateId: string, action: number, reward: number, move: boolean = true) {
        const latLng = getActionPosition(this.map, this.world, stateId, this.observationShape, action);
        if (!latLng) return;
        if (move) this.map.setView(latLng);

        const marker = L.marker(latLng, {
            icon: L.divIcon({
                className: '',
                html: `
            <div class="${style.marker}">
                <div class="${style.dot}">
                    ${reward.toFixed(3)}
                </div>
            </div>
        `,
                iconSize: [24, 32],
                iconAnchor: [12, 32],
            }),
            interactive: false,
        }).addTo(this.map);

        this.markers.push(marker);

        if (this.markers.length > this.maxMarkers) {
            const oldest = this.markers.shift();

            if (oldest) {
                oldest.remove();
            }
        }

        window.setTimeout(() => {
            marker.remove();
            const index = this.markers.indexOf(marker);

            if (index !== -1) {
                this.markers.splice(index, 1);
            }
        }, this.lifetimeMs);
    }

    showOld(stateId: string, action: number, type: MarkerType, move: boolean = true) {
        const latLng = getActionPosition(this.map, this.world, stateId, this.observationShape, action);
        if (!latLng) return;
        if (move) this.map.setView(latLng);

        const marker = L.marker(latLng, {
            icon: L.divIcon({
                className: '',
                html: `
            <div class="${style.marker}">
                <div class="${style.dot}">
                    ${type === 'positive' ? '💚' : '💔'}
                </div>
            </div>
        `,
                iconSize: [24, 32],
                iconAnchor: [12, 32],
            }),
            interactive: false,
        }).addTo(this.map);

        this.markers.push(marker);

        if (this.markers.length > this.maxMarkers) {
            const oldest = this.markers.shift();

            if (oldest) {
                oldest.remove();
            }
        }

        window.setTimeout(() => {
            marker.remove();
            const index = this.markers.indexOf(marker);

            if (index !== -1) {
                this.markers.splice(index, 1);
            }
        }, this.lifetimeMs);
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
