export interface DeadlineChartData {
    date: string;
    missed: number;
    completedBefore: number;
    completedOnTime: number;
}

export interface DeadlineLineChartProps {
    data: DeadlineChartData[];
    isLoading?: boolean;
}
