import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import {
    Assignment,
    ErrorOutline,
    Schedule,
    TaskAlt,
} from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

import { Snackbar, Stats } from '@components';
import {
    ProjectDeadlineChartContainer,
    ProjectPriorityChartContainer,
    ProjectStatusChartContainer,
    ReportDownloadFormContainer,
    ReportFormValues,
} from '@containers';
import {
    useDownloadProjectReportMutation,
    useGetProjectMembersQuery,
    useGetProjectSummaryQuery,
} from '@service';

import {
    FilterWrapper,
    HeaderContainer,
    StatsGrid,
    TitleWrapper,
} from './ProjectReport.styles';
import { ProjectReportProps } from './ProjectReport.types';

export const ProjectReportContainer = ({ isAdmin }: ProjectReportProps) => {
    const { id: projectId } = useParams<{ id: string }>();

    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

    const { data: membersResponse } = useGetProjectMembersQuery(
        { projectId: projectId || '', limit: 100, offset: 0 },
        { skip: !projectId },
    );

    const { data: summaryResponse, isFetching } = useGetProjectSummaryQuery(
        { projectId: projectId || '' },
        { skip: !projectId },
    );

    const [downloadReport, { isLoading: isDownloading }] =
        useDownloadProjectReportMutation();

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

    const userOptions = useMemo(() => {
        const results = membersResponse?.data?.results ?? [];
        return results.map((row) => ({
            VALUE: row.member.id,
            LABEL: `${row.member.first_name} ${row.member.last_name}`.trim(),
        }));
    }, [membersResponse]);

    const handleDownloadReport = async (filters: ReportFormValues) => {
        if (!projectId) return;

        try {
            const blob = await downloadReport({
                projectId,
                startDate: filters.startDate,
                endDate: filters.endDate,
                userIds: filters.selectedUserIds?.includes('all')
                    ? undefined
                    : filters.selectedUserIds,
            }).unwrap();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Project_Report_${projectId}.pdf`);

            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);

            setIsDownloadModalOpen(false);
            setSnackbar({
                open: true,
                message: 'Project Report downloaded successfully!',
                severity: 'success',
            });
        } catch {
            setSnackbar({
                open: true,
                message:
                    'Failed to download report. Ensure you have Admin privileges.',
                severity: 'error',
            });
        }
    };

    const projectStats = useMemo(() => {
        const stats = summaryResponse?.data?.ticket_summary;
        return {
            total: stats?.total || 0,
            completed: stats?.completed || 0,
            missingDeadline: stats?.missed_deadline || 0,
            upcomingDeadline: stats?.near_deadline || 0,
        };
    }, [summaryResponse]);

    return (
        <Stack gap={3}>
            <HeaderContainer>
                <TitleWrapper>
                    <Typography variant="h2" fontWeight="bold">
                        Project Report
                    </Typography>
                </TitleWrapper>

                {isAdmin && (
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

            <Box>
                <StatsGrid>
                    <Stats
                        icon={<Assignment color="primary" />}
                        title={isFetching ? '...' : `${projectStats.total}`}
                        subtitle="Total Tickets"
                    />
                    <Stats
                        icon={<TaskAlt color="success" />}
                        title={isFetching ? '...' : `${projectStats.completed}`}
                        subtitle="Completed"
                    />
                    <Stats
                        icon={<ErrorOutline color="error" />}
                        title={
                            isFetching
                                ? '...'
                                : `${projectStats.missingDeadline}`
                        }
                        subtitle="Missing Deadline"
                    />
                    <Stats
                        icon={<Schedule color="warning" />}
                        title={
                            isFetching
                                ? '...'
                                : `${projectStats.upcomingDeadline}`
                        }
                        subtitle="Due in 7 Days"
                    />
                </StatsGrid>
            </Box>

            <ProjectStatusChartContainer />
            <ProjectPriorityChartContainer />
            <ProjectDeadlineChartContainer />

            <ReportDownloadFormContainer
                open={isDownloadModalOpen}
                onClose={() => setIsDownloadModalOpen(false)}
                onSubmit={handleDownloadReport}
                isLoading={isDownloading}
                userOptions={userOptions}
                showUserFilter={true}
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
