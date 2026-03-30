export type DateRangeType = 'week' | 'custom';

export interface ChartFilterState {
    selectedUserIds?: string[];
    dateRangeType: DateRangeType;
    startDate: string;
    endDate: string;
}

export interface ChartFilterBarProps {
    showUserFilter?: boolean;
    users?: { id: string; name: string; email: string }[];
    initialFilters?: ChartFilterState;
    onApply: (filters: ChartFilterState) => void;
    buttonText?: string;
    isLoading?: boolean;
}
