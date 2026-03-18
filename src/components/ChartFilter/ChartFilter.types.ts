import { SelectChangeEvent } from '@mui/material';

export interface FilterUserOption {
    id: string;
    name: string;
}

export interface ChartFilterBarProps {
    showUserFilter?: boolean;
    users?: FilterUserOption[];
    selectedUserIds?: string[];
    onUserChange?: (event: SelectChangeEvent<string[]>) => void;

    dateRangeType: string;
    onDateRangeTypeChange: (event: SelectChangeEvent) => void;
    startDate: string;
    onStartDateChange: (value: string) => void;
    endDate: string;
    onEndDateChange: (value: string) => void;
}
