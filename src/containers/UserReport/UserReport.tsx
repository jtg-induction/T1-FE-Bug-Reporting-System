import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import { ChartFilter, ChartFilterState, Snackbar } from '@components';
import {
    UserDeadlineChartContainer,
    UserPriorityChartContainer,
    UserStatusChartContainer,
} from '@containers';
import { useDownloadUserReportMutation, useGetMeQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import {
    FilterWrapper,
    HeaderContainer,
    TitleWrapper,
} from './UserReport.styles';

export const UserReportContainer = () => {
    const { userId } = useParams<{ userId: string }>();

    const { data: getMeResponse } = useGetMeQuery();
    const currentUser = getMeResponse?.data;
    const isCurrentUser = userId === currentUser?.id || !userId;

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

    const handleDownloadReport = async (filters: ChartFilterState) => {
        const targetUserId = userId || currentUser?.id;
        if (!targetUserId) return;

        try {
            const blob = await downloadReport({
                userId: targetUserId,
                startDate: filters.startDate,
                endDate: filters.endDate,
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

    const initialFilters: ChartFilterState = {
        dateRangeType: 'week',
        startDate: getStartOfCurrentWeek(),
        endDate: getEndOfCurrentWeek(),
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
                    <FilterWrapper>
                        <ChartFilter
                            showUserFilter={false}
                            initialFilters={initialFilters}
                            onApply={(filters) =>
                                void handleDownloadReport(filters)
                            }
                            buttonText="Download"
                            isLoading={isDownloading}
                        />
                    </FilterWrapper>
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
