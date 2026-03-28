import { useMemo, useState } from 'react';

import { useParams } from 'react-router-dom';

import { Typography } from '@mui/material';

import {
    ChartFilter,
    ChartFilterState,
    SectionCard,
    StatusDonutChart,
} from '@components';
import { useGetProjectMembersQuery, useGetProjectSummaryQuery } from '@service';
import { getEndOfCurrentWeek, getStartOfCurrentWeek } from '@utils';

import { TICKET_STATUS_MAP } from './ProjectStatusChart.config';

export const ProjectStatusChartContainer = () => {
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
                      section: 'status',
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
        }));
    }, [membersResponse]);

    const statusChartData = useMemo(() => {
        const statusData = summaryResponse?.data?.ticket_status;

        return [
            {
                name: TICKET_STATUS_MAP[1].name,
                value: statusData?.open || 0,
                color: TICKET_STATUS_MAP[1].color,
            },
            {
                name: TICKET_STATUS_MAP[2].name,
                value: statusData?.in_progress || 0,
                color: TICKET_STATUS_MAP[2].color,
            },
            {
                name: TICKET_STATUS_MAP[3].name,
                value: statusData?.resolved || 0,
                color: TICKET_STATUS_MAP[3].color,
            },
            {
                name: TICKET_STATUS_MAP[4].name,
                value: statusData?.closed || 0,
                color: TICKET_STATUS_MAP[4].color,
            },
        ];
    }, [summaryResponse]);

    const handleFilterApply = (newFilters: ChartFilterState) => {
        setAppliedFilters(newFilters);
    };

    return (
        <SectionCard
            titleContent={
                <Typography variant="h6" fontWeight="bold">
                    Tickets by Status
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
                <StatusDonutChart
                    data={statusChartData}
                    isLoading={isSummaryFetching}
                />
            }
        />
    );
};
