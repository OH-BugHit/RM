import style from './style.module.css';

import { Button } from '@genai-fi/base';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { useAtom, useAtomValue } from 'jotai';
import { StoryProgressAtom } from '../../../atoms/uiState';
import { Side } from '../../../types';
import { InnerFillCellAtom, WorldGridRenderAtom } from '../../../atoms/gameState';
import { resizeGrid } from './resizeUtils';
import { GenericRLEnv } from '../../../views/Environments/Generic/environment';

interface Props {
    envRef: React.RefObject<GenericRLEnv | undefined>;
    side: Side;
    sx?: SxProps<Theme>;
}

const VARIANT = 'outlined';
export default function ResizeButton({ envRef, side, sx }: Props) {
    const [worldGrid, setWorldGrid] = useAtom(WorldGridRenderAtom);
    const visibility = useAtomValue(StoryProgressAtom);
    const innerFillCell = useAtomValue(InnerFillCellAtom);

    const handleChange = (side: Side, isAdd: boolean) => {
        if (envRef.current && worldGrid) {
            envRef.current.position = {
                x: Math.min(
                    worldGrid[0].length - 1 + (!isAdd && side === 'right' ? -2 : 0),
                    Math.max(
                        1,
                        envRef.current.position.x + (isAdd && side === 'left' ? 1 : !isAdd && side === 'left' ? -1 : 0)
                    )
                ),

                y: Math.min(
                    worldGrid.length - 1 + (!isAdd && side === 'bottom' ? -2 : 0),
                    Math.max(
                        1,
                        envRef.current.position.y + (isAdd && side === 'top' ? 1 : !isAdd && side === 'top' ? -1 : 0)
                    )
                ),
            };
        }
        setWorldGrid((prev) => {
            if (!prev) return prev;
            return resizeGrid(prev, side, isAdd, innerFillCell);
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                visibility: visibility.environment.modifyOpened ? 'visible' : 'hidden',
                flexDirection: side === 'top' || side === 'bottom' ? 'column' : 'row',
                width: '100%',
                height: '100%',
                background: 'rgba(1, 115, 141, 0.24)',
                zIndex: 10,
                ...sx,
            }}
        >
            {side === 'bottom' && (
                <Button
                    variant={VARIANT}
                    onClick={() => handleChange(side, false)}
                >
                    Remove row
                </Button>
            )}
            {side === 'right' && (
                <Button
                    variant={VARIANT}
                    onClick={() => handleChange(side, false)}
                    className={style.vertical}
                >
                    Remove column
                </Button>
            )}
            {(side === 'left' || side === 'right') && (
                <Button
                    variant={VARIANT}
                    onClick={() => handleChange(side, true)}
                    className={style.vertical}
                >
                    Add column
                </Button>
            )}
            {side === 'left' && (
                <Button
                    variant={VARIANT}
                    onClick={() => handleChange(side, false)}
                    className={style.vertical}
                >
                    Remove column
                </Button>
            )}
            {(side === 'top' || side === 'bottom') && (
                <Button
                    variant={VARIANT}
                    onClick={() => handleChange(side, true)}
                >
                    Add row
                </Button>
            )}

            {side === 'top' && (
                <Button
                    variant={VARIANT}
                    onClick={() => handleChange(side, false)}
                >
                    Remove row
                </Button>
            )}
        </Box>
    );
}
