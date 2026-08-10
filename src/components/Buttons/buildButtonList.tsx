import { BuildButtons } from '../../types';
import GameSettings from '../../views/Story/Selectors/GameSettings/GameSettings';
import DesignWizard from '../ImportDialog/DesignWizard/DesignWizard';
import CreateToolIcon from './ButtonIcons/Build/CreateToolIcon';
import DesignIcon from './ButtonIcons/Build/DesignIcon';
import WorldSettingsIcon from './ButtonIcons/Build/WorldSettingsIcon';

type ButtonShape = {
    id: BuildButtons;
    angle: number;
    icon: React.ReactNode;
    content?: React.ReactNode;
    size: { h: number; w: number };
    target: { x: number; y: number };
};

const VIEWPORT_GAP = 100;

export function getBuildButtons(windowSize?: { width: number; height: number }): ButtonShape[] {
    const w = windowSize?.width ?? (typeof window !== 'undefined' ? window.innerWidth : 1024);
    const h = windowSize?.height ?? (typeof window !== 'undefined' ? window.innerHeight : 768);

    return [
        {
            id: 'create',
            angle: 180,
            icon: <CreateToolIcon size={140} />,
            content: <DesignWizard active />,
            size: { h: Math.min(1000, h - VIEWPORT_GAP), w: 800 },
            target: {
                x: -(w / 2) + w * 0.08,
                y: -(h * 0.8) / 2,
            },
        },
        {
            id: 'tools',
            angle: 130,
            icon: <DesignIcon size={140} />,
            size: { h: 0, w: 0 },
            target: { x: 40, y: -(h * 0.8) },
        },

        {
            id: 'settings',
            angle: 80,
            icon: <WorldSettingsIcon size={140} />,
            content: <GameSettings />,
            size: { h: Math.min(830, h - VIEWPORT_GAP), w: 600 },
            target: { x: -300, y: -600 },
        },
    ];
}

// Backwards-compatible static export (computed once). Prefer `getBuildButtons` for dynamic layouts.
export const buildButtons = getBuildButtons();
