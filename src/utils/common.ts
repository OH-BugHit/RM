import { Actions } from '../types';

export const stringifyAction = (action: Actions | null) => {
    switch (action) {
        case Actions.up:
            return 'Up';
        case Actions.down:
            return 'Down';
        case Actions.left:
            return 'Left';
        case Actions.right:
            return 'Right';
        case Actions.bark:
            return 'Bark';
        case Actions.stay:
            return 'Stay';
        default:
            return 'No action';
    }
};

export const getQColor = (value: number, minQ: number, maxQ: number) => {
    if (maxQ === minQ) return 'lightgray';
    const gamma = 8;

    if (value < 0) {
        const norm = Math.abs(value / minQ);
        return `rgba(255, 0, 0, ${Math.pow(norm, gamma)})`;
    }

    const norm = value / maxQ;
    return `rgba(0, 255, 0, ${Math.pow(norm, gamma)})`;
};
