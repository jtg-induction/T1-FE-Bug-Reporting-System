import { useState } from 'react';

import { useParams } from 'react-router-dom';

import { Button, Stack, Typography } from '@mui/material';

import { Snackbar } from '@components';
import {
    UserDeadlineChartContainer,
    UserPriorityChartContainer,
    UserStatusChartContainer,
} from '@containers';
import { ReportDownloadFormContainer, ReportFormValues } from '@containers';
import { useDownloadUserReportMutation, useGetMeQuery } from '@service';

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
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

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

    const handleDownloadReport = async (filters: ReportFormValues) => {
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
            setIsDownloadModalOpen(false);
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
                    <FilterWrapper>
                        <Button
                            variant="contained"
                            onClick={() => setIsDownloadModalOpen(true)}
                        >
                            Download Report
                        </Button>
                    </FilterWrapper>
                )}
            </HeaderContainer>

            <UserStatusChartContainer />
            <UserPriorityChartContainer />
            <UserDeadlineChartContainer />

            <ReportDownloadFormContainer
                open={isDownloadModalOpen}
                onClose={() => setIsDownloadModalOpen(false)}
                onSubmit={handleDownloadReport}
                isLoading={isDownloading}
                showUserFilter={false}
            />

            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </Stack>
    );
};
