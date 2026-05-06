import { GridConfig } from '../../types';

export const gridRoboDogConfig: GridConfig = {
    size: 3,
    hidden: [0, 6, 8], // corners
    center: 4,
    special: {
        2: 'bark',
    },
    neighborMap: {
        1: 0, // top
        5: 3, // right
        7: 1, // bottom
        3: 2, // left
    },
    qMap: {
        1: 0,
        3: 2,
        5: 3,
        7: 1,
        4: 5, // center
        2: 4, // image cell
    },
};

export const gridAdventurerConfig: GridConfig = {
    size: 5,
    hidden: [0, 20, 24], // corners
    center: 12,
    special: {
        4: 'bark',
    },
    neighborMap: {
        1: 0, // row 1
        2: 1,
        3: 2,
        5: 3, // row 2
        6: 4,
        7: 5, // top
        8: 6,
        9: 7,
        10: 8, // row 3
        11: 9, // left from agent
        13: 10, // right from agent
        14: 11,
        15: 12, // row 4
        16: 13,
        17: 14, // bottom
        18: 15,
        19: 16,
        21: 17, // row 5 ok?
        22: 18, // ok?
        23: 19, // ok?
    },
    qMap: {
        7: 0,
        11: 2,
        13: 3,
        17: 1,
        12: 5, // center
        4: 4, // image cell
    },
};
