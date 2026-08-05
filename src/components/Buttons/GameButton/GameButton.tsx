import { Button } from '@genai-fi/base';
import { ButtonPropsColorOverrides, ButtonPropsVariantOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    onClick: () => void;
    title: string;
    disabled?: boolean;
    variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides> | undefined;
    color?:
        | OverridableStringUnion<
              'secondary' | 'inherit' | 'primary' | 'success' | 'error' | 'info' | 'warning',
              ButtonPropsColorOverrides
          >
        | undefined;
}

export default function GameButton({
    onClick,
    variant,
    title,
    disabled = false,
    color = 'secondary',
    children,
}: Props) {
    return (
        <Button
            title={title}
            variant={variant}
            disabled={disabled}
            color={color}
            onClick={onClick}
            sx={{
                minWidth: 64,
                minHeight: 64,
            }}
        >
            {children}
        </Button>
    );
}
