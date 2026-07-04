import { Button } from '@genai-fi/base';
import { ButtonPropsVariantOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    onClick: () => void;
    title: string;
    disabled?: boolean;
    variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides> | undefined;
}

export default function GameButton({ onClick, variant, title, disabled = false, children }: Props) {
    return (
        <Button
            title={title}
            variant={variant}
            disabled={disabled}
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
