import { useMemo } from 'react';

import { useParams } from 'react-router-dom';

import {
    Assignment,
    ErrorOutline,
    Schedule,
    TaskAlt,
} from '@mui/icons-material';
import { Box, Stack } from '@mui/material';

import { Stats } from '@components/Stats';
import { ProjectPriorityChartContainer } from '@containers';
import { ProjectDeadlineChartContainer } from '@containers/ProjectDeadlineChart';
import { ProjectStatusChartContainer } from '@containers/ProjectStatusChart';
import { useGetProjectSummaryQuery } from '@service';

import { StatsGrid } from './ProjectReport.styles';

export const ProjectReportContainer = () => {
    const { id: projectId } = useParams<{ id: string }>();

    const { data: summaryResponse, isFetching } = useGetProjectSummaryQuery(
        { projectId: projectId || '' },
        { skip: !projectId },
    );

    const kpiStats = useMemo(() => {
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
            <Box>
                <StatsGrid>
                    <Stats
                        icon={<Assignment color="primary" />}
                        title={isFetching ? '...' : `${kpiStats.total}`}
                        subtitle="Total Tickets"
                    />
                    <Stats
                        icon={<TaskAlt color="success" />}
                        title={isFetching ? '...' : `${kpiStats.completed}`}
                        subtitle="Completed"
                    />
                    <Stats
                        icon={<ErrorOutline color="error" />}
                        title={
                            isFetching ? '...' : `${kpiStats.missingDeadline}`
                        }
                        subtitle="Missing Deadline"
                    />
                    <Stats
                        icon={<Schedule color="warning" />}
                        title={
                            isFetching ? '...' : `${kpiStats.upcomingDeadline}`
                        }
                        subtitle="Due in 7 Days"
                    />
                </StatsGrid>
            </Box>

            <ProjectStatusChartContainer />
            <ProjectPriorityChartContainer />
            <ProjectDeadlineChartContainer />
        </Stack>
    );
};
