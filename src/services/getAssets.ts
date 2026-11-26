import { Level } from '../types';
import { basicsLevel1 } from '../utils/levels/1basics/leveldata';
import { rewardsLevel1 } from '../utils/levels/2rewards/leveldata';
import { exploreLevel1 } from '../utils/levels/3exploreAndExploit/leveldata';
import { observationLevel1 } from '../utils/levels/4observation/leveldata';
import { learningLevel1 } from '../utils/levels/5learning/leveldata';
import { basicsBonusLevel1 } from '../utils/levels/bonusLevels/bonus1/leveldata';
import { rewardsBonusLevel1 } from '../utils/levels/bonusLevels/reward1/leveldata';

export const getLevel = (levelID: string | null | undefined): Level => {
    // TODO implement level getter from genai-server here!
    switch (levelID) {
        case 'basics-1': {
            return basicsLevel1;
        }
        case 'rewards-1': {
            return rewardsLevel1;
        }
        case 'ex-1': {
            return exploreLevel1;
        }
        case 'obs-1': {
            return observationLevel1;
        }
        case 'learn-1': {
            return learningLevel1;
        }
        case 'rewards-b-1': {
            return rewardsBonusLevel1;
        }
        case 'basic-b-1': {
            return basicsBonusLevel1;
        }
    }
    return basicsLevel1;
};
