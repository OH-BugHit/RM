import { useState } from 'react';
import style from './levelSelect.module.css';
import { Level } from '../../../../types';
import { useAtomValue, useSetAtom } from 'jotai';
import { LevelConfAtom } from '../../../../atoms/gameState';
import LevelGroup from './LevelGroup';
import { Button } from '@genai-fi/base';
import { levelGroups } from '../../../../utils/levels/levelGroups';
import { OpenLevelGroupsAtom } from '../../../../atoms/state';
import { motion, PanInfo } from 'framer-motion';
import { useViewNavigation } from '../../../../hooks/useViewNavigation';

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

const SWIPE_DISTANCE = 50;
const SWIPE_VELOCITY = 500;

export default function LevelSelect() {
    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { goToView } = useViewNavigation();

    const setLevel = useSetAtom(LevelConfAtom);
    const openGroupTypes = useAtomValue(OpenLevelGroupsAtom);

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

        goToView({
            sub: 'playLevel',
            overlay: null,
        });
    };

    const handleCenterDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const { x } = info.offset;
        const { x: velocityX } = info.velocity;

        const swipedLeft = x < -SWIPE_DISTANCE || velocityX < -SWIPE_VELOCITY;

        const swipedRight = x > SWIPE_DISTANCE || velocityX > SWIPE_VELOCITY;

        if (swipedLeft && activeIndex < openGroups.length - 1) {
            goToWorld(activeIndex + 1);
            return;
        }

        if (swipedRight && activeIndex > 0) {
            goToWorld(activeIndex - 1);
        }
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

                    const handleCardClick = () => {
                        if (isCenter) {
                            return;
                        }

                        const index = openGroups.findIndex((openGroup) => openGroup.groupType === group.groupType);

                        goToWorld(index);
                    };

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
                            drag={isCenter ? 'x' : false}
                            dragConstraints={{
                                left: 0,
                                right: 0,
                            }}
                            dragElastic={0.2}
                            onDragEnd={isCenter ? handleCenterDragEnd : undefined}
                            onClick={!isCenter ? handleCardClick : undefined}
                        >
                            <LevelGroup
                                levels={group.levels}
                                title={group.groupName}
                                /*
                                 * Ainoastaan keskikortin
                                 * LevelGroup on interaktiivinen.
                                 */
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
