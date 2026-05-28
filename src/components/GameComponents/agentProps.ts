import { AgentType, GenericObservation, Offset } from '../../types';

export const getAgentImage = (type: AgentType): string => {
    switch (type) {
        case 'robodog': {
            return 'images/agents/robo_dog.png';
        }
        case 'adventurer': {
            return 'images/agents/adventurer2.png';
        }
        default: {
            return 'images/agents/adventurer.png';
        }
    }
};

export const getAgentSounds = (type: AgentType): string[] => {
    switch (type) {
        case 'robodog': {
            return ['/sounds/bark.mp3'];
        }
        case 'adventurer': {
            return ['/sounds/hey1.mp3', '/sounds/hey2.mp3', '/sounds/hey3.mp3', '/sounds/hey4.mp3'];
        }
        default: {
            return [];
        }
    }
};

export const getAgentObservationShape = (type: AgentType): GenericObservation => {
    switch (type) {
        case 'robodog': {
            return { neighbors: [0, 0, 0, 0], POIdirection: 4 };
        }
        case 'adventurer': {
            return { neighbors: Array(20).fill(0), POIdirection: 4 };
        }
        default: {
            return { neighbors: [0, 0, 0, 0], POIdirection: 4 };
        }
    }
};

export const robodogOffset: Offset[] = [
    { dx: 0, dy: -1 }, // top
    { dx: 0, dy: 1 }, // bottom
    { dx: -1, dy: 0 }, // left
    { dx: 1, dy: 0 }, // right
];

export const getAdventurerOffset = (): Offset[] => {
    const adventurerOffset: Offset[] = [];

    for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
            if (Math.abs(dx) + Math.abs(dy) <= 3 && !(dx === 0 && dy === 0) && Math.abs(dx) < 3 && Math.abs(dy) < 3) {
                adventurerOffset.push({ dx, dy });
            }
        }
    }
    return adventurerOffset;
};
