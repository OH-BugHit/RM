import { basicsLevel1 } from '../../../../utils/levels/1basics/leveldata';
import { rewardsLevel1 } from '../../../../utils/levels/2rewards/leveldata';
import { exploreLevel1 } from '../../../../utils/levels/3exploreAndExploit/leveldata';
import { observationLevel1 } from '../../../../utils/levels/4observation/leveldata';
import { learningLevel1 } from '../../../../utils/levels/5learning/leveldata';
import { basicsBonusLevel1 } from '../../../../utils/levels/bonusLevels/bonus1/leveldata';
import { rewardsBonusLevel1 } from '../../../../utils/levels/bonusLevels/reward1/leveldata';
import { LevelMapNode } from './levelMapTypes';

export const levelMapNodes: LevelMapNode[] = [
    {
        id: 'basic-1',
        groupType: 'basic',
        level: basicsLevel1,
        x: 160,
        y: 50,
        kind: 'required',
        allowed: true,
    },

    {
        id: 'basic-2',
        groupType: 'basic',
        level: basicsBonusLevel1,
        x: 220,
        y: 80,
        kind: 'bonus',
        allowed: false,
    },

    {
        id: 'rewards-1',
        groupType: 'rewards',
        level: rewardsLevel1,
        x: 580,
        y: 40,
        kind: 'required',
        allowed: true,
    },
    {
        id: 'rewards-2',
        groupType: 'rewards',
        level: rewardsBonusLevel1,
        x: 630,
        y: 75,
        kind: 'bonus',
        allowed: false,
    },
    {
        id: 'explore-exploit-1',
        groupType: 'exploreExploit',
        level: exploreLevel1,
        x: 1080,
        y: 45,
        kind: 'required',
        allowed: true,
    },
    {
        id: 'observation-1',
        groupType: 'observation',
        level: observationLevel1,
        x: 1580,
        y: 52,
        kind: 'required',
        allowed: true,
    },
    {
        id: 'learning-1',
        groupType: 'learning',
        level: learningLevel1,
        x: 1980,
        y: 50,
        kind: 'required',
        allowed: true,
    },
];
