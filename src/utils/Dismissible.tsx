import { ClickAwayListener } from '@mui/material';
import type { ReactElement } from 'react';
import { useEffect } from 'react';

interface DismissibleProps {
    open: boolean;
    onClose: () => void;
    children: ReactElement;
}

export default function Dismissible({ open, onClose, children }: DismissibleProps) {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.stopPropagation();
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onClose]);

    const handleClickAway = (event: MouseEvent | TouchEvent) => {
        if (!open) return;

        const isExcluded = event
            .composedPath()
            .some((element) => element instanceof Element && element.matches('[data-dismissible-exclude]'));

        if (isExcluded) return;

        onClose();
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div style={{ width: '100%', height: '100%' }}>{children}</div>
        </ClickAwayListener>
    );
}
