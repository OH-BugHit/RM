import * as L from 'leaflet';
import style from './style.module.css';

type ActiveFocus = {
    element: HTMLDivElement;
    update: () => void;
    timeoutId: number;
};

export class FocusOverlay {
    private active: ActiveFocus[] = [];

    constructor(private map: L.Map) {}

    show(latLng: L.LatLng, length: number) {
        const el = document.createElement('div');
        el.className = style.focus;

        this.map.getPanes().overlayPane.appendChild(el);

        const baseZoom = 14;
        const baseSize = 256;

        const update = () => {
            const p = this.map.latLngToLayerPoint(latLng);

            const scale = Math.pow(2, this.map.getZoom() - baseZoom);
            const size = baseSize * scale;

            el.style.width = `${size}px`;
            el.style.height = `${size}px`;

            el.style.left = `${p.x - size / 2}px`;
            el.style.top = `${p.y - size / 2}px`;
            el.style.animationDuration = `${length}ms`;
        };

        update();

        this.map.on('move zoom', update);

        const timeoutId = window.setTimeout(() => {
            this.map.off('move zoom', update);
            el.remove();

            this.active = this.active.filter((a) => a.element !== el);
        }, length);

        this.active.push({
            element: el,
            update,
            timeoutId,
        });
    }

    destroy() {
        for (const focus of this.active) {
            clearTimeout(focus.timeoutId);
            this.map.off('move zoom', focus.update);
            focus.element.remove();
        }

        this.active.length = 0;
    }
}
