import { FormControlLabel, Switch } from '@mui/material';

type BooleanControlProps = {
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
};

export default function BooleanControl({ label, value, onChange }: BooleanControlProps) {
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <FormControlLabel
                label={label}
                control={
                    <Switch
                        checked={value}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                }
            />
        </div>
    );
}
