import style from './groupSelection.module.css';
import { GroupType, Level } from '../../../../types';
import LevelItem from '../../../Teacher/TeacherContent/Levels/LevelItem';
import { Button } from '@genai-fi/base';

interface GroupSelectionProps {
    title: string;
    levels: Level[];
    onSelect: (group: GroupType) => void;
    groupSelected?: boolean;
    groupActive?: boolean;
    groupType: GroupType;
}

export default function GroupSelection({
    levels,
    title,
    onSelect,
    groupActive,
    groupSelected,
    groupType,
}: GroupSelectionProps) {
    return (
        <Button
            onClick={() => onSelect(groupType)}
            className={`${style.levelGroup} ${groupActive ? style.active : ''} ${groupSelected ? style.selected : ''}`}
        >
            <h2>{title}</h2>

            <div className={style.levels}>
                {levels[0] && (
                    <LevelItem
                        key={levels[0].level.manifest.gameName}
                        level={levels[0]}
                    />
                )}
            </div>
        </Button>
    );
}
