import { Fragment, useEffect, useRef, useState } from 'react';
import style from './levelSelect.module.css';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';
import { Level } from '../../../../types';
import { useViewNavigation } from '../../../../hooks/useViewNavigation';
import { LevelConfAtom, LevelMapNodesAtom } from '../../../../atoms/gameState';
import { GameControlAtom, OpenLevelGroupsAtom } from '../../../../atoms/state';
import { levelGroups } from '../../../../utils/levels/levelGroups';
import { useGameScale } from '../../../../context/GameScale/useGameScale';
import LevelItem from '../../../Teacher/TeacherContent/Levels/LevelItem';
import Wait from '../../../../components/Overlays/Pause/Wait';
import LevelPopup from '../../../../components/Dialogs/LevelPopup/LevelPopup';
import { createBonusPathsY, createRoutePathX } from './pathUtils';
import { defaultControls } from '../../../../utils/defaults';
import { TextStepAtom } from '../../../../atoms/uiState';
import { featureFlagsAtom } from '../../../../atoms/featureState';

export default function LevelSelect() {
    const { allowUnlockLevels } = useAtomValue(featureFlagsAtom);
    const { t } = useTranslation();
    const { s, trueScale } = useGameScale();
    const levelMapNodes = useAtomValue(LevelMapNodesAtom);
    const setControls = useSetAtom(GameControlAtom);
    const setSteps = useSetAtom(TextStepAtom);

    const resetLevels = () => {
        setControls(defaultControls);
        setSteps(0);
    };

    resetLevels();

    const mapHeight = s(1080) - 200;

    const [activeNode, setActiveNode] = useState<{
        id: string;
        anchorEl: HTMLButtonElement;
        placement: 'left' | 'right';
    } | null>(null);

    const { goToView } = useViewNavigation();
    const setLevel = useSetAtom(LevelConfAtom);
    const openGroupTypes = useAtomValue(OpenLevelGroupsAtom);

    const mapViewportRef = useRef<HTMLDivElement>(null);
    const cancelPendingScrollRef = useRef<(() => void) | null>(null);

    useEffect(
        () => () => {
            cancelPendingScrollRef.current?.();
        },
        []
    );

    const mapNodes = levelMapNodes.filter((node) => openGroupTypes.has(node.groupType));
    const requiredNodes = mapNodes.filter((node) => node.kind === 'required');
    const bonusNodes = mapNodes.filter((node) => node.kind === 'bonus');

    const mapWidth = Math.max(trueScale * 1940, ...mapNodes.map((node) => node.x + 300));

    const routePath = createRoutePathX({ nodes: requiredNodes, mapHeight });
    const bonusPaths = createBonusPathsY({
        bonusNodes,
        nodes: requiredNodes,
        mapHeight,
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
        if (dragState.current.dragging) {
            requestAnimationFrame(() => {
                dragState.current.dragging = false;
            });
        }
    };

    const handleWorldClick = (groupType: string) => {
        cancelPendingScrollRef.current?.();
        cancelPendingScrollRef.current = null;
        setActiveNode(null);

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

    const handleStart = (level: Level) => {
        setLevel(level);

        goToView({
            sub: 'playLevel',
            overlay: null,
        });
    };

    const handleNodeClick = (nodeId: string, anchorEl: HTMLButtonElement) => {
        if (dragState.current.dragging) {
            return;
        }

        cancelPendingScrollRef.current?.();
        cancelPendingScrollRef.current = null;

        const viewport = mapViewportRef.current;
        if (viewport) {
            const popupWidth = Math.min(300, window.innerWidth - 32);
            const rightEdge = anchorEl.getBoundingClientRect().right + 12 + popupWidth + 16;
            const overflow = rightEdge - window.innerWidth;

            if (overflow > 0) {
                const maxScrollLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
                const availableScroll = maxScrollLeft - viewport.scrollLeft;

                if (availableScroll < overflow) {
                    setActiveNode({ id: nodeId, anchorEl, placement: 'left' });
                    return;
                }

                const targetScrollLeft = Math.min(viewport.scrollLeft + overflow, maxScrollLeft);
                if (Math.abs(targetScrollLeft - viewport.scrollLeft) < 1) {
                    setActiveNode({ id: nodeId, anchorEl, placement: 'right' });
                    return;
                }

                let frameId = 0;
                let timeoutId = 0;
                let framesWithoutMovement = 0;
                let movementStarted = false;
                let previousScrollLeft = viewport.scrollLeft;
                let finished = false;

                setActiveNode(null);

                const cleanup = () => {
                    cancelAnimationFrame(frameId);
                    window.clearTimeout(timeoutId);
                    viewport.removeEventListener('scrollend', finish);
                    if (cancelPendingScrollRef.current === cleanup) {
                        cancelPendingScrollRef.current = null;
                    }
                };

                const finish = () => {
                    if (finished) return;

                    finished = true;
                    cleanup();
                    setActiveNode({ id: nodeId, anchorEl, placement: 'right' });
                };

                const waitForScroll = () => {
                    const currentScrollLeft = viewport.scrollLeft;
                    if (Math.abs(currentScrollLeft - targetScrollLeft) < 1) {
                        finish();
                        return;
                    }

                    if (Math.abs(currentScrollLeft - previousScrollLeft) < 0.1) {
                        if (movementStarted) {
                            framesWithoutMovement += 1;
                        }
                    } else {
                        movementStarted = true;
                        framesWithoutMovement = 0;
                    }

                    previousScrollLeft = currentScrollLeft;

                    if (movementStarted && framesWithoutMovement >= 12) {
                        finish();
                        return;
                    }

                    frameId = requestAnimationFrame(waitForScroll);
                };

                cancelPendingScrollRef.current = cleanup;
                viewport.addEventListener('scrollend', finish);
                viewport.scrollTo({
                    left: targetScrollLeft,
                    behavior: 'smooth',
                });
                frameId = requestAnimationFrame(waitForScroll);
                timeoutId = window.setTimeout(finish, 3000);
                return;
            }
        }

        setActiveNode({ id: nodeId, anchorEl, placement: 'right' });
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
                            const isSelected = activeNode?.id === node.id;

                            return (
                                <Fragment key={node.id}>
                                    <button
                                        type="button"
                                        data-level-node
                                        disabled={!node.allowed}
                                        aria-haspopup="dialog"
                                        aria-expanded={isSelected}
                                        aria-controls={isSelected ? `level-popup-${node.id}` : undefined}
                                        className={[
                                            style.levelNode,
                                            node.kind === 'bonus' ? style.bonusNode : '',
                                            isSelected ? style.selectedNode : '',
                                            !node.allowed ? (!allowUnlockLevels ? style.locked : '') : '',
                                        ]
                                            .filter(Boolean)
                                            .join(' ')}
                                        style={{
                                            left: `${(node.x / mapWidth) * 100}%`,
                                            top: `${Math.min(90, node.y)}%`,
                                        }}
                                        onClick={(event) => handleNodeClick(node.id, event.currentTarget)}
                                    >
                                        <LevelItem
                                            level={node.level}
                                            cellSize={s(12)}
                                        />
                                    </button>
                                    <LevelPopup
                                        node={node}
                                        anchorEl={activeNode?.id === node.id ? activeNode.anchorEl : null}
                                        placement={activeNode?.id === node.id ? activeNode.placement : 'right'}
                                        open={isSelected}
                                        onClose={() => setActiveNode(null)}
                                        onStart={handleStart}
                                    />
                                </Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Wait show={mapNodes.length < 1} />
        </div>
    );
}
