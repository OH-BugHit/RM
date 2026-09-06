import { useContext } from 'react';
import { GameScaleContext } from './GameScaleContext';

export function useGameScale() {
    const context = useContext(GameScaleContext);

    if (!context) {
        throw new Error('useGameScale must be used inside GameScaleProvider');
    }

    return context;
}
