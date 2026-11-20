import Basics6 from './Materials/Basics6';
import Rewards4 from './Materials/Rewards4';

interface AdditionalLevelMaterialProps {
    levelTextKey: string | undefined;
    step: number;
}

export default function MaterialContainer({ step, levelTextKey }: AdditionalLevelMaterialProps) {
    switch (levelTextKey) {
        case undefined: {
            return;
        }
        case 'levels.1': {
            if (step === 6) {
                return <Basics6 />;
            }
            break;
        }
        case 'levels.2': {
            if (step === 4) {
                return <Rewards4 />;
            }
            break;
        }
        default:
            return;
    }
}
