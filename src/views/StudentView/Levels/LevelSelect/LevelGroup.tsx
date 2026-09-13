import style from './levelGroup.module.css';
import { Level } from '../../../../types';
import LevelItem from '../../../Teacher/TeacherContent/Levels/LevelItem';
import { Button } from '@genai-fi/base';
import { useGameScale } from '../../../../context/GameScale/useGameScale';

interface LevelGroupProps {
    title: string;
    levels: Level[];
    onSelect: (level: Level) => void;
    selected?: Level | null;
    groupOpen?: boolean;
    interactive?: boolean;
}

export default function LevelGroup({
    levels,
    title,
    onSelect,
    selected = null,
    groupOpen = true,
    interactive = true,
}: LevelGroupProps) {
    const { s, sw } = useGameScale();
    return (
        <div
            className={`${style.levelGroup} ${groupOpen ? '' : style.disabled}`}
            style={{ width: `${sw(400)}px`, height: `${s(600)}px` }}
        >
            <h2>{title}</h2>
            <div className={style.levels}>
                {interactive
                    ? levels.map((level) => (
                          <Button
                              onClick={() => onSelect(level)}
                              disabled={!groupOpen}
                          >
                              <LevelItem
                                  key={level.level.manifest.gameName}
                                  level={level}
                                  selected={selected === level}
                              />
                          </Button>
                      ))
                    : levels[0] && <LevelItem level={levels[0]} />}
            </div>
        </div>
    );
}
