const separator = {
    width: '100%',
    height: '1px',
    margin: '2dvh 0',
    scale: '0.8',
};

const verticalSeparator = {
    width: '1px',
    height: '80%',
    margin: '1.2rem 0',
    scale: '0.8',
};

interface SeparatorProps {
    vertical?: boolean;
    color?: React.CSSProperties['backgroundColor'];
    fullHeight?: boolean;
}
export default function Separator({ vertical = false, color = '#ccc' }: SeparatorProps) {
    return (
        <div
            style={{
                backgroundColor: color,
                ...(vertical ? verticalSeparator : separator),
            }}
        />
    );
}
