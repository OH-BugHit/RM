import { useTranslation } from 'react-i18next';
import FastForwardIcon from '../../../../components/Buttons/ButtonIcons/ControlIcons/FastForwardIcon';
import PlayIcon from '../../../../components/Buttons/ButtonIcons/ControlIcons/PlayIcon';
import StepIcon from '../../../../components/Buttons/ButtonIcons/ControlIcons/StepIcon';
import StopIcon from '../../../../components/Buttons/ButtonIcons/ControlIcons/StopIcon';
import HintUse from './Hints/HintUse';
import TrashIcon from '../../../../components/Buttons/ButtonIcons/Agent/TrashIcon';

interface AdditionalLevelMaterialProps {
    levelTextKey: string | undefined;
    step: number;
}

const SIZE = 50;

export default function HintNext({ step, levelTextKey }: AdditionalLevelMaterialProps) {
    const { t } = useTranslation();
    switch (levelTextKey) {
        case undefined: {
            return;
        }
        case 'levels.1': {
            if (step === 6) {
                return (
                    <HintUse>
                        <StepIcon size={SIZE} />
                    </HintUse>
                );
            }
            if (step === 7) {
                return (
                    <HintUse>
                        <PlayIcon size={SIZE} />
                    </HintUse>
                );
            }
            if (step === 9) {
                return (
                    <HintUse>
                        <FastForwardIcon size={SIZE} />
                    </HintUse>
                );
            }
            if (step === 11) {
                return (
                    <HintUse>
                        <StopIcon
                            testing
                            size={50}
                        />
                        {t('common.and')}
                        <PlayIcon
                            testing
                            size={50}
                        />
                    </HintUse>
                );
            }
            break;
        }
        case 'levels.2': {
            if (step === 9) {
                return (
                    <HintUse>
                        <TrashIcon size={SIZE} />
                    </HintUse>
                );
            }
            break;
        }
        default:
            return;
    }
}
