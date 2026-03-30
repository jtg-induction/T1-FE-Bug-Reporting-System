export interface DeadlineChartData {
    date: string;
    missed: number;
    completedBefore: number;
    completedOnTime: number;
}

export interface DeadlineChartProps {
    data: DeadlineChartData[];
    isLoading?: boolean;
}
