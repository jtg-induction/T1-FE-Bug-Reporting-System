import { useMemo } from 'react';

import {
    Assignment,
    ErrorOutline,
    Schedule,
    TaskAlt,
} from '@mui/icons-material';
import { Typography } from '@mui/material';

import { SectionCard, Stats } from '@components';
import { useGetUserTicketSummaryQuery } from '@service';

import { StatsGrid } from './WeeklyStats.styles';

export const WeeklyStats = () => {
    const { data: summaryResponse, isFetching } =
        useGetUserTicketSummaryQuery();

    const weeklyStats = useMemo(() => {
        const data = summaryResponse?.data;

        return {
            total: data?.total || 0,
            completed: data?.completed || 0,
            missedDeadline: data?.missed_deadline || 0,
            nearDeadline: data?.near_deadline || 0,
        };
    }, [summaryResponse]);

    return (
        <SectionCard
            titleContent={
                <Typography variant="h6" fontWeight="bold">
                    Weekly Stats
                </Typography>
            }
            mainContent={
                <StatsGrid>
                    <Stats
                        icon={<Assignment color="primary" />}
                        title={isFetching ? '...' : `${weeklyStats.total}`}
                        subtitle="Total Assigned"
                    />
                    <Stats
                        icon={<TaskAlt color="success" />}
                        title={isFetching ? '...' : `${weeklyStats.completed}`}
                        subtitle="Completed"
                    />
                    <Stats
                        icon={<ErrorOutline color="error" />}
                        title={
                            isFetching ? '...' : `${weeklyStats.missedDeadline}`
                        }
                        subtitle="Missed Deadline"
                    />
                    <Stats
                        icon={<Schedule color="warning" />}
                        title={
                            isFetching ? '...' : `${weeklyStats.nearDeadline}`
                        }
                        subtitle="Near Deadline"
                    />
                </StatsGrid>
            }
        />
    );
};
