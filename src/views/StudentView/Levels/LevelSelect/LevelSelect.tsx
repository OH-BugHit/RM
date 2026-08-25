import { useMemo, useState } from 'react';
import style from './levelSelect.module.css';
import { Level } from '../../../../types';
import { useAtomValue, useSetAtom } from 'jotai';
import { LevelConfAtom } from '../../../../atoms/gameState';
import { useLocation, useNavigate } from 'react-router-dom';
import LevelGroup from './LevelGroup';
import { Button } from '@genai-fi/base';
import { levelGroups } from '../../../../utils/levels/levelGroups';
import { OpenLevelGroupsAtom } from '../../../../atoms/state';
import { motion } from 'framer-motion';

type CardPosition = 'left' | 'center' | 'right';

const cardVariants = {
    left: {
        x: '-58%',
        scale: 0.82,
        opacity: 0.45,
        zIndex: 1,
    },
    center: {
        x: '0%',
        scale: 1,
        opacity: 1,
        zIndex: 2,
    },
    right: {
        x: '58%',
        scale: 0.82,
        opacity: 0.45,
        zIndex: 1,
    },
};

export default function LevelSelect() {
    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const setLevel = useSetAtom(LevelConfAtom);
    const openGroupTypes = useAtomValue(OpenLevelGroupsAtom);

    const navigate = useNavigate();
    const location = useLocation();

    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

    // Vain avoimet maailmat osallistuvat carousel-navigointiin.
    const openGroups = levelGroups.filter((group) => openGroupTypes.has(group.groupType));

    const activeGroup = openGroups[activeIndex];

    const goToWorld = (index: number) => {
        if (index < 0 || index >= openGroups.length || index === activeIndex) {
            return;
        }

        setActiveIndex(index);
        setSelectedLevel(null);
    };

    const handleStart = () => {
        if (!selectedLevel) {
            return;
        }

        setLevel(selectedLevel);

        params.set('sub', 'playLevel');
        params.set('overlay', 'none');

        navigate(`${location.pathname}?${params.toString()}`, { replace: false });
    };

    const getVisibleGroups = () => {
        const groups: {
            group: (typeof openGroups)[number];
            position: CardPosition;
        }[] = [];

        if (activeIndex > 0) {
            const prevGroup = openGroups[activeIndex - 1];
            if (prevGroup && prevGroup.levels) {
                groups.push({
                    group: prevGroup,
                    position: 'left',
                });
            }
        }

        if (activeGroup && activeGroup.levels) {
            groups.push({
                group: activeGroup,
                position: 'center',
            });
        }

        if (activeIndex < openGroups.length - 1) {
            const nextGroup = openGroups[activeIndex + 1];
            if (nextGroup && nextGroup.levels) {
                groups.push({
                    group: nextGroup,
                    position: 'right',
                });
            }
        }

        return groups;
    };

    return (
        <div className={style.container}>
            <h1>Level select</h1>

            <div className={style.worldNavigation}>
                {levelGroups.map((group) => {
                    const isOpen = openGroupTypes.has(group.groupType);

                    const openIndex = openGroups.findIndex((openGroup) => openGroup.groupType === group.groupType);

                    const isActive = isOpen && openIndex === activeIndex;

                    return (
                        <button
                            key={group.groupType}
                            type="button"
                            disabled={!isOpen}
                            className={`${style.worldButton} ${isActive ? style.activeWorld : ''}`}
                            onClick={() => goToWorld(openIndex)}
                        >
                            {group.groupName}
                        </button>
                    );
                })}
            </div>

            <div className={style.carousel}>
                {getVisibleGroups().map(({ group, position }) => {
                    const isCenter = position === 'center';

                    return (
                        <motion.div
                            key={group.groupType}
                            className={`${style.worldCard} ${isCenter ? style.centerCard : style.sideCard}`}
                            variants={cardVariants}
                            initial={position}
                            animate={position}
                            transition={{
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            onClick={() => {
                                if (!isCenter) {
                                    const index = openGroups.findIndex(
                                        (openGroup) => openGroup.groupType === group.groupType
                                    );

                                    goToWorld(index);
                                }
                            }}
                        >
                            <LevelGroup
                                levels={group.levels}
                                title={group.groupName}
                                onSelect={isCenter ? (level: Level) => setSelectedLevel(level) : () => {}}
                                selected={isCenter ? selectedLevel : null}
                                interactive={isCenter}
                            />
                        </motion.div>
                    );
                })}
            </div>
            <Button
                variant="contained"
                onClick={handleStart}
                disabled={!selectedLevel}
            >
                Start Level
            </Button>
        </div>
    );
}
