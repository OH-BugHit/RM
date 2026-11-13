import Basics6 from './Basics6';

interface AdditionalLevelMaterialProps {
    levelTextKey: string | undefined;
    step: number;
}

export default function AdditionalLevelMaterial({ step, levelTextKey }: AdditionalLevelMaterialProps) {
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
        default:
            return;
    }
}
