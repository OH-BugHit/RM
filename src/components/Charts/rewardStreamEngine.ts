import { SetStateAction } from 'jotai';
import { Dispatch } from 'react';

export type ChartState = {
    episode: number[];
    reward: number[];
    win: number[];
};

export type BucketPoint = {
    episode: number;
    reward: number;
    win: number;
};

type Bucket = {
    rewardSum: number;
    rewardCount: number;
    winSum: number;
    winCount: number;
};

const BUCKET_MS = 50;

let bucket: Bucket | null = null;
let currentEpisode = 0;

let listeners: ((p: BucketPoint) => void)[] = [];

export function subscribe(fn: (p: BucketPoint) => void) {
    listeners.push(fn);
    return () => {
        listeners = listeners.filter((l) => l !== fn);
    };
}

function emit(p: BucketPoint) {
    for (const l of listeners) l(p);
}

export function onEpisodeEnd() {
    currentEpisode++;
}

export function ingest(reward: number, win: boolean) {
    if (!bucket) {
        bucket = {
            rewardSum: reward,
            rewardCount: 1,
            winSum: win ? 1 : 0,
            winCount: 1,
        };
        return;
    }

    bucket.rewardSum += reward;
    bucket.rewardCount++;
    bucket.winSum += win ? 1 : 0;
    bucket.winCount++;
}

export function resetAll(setChart: Dispatch<SetStateAction<ChartState>>) {
    bucket = null;
    currentEpisode = 0;

    setChart({
        episode: [],
        reward: [],
        win: [],
    });
}

setInterval(() => {
    if (!bucket || bucket.rewardCount === 0) return;

    emit({
        episode: currentEpisode,
        reward: bucket.rewardSum / bucket.rewardCount,
        win: bucket.winSum / bucket.winCount,
    });

    bucket = null;
}, BUCKET_MS);
