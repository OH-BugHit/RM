import PropSelector from './PropSelector';

interface EnvModeProps {
    goHome: () => void;
}
export default function ModifyProps({ goHome }: EnvModeProps) {
    return <PropSelector goHome={goHome} />;
}
