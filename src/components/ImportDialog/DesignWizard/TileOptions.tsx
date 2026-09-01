import style from './style.module.css';
import { Trans, useTranslation } from 'react-i18next';
import { DialogContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TileDefinition, TileLibraryItem, CellType } from '../../../types';
import { EmojiItem } from '../EmojiLibrary/emojiLibraryData';
import TileLibrary from '../TileLibrary/TileLibrary';
import EmojiLibrary from '../EmojiLibrary/EmojiLibrary';
import LibrarySearch from '../LibrarySearch';

interface TileOptionsProps {
    selectedTile?: TileDefinition;
    selectedType: CellType | 'background' | null;
    selectedPreview: string | null;
    selectedLibraryTile: TileLibraryItem | null;
    selectedEmoji: EmojiItem | null;
    tab: 'library' | 'emoji' | 'upload';
    hasSelection: boolean;
    onSelectTile: (tile: TileLibraryItem) => void;
    onSelectEmoji: (emojiItem: EmojiItem) => void;
    onTabChange: (tab: 'library' | 'emoji' | 'upload') => void;
    onDelete: () => void;
}

export default function TileOptions({
    selectedTile,
    selectedPreview,
    selectedType,
    selectedLibraryTile,
    selectedEmoji,
    tab,
    onSelectTile,
    onSelectEmoji,
    onTabChange,
    onDelete,
}: TileOptionsProps) {
    const { t } = useTranslation();

    return (
        <div className={style.wizardContainer}>
            <div className={style.titleRow}>
                <div className={style.stripes}></div>
                <h1 className={style.title}>
                    {selectedType !== 'background' ? t('import.titles.tileType') : t('import.titles.background')}
                </h1>
                <div className={style.stripes}></div>
            </div>

            <DialogContent>
                <div className={style.selectModelMessage}>
                    <div className={style.descText}>
                        <p>
                            {selectedType !== 'background'
                                ? t('import.messages.selectTile')
                                : t('import.messages.selectBackground')}
                        </p>
                        <div>
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
                        </div>
                    </div>
                    <div className={style.previewSection}>
                        {selectedPreview ? (
                            <img
                                src={selectedPreview}
                                alt="preview"
                                width={96}
                                height={96}
                            />
                        ) : (
                            <div className={style.emptyPreview}>No selection</div>
                        )}
                    </div>
                </div>
                <LibrarySearch
                    onSelectTile={onSelectTile}
                    onSelectEmoji={onSelectEmoji}
                />
                <div className={style.tabBar}>
                    <button
                        type="button"
                        className={tab === 'library' ? style.activeTab : style.tab}
                        onClick={() => onTabChange('library')}
                    >
                        {t('wizard.tabs.library')}
                    </button>
                    <button
                        type="button"
                        className={tab === 'emoji' ? style.activeTab : style.tab}
                        onClick={() => onTabChange('emoji')}
                    >
                        {t('wizard.tabs.emojis')}
                    </button>
                </div>
                {tab === 'library' && (
                    <TileLibrary
                        onSelect={onSelectTile}
                        selectedTileId={selectedLibraryTile?.id}
                    />
                )}
                {tab === 'emoji' && (
                    <EmojiLibrary
                        onSelect={onSelectEmoji}
                        selectedEmoji={selectedEmoji?.emoji}
                    />
                )}
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
