/**
 * Chunked canvas utilities for efficient Q-table rendering
 * Divides states into rectangular chunks, each with its own canvas
 */

export interface ChunkGridConfig {
    statesPerSide: number; // e.g., 10 for 10x10 = 100 states per chunk
    stateSpacing: number; // spacing between states
}

/**
 * Calculate which chunk a state index belongs to and its position within that chunk
 */
export function getChunkInfo(stateIndex: number, config: ChunkGridConfig) {
    const statesPerChunk = config.statesPerSide * config.statesPerSide;
    const chunkIndex = Math.floor(stateIndex / statesPerChunk);
    const indexInChunk = stateIndex % statesPerChunk;

    // Position within chunk (0-9 for 10x10 grid)
    const xInChunk = indexInChunk % config.statesPerSide;
    const yInChunk = Math.floor(indexInChunk / config.statesPerSide);

    return { chunkIndex, indexInChunk, xInChunk, yInChunk };
}

/**
 * Calculate canvas position offset for a state within its chunk
 */
export function getStateOffsetInChunk(xInChunk: number, yInChunk: number, stateSpacing: number) {
    return {
        x: xInChunk * stateSpacing,
        y: yInChunk * stateSpacing,
    };
}

/**
 * Calculate the chunk's position in world coordinates (for canvas positioning)
 */
export function getChunkWorldOffset(chunkIndex: number, config: ChunkGridConfig) {
    const chunkCanvasSize = config.statesPerSide * config.stateSpacing;

    // Arrange chunks in a grid (simple horizontal/vertical, not spiral)
    // You can change this to spiral if needed using getSpiralPosition
    const chunksPerRow = 10; // How many chunks per row
    const chunkX = (chunkIndex % chunksPerRow) * chunkCanvasSize;
    const chunkY = Math.floor(chunkIndex / chunksPerRow) * chunkCanvasSize;

    return { chunkX, chunkY };
}

/**
 * Get the canvas size for a single chunk
 */
export function getChunkCanvasSize(config: ChunkGridConfig) {
    return config.statesPerSide * config.stateSpacing;
}

/**
 * Calculate grid position for a chunk index
 * Places chunks in grid pattern: (0,0), (0,1), (1,0), (1,1), (2,0), (2,1)...
 * Goes through Y first, then increments X
 */
export function getGridChunkPosition(chunkIndex: number, chunkSize: number) {
    // Estimate grid size based on chunk count
    // We use a roughly square grid
    const gridCols = Math.ceil(Math.sqrt(chunkIndex + 1));

    const y = chunkIndex % gridCols;
    const x = Math.floor(chunkIndex / gridCols);

    return {
        x: x * chunkSize,
        y: y * chunkSize,
    };
}

/**
 * Calculate which chunks are visible in the viewport
 * Returns a set of chunk indices that should be rendered
 *
 * @param containerWidth - width of the container
 * @param containerHeight - height of the container
 * @param panX - pan offset X (in pixels)
 * @param panY - pan offset Y (in pixels)
 * @param zoomLevel - zoom level (1.0 = 100%)
 * @param chunkSize - size of one chunk in pixels
 * @param totalChunks - total number of chunks
 * @param preloadMargin - number of chunk sizes to preload around viewport (default: 2)
 */
export function getVisibleChunks(
    containerWidth: number,
    containerHeight: number,
    panX: number,
    panY: number,
    zoomLevel: number,
    chunkSize: number,
    totalChunks: number,
    preloadMargin: number = 2
): Set<number> {
    const visibleChunks = new Set<number>();

    // Calculate viewport bounds in world space
    // panX/Y are in screen space, need to convert to world space
    const viewportX = -panX / zoomLevel;
    const viewportY = -panY / zoomLevel;
    const viewportWidth = containerWidth / zoomLevel;
    const viewportHeight = containerHeight / zoomLevel;

    // Add margin for preloading
    const marginPixels = preloadMargin * chunkSize;
    const expandedLeft = viewportX - marginPixels;
    const expandedTop = viewportY - marginPixels;
    const expandedRight = viewportX + viewportWidth + marginPixels;
    const expandedBottom = viewportY + viewportHeight + marginPixels;

    // Estimate grid columns based on total chunks
    //const gridCols = Math.ceil(Math.sqrt(totalChunks));

    // Check which chunks overlap with expanded viewport
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const pos = getGridChunkPosition(chunkIndex, chunkSize);
        const chunkLeft = pos.x;
        const chunkTop = pos.y;
        const chunkRight = pos.x + chunkSize;
        const chunkBottom = pos.y + chunkSize;

        // Check if chunk overlaps with expanded viewport
        const overlapsX = !(chunkRight < expandedLeft || chunkLeft > expandedRight);
        const overlapsY = !(chunkBottom < expandedTop || chunkTop > expandedBottom);

        if (overlapsX && overlapsY) {
            visibleChunks.add(chunkIndex);
        }
    }

    return visibleChunks;
}
