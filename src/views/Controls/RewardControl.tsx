import { Slider } from '@mui/material';

export type RewardFieldType = 'number' | 'boolean';

const gradient = `
linear-gradient(
    to right,
    
    rgb(0, 174, 205) 0%,
    #008db8 50%,
    #00eab0 100%
)
`;

interface RewardControlProps {
    value: number;
    min: number;
    max: number;
    step: number;
    label?: 'auto' | 'on' | 'off';
    onChange: (value: number) => void;
}
export default function RewardControl({ value, min, max, step, label = 'auto', onChange }: RewardControlProps) {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
            }}
        >
            <Slider
                value={value}
                min={min}
                max={max}
                step={step}
                valueLabelDisplay={label}
                sx={{
                    flex: 1,
                    '& .MuiSlider-rail': {
                        opacity: 1,
                        background: gradient,
                        height: '6px',
                        borderRadius: '9px',
                    },

                    '& .MuiSlider-track': {
                        background: 'transparent',
                        border: '1px solid rgba(17, 34, 51, 0.78)',
                    },
                    '& .MuiSlider-thumb': {
                        width: 24,
                        height: 24,
                        background: 'linear-gradient(180deg, #fff8c5 0%, #ffd54f 45%, #c98b00 100%)',
                        border: '2px solid rgb(161, 25, 7)',
                        boxShadow: '0 2px 6px rgba(0,0,0,.35)',
                        position: 'absolute',
                    },
                }}
                onChange={(_, newValue: number | number[]) => {
                    if (Array.isArray(newValue)) return;
                    onChange(newValue);
                }}
            />
        </div>
    );
}
