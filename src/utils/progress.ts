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
        visibleFrom: 2,
        visibleTo: 5,
        tasks: [
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
        ],
    },
    {
        id: 'design',
        title: 'story.tasks.design.title',
        visibleFrom: 6,
        visibleTo: 10,
        tasks: [
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
        visibleFrom: 10,
        visibleTo: 11,
        tasks: [
            {
                id: 'solid',
                text: 'story.tasks.environment.goalSet',
                field: 'environment.goalSet',
            },
        ],
    },
    {
        id: 'settings',
        title: 'story.tasks.settings.title',
        visibleFrom: 11,
        visibleTo: 13,
        tasks: [
            {
                id: 'rewards-envName',
                text: 'story.tasks.settings.name',
                field: 'environment.name',
            },
        ],
    },
    {
        id: 'rewards',
        title: 'story.tasks.rewards.title',
        visibleFrom: 14,
        visibleTo: 15,
        tasks: [
            {
                id: 'solid',
                text: 'story.tasks.rewards.openMenu',
                field: 'rewards.opened',
            },
        ],
    },

    {
        id: 'observation_controls',
        title: 'story.tasks.hud.obs_controls.title',
        visibleFrom: 16,
        visibleTo: 19,
        tasks: [
            {
                id: 'controls-play',
                text: 'story.tasks.hud.obs_controls.play',
                field: 'settings.opened',
            },
            {
                id: 'controls-steps',
                text: 'story.tasks.hud.obs_controls.step',
                field: 'hud.agentView',
            },
            {
                id: 'obs-agent',
                text: 'story.tasks.hud.obs_controls.agentObs',
                field: 'settings.opened',
            },
        ],
    },
];
