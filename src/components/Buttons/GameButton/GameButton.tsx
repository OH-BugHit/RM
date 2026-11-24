import { Button } from '@genai-fi/base';
import { ButtonPropsColorOverrides, ButtonPropsVariantOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    onClick: () => void;
    title: string;
    disabled?: boolean;
    fullHeight?: boolean;
    variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides> | undefined;
    color?:
        | OverridableStringUnion<
              'secondary' | 'inherit' | 'primary' | 'success' | 'error' | 'info' | 'warning',
              ButtonPropsColorOverrides
          >
        | undefined;
    id?: string;
}

export default function GameButton({
    onClick,
    variant,
    title,
    disabled = false,
    color = 'secondary',
    children,
    fullHeight = false,
    id = '',
}: Props) {
    return (
        <Button
            id={id}
            data-dismissible-exclude
            title={title}
            variant={variant}
            disabled={disabled}
            color={color}
            onClick={onClick}
            style={{ height: fullHeight ? '100%' : 44 }}
        >
            {children}
        </Button>
    );
}
