import { Button } from '@genai-fi/base';
import { ButtonPropsVariantOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    onClick: () => void;
    title: string;
    variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides> | undefined;
}

export default function GameButton({ onClick, variant, title, children }: Props) {
    return (
        <Button
            title={title}
            variant={variant}
            onClick={onClick}
            sx={{
                minWidth: 64,
                minHeight: 64,

                backgroundImage: "url('/images/buttonFrames/frame_square.png')",
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                color: 'white',
                textTransform: 'none',

                '&:hover': {
                    backgroundImage: "url('/ui/button-hover.png')",
                },
            }}
        >
            {children}
        </Button>
    );
}
