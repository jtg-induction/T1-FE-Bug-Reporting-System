import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import {
    ChartFilter,
    ChartFilterState,
    DeadlineChart,
    SectionCard,
} from '@components';
import { useGetProjectMembersQuery, useGetProjectSummaryQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

export const ProjectDeadlineChartContainer = () => {
    const { id: projectId } = useParams<{ id: string }>();

    const [appliedFilters, setAppliedFilters] = useState<ChartFilterState>({
        selectedUserIds: ['all'],
        dateRangeType: 'week',
        startDate: getStartOfCurrentWeek(),
        endDate: getEndOfCurrentWeek(),
    });

    const isDefaultFilter =
        appliedFilters.dateRangeType === 'week' &&
        appliedFilters.selectedUserIds?.length === 1 &&
        appliedFilters.selectedUserIds[0] === 'all';

    const { data: membersResponse } = useGetProjectMembersQuery(
        { projectId: projectId || '', limit: 100, offset: 0 },
        { skip: !projectId },
    );

    const { data: summaryResponse, isFetching: isSummaryFetching } =
        useGetProjectSummaryQuery(
            isDefaultFilter
                ? { projectId: projectId || '' }
                : {
                      projectId: projectId || '',
                      section: 'deadline',
                      userIds: appliedFilters.selectedUserIds,
                      startDate: appliedFilters.startDate,
                      endDate: appliedFilters.endDate,
                  },
            { skip: !projectId },
        );

    const filterUsers = useMemo(() => {
        const membersData = membersResponse?.data;
        const results = membersData?.results ?? [];

        return results.map((row) => ({
            id: row.member.id,
            name: `${row.member.first_name} ${row.member.last_name}`.trim(),
            email: row.member.email,
        }));
    }, [membersResponse]);

    const deadlineChartData = useMemo(() => {
        const deadlineData = summaryResponse?.data?.deadline_chart;

        if (!deadlineData) return [];

        return deadlineData.map((item) => {
            let formattedDate = 'Unknown Date';

            if (item.day) {
                const datePart = item.day.split('T')[0];
                const [year, month, day] = datePart.split('-');
                formattedDate = `${month}/${day}/${year}`;
            }

            return {
                date: formattedDate,
                missed: item.missed || 0,
                completedBefore: item.completed_before_time || 0,
                completedOnTime: item.completed_on_time || 0,
            };
        });
    }, [summaryResponse]);

    const handleFilterApply = (newFilters: ChartFilterState) => {
        setAppliedFilters(newFilters);
    };

    return (
        <SectionCard
            titleContent={
                <Typography variant="h6" fontWeight="bold">
                    Ticket Deadlines
                </Typography>
            }
            subheaderContent={
                <ChartFilter
                    showUserFilter={true}
                    users={filterUsers}
                    initialFilters={appliedFilters}
                    onApply={handleFilterApply}
                />
            }
            mainContent={
                <DeadlineChart
                    data={deadlineChartData}
                    isLoading={isSummaryFetching}
                />
            }
        />
    );
};
