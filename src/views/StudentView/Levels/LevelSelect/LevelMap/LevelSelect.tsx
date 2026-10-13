import { useRef, useState } from 'react';
import style from './levelSelect.module.css';
import { useAtomValue, useSetAtom } from 'jotai';
import { Button } from '@genai-fi/base';
import { useTranslation } from 'react-i18next';
import { Level } from '../../../../../types';
import { useViewNavigation } from '../../../../../hooks/useViewNavigation';
import { LevelConfAtom, LevelMapNodesAtom } from '../../../../../atoms/gameState';
import { OpenLevelGroupsAtom } from '../../../../../atoms/state';
import { levelGroups } from '../../../../../utils/levels/levelGroups';
import { useGameScale } from '../../../../../context/GameScale/useGameScale';
import LevelItem from '../../../../Teacher/TeacherContent/Levels/LevelItem';

export default function LevelSelect() {
    const { t } = useTranslation();
    const { s, trueScale } = useGameScale();
    const levelMapNodes = useAtomValue(LevelMapNodesAtom);

    const mapHeight = s(1080) - 200;

    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);

    const { goToView } = useViewNavigation();
    const setLevel = useSetAtom(LevelConfAtom);
    const openGroupTypes = useAtomValue(OpenLevelGroupsAtom);

    const mapViewportRef = useRef<HTMLDivElement>(null);

    const mapNodes = levelMapNodes.filter((node) => openGroupTypes.has(node.groupType));
    const requiredNodes = mapNodes.filter((node) => node.kind === 'required');
    const bonusNodes = mapNodes.filter((node) => node.kind === 'bonus');

    const mapWidth = Math.max(trueScale * 1980, ...mapNodes.map((node) => node.x + 100));

    const routePath = requiredNodes.map((node, index) => `${index === 0 ? 'M' : 'L'} ${node.x} ${s(node.y)}`).join(' ');
    const bonusPaths = bonusNodes.flatMap((bonusNode) => {
        const sourceNode = requiredNodes.find((node) => node.groupType === bonusNode.groupType);

        if (!sourceNode) {
            return [];
        }

        return [
            {
                id: bonusNode.id,
                d: `M ${sourceNode.x} ${s(sourceNode.y)} L ${bonusNode.x} ${s(bonusNode.y)}`,
            },
        ];
    });

    const dragState = useRef<{
        startX: number;
        startScrollLeft: number;
        dragging: boolean;
    }>({
        startX: 0,
        startScrollLeft: 0,
        dragging: false,
    });

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        // Raahataan vain hiiren vasemmalla painikkeella.
        if (event.pointerType !== 'mouse' || event.button !== 0) {
            return;
        }

        const viewport = mapViewportRef.current;
        if (!viewport) return;

        dragState.current = {
            startX: event.clientX,
            startScrollLeft: viewport.scrollLeft,
            dragging: false,
        };
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== 'mouse' || event.buttons !== 1) {
            return;
        }

        const viewport = mapViewportRef.current;
        if (!viewport) return;

        const deltaX = event.clientX - dragState.current.startX;

        if (Math.abs(deltaX) > 4) {
            dragState.current.dragging = true;
        }

        if (dragState.current.dragging) {
            viewport.scrollLeft = dragState.current.startScrollLeft - deltaX;
        }
    };

    const handlePointerUp = () => {
        // Pidetään dragging-arvo hetken käytössä,
        // jotta raahauksen päättyminen ei valitse kenttää.
        if (dragState.current.dragging) {
            requestAnimationFrame(() => {
                dragState.current.dragging = false;
            });
        }
    };

    const handleWorldClick = (groupType: string) => {
        setSelectedLevel(null);

        const firstNode = mapNodes.find((node) => node.groupType === groupType && node.kind === 'required');

        const viewport = mapViewportRef.current;

        if (!firstNode || !viewport) {
            return;
        }

        const targetX = firstNode.x - viewport.clientWidth / 2;

        const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;

        viewport.scrollTo({
            left: Math.max(0, Math.min(targetX, maxScrollLeft)),
            behavior: 'smooth',
        });
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

    return (
        <div className={style.container}>
            <h1>{t('levels.levelSelect.title')}</h1>

            <nav
                className={style.worldNavigation}
                aria-label={t('levels.levelSelect.title')}
            >
                {levelGroups.map((group) => {
                    const isOpen = openGroupTypes.has(group.groupType);

                    return (
                        <button
                            key={group.groupType}
                            type="button"
                            disabled={!isOpen}
                            className={style.worldButton}
                            onClick={() => handleWorldClick(group.groupType)}
                        >
                            {group.groupName}
                        </button>
                    );
                })}
            </nav>

            <div
                ref={mapViewportRef}
                className={style.mapViewport}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <div
                    className={style.map}
                    style={{
                        width: `${mapWidth}px`,
                        aspectRatio: `${mapWidth} / ${mapHeight}`,
                    }}
                >
                    <svg
                        className={style.mapSvg}
                        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <path
                            d={routePath}
                            className={style.routeGlow}
                        />
                        <path
                            d={routePath}
                            className={style.mainRoute}
                        />
                        {bonusPaths.map((path) => (
                            <path
                                key={path.id}
                                d={path.d}
                                className={style.bonusRoute}
                            />
                        ))}
                    </svg>

                    <div className={style.mapLabels}>
                        {mapNodes.map((node) => {
                            const isSelected = selectedLevel === node.level;

                            return (
                                <button
                                    key={node.id}
                                    type="button"
                                    disabled={!node.allowed}
                                    className={[
                                        style.levelNode,
                                        node.kind === 'bonus' ? style.bonusNode : '',
                                        isSelected ? style.selectedNode : '',
                                        !node.allowed ? style.locked : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    style={{
                                        left: `${(node.x / mapWidth) * 100}%`,
                                        top: `${(node.y / mapHeight) * s(100)}%`,
                                    }}
                                    onClick={() => {
                                        if (dragState.current.dragging) {
                                            return;
                                        }

                                        setSelectedLevel(node.level);
                                    }}
                                    aria-pressed={isSelected}
                                >
                                    <LevelItem
                                        level={node.level}
                                        cellSize={s(12)}
                                    />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className={style.startButton}>
                <Button
                    variant="contained"
                    onClick={handleStart}
                    disabled={!selectedLevel}
                >
                    {t('levels.levelSelect.start')}
                </Button>
            </div>
        </div>
    );
}
