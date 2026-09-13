import { BuildButtons, Target } from '../../types';
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
    target: Target;
};

const DESIGN_HEIGHT = 1080;
const VIEWPORT_GAP = 140;

export function getBuildButtons(scale: number = 1, scaleWidth: number = 1): ButtonShape[] {
    const h = DESIGN_HEIGHT * scale;

    return [
        {
            id: 'create',
            angle: 180,
            icon: <CreateToolIcon size={140 * scale} />,
            content: <DesignWizard active />,
            size: {
                h: Math.min(1000 * scale, h - VIEWPORT_GAP),
                w: Math.max(500, Math.min(800, scaleWidth * 800)),
            },
            target: { type: 'viewport', position: 'center' },
        },
        {
            id: 'tools',
            angle: 130,
            icon: <DesignIcon size={140 * scale} />,
            size: { h: 0, w: 0 },
            target: {
                type: 'cluster',
                x: 40 * scale,
                y: -h,
            },
        },
        {
            id: 'settings',
            angle: 80,
            icon: <WorldSettingsIcon size={140 * scale} />,
            content: <GameSettings />,
            size: {
                h: Math.min(830 * scale, h - VIEWPORT_GAP),
                w: Math.min(600, 600 * scaleWidth),
            },
            target: {
                type: 'cluster',
                x: -300 * scaleWidth,
                y: -570 * scale,
            },
        },
    ];
}
