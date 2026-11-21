import { Button, IconButton } from '@mui/material';
import { CSSProperties, MouseEvent, PropsWithChildren, ReactNode, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import style from './blackBox.module.css';
import { InfoPop } from '@genai-fi/base';
import BlackBoxIcon from './BoxIcon/BlackBoxIcon';
import { featureFlagsAtom } from '../../atoms/featureState';
import { useAtomValue } from 'jotai';

interface Props extends PropsWithChildren {
    message: ReactNode;
    widget?: string;
    active?: boolean;
    style?: CSSProperties;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    buttonPlacement?: 'top' | 'bottom' | 'left' | 'right';
    inplace?: boolean;
    inside?: boolean;
    keepOpen?: boolean;
    closeLabel?: string;
    dark?: boolean;
    ariaLabel?: string;
    size?: number;
}

export default function BlackBox({
    message,
    children,
    widget,
    style: customStyle,
    active,
    placement,
    inplace,
    inside,
    keepOpen,
    closeLabel,
    dark,
    ariaLabel,
    buttonPlacement = 'left',
    size = 64,
}: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { allowBlackBox } = useAtomValue(featureFlagsAtom);

    if (!allowBlackBox) return;

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl((prev) =>
            prev ? null : inplace || inside ? event.currentTarget : event.currentTarget.parentElement
        );
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div
            className={`${inplace ? style.inplaceContainer : style.container} ${anchorEl && !inplace && !inside ? style.active : ''}`}
            data-widget={widget}
            data-active={active ? 'true' : 'false'}
            style={customStyle}
        >
            {!inplace && (
                <IconButton
                    onClick={handleClick}
                    onMouseLeave={!keepOpen ? handleClose : undefined}
                    className={`${style.helpButton} ${inside ? style.helpButtonInside : ''} ${style[buttonPlacement]} ${dark ? style.dark : ''}`}
                    color="inherit"
                    aria-label={ariaLabel || 'Help'}
                >
                    <BlackBoxIcon
                        size={size}
                        active={anchorEl !== null}
                    />
                </IconButton>
            )}
            {children}
            {inplace && (
                <IconButton
                    onClick={handleClick}
                    onMouseLeave={!keepOpen ? handleClose : undefined}
                    className={`${style.helpButtonInplace} ${dark ? style.dark : ''}`}
                    color="inherit"
                    aria-label={ariaLabel || 'Help'}
                >
                    <BlackBoxIcon
                        size={size}
                        active={anchorEl !== null}
                    />
                </IconButton>
            )}
            <InfoPop
                anchorEl={anchorEl}
                open={!!anchorEl}
                placement={placement}
                theme={dark ? undefined : 'light'}
            >
                {message}
                {keepOpen && (
                    <Button
                        onClick={handleClose}
                        className={style.closeButton}
                        color="inherit"
                        startIcon={<CloseIcon fontSize="small" />}
                        variant="outlined"
                    >
                        {closeLabel || 'Close'}
                    </Button>
                )}
            </InfoPop>
        </div>
    );
}
