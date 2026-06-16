import { useAtom } from 'jotai';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartAtom } from '../../atoms/gameState';

interface ChartProps {
    width: number;
    height: number;
}
export function RewardChart({ width, height }: ChartProps) {
    const [data] = useAtom(ChartAtom);

    return (
        <LineChart
            width={width - 70}
            height={height - 70}
            xAxis={[{ data: data.episode }]}
            yAxis={[{ id: 'rewardAxis' }, { id: 'winAxis', min: 0, max: 1 }]}
            slotProps={{
                legend: {
                    position: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                    sx: {
                        paddingTop: '0.5rem',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                    },
                },
            }}
            series={[
                {
                    data: data.reward,
                    label: 'Reward',
                    yAxisId: 'rewardAxis',
                    showMark: false,
                    curve: 'monotoneX',
                },
                {
                    data: data.win,
                    label: 'Win rate',
                    yAxisId: 'winAxis',
                    showMark: false,
                    curve: 'monotoneX',
                },
            ]}
        />
    );
}
