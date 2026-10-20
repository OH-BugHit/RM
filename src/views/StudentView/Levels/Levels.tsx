import { SubView } from '../../../types';
import StudentView from '../StudentView';
import LevelSelect from './LevelSelect/LevelSelect';

interface LevelsProps {
    view: SubView | undefined;
}

export default function Levels({ view }: LevelsProps) {
    if (view === 'playLevel') return <StudentView />;

    return <LevelSelect />;
}
