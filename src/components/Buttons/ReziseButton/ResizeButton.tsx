import style from './style.module.css';

import { Button } from '@genai-fi/base';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { AgentRenderPulseAtom, BuildCAtom } from '../../../atoms/uiState';
import { Side } from '../../../types';
import { InnerFillCellAtom, WorldGridRenderAtom } from '../../../atoms/gameState';
import { resizeGrid } from './resizeUtils';
import { GenericRLEnv } from '../../../views/Environments/Generic/environment';
import { useGameScale } from '../../../context/GameScale/useGameScale';

interface Props {
    envRef: React.RefObject<GenericRLEnv | undefined>;
    side: Side;
    sx?: SxProps<Theme>;
}

const VARIANT = 'outlined';
export default function ResizeButton({ envRef, side, sx }: Props) {
    const { s } = useGameScale();
    const setAgentTrigger = useSetAtom(AgentRenderPulseAtom);
    const [worldGrid, setWorldGrid] = useAtom(WorldGridRenderAtom);
    const visibility = useAtomValue(BuildCAtom);
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
        setAgentTrigger((old) => {
            return {
                mode: 'normal',
                pulse: !old.pulse,
            };
        });
        setWorldGrid((prev) => {
            if (!prev) return prev;
            return resizeGrid(prev, side, isAdd, innerFillCell);
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                visibility: visibility.tools ? 'visible' : 'hidden',
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
                    style={{ fontSize: `${s(0.875)}rem` }}
                >
                    Remove row
                </Button>
            )}
            {side === 'right' && (
                <Button
                    variant={VARIANT}
                    onClick={() => handleChange(side, false)}
                    className={style.vertical}
                    style={{ fontSize: `${s(0.875)}rem`, minWidth: `${s(64)}px` }}
                >
                    Remove column
                </Button>
            )}
            {(side === 'left' || side === 'right') && (
                <Button
                    variant={VARIANT}
                    onClick={() => handleChange(side, true)}
                    className={style.vertical}
                    style={{ fontSize: `${s(0.875)}rem`, minWidth: `${s(64)}px` }}
                >
                    Add column
                </Button>
            )}
            {side === 'left' && (
                <Button
                    variant={VARIANT}
                    onClick={() => handleChange(side, false)}
                    className={style.vertical}
                    style={{ fontSize: `${s(0.875)}rem`, minWidth: `${s(64)}px` }}
                >
                    Remove column
                </Button>
            )}
            {(side === 'top' || side === 'bottom') && (
                <Button
                    variant={VARIANT}
                    onClick={() => handleChange(side, true)}
                    style={{ fontSize: `${s(0.875)}rem` }}
                >
                    Add row
                </Button>
            )}

            {side === 'top' && (
                <Button
                    variant={VARIANT}
                    onClick={() => handleChange(side, false)}
                    style={{ fontSize: `${s(0.875)}rem` }}
                >
                    Remove row
                </Button>
            )}
        </Box>
    );
}
