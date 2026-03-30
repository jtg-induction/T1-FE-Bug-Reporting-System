import { useState } from 'react';

import {
    Button,
    Checkbox,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';

import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import {
    DateInputGroup,
    FilterDateInput,
    FilterFormControl,
    FilterWrapper,
    SCROLLABLE_MENU_PROPS,
    SelectGroup,
} from './ChartFilter.styles';
import {
    ChartFilterBarProps,
    ChartFilterState,
    DateRangeType,
} from './ChartFilter.types';

export const ChartFilter = ({
    showUserFilter = false,
    users = [],
    initialFilters,
    onApply,
    isLoading,
    buttonText,
}: ChartFilterBarProps) => {
    const [filters, setFilters] = useState<ChartFilterState>({
        selectedUserIds: initialFilters?.selectedUserIds || ['all'],
        dateRangeType: initialFilters?.dateRangeType || 'week',
        startDate: initialFilters?.startDate || '',
        endDate: initialFilters?.endDate || '',
    });

    const getRenderValue = (selected: string[]) => {
        if (selected.length === 0 || selected.includes('all')) {
            return 'All Users';
        }
        return selected
            .map((id) => users.find((u) => u.id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    const handleUserChange = (e: SelectChangeEvent<string[]>) => {
        const value = e.target.value;
        let newSelection = typeof value === 'string' ? value.split(',') : value;

        if (newSelection[newSelection.length - 1] === 'all') {
            newSelection = ['all'];
        } else {
            newSelection = newSelection.filter((id) => id !== 'all');
        }

        if (newSelection.length === 0) newSelection = ['all'];

        setFilters({ ...filters, selectedUserIds: newSelection });
    };

    const handleDateRangeTypeChange = (e: SelectChangeEvent<string>) => {
        const val = e.target.value as DateRangeType;
        setFilters({
            ...filters,
            dateRangeType: val,
            ...(val === 'week' && {
                startDate: getStartOfCurrentWeek(),
                endDate: getEndOfCurrentWeek(),
            }),
        });
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStart = e.target.value;
        setFilters({
            ...filters,
            startDate: newStart,
            endDate:
                newStart && filters.endDate && newStart > filters.endDate
                    ? newStart
                    : filters.endDate,
        });
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEnd = e.target.value;
        setFilters({
            ...filters,
            endDate: newEnd,
            startDate:
                newEnd && filters.startDate && newEnd < filters.startDate
                    ? newEnd
                    : filters.startDate,
        });
    };

    const handleApply = () => {
        onApply(filters);
    };

    const isApplyDisabled =
        filters.dateRangeType === 'custom' &&
        (!filters.startDate || !filters.endDate);

    return (
        <FilterWrapper>
            <SelectGroup>
                {showUserFilter && (
                    <FilterFormControl size="small">
                        <InputLabel id="user-filter">User</InputLabel>
                        <Select
                            labelId="user-filter"
                            multiple
                            value={filters.selectedUserIds}
                            label="User"
                            onChange={handleUserChange}
                            renderValue={getRenderValue}
                            MenuProps={SCROLLABLE_MENU_PROPS}
                        >
                            <MenuItem value="all">
                                <Checkbox
                                    checked={
                                        filters.selectedUserIds?.includes(
                                            'all',
                                        ) ||
                                        filters.selectedUserIds?.length === 0
                                    }
                                />
                                <ListItemText primary="All Users" />
                            </MenuItem>

                            {users.map((user) => (
                                <MenuItem
                                    key={user.id}
                                    value={user.id}
                                    title={user.email}
                                >
                                    <Checkbox
                                        checked={filters.selectedUserIds?.includes(
                                            user.id,
                                        )}
                                    />
                                    <ListItemText
                                        primary={user.name}
                                        slotProps={{
                                            primary: { noWrap: true },
                                        }}
                                    />
                                </MenuItem>
                            ))}
                        </Select>
                    </FilterFormControl>
                )}

                <FilterFormControl size="small">
                    <InputLabel id="date-filter">Deadline Range</InputLabel>
                    <Select
                        labelId="date-filter"
                        value={filters.dateRangeType}
                        label="Deadline Range"
                        onChange={handleDateRangeTypeChange}
                    >
                        <MenuItem value="week">Current Week</MenuItem>
                        <MenuItem value="custom">Custom Range</MenuItem>
                    </Select>
                </FilterFormControl>
            </SelectGroup>

            {filters.dateRangeType === 'custom' && (
                <DateInputGroup>
                    <FilterDateInput
                        size="small"
                        type="date"
                        label="Start Date"
                        value={filters.startDate}
                        onChange={handleStartDateChange}
                        InputLabelProps={{ shrink: true }}
                    />
                    <FilterDateInput
                        size="small"
                        type="date"
                        label="End Date"
                        value={filters.endDate}
                        onChange={handleEndDateChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </DateInputGroup>
            )}

            <Button
                variant="contained"
                disabled={isApplyDisabled || isLoading}
                onClick={handleApply}
            >
                {isLoading ? 'Generating...' : buttonText || 'Apply Filter'}
            </Button>
        </FilterWrapper>
    );
};
