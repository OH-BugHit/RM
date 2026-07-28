import { ObservationShape, StateViewType } from '../../../types';

export interface SpriteData {
    id: number;
    bitmap: ImageBitmap;
}

export interface InitSpritesMessage {
    type: 'initSprites';
    sprites: SpriteData[];
}

export interface UpdateSpritesMessage {
    type: 'updateSprites';
    sprites: SpriteData[];
}

export interface InitWorldMessage {
    type: 'initWorld';
    world: Array<[string, string]>;
}

export interface UpdateWorldMessage {
    type: 'updateWorld';
    world: Array<[string, string]>;
}

export interface RenderTileMessage {
    type: 'renderTile';

    requestId: number;

    tileSize: number;

    tileX: number;
    tileY: number;
    zoom: number;

    observationShape: ObservationShape;

    qTable: Record<string, number[]>;
    viewType: StateViewType;
}

export interface TileRenderedMessage {
    type: 'tileRendered';

    requestId: number;

    bitmap: ImageBitmap;
}

export interface WorkerReadyMessage {
    type: 'ready';
}

export type WorkerRequest =
    | InitSpritesMessage
    | UpdateSpritesMessage
    | InitWorldMessage
    | UpdateWorldMessage
    | RenderTileMessage;

export type WorkerResponse = WorkerReadyMessage | TileRenderedMessage;
