// Bridge.tsx
import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { ChartAtom } from '../../atoms/gameState';
import { subscribe } from './rewardStreamEngine';

export function Bridge() {
    const setChart = useSetAtom(ChartAtom);

    useEffect(() => {
        return subscribe((p) => {
            setChart((prev) => {
                const MAX = 2000;

                const episode = [...prev.episode, p.episode];
                const reward = [...prev.reward, p.reward];
                const win = [...prev.win, p.win];

                if (episode.length > MAX) {
                    episode.splice(0, episode.length - MAX);
                    reward.splice(0, reward.length - MAX);
                    win.splice(0, win.length - MAX);
                }

                return { episode, reward, win };
            });
        });
    }, [setChart]);

    return null;
}
