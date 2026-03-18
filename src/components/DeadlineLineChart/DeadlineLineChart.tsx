import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import { CircularProgress, Typography, useTheme } from '@mui/material';

import { ChartContainer } from './DeadlineLineChart.styles';
import { DeadlineLineChartProps } from './DeadlineLineChart.types';

export const DeadlineLineChart = ({
    data,
    isLoading = false,
}: DeadlineLineChartProps) => {
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
                    No deadline data found for this period.
                </Typography>
            </ChartContainer>
        );
    }

    return (
        <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
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
                    />
                    <Legend verticalAlign="bottom" height={36} />

                    <Line
                        type="monotone"
                        dataKey="missed"
                        name="Deadline Missed"
                        stroke="#d32f2f"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="completedBefore"
                        name="Deadline Met"
                        stroke="#2e7d32"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="closed"
                        name="Closed Today"
                        stroke="#0288d1"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};
