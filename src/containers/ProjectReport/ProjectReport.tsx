import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import {
    Assignment,
    Download,
    ErrorOutline,
    Schedule,
    TaskAlt,
} from '@mui/icons-material';
import {
    Box,
    Button,
    CircularProgress,
    SelectChangeEvent,
    Stack,
    Typography,
} from '@mui/material';

import { ChartFilter, Snackbar, Stats } from '@components';
import {
    ProjectDeadlineChartContainer,
    ProjectPriorityChartContainer,
    ProjectStatusChartContainer,
} from '@containers';
import {
    useDownloadProjectReportMutation,
    useGetProjectMembersQuery,
    useGetProjectSummaryQuery,
} from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import {
    ActionWrapper,
    FilterWrapper,
    HeaderContainer,
    StatsGrid,
    TitleWrapper,
} from './ProjectReport.styles';
import { ProjectReportProps } from './ProjectReport.types';

export const ProjectReportContainer = ({ isAdmin }: ProjectReportProps) => {
    const { id: projectId } = useParams<{ id: string }>();

    const [dateRangeType, setDateRangeType] = useState<string>('week');
    const [startDate, setStartDate] = useState<string>(getStartOfCurrentWeek());
    const [endDate, setEndDate] = useState<string>(getEndOfCurrentWeek());

    const [userIds, setUserIds] = useState<string[]>(['all']);

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

    const filterUsers = useMemo(() => {
        const membersData = membersResponse?.data;
        const results = membersData?.results ?? [];

        return results.map((row) => ({
            id: row.member.id,
            name: `${row.member.first_name} ${row.member.last_name}`.trim(),
        }));
    }, [membersResponse]);

    const handleUserChange = (event: SelectChangeEvent<typeof userIds>) => {
        const value = event.target.value;
        let newSelection = typeof value === 'string' ? value.split(',') : value;

        if (newSelection[newSelection.length - 1] === 'all') {
            newSelection = ['all'];
        } else {
            newSelection = newSelection.filter((id) => id !== 'all');
        }
        if (newSelection.length === 0) newSelection = ['all'];
        setUserIds(newSelection);
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
        if (!projectId) return;

        try {
            const blob = await downloadReport({
                projectId,
                startDate,
                endDate,
                userIds: userIds.includes('all') ? undefined : userIds,
            }).unwrap();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            link.setAttribute('download', 'Project_Report.pdf');

            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);

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
                    <>
                        <FilterWrapper>
                            <ChartFilter
                                showUserFilter={true}
                                users={filterUsers}
                                selectedUserIds={userIds}
                                onUserChange={handleUserChange}
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

            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={handleCloseSnackbar}
            />
        </Stack>
    );
};
