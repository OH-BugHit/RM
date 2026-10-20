import style from './style.module.css';
import { Trans, useTranslation } from 'react-i18next';
import { DialogContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TileDefinition, TileLibraryItem, CellType } from '../../../types';
import { EmojiItem } from '../TileLibrary/emojiLibraryData';
import TileLibrary from '../TileLibrary/TileLibrary';
import { useGameScale } from '../../../context/GameScale/useGameScale';
import { Help } from '@genai-fi/base';
import LibrarySearch from '../LibrarySearch/LibrarySearch';

interface TileOptionsProps {
    selectedTile?: TileDefinition;
    selectedType: CellType | 'background' | null;
    selectedPreview: string | null;
    selectedLibraryTile: TileLibraryItem | null;
    selectedEmoji: EmojiItem | null;
    hasSelection: boolean;
    onSelectTile: (tile: TileLibraryItem) => void;
    onSelectEmoji: (emojiItem: EmojiItem) => void;
    onDelete: () => void;
}

export default function TileOptions({
    selectedTile,
    selectedPreview,
    selectedType,
    selectedLibraryTile,
    selectedEmoji,
    onSelectTile,
    onSelectEmoji,
    onDelete,
}: TileOptionsProps) {
    const { t } = useTranslation();
    const { s, scale } = useGameScale();

    return (
        <div className={style.typeOptionContainer}>
            <DialogContent
                className={style.tileOptionContent}
                style={{
                    padding: `${Math.min(20, s(20))}px ${Math.min(24, s(24))}px ${Math.min(10, s(10))}px ${Math.min(24, s(24))}px`,
                }}
            >
                <div className={style.helpMessage}>
                    <span>
                        <Help
                            inplace
                            message={
                                selectedType !== 'background'
                                    ? t('import.messages.selectTile')
                                    : t('import.messages.selectBackground')
                            }
                        />
                    </span>
                </div>
                <div
                    className={style.selectModelMessage}
                    style={{ gap: `${s(16)}px` }}
                >
                    <div
                        className={style.previewSection}
                        style={{ minHeight: `${s(120)}px`, padding: `${s(12)}px` }}
                    >
                        <p style={{ whiteSpace: 'pre-line' }}>
                            {selectedType !== 'background' && (
                                <Trans
                                    i18nKey="common.selected"
                                    values={{
                                        type: t(`common.cell.${selectedType}`),
                                    }}
                                    components={{
                                        Type: <b />,
                                    }}
                                />
                            )}
                        </p>
                        {selectedPreview ? (
                            <img
                                src={selectedPreview}
                                alt="preview"
                                width={s(96)}
                                height={s(96)}
                            />
                        ) : (
                            <div
                                className={style.emptyPreview}
                                style={{ width: `${s(96)}px`, height: `${s(96)}px` }}
                            >
                                No selection
                            </div>
                        )}
                    </div>

                    {scale > 0.6 && (
                        <LibrarySearch
                            onSelectTile={onSelectTile}
                            onSelectEmoji={onSelectEmoji}
                        />
                    )}
                </div>
                <div className={style.libraryContent}>
                    <TileLibrary
                        onTileSelect={onSelectTile}
                        onEmojiSelect={onSelectEmoji}
                        selectedTileId={selectedLibraryTile?.id}
                        selectedEmoji={selectedEmoji?.emoji}
                    />
                </div>
            </DialogContent>
            <div className={`${style.buttonGroupTile} ${style.buttonGroup}`}>
                {!selectedTile?.isCoreTile && selectedTile && (
                    <IconButton
                        onClick={onDelete}
                        size="large"
                        color="error"
                    >
                        <DeleteIcon fontSize="large" />
                    </IconButton>
                )}
            </div>
        </div>
    );
}
