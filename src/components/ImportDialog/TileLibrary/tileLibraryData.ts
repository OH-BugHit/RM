import { TileLibraryCategory, TileLibraryItem } from '../../../types';

export type TileLibrarySection = {
    id: TileLibraryCategory;
    label: string;
    items: TileLibraryItem[];
};

export const TILE_LIBRARY: TileLibrarySection[] = [
    {
        id: 'doors',
        label: 'Doors',
        items: [
            {
                id: 'door-1',
                label: 'Stone trap',
                image: '/images/assets/door1.png',
                category: 'treasures',
            },
            {
                id: 'door-2',
                label: 'Wooden trap',
                image: '/images/assets/doorLocked1_260.png',
                category: 'treasures',
            },
        ],
    },

    {
        id: 'objects',
        label: 'Objects',
        items: [
            {
                id: 'obj-1',
                label: 'Key',
                image: '/images/assets/key1.png',
                category: 'objects',
            },
            {
                id: 'obj-2',
                label: 'Flower pot',
                image: '/images/assets/pot_intact.png',
                category: 'objects',
            },
            {
                id: 'obj-3',
                label: 'Broken flower pot',
                image: '/images/assets/pot_broken.png',
                category: 'objects',
            },
        ],
    },
    {
        id: 'walls',
        label: 'Walls',
        items: [
            {
                id: 'wall-1',
                label: 'Bush wall',
                image: '/images/assets/bush_240.png',
                category: 'walls',
            },
            {
                id: 'wall-2',
                label: 'Stone wall',
                image: '/images/assets/wall1.png',
                category: 'walls',
            },
            {
                id: 'wall-3',
                label: 'Brick wall',
                image: '/images/assets/wall.png',
                category: 'walls',
            },
        ],
    },
    {
        id: 'floors',
        label: 'Floors',
        items: [
            {
                id: 'floor-1',
                label: 'White stone',
                image: '/images/assets/cleanWhiteStone.png',
                category: 'floors',
            },
            {
                id: 'grass-1',
                label: 'Grass',
                image: '/images/assets/grass.png',
                category: 'floors',
            },
            {
                id: 'water-1',
                label: 'Fresh water',
                image: '/images/assets/water_light.png',
                category: 'floors',
            },
            {
                id: 'water-2',
                label: 'Sea water',
                image: '/images/assets/water.png',
                category: 'floors',
            },
        ],
    },
    {
        id: 'treasures',
        label: 'Treasures',
        items: [
            {
                id: 'treasure-1',
                label: 'Gold coins',
                image: '/images/assets/smallTreasure_260.png',
                category: 'treasures',
            },
            {
                id: 'treasure-2',
                label: 'Treasure chest',
                image: '/images/assets/bigTreasure_260.png',
                category: 'treasures',
            },
            {
                id: 'treasure-3',
                label: 'Cheese',
                image: '/images/assets/cheese.png',
                category: 'treasures',
            },
            {
                id: 'dust-1',
                label: 'Dust',
                image: '/images/assets/dust2.png',
                category: 'treasures',
            },
            {
                id: 'treasure-5',
                label: 'Long grass',
                image: '/images/assets/grassLong.png',
                category: 'treasures',
            },
        ],
    },
    {
        id: 'hazards',
        label: 'Hazards',
        items: [
            {
                id: 'hazard-1',
                label: 'Stone trap',
                image: '/images/assets/trap1_260.png',
                category: 'hazards',
            },
            {
                id: 'hazard-2',
                label: 'Wooden trap',
                image: '/images/assets/trap2_260.png',
                category: 'hazards',
            },
            {
                id: 'hazard-3',
                label: 'Mouse trap',
                image: '/images/assets/mouseTrap.png',
                category: 'hazards',
            },
            {
                id: 'hazard-4',
                label: 'Poop',
                image: '/images/assets/poo.png',
                category: 'hazards',
            },
            {
                id: 'hazard-5',
                label: 'Hedgehog',
                image: '/images/assets/hedgehog.png',
                category: 'hazards',
            },
        ],
    },
    {
        id: 'agents',
        label: 'Agents',
        items: [
            {
                id: 'agent-1',
                label: 'Robo Dog',
                image: '/images/agents/robo_dog.png',
                category: 'agents',
            },
            {
                id: 'agent-2',
                label: 'Robot',
                image: '/images/agents/ownAgent.png',
                category: 'agents',
            },
            {
                id: 'agent-3',
                label: 'Vacuum robot',
                image: '/images/agents/robo_vacuum.png',
                category: 'agents',
            },
        ],
    },
];
