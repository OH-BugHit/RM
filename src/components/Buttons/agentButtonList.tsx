import ImageIcon from './ButtonIcons/Agent/ImageIcon';
import ObsIcon from './ButtonIcons/Agent/ObsIcon';
import ParameterIcon from './ButtonIcons/Agent/ParameterIcon';
import AgentSelector from '../../views/Story/Selectors/AgentSelector/AgentSelector';
import ObservationSelector from '../../views/Story/Selectors/AgentSelector/ObservationSelector';
import Parameters from '../../views/Story/Selectors/AgentSelector/Parameters';
import { AgentButtons } from '../../types';

type ButtonShape = {
    id: AgentButtons;
    angle: number;
    icon: React.ReactNode;
    content?: React.ReactNode;
    size: { h: number; w: number };
    target: { x: number; y: number };
};

export function getAgentButtons(): ButtonShape[] {
    return [
        {
            id: 'img',
            angle: 0,
            icon: <ImageIcon size={140} />,
            content: <AgentSelector />,
            size: { h: 540, w: 420 },
            target: { x: 400, y: 270 },
        },
        {
            id: 'obs',
            angle: -50,
            icon: <ObsIcon size={140} />,
            content: <ObservationSelector />,
            size: { h: 420, w: 570 },
            target: { x: 420, y: 350 },
        },
        {
            id: 'prm',
            angle: -100,
            icon: <ParameterIcon size={140} />,
            content: <Parameters />,
            size: { h: 340, w: 700 },
            target: { x: 300, y: 380 },
        },
    ];
}

export const agentButtons = getAgentButtons();
