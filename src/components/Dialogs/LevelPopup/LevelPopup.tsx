import { Button } from '@genai-fi/base';
import { ClickAwayListener, Popper } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { CellType, Level } from '../../../types';
import { LevelMapNode } from '../../../views/StudentView/Levels/LevelSelect/levelMapTypes';
import style from './levelPopup.module.css';
import { CellSave } from '../../../utils/types';
import InfoRow from './InfoRow';
import { studentResultsAtom } from '../../../atoms/state';
import { useAtomValue } from 'jotai';

interface LevelPopupProps {
    node: LevelMapNode;
    anchorEl: HTMLButtonElement | null;
    placement: 'left' | 'right';
    open: boolean;
    onClose: () => void;
    onStart: (level: Level) => void;
}

export default function LevelPopup({ node, anchorEl, placement, open, onClose, onStart }: LevelPopupProps) {
    const { t } = useTranslation();
    const results = useAtomValue(studentResultsAtom);
    const titleId = `level-popup-title-${node.id}`;
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            popupRef.current?.focus();
        }
    }, [open]);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.stopPropagation();
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onClose]);

    const trigger = new Map<string, CellSave>();
    const plus1 = new Map<string, CellSave>();
    const plus2 = new Map<string, CellSave>();
    const trap = new Map<string, CellSave>();

    const highScore = results.data.get(node.level.level.manifest.gameName)?.score;

    node.level.level.game.world.forEach((row) => {
        row.forEach((cell) => {
            const key = cell.image || cell.emoji;

            switch (cell.type) {
                case CellType.Treasure:
                    plus1.set(key, cell);
                    break;
                case CellType.TreasureBig:
                    plus2.set(key, cell);
                    break;
                case CellType.Trap:
                    trap.set(key, cell);
                    break;
                case CellType.Trigger:
                    trigger.set(key, cell);
                    break;
            }
        });
    });

    console.log(plus2);

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement={placement}
            modifiers={[
                { name: 'flip', enabled: false },
                { name: 'offset', options: { offset: [0, 8] } },
            ]}
        >
            <ClickAwayListener
                onClickAway={(event) => {
                    const clickedLevelNode = event
                        .composedPath()
                        .some((element) => element instanceof Element && element.matches('[data-level-node]'));

                    if (!clickedLevelNode) {
                        onClose();
                    }
                }}
            >
                <motion.div
                    ref={popupRef}
                    className={style.popup}
                    role="dialog"
                    aria-labelledby={titleId}
                    tabIndex={-1}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                    <h1
                        id={titleId}
                        className={style.title}
                    >
                        {node.level.level.manifest.gameName}
                    </h1>

                    <div className={style.score}>
                        <b>
                            {t('common.labels.highscore')}: {highScore ?? 0}
                        </b>
                    </div>
                    <div className={style.levelInfo}>
                        <InfoRow
                            title={'Goal'}
                            nodes={trigger}
                            backgroundColour="rgba(98, 255, 205, 0.2)"
                        />
                        <InfoRow
                            title={'+2'}
                            nodes={plus2}
                            backgroundColour="rgba(166, 255, 93, 0.2)"
                        />
                        <InfoRow
                            title={'+1'}
                            nodes={plus1}
                            backgroundColour="rgba(211, 255, 129, 0.2)"
                        />
                        <InfoRow
                            title={'-1'}
                            nodes={trap}
                            backgroundColour="rgba(255, 161, 161, 0.2)"
                        />
                    </div>
                    <Button
                        variant="contained"
                        onClick={() => onStart(node.level)}
                    >
                        {t(`levels.levelSelect.start`)}
                    </Button>
                </motion.div>
            </ClickAwayListener>
        </Popper>
    );
}
