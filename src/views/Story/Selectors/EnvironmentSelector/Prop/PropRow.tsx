import style from './style.module.css';
import { IconButton, MenuItem, Select, TextField } from '@mui/material';
import { CELL_TYPE_OPTIONS, CellType, TileDefinition } from '../../../../../types';
import { SetStateAction } from 'jotai';
import { useTranslation } from 'react-i18next';
import CollectionsIcon from '@mui/icons-material/Collections';
import DeleteIcon from '@mui/icons-material/Delete';

interface PropRowProps {
    tile: TileDefinition;
    openImport: (tile: TileDefinition) => void;
    setTiles: (value: SetStateAction<TileDefinition[]>) => void;
}
export default function PropRow({ tile, openImport, setTiles }: PropRowProps) {
    const { t } = useTranslation();

    const isLocked = tile.isCoreTile || tile.id === '0' || tile.id === '1';

    return (
        <div className={style.row}>
            {isLocked ? (
                <h3>{t(`common.cell.${tile.type}`)}</h3>
            ) : (
                <Select
                    value={tile.type}
                    onChange={(e) => {
                        const value = e.target.value as CellType;

                        setTiles((old) => old.map((t) => (t.id === tile.id ? { ...t, type: value } : t)));
                    }}
                >
                    {CELL_TYPE_OPTIONS.map((type) => (
                        <MenuItem
                            key={type}
                            value={type}
                        >
                            {t(`common.cell.${type}`)}
                        </MenuItem>
                    ))}
                </Select>
            )}

            <b>
                <TextField
                    value={tile.name}
                    onChange={(e) =>
                        setTiles((old) => old.map((t) => (t.id === tile.id ? { ...t, name: e.target.value } : t)))
                    }
                    placeholder="name this prop"
                />
            </b>

            {tile.image && tile.image !== 'none' && (
                <img
                    src={tile.image}
                    width={64}
                    height={64}
                />
            )}

            <IconButton
                onClick={() => openImport(tile)}
                size="large"
                color="primary"
            >
                <CollectionsIcon fontSize="large" />
            </IconButton>
            {!isLocked && (
                <IconButton
                    onClick={() => setTiles((old) => old.filter((t) => t.id !== tile.id))}
                    size="large"
                    color="secondary"
                >
                    <DeleteIcon fontSize="large" />
                </IconButton>
            )}
        </div>
    );
}
