import style from './style.module.css';
import { LargeButton } from '@genai-fi/base';
import TileOptions from '../../Dialogs/DesignWizard/TileOptions';
import { useCallback, useRef, useState } from 'react';
import { TileLibraryItem } from '../../../types';
import { EmojiItem } from '../../Dialogs/TileLibrary/emojiLibraryData';
import { emojiToDataUrl } from '../../../utils/import';
import { useAtomValue, useSetAtom } from 'jotai';
import { ActiveViewAtom } from '../../../atoms/uiState';
import { AnimatePresence, motion } from 'framer-motion';
import { TileBackgroundAtom } from '../../../atoms/gameState';
import { useTranslation } from 'react-i18next';
import SlideShow from '../../SlideShow/SlideShow';
import { useViewNavigation } from '../../../hooks/useViewNavigation';
import { BackgroundTile } from '../../../utils/types';
import { defaultBackground } from '../../../utils/defaults';

export default function BackgroundWizard() {
    const { t } = useTranslation();
    const { goToView } = useViewNavigation();
    const [selectedLibraryTile, setSelectedLibraryTile] = useState<TileLibraryItem | null>(null);
    const [selectedEmoji, setSelectedEmoji] = useState<EmojiItem | null>(null);
    const [selectedPreview, setSelectedPreview] = useState<string | null>('');
    const view = useAtomValue(ActiveViewAtom);
    const previewUrlRef = useRef<string | null>(null);
    const hasSelection = Boolean(selectedLibraryTile || selectedEmoji);
    const [temp, setTemp] = useState<BackgroundTile>(defaultBackground);
    const setBackground = useSetAtom(TileBackgroundAtom);

    const handleLibrarySelect = useCallback(
        (tile: TileLibraryItem) => {
            setSelectedLibraryTile(tile);
            setSelectedEmoji(null);
            setSelectedPreview(tile.image);
            setTemp((old) => {
                return { ...old, image: tile.image };
            });
        },
        [setTemp]
    );

    const handleEmojiSelect = useCallback(
        (emojiItem: EmojiItem) => {
            if (previewUrlRef.current) {
                URL.revokeObjectURL(previewUrlRef.current);
                previewUrlRef.current = null;
            }

            const image = emojiToDataUrl(emojiItem.emoji, 96);

            setSelectedEmoji(emojiItem);
            setSelectedLibraryTile(null);
            setSelectedPreview(image);
            setTemp((old) => {
                return { ...old, image: image };
            });
        },
        [setTemp]
    );

    const controls = (
        <div className={style.wizardControls}>
            <div className={style.wizardControlsLeft}></div>
            <div className={style.wizardControlsCenter}></div>
            <div className={style.wizardControlsRight}>
                <LargeButton
                    variant="outlined"
                    color={'inherit'}
                    onClick={() => goToView({ overlay: null })}
                >
                    {t('common.cancel')}
                </LargeButton>
                <LargeButton
                    title={t('import.actions.setImage')}
                    className={style.actionButton}
                    variant="contained"
                    color="secondary"
                    data-testid="teacher-start-button"
                    onClick={() => {
                        setBackground(temp);
                        goToView({ overlay: null });
                    }}
                >
                    {t('import.actions.setImage')}
                </LargeButton>
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            {view.overlay === 'backgroundDialog' && (
                <motion.div
                    className={style.wizard}
                    initial={{
                        transform: 'translate(-50%, -45%)',
                        opacity: 0,
                    }}
                    animate={{
                        transform: 'translate(-50%, -50%)',
                        opacity: 1,
                    }}
                    exit={{
                        transform: 'translate(-50%, -45%)',
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.25,
                        ease: 'easeInOut',
                    }}
                >
                    <div className={style.content}>
                        <SlideShow
                            page={0}
                            controls={controls}
                        >
                            <TileOptions
                                selectedType={'background'}
                                selectedPreview={selectedPreview}
                                selectedLibraryTile={selectedLibraryTile}
                                selectedEmoji={selectedEmoji}
                                hasSelection={hasSelection}
                                onSelectTile={handleLibrarySelect}
                                onSelectEmoji={handleEmojiSelect}
                            />
                        </SlideShow>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
