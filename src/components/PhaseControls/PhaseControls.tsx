import { Button } from '@genai-fi/base';

type Props = {
    onPrevious: () => void;
    onNext: () => void;
    disableNext?: boolean;
    disablePrevious?: boolean;
    hidePrevious?: boolean;
    hideNext?: boolean;
};

function PhaseControls({
    onPrevious,
    onNext,
    disableNext = false,
    disablePrevious = false,
    hideNext = false,
    hidePrevious = false,
}: Props) {
    return (
        <div style={{ marginTop: 10, display: 'flex', gap: '1rem' }}>
            {!hidePrevious && (
                <Button
                    variant="outlined"
                    disabled={disablePrevious}
                    onClick={onPrevious}
                >
                    Previous
                </Button>
            )}

            {!hideNext && (
                <Button
                    variant="outlined"
                    disabled={disableNext}
                    onClick={onNext}
                >
                    Next
                </Button>
            )}
        </div>
    );
}

export default PhaseControls;
