import { GroupType, Level } from '../../../../types';

export type LevelMapNodeKind = 'required' | 'bonus';

export interface LevelMapNode {
    id: string;

    groupType: GroupType;

    level: Level;

    x: number; // pixel
    y: number; // relational

    kind: LevelMapNodeKind;
    allowed: boolean;
}
