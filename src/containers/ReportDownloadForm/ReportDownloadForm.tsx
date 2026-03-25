import { useEffect, useRef } from 'react';

import { useController, useForm, useWatch } from 'react-hook-form';

import {
    Checkbox,
    FormControl,
    FormHelperText,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material';

import { FormField, ModalForm } from '@components';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import { SCROLLABLE_MENU_PROPS } from './ReportDownloadForm.styles';
import {
    DownloadReportFormContainerProps,
    ReportFormValues,
} from './ReportDownloadForm.types';

export const ReportDownloadFormContainer = ({
    open,
    onClose,
    onSubmit,
    isLoading,
    userOptions = [],
    showUserFilter = true,
}: DownloadReportFormContainerProps) => {
    const formId = 'download-report-form';

    const { control, handleSubmit, reset, setValue } =
        useForm<ReportFormValues>({
            defaultValues: {
                selectedUserIds: ['all'],
                dateRangeType: 'week',
                startDate: getStartOfCurrentWeek(),
                endDate: getEndOfCurrentWeek(),
            },
        });

    const selectedDateRangeType = useWatch({
        control,
        name: 'dateRangeType',
    });

    const currentStartDate = useWatch({ control, name: 'startDate' });
    const currentEndDate = useWatch({ control, name: 'endDate' });
    const prevDates = useRef({ start: currentStartDate, end: currentEndDate });

    const {
        field: userIdsField,
        fieldState: { error: userIdsError },
    } = useController({
        name: 'selectedUserIds',
        control,
    });

    useEffect(() => {
        if (!open) {
            reset({
                selectedUserIds: ['all'],
                dateRangeType: 'week',
                startDate: getStartOfCurrentWeek(),
                endDate: getEndOfCurrentWeek(),
            });
        }
    }, [open, reset]);

    useEffect(() => {
        if (selectedDateRangeType === 'week') {
            setValue('startDate', getStartOfCurrentWeek());
            setValue('endDate', getEndOfCurrentWeek());
        }
    }, [selectedDateRangeType, setValue]);

    useEffect(() => {
        if (
            selectedDateRangeType === 'custom' &&
            currentStartDate &&
            currentEndDate
        ) {
            if (currentStartDate > currentEndDate) {
                if (currentStartDate !== prevDates.current.start) {
                    setValue('endDate', currentStartDate);
                } else if (currentEndDate !== prevDates.current.end) {
                    setValue('startDate', currentEndDate);
                }
            }
        }

        prevDates.current = { start: currentStartDate, end: currentEndDate };
    }, [currentStartDate, currentEndDate, selectedDateRangeType, setValue]);

    const handleFormSubmit = async (data: ReportFormValues) => {
        const formattedData = {
            ...data,
            selectedUserIds:
                showUserFilter && data.selectedUserIds
                    ? Array.isArray(data.selectedUserIds)
                        ? data.selectedUserIds
                        : [data.selectedUserIds]
                    : undefined,
        };
        await onSubmit(formattedData);
    };

    const getRenderValue = (sel: string[]) => {
        if (sel.length === 0 || sel.includes('all')) {
            return 'All Users';
        }
        return sel
            .map((id) => userOptions.find((u) => u.VALUE === id)?.LABEL)
            .filter(Boolean)
            .join(', ');
    };

    const handleUserChange = (
        e: SelectChangeEvent<string[]>,
        onChange: (value: string[]) => void,
    ) => {
        const value = e.target.value;
        let newSelection = typeof value === 'string' ? value.split(',') : value;

        if (newSelection[newSelection.length - 1] === 'all') {
            newSelection = ['all'];
        } else {
            newSelection = newSelection.filter((id) => id !== 'all');
        }

        if (newSelection.length === 0) newSelection = ['all'];

        onChange(newSelection);
    };

    const selectedUsersArray = Array.isArray(userIdsField.value)
        ? userIdsField.value
        : [];

    return (
        <ModalForm
            open={open}
            title="Download Report"
            formId={formId}
            onClose={onClose}
            isLoading={isLoading}
            submitLabel="Download"
        >
            <form
                id={formId}
                onSubmit={(e) => void handleSubmit(handleFormSubmit)(e)}
            >
                <Stack spacing={3}>
                    <Typography variant="body2" color="text.secondary">
                        Select the criteria for your report below.
                    </Typography>

                    {showUserFilter && (
                        <FormControl fullWidth error={!!userIdsError}>
                            <InputLabel id="user-filter-label">
                                Select Users
                            </InputLabel>
                            <Select
                                {...userIdsField}
                                labelId="user-filter-label"
                                multiple
                                value={selectedUsersArray}
                                label="Select Users"
                                onChange={(e) =>
                                    handleUserChange(e, userIdsField.onChange)
                                }
                                renderValue={(val) => getRenderValue(val)}
                                MenuProps={SCROLLABLE_MENU_PROPS}
                            >
                                <MenuItem value="all">
                                    <Checkbox
                                        checked={
                                            selectedUsersArray.includes(
                                                'all',
                                            ) || selectedUsersArray.length === 0
                                        }
                                    />
                                    <ListItemText primary="All Users" />
                                </MenuItem>

                                {userOptions.map((user) => (
                                    <MenuItem
                                        key={user.VALUE}
                                        value={user.VALUE}
                                    >
                                        <Checkbox
                                            checked={selectedUsersArray.includes(
                                                user.VALUE,
                                            )}
                                        />
                                        <ListItemText primary={user.LABEL} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {userIdsError && (
                                <FormHelperText>
                                    {userIdsError.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    )}

                    <FormField
                        name="dateRangeType"
                        label="Deadline Range"
                        type="select"
                        control={control}
                        editStatus={true}
                        options={[
                            { LABEL: 'Current Week', VALUE: 'week' },
                            { LABEL: 'Custom Range', VALUE: 'custom' },
                        ]}
                    />

                    {selectedDateRangeType === 'custom' && (
                        <Stack direction="row" spacing={2}>
                            <FormField
                                name="startDate"
                                label="Start Date"
                                type="date"
                                control={control}
                                editStatus={true}
                            />
                            <FormField
                                name="endDate"
                                label="End Date"
                                type="date"
                                control={control}
                                editStatus={true}
                            />
                        </Stack>
                    )}
                </Stack>
            </form>
        </ModalForm>
    );
};
