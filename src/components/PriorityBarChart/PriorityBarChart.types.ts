export interface PriorityChartData {
    name: string;
    count: number;
    color: string;
}

export interface PriorityBarChartProps {
    data: PriorityChartData[];
    isLoading?: boolean;
}
