import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { CircularProgress, Typography, useTheme } from '@mui/material';

import { ChartContainer } from './DeadlineChart.styles';
import { DeadlineChartProps } from './DeadlineChart.types';

export const DeadlineChart = ({
    data,
    isLoading = false,
}: DeadlineChartProps) => {
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
                    No tickets found for this period.
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
                        dataKey="date"
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
                        contentStyle={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: theme.shape.borderRadius,
                            borderColor: theme.palette.divider,
                            color: theme.palette.text.primary,
                        }}
                        cursor={{ fill: theme.palette.action.hover }}
                    />
                    <Legend verticalAlign="bottom" height={36} />

                    <Bar
                        dataKey="missed"
                        name="Deadline Missed"
                        fill="#d32f2f"
                        stackId="a"
                        maxBarSize={50}
                    />
                    <Bar
                        dataKey="completedBefore"
                        name="Completed Before Time"
                        fill="#2e7d32"
                        stackId="a"
                        maxBarSize={50}
                    />
                    <Bar
                        dataKey="completedOnTime"
                        name="Completed On Time"
                        fill="#0288d1"
                        stackId="a"
                        maxBarSize={50}
                    />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};
