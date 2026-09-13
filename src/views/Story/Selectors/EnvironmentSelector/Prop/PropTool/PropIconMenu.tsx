import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TileDefinition } from '../../../../../../types';
import { useSetAtom } from 'jotai';
import { TilePropsAtom } from '../../../../../../atoms/uiState';

interface PropIconMenuProps {
    tile: TileDefinition;
}

export default function PropIconMenu({ tile }: PropIconMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const setTiles = useSetAtom(TilePropsAtom);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = React.useCallback(() => {
        if (!tile || tile.isCoreTile) return;
        setTiles((old) => old.filter((t) => t.id !== tile.id));
    }, [tile, setTiles]);

    return (
        <>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open}
                onClick={handleClick}
                disabled={tile.isCoreTile}
                sx={{ padding: 0 }}
            >
                <MoreVertIcon fontSize="large" />
            </Button>
            <Menu
                id="fade-menu"
                slotProps={{
                    list: {
                        'aria-labelledby': 'fade-button',
                    },
                }}
                slots={{ transition: Fade }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDelete}>
                    <DeleteForeverIcon fontSize="large" />
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
}
