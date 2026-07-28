import { StoryProgress } from '../types';

export interface Task {
    id: string;
    text: string;
    // StoryProgress value for this task to be set completed
    field: StoryProgressField;
}

export interface TaskGroup {
    id: string;
    title: string;
    visibleFrom: number;
    visibleTo?: number;
    tasks: Task[];
}

export type StoryProgressField = NestedKeyOf<StoryProgress>;

// Union of nested keys
type NestedKeyOf<T> = {
    [K in keyof T & string]: T[K] extends object ? `${K}.${keyof T[K] & string}` : K;
}[keyof T & string];

export const TASK_GROUPS: TaskGroup[] = [
    {
        id: 'agent',
        title: 'story.tasks.agent.title',
        visibleFrom: 1,
        visibleTo: 5,
        tasks: [
            {
                id: 'agent-menu',
                text: 'story.tasks.agent.openMenu',
                field: 'agent.opened',
            },
            {
                id: 'agent-image',
                text: 'story.tasks.agent.agentImage',
                field: 'agent.img',
            },
            {
                id: 'agent-obs',
                text: 'story.tasks.agent.obsShape',
                field: 'agent.obsShape',
            },
            {
                id: 'agent-name',
                text: 'story.tasks.agent.agentName',
                field: 'agent.name',
            },
        ],
    },
    {
        id: 'design',
        title: 'story.tasks.design.title',
        visibleFrom: 5,
        visibleTo: 9,
        tasks: [
            {
                id: 'design-menu',
                text: 'story.tasks.design.openMenu',
                field: 'design.opened',
            },
            {
                id: 'solid',
                text: 'story.tasks.design.solid',
                field: 'design.solid',
            },
            {
                id: 'spawn',
                text: 'story.tasks.design.spawn',
                field: 'design.spawn',
            },
            {
                id: 'goal',
                text: 'story.tasks.design.goal',
                field: 'design.goal',
            },
        ],
    },
    {
        id: 'environment',
        title: 'story.tasks.environment.title',
        visibleFrom: 9,
        visibleTo: 12,
        tasks: [
            {
                id: 'solid',
                text: 'story.tasks.environment.goalSet',
                field: 'environment.goalSet',
            },
        ],
    },
    {
        id: 'rewards',
        title: 'story.tasks.rewards.title',
        visibleFrom: 12,
        visibleTo: 14,
        tasks: [
            {
                id: 'solid',
                text: 'story.tasks.rewards.openMenu',
                field: 'rewards.opened',
            },
        ],
    },
    {
        id: 'settings',
        title: 'story.tasks.settings.title',
        visibleFrom: 14,
        visibleTo: 17,
        tasks: [
            {
                id: 'rewards-menu',
                text: 'story.tasks.settings.openMenu',
                field: 'settings.opened',
            },
            {
                id: 'rewards-envName',
                text: 'story.tasks.settings.name',
                field: 'environment.name',
            },
        ],
    },
];
