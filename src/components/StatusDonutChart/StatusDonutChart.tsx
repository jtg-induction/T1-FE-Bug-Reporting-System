import { useMemo } from 'react';

import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

import {
    Box,
    CircularProgress,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';

import { ChartContainer } from './StatusDonutChart.styles';
import {
    PieLabelProps,
    StatusDataItem,
    StatusDonutChartProps,
} from './StatusDonutChart.types';

const RADIAN = Math.PI / 180;

export const StatusDonutChart = ({
    data,
    isLoading = false,
}: StatusDonutChartProps) => {
    const theme = useTheme();

    const totalTickets = useMemo(() => {
        if (!data) return 0;
        return data.reduce((acc, curr) => acc + (curr.value || 0), 0);
    }, [data]);

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        value,
    }: PieLabelProps) => {
        if (percent < 0.05) return null;

        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#ffffff"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={theme.typography.caption.fontSize}
                fontWeight={theme.typography.fontWeightBold}
                style={{ pointerEvents: 'none' }}
            >
                {value}
            </text>
        );
    };

    const renderCustomLegend = () => {
        if (!data) return null;

        return (
            <Stack
                direction="row"
                spacing={3}
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}
            >
                {data.map((entry: StatusDataItem, index: number) => (
                    <Stack
                        key={`legend-item-${index}`}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: entry.color,
                            }}
                        />
                        <Typography variant="body2" color="text.primary">
                            {entry.name}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        );
    };

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
                <PieChart>
                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                    >
                        <tspan
                            x="50%"
                            dy="-0.2em"
                            fontSize={theme.typography.h4.fontSize}
                            fontWeight={theme.typography.fontWeightBold}
                            fill={theme.palette.text.primary}
                        >
                            {totalTickets}
                        </tspan>
                        <tspan
                            x="50%"
                            dy="1.5em"
                            fontSize={theme.typography.body2.fontSize}
                            fill={theme.palette.text.secondary}
                        >
                            Total Tickets
                        </tspan>
                    </text>

                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        dataKey="value"
                        labelLine={false}
                        label={renderCustomizedLabel}
                    >
                        {data.map((entry: StatusDataItem, index: number) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                stroke="none"
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: theme.shape.borderRadius,
                            borderColor: theme.palette.divider,
                            color: theme.palette.text.primary,
                        }}
                        itemStyle={{ color: theme.palette.text.primary }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        content={renderCustomLegend}
                    />
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};
