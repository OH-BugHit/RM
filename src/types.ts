export enum RoboDogEntity {
    Empty = 0,
    Wall = 1,
    Trap = 2,
}

export type Observation = {
    neighbors: RoboDogEntity[];
    bandit: BanditPosition;
};

export enum BanditPosition {
    North = 0,
    South = 1,
    East = 2,
    West = 3,
    Away = 4,
}

export enum Actions {
    up = 0,
    down = 1,
    left = 2,
    right = 3,
    bark = 4,
    stay = 5,
}

export type AgentProps = {
    epsilon: number;
    gamma: number;
    alpha: number;
};

export type RoboDogEnv = {
    gridSize: number;
    maxTurns: number;
    numberOfPots: number;
    potReloadDelay: number;
    breakPotSpooksBurglar: boolean;
};

export type TempSettings = Record<
    Games,
    {
        env: EnvSettings;
        agent: AgentProps;
        reward: RewardSettings;
    }
>;

export type RoboDogRewards = {
    spookedBurglarReward: number;
    brokePotReward: number;
    barkSuccessReward: number;
    barkFailReward: number;
    burglarWonReward: number;
};

export type EnvSettings = {
    settings: RoboDogEnv | undefined;
};

export type RewardSettings = {
    settings: RoboDogRewards | undefined;
};

export type DogInfo = {
    timeLeft: number;
    result: string;
    message: string;
};

export type Control = {
    isRunning: boolean;
    isFast: boolean;
    takeStep: boolean;
};

export type Games = 'robodog' | 'none';
