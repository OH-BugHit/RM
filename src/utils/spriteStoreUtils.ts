export const NUMBER_SPRITE_BASE = 1000;

export function getNumberSpriteId(value: number) {
    return NUMBER_SPRITE_BASE + value + 1;
}
