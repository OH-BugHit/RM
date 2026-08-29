import { GroupType, LevelGroup } from '../../types';
import { basicsLevel1 } from './1basics/leveldata';
import { rewardsLevel1 } from './2rewards/leveldata';
import { exploreLevel1 } from './3exploreAndExploit/leveldata';
import { observationLevel1 } from './4observation/leveldata';

const group1: LevelGroup = { groupType: 'basic', groupName: 'Basic', levels: [basicsLevel1] };
const group2: LevelGroup = { groupType: 'rewards', groupName: 'Rewards', levels: [rewardsLevel1] };
const group3: LevelGroup = { groupType: 'exploreExploit', groupName: 'Explore and Exploit', levels: [exploreLevel1] };
const group4: LevelGroup = { groupType: 'observation', groupName: 'Observation', levels: [observationLevel1] };
const group5: LevelGroup = { groupType: 'learning', groupName: 'Learning', levels: [exploreLevel1] };
const group6: LevelGroup = { groupType: 'bonus', groupName: 'Bonus', levels: [exploreLevel1] };
export const levelGroups = [group1, group2, group3, group4, group5, group6];

export const allGroups = new Set<GroupType>(['basic', 'rewards', 'exploreExploit', 'observation', 'learning', 'bonus']);
