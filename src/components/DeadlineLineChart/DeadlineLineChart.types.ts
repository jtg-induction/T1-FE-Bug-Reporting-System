export interface DeadlineChartData {
    date: string;
    missed: number;
    completedBefore: number;
    closed: number;
}

export interface DeadlineLineChartProps {
    data: DeadlineChartData[];
    isLoading?: boolean;
}
