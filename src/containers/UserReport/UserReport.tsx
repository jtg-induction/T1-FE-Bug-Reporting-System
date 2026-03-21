import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { Download } from '@mui/icons-material';
import {
    Button,
    CircularProgress,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material';

import { ChartFilter, Snackbar } from '@components';
import {
    UserDeadlineChartContainer,
    UserPriorityChartContainer,
    UserStatusChartContainer,
} from '@containers';
import { useDownloadUserReportMutation, useGetMeQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import {
    ActionWrapper,
    FilterWrapper,
    HeaderContainer,
    TitleWrapper,
} from './UserReport.styles';

export const UserReportContainer = () => {
    const { userId } = useParams<{ userId: string }>();

    const { data: getMeResponse } = useGetMeQuery();
    const currentUser = getMeResponse?.data;

    const isCurrentUser = userId === currentUser?.id || !userId;

    const [dateRangeType, setDateRangeType] = useState<string>('week');
    const [startDate, setStartDate] = useState<string>(getStartOfCurrentWeek());
    const [endDate, setEndDate] = useState<string>(getEndOfCurrentWeek());

    const [downloadReport, { isLoading: isDownloading }] =
        useDownloadUserReportMutation();

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const handleCloseSnackbar = (
        _event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') return;
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const handleDateRangeTypeChange = (event: SelectChangeEvent) => {
        const type = event.target.value;
        setDateRangeType(type);

        if (type === 'week') {
            setStartDate(getStartOfCurrentWeek());
            setEndDate(getEndOfCurrentWeek());
        } else if (type === 'all') {
            setStartDate('');
            setEndDate('');
        }
    };

    const handleDownloadReport = async () => {
        const targetUserId = userId || currentUser?.id;
        if (!targetUserId) return;

        try {
            const blob = await downloadReport({
                userId: targetUserId,
                startDate,
                endDate,
            }).unwrap();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', 'Performance_Report.pdf');

            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);

            setSnackbar({
                open: true,
                message: 'Report downloaded successfully!',
                severity: 'success',
            });
        } catch {
            setSnackbar({
                open: true,
                message: 'Failed to download report. Please try again.',
                severity: 'error',
            });
        }
    };

    return (
        <Stack gap={3}>
            <HeaderContainer>
                <TitleWrapper>
                    <Typography variant="h2" fontWeight="bold">
                        {isCurrentUser
                            ? 'My Performance Report'
                            : 'Performance Report'}
                    </Typography>
                </TitleWrapper>

                {isCurrentUser && (
                    <>
                        <FilterWrapper>
                            <ChartFilter
                                showUserFilter={false}
                                dateRangeType={dateRangeType}
                                onDateRangeTypeChange={
                                    handleDateRangeTypeChange
                                }
                                startDate={startDate}
                                onStartDateChange={setStartDate}
                                endDate={endDate}
                                onEndDateChange={setEndDate}
                            />
                        </FilterWrapper>

                        <ActionWrapper>
                            <Button
                                variant="contained"
                                startIcon={
                                    isDownloading ? (
                                        <CircularProgress
                                            size={16}
                                            color="inherit"
                                        />
                                    ) : (
                                        <Download />
                                    )
                                }
                                onClick={() => void handleDownloadReport()}
                                disabled={
                                    isDownloading ||
                                    (dateRangeType === 'custom' &&
                                        (!startDate || !endDate))
                                }
                                sx={{ height: 40 }}
                            >
                                {isDownloading ? 'Generating...' : 'Download'}
                            </Button>
                        </ActionWrapper>
                    </>
                )}
            </HeaderContainer>

            <UserStatusChartContainer />
            <UserPriorityChartContainer />
            <UserDeadlineChartContainer />

            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </Stack>
    );
};
