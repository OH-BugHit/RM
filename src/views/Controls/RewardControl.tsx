import { Slider } from '@mui/material';

export type RewardFieldType = 'number' | 'boolean';

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
                sx={{ flex: 1 }}
                onChange={(_, newValue: number | number[]) => {
                    if (Array.isArray(newValue)) return;
                    onChange(newValue);
                }}
            />
        </div>
    );
}
