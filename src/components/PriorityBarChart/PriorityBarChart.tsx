import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { CircularProgress, Typography, useTheme } from '@mui/material';

import { ChartContainer } from './PriorityBarChart.styles';
import { PriorityBarChartProps } from './PriorityBarChart.types';

export const PriorityBarChart = ({
    data,
    isLoading = false,
}: PriorityBarChartProps) => {
    const theme = useTheme();

    if (isLoading) {
        return (
            <ChartContainer>
                <CircularProgress />
            </ChartContainer>
        );
    }

    if (!data || data.length === 0) {
        return (
            <ChartContainer>
                <Typography color="text.secondary">
                    No tickets found.
                </Typography>
            </ChartContainer>
        );
    }

    return (
        <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke={theme.palette.divider}
                    />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: theme.palette.text.secondary }}
                        dy={10}
                    />
                    <YAxis
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: theme.palette.text.secondary }}
                    />
                    <Tooltip
                        cursor={{ fill: theme.palette.action.hover }}
                        contentStyle={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: theme.shape.borderRadius,
                            borderColor: theme.palette.divider,
                            color: theme.palette.text.primary,
                        }}
                        itemStyle={{ color: theme.palette.text.primary }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={60}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};
