import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@mui/material';

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
}: ChartFilterBarProps) => (
        <Stack
            direction={{ xs: 'column', lg: 'row' }}
            spacing={2}
            sx={{ mt: 1 }}
        >
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                {showUserFilter && (
                    <FormControl size="small" sx={{ width: 200 }}>
                        <InputLabel id="user-filter">User</InputLabel>
                        <Select
                            labelId="user-filter"
                            multiple
                            value={selectedUserIds}
                            label="User"
                            onChange={onUserChange}
                            renderValue={(selected) => {
                                if (
                                    selected.length === 0 ||
                                    selected.includes('all')
                                ) {
                                    return 'All Users';
                                }
                                return selected
                                    .map(
                                        (id) =>
                                            users.find((u) => u.id === id)
                                                ?.name,
                                    )
                                    .filter(Boolean)
                                    .join(', ');
                            }}
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
                    </FormControl>
                )}
                <FormControl size="small" sx={{ width: 200 }}>
                    <InputLabel id="date-filter">Date Range</InputLabel>
                    <Select
                        labelId="date-filter"
                        value={dateRangeType}
                        label="Date Range"
                        onChange={onDateRangeTypeChange}
                    >
                        <MenuItem value="all">All Time</MenuItem>
                        <MenuItem value="week">Current Week</MenuItem>
                        <MenuItem value="custom">Custom Range</MenuItem>
                    </Select>
                </FormControl>
            </Stack>

            {dateRangeType === 'custom' && (
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                    <TextField
                        size="small"
                        type="date"
                        label="Start Date"
                        value={startDate}
                        onChange={(e) => onStartDateChange(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: 200 }}
                    />
                    <TextField
                        size="small"
                        type="date"
                        label="End Date"
                        value={endDate}
                        onChange={(e) => onEndDateChange(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: 200 }}
                    />
                </Stack>
            )}
        </Stack>
    );
