import { ObservationShape } from '../../../types';
import { GRID_5, GRID_7, ObservationGridConfig } from '../gridConfigs';
import { QLearningAgent } from '../../agents/rlAgentQ';
import { WorldStore } from '../utils';
import { renderTile } from '../tileRenderer';

export class TileManager {
    private grid: ObservationGridConfig;
    constructor(
        private tileSize: number,
        private world: WorldStore,
        private agentRef: React.RefObject<QLearningAgent | undefined>,
        observationShape: ObservationShape
    ) {
        {
            this.grid = observationShape === 'large' ? GRID_7 : GRID_5;
        }
    }

    getTile(x: number, y: number, z: number) {
        const canvas = document.createElement('canvas');
        canvas.width = this.tileSize;
        canvas.height = this.tileSize;

        const ctx = canvas.getContext('2d');
        if (!ctx) return canvas;

        this.render(ctx, x, y, z);

        return canvas;
    }

    private render(ctx: CanvasRenderingContext2D, tileX: number, tileY: number, zoom: number) {
        const imgStore = this.agentRef.current?.spriteStore?.images;
        if (!imgStore) return;

        renderTile({
            ctx,
            tileSize: this.tileSize,
            tileX,
            tileY,
            zoom,
            world: this.world.grid,
            imgStore,
            qTable: this.agentRef.current?.Q ?? {},
            grid: this.grid,
        });
    }
}
