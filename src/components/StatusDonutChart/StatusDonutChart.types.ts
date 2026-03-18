export interface StatusDataItem {
    name: string;
    value: number;
    color: string;
}

export interface StatusDonutChartProps {
    data: StatusDataItem[];
    isLoading?: boolean;
}

export interface PieLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    value: number;
}
