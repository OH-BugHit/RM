import { GroupType, LevelGroup } from '../../types';
import { level1 } from './level1/leveldata';
import { level2 } from './level2/leveldata';
import { level3 } from './level3/leveldata';

const group1: LevelGroup = { groupType: 'basic', groupName: 'Basic', levels: [level1] };
const group2: LevelGroup = { groupType: 'rewards', groupName: 'Rewards', levels: [level2] };
const group3: LevelGroup = { groupType: 'exploreExploit', groupName: 'Explore and Exploit', levels: [level3] };
const group4: LevelGroup = { groupType: 'observation', groupName: 'Observation', levels: [level1, level2, level3] };
const group5: LevelGroup = { groupType: 'learning', groupName: 'Learning', levels: [level3] };
const group6: LevelGroup = { groupType: 'bonus', groupName: 'Bonus', levels: [level3] };
export const levelGroups = [group1, group2, group3, group4, group5, group6];

export const allGroups = new Set<GroupType>(['basic', 'rewards', 'exploreExploit', 'observation', 'learning', 'bonus']);
