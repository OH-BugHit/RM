import ImageIcon from './ButtonIcons/Agent/ImageIcon';
import ObsIcon from './ButtonIcons/Agent/ObsIcon';
import ParameterIcon from './ButtonIcons/Agent/ParameterIcon';
import AgentSelector from '../../views/Story/Selectors/AgentSelector/AgentSelector';
import ObservationSelector from '../../views/Story/Selectors/AgentSelector/ObservationSelector';
import Parameters from '../../views/Story/Selectors/AgentSelector/Parameters';
import { AgentButtons, Target } from '../../types';

type ButtonShape = {
    id: AgentButtons;
    angle: number;
    icon: React.ReactNode;
    content?: React.ReactNode;
    size: { h: number; w: number };
    target: Target;
};

export function getAgentButtons(scale: number = 1, scaleWidth: number = 1): ButtonShape[] {
    console.log(scaleWidth);
    return [
        {
            id: 'img',
            angle: 0,
            icon: <ImageIcon size={140 * scale} />,
            content: <AgentSelector />,
            size: { h: 720 * scale, w: 520 * scaleWidth },
            target: {
                type: 'cluster',
                x: 140 * scale + 280 * scaleWidth,
                y: 280 * scale,
            },
        },
        {
            id: 'obs',
            angle: -50,
            icon: <ObsIcon size={140 * scale} />,
            content: <ObservationSelector />,
            size: { h: 420 * scale, w: Math.min(570, 570 * scaleWidth) },
            target: {
                type: 'cluster',
                x: Math.min(380, 140 * scale + 280 * scaleWidth),
                y: 350 * scale,
            },
        },
        {
            id: 'prm',
            angle: -100,
            icon: <ParameterIcon size={140 * scale} />,
            content: <Parameters />,
            size: { h: Math.min(320, 420 * scale), w: Math.min(600, 900 * scaleWidth) },
            target: {
                type: 'cluster',
                x: Math.min(300, 330 * scaleWidth),
                y: Math.min(360, 400 * scale),
            },
        },
    ];
}
