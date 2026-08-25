import style from './level.module.css';
import { useAtom } from 'jotai';
import { OpenLevelGroupsAtom } from '../../../../atoms/state';
import { GroupType, LevelGroup } from '../../../../types';
import { levelGroups } from '../../../../utils/levels/levelGroups';
import GroupSelection from './GroupSelection';
import { useState } from 'react';
import { Button } from '@genai-fi/base';
import { useTranslation } from 'react-i18next';

export default function Levels() {
    const { t } = useTranslation();
    const groups = levelGroups;

    const [openGroups, setOpenGroups] = useAtom(OpenLevelGroupsAtom);
    const [selected, setSelected] = useState<LevelGroup | null>(null);

    const handleSelect = (selected: GroupType) => {
        setOpenGroups((current) => {
            const next = new Set(current);
            if (next.has(selected)) {
                next.delete(selected);
            } else {
                next.add(selected);
            }
            return next;
        });
    };

    return (
        <div className={style.levelsContainer}>
            <div className={style.stageInformation}>
                {selected ? (
                    <>
                        <h2>{selected.groupName}</h2>
                        <p>{t(`teacher.levels.stageInfo.${selected.groupType}`)}</p>
                        <Button
                            variant="contained"
                            onClick={() => handleSelect(selected.groupType)}
                            sx={{ width: 'max-content', minWidth: '180px' }}
                            color={openGroups.has(selected.groupType) ? 'warning' : 'primary'}
                        >
                            {openGroups.has(selected.groupType) ? 'Disable' : 'Enable for students'}
                        </Button>
                    </>
                ) : (
                    <p>Select</p>
                )}
            </div>
            <div className={style.levelsCards}>
                {groups.map((group) => (
                    <GroupSelection
                        key={group.groupName}
                        title={group.groupName}
                        levels={group.levels}
                        onSelect={() => setSelected(group)}
                        groupSelected={selected?.groupType === group.groupType}
                        groupActive={openGroups.has(group.groupType)}
                        groupType={group.groupType}
                    />
                ))}
            </div>
        </div>
    );
}
