import { Button } from '@genai-fi/base';
import { useTranslation } from 'react-i18next';

type Props = {
    onPrevious: () => void;
    onNext: () => void;
    disableNext?: boolean;
    disablePrevious?: boolean;
    hidePrevious?: boolean;
    hideNext?: boolean;
    removePrevious?: boolean;
    removeNext?: boolean;
};

function PhaseControls({
    onPrevious,
    onNext,
    disableNext = false,
    disablePrevious = false,
    hideNext = false,
    hidePrevious = false,
    removePrevious = false,
    removeNext = false,
}: Props) {
    const { t } = useTranslation();
    return (
        <div style={{ marginTop: 10, display: 'flex', gap: '1rem' }}>
            {!removePrevious && (
                <Button
                    variant="outlined"
                    disabled={disablePrevious}
                    onClick={onPrevious}
                    style={{ visibility: hidePrevious ? 'hidden' : 'visible' }}
                >
                    {t('common.previous')}
                </Button>
            )}
            {!removeNext && (
                <Button
                    variant="outlined"
                    disabled={disableNext}
                    onClick={onNext}
                    style={{ visibility: hideNext ? 'hidden' : 'visible' }}
                >
                    {t('common.next')}
                </Button>
            )}
        </div>
    );
}

export default PhaseControls;
