import { Cell, Side } from '../../../types';

const MIN_SIZE = 5;

export const cloneCell = (cell: Cell): Cell => ({
    type: cell.type,
    image: cell.image,
    reloadTime: cell.reloadTime,
    timer: cell.timer,
});

export function resizeGrid(grid: Cell[][], side: Side, isAdd: boolean, innerFillCell: Cell): Cell[][] {
    if (!grid.length || !grid[0]?.length) return grid;

    return isAdd ? addToSide(grid, side, innerFillCell) : shrinkFromSide(grid, side);
}

function addToSide(grid: Cell[][], side: Side, innerFillCell: Cell): Cell[][] {
    switch (side) {
        case 'top':
            return addTop(grid, innerFillCell);
        case 'bottom':
            return addBottom(grid, innerFillCell);
        case 'left':
            return addLeft(grid, innerFillCell);
        case 'right':
            return addRight(grid, innerFillCell);
    }
}

function addTop(grid: Cell[][], innerFillCell: Cell): Cell[][] {
    const width = grid[0].length;

    const oldTop = grid[0].map(cloneCell);

    const newTop = oldTop.map(cloneCell);

    const secondRow = oldTop.map((cell, x) =>
        x === 0 || x === width - 1 ? cloneCell(cell) : cloneCell(innerFillCell)
    );

    const rest = grid.slice(1).map((r) => r.map(cloneCell));

    return [newTop, secondRow, ...rest];
}

function addBottom(grid: Cell[][], innerFillCell: Cell): Cell[][] {
    const height = grid.length;
    const width = grid[0].length;

    const oldBottom = grid[height - 1].map(cloneCell);

    const newBottom = oldBottom.map(cloneCell);

    const secondBottom = oldBottom.map((cell, x) =>
        x === 0 || x === width - 1 ? cloneCell(cell) : cloneCell(innerFillCell)
    );

    const rest = grid.slice(0, height - 1).map((r) => r.map(cloneCell));

    return [...rest, secondBottom, newBottom];
}

function addLeft(grid: Cell[][], innerFillCell: Cell): Cell[][] {
    const height = grid.length;

    const oldLeftCol = grid.map((r) => r[0]).map(cloneCell);

    return grid.map((row, y) => {
        const newLeft = cloneCell(row[0]);

        const second = oldLeftCol[y];

        const rest = row.slice(1).map(cloneCell);

        const inner = y === 0 || y === height - 1 ? cloneCell(second) : cloneCell(innerFillCell);

        return [newLeft, inner, ...rest];
    });
}

function addRight(grid: Cell[][], innerFillCell: Cell): Cell[][] {
    const height = grid.length;
    const width = grid[0].length;

    const oldRightCol = grid.map((r) => r[width - 1]).map(cloneCell);

    return grid.map((row, y) => {
        const newRight = cloneCell(row[width - 1]);

        const second = oldRightCol[y];

        const rest = row.slice(0, -1).map(cloneCell);

        const inner = y === 0 || y === height - 1 ? cloneCell(second) : cloneCell(innerFillCell);

        return [...rest, inner, newRight];
    });
}

// Shrink

function shrinkFromSide(grid: Cell[][], side: Side): Cell[][] {
    switch (side) {
        case 'top':
            return shrinkTop(grid);
        case 'bottom':
            return shrinkBottom(grid);
        case 'left':
            return shrinkLeft(grid);
        case 'right':
            return shrinkRight(grid);
    }
}

function shrinkTop(grid: Cell[][]): Cell[][] {
    if (grid.length <= MIN_SIZE) return grid;

    const newTop = grid[0].map(cloneCell);

    const rest = grid.slice(2).map((r) => r.map(cloneCell));

    return [newTop, ...rest];
}

function shrinkBottom(grid: Cell[][]): Cell[][] {
    if (grid.length <= MIN_SIZE) return grid;

    const height = grid.length;

    const newBottom = grid[height - 1].map(cloneCell);

    const rest = grid.slice(0, height - 2).map((r) => r.map(cloneCell));

    return [...rest, newBottom];
}

function shrinkLeft(grid: Cell[][]): Cell[][] {
    if (grid[0].length <= MIN_SIZE) return grid;

    return grid.map((r) => {
        const newLeft = cloneCell(r[0]);
        const rest = r.slice(2).map(cloneCell);
        return [newLeft, ...rest];
    });
}

function shrinkRight(grid: Cell[][]): Cell[][] {
    if (grid[0].length <= MIN_SIZE) return grid;

    return grid.map((r) => {
        const newRight = cloneCell(r[r.length - 1]);
        const rest = r.slice(0, -2).map(cloneCell);
        return [...rest, newRight];
    });
}
