import { basicsLevel1 } from '../../../../utils/levels/1basics/leveldata';
import { rewardsLevel1 } from '../../../../utils/levels/2rewards/leveldata';
import { exploreLevel1 } from '../../../../utils/levels/3exploreAndExploit/leveldata';
import { observationLevel1 } from '../../../../utils/levels/4observation/leveldata';
import { learningLevel1 } from '../../../../utils/levels/5learning/leveldata';
import { LevelMapNode } from './levelMapTypes';

export const levelMapNodes: LevelMapNode[] = [
    {
        id: 'basic-1',
        groupType: 'basic',
        level: basicsLevel1,
        x: 160,
        y: 320,
        kind: 'required',
        allowed: true,
    },
    /*
    {
        id: 'basic-2',
        groupType: 'basic',
        level: observationLevel1,
        x: 220,
        y: 600,
        kind: 'bonus',
        allowed: false,
    },
    */
    {
        id: 'rewards-1',
        groupType: 'rewards',
        level: rewardsLevel1,
        x: 580,
        y: 300,
        kind: 'required',
        allowed: true,
    },
    {
        id: 'explore-exploit-1',
        groupType: 'exploreExploit',
        level: exploreLevel1,
        x: 1080,
        y: 390,
        kind: 'required',
        allowed: true,
    },
    {
        id: 'observation-1',
        groupType: 'observation',
        level: observationLevel1,
        x: 1480,
        y: 240,
        kind: 'required',
        allowed: true,
    },
    {
        id: 'learning-1',
        groupType: 'learning',
        level: learningLevel1,
        x: 1880,
        y: 350,
        kind: 'required',
        allowed: true,
    },
];
