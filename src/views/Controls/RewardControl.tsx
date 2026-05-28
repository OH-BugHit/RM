import { FormLabel, Slider } from '@mui/material';

export type RewardFieldType = 'number' | 'boolean';

interface RewardControlProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}
export default function RewardControl({ label, value, min, max, step, onChange }: RewardControlProps) {
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <FormLabel>
                {label}: {value}
            </FormLabel>

            <Slider
                value={value}
                min={min}
                max={max}
                step={step}
                valueLabelDisplay="auto"
                sx={{ flex: 1 }}
                onChange={(_, newValue: number | number[]) => {
                    if (Array.isArray(newValue)) return;
                    onChange(newValue);
                }}
            />
        </div>
    );
}
