import {
    Checkbox,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
} from '@mui/material';

import {
    DateInputGroup,
    FilterDateInput,
    FilterFormControl,
    FilterWrapper,
    SCROLLABLE_MENU_PROPS,
    SelectGroup,
} from './ChartFilter.styles';
import { ChartFilterBarProps } from './ChartFilter.types';

export const ChartFilter = ({
    showUserFilter = false,
    users = [],
    selectedUserIds = ['all'],
    onUserChange,
    dateRangeType,
    onDateRangeTypeChange,
    startDate,
    onStartDateChange,
    endDate,
    onEndDateChange,
}: ChartFilterBarProps) => {
    const getRenderValue = (selected: string[]) => {
        if (selected.length === 0 || selected.includes('all')) {
            return 'All Users';
        }
        return selected
            .map((id) => users.find((u) => u.id === id)?.name)
            .filter(Boolean)
            .join(', ');
    };

    return (
        <FilterWrapper>
            <SelectGroup>
                {showUserFilter && (
                    <FilterFormControl size="small">
                        <InputLabel id="user-filter">User</InputLabel>
                        <Select
                            labelId="user-filter"
                            multiple
                            value={selectedUserIds}
                            label="User"
                            onChange={onUserChange}
                            renderValue={getRenderValue}
                            MenuProps={SCROLLABLE_MENU_PROPS}
                        >
                            <MenuItem value="all">
                                <Checkbox
                                    checked={
                                        selectedUserIds.includes('all') ||
                                        selectedUserIds.length === 0
                                    }
                                />
                                <ListItemText primary="All Users" />
                            </MenuItem>

                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    <Checkbox
                                        checked={selectedUserIds.includes(
                                            user.id,
                                        )}
                                    />
                                    <ListItemText primary={user.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FilterFormControl>
                )}

                <FilterFormControl size="small">
                    <InputLabel id="date-filter">Date Range</InputLabel>
                    <Select
                        labelId="date-filter"
                        value={dateRangeType}
                        label="Date Range"
                        onChange={onDateRangeTypeChange}
                    >
                        <MenuItem value="week">Current Week</MenuItem>
                        <MenuItem value="custom">Custom Range</MenuItem>
                    </Select>
                </FilterFormControl>
            </SelectGroup>

            {dateRangeType === 'custom' && (
                <DateInputGroup>
                    <FilterDateInput
                        size="small"
                        type="date"
                        label="Start Date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <FilterDateInput
                        size="small"
                        type="date"
                        label="End Date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </DateInputGroup>
            )}
        </FilterWrapper>
    );
};
